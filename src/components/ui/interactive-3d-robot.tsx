'use client';

import { Suspense, lazy } from 'react';
const Spline = lazy(() => import('@splinetool/react-spline'));

/* ── Runtime-перекраска сцены робота (вместо CSS-фильтров) ─────────────────────────
   Сцена Spline сохранена в тёмной палитре: фиолетовый key-прожектор (#883fe0),
   выключенный чёрный fill и тёмный matcap-«хром» на голове. Красим САМУ сцену через
   three-объекты рантайма — сохраняются настоящие тени и блики, цвета точные:
     · light — тёплая «закатная» студия: серебристый робот, оранжевая мордочка,
       кремовый пол, одна мягкая тень вправо;
     · dark  — тёмная сцена, но фиолетовый свет заменён тёплым брендовым.
   Тема читается из класса `dark` на <html> и переключается вживую (MutationObserver). */

type WhobeeTheme = 'light' | 'dark';

const WHOBEE_THEMES: Record<WhobeeTheme, {
  key: { color: string; intensity: number };
  fill: { color: string; intensity: number };
  ambient: { color: string; intensity: number; ground: string };
  face: string;
  floor: string;
  head: { base: string; matcap: number };
}> = {
  light: {
    key: { color: '#ffd8ac', intensity: 1.15 },
    fill: { color: '#ffb583', intensity: 0.7 },
    ambient: { color: '#fff2e2', intensity: 1.0, ground: '#f8e2cc' },
    face: '#ff9012',
    floor: '#ece5db',
    head: { base: '#c9c3bb', matcap: 0.25 }, // тёмный matcap красил бока головы в графит
  },
  dark: {
    key: { color: '#ffbe8f', intensity: 0.9 },
    fill: { color: '#ff7a4d', intensity: 0.55 },
    ambient: { color: '#ffe4cf', intensity: 0.45, ground: '#241d18' },
    face: '#ffaa28', // в тусклом свете градиент экрана розовит — тон с запасом по жёлтому
    floor: '#9f9f9f', // исходный тон — в тёмной студии сам уходит в глубокий
    head: { base: '#9f9f9f', matcap: 1.0 }, // исходный «хром» хорош в тёмной теме
  },
};

function applyWhobeeTheme(app: any, theme: WhobeeTheme) {
  const t = WHOBEE_THEMES[theme];
  const scene = app._scene || app.scene;
  if (!scene) return;

  // Мягкие тени (PCFSoft) вместо жёстких — идемпотентно
  const renderer: any = Object.values(app).find((v: any) => v && v.shadowMap && v.render);
  if (renderer) renderer.shadowMap.type = 2;
  scene.traverse((o: any) => {
    if (o.isMesh && o.material) {
      (Array.isArray(o.material) ? o.material : [o.material]).forEach((m: any) => { m.needsUpdate = true; });
    }
  });

  // ── Свет ──
  const lights: any[] = [];
  scene.traverse((o: any) => { if (o.isLight) lights.push(o); });
  const spots = lights.filter((l) => l.type === 'SpotLight');
  const cam = app._camera || app.camera || scene.getObjectByName('Camera');
  const camZ = cam ? Math.sign(cam.position.z || 1) : 1;

  // Ключевой (в исходнике фиолетовый) — слева-спереди-сверху, единственный источник тени
  const key = spots.find((l) => l.color.getHexString() === '883fe0') || spots[0];
  if (key) {
    key.color.set(t.key.color);
    key.intensity = t.key.intensity;
    if ('penumbra' in key) key.penumbra = 1;
    key.position.set(-620, 520, 380 * camZ);
    if (key.target) { key.target.position.set(0, 120, 0); key.target.updateMatrixWorld(true); }
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    if (key.shadow.map) { key.shadow.map.dispose(); key.shadow.map = null; }
    key.shadow.radius = 7;
    key.shadow.bias = -0.0004;
  }
  // Заполняющий (в исходнике выключенный чёрный) — тёплый rim справа, без второй тени
  const fill = spots.find((l) => l !== key);
  if (fill) { fill.color.set(t.fill.color); fill.intensity = t.fill.intensity; if ('penumbra' in fill) fill.penumbra = 1; fill.castShadow = false; }
  const amb = lights.find((l) => l.type === 'HemisphereLight');
  if (amb) {
    amb.color.set(t.ambient.color);
    amb.intensity = t.ambient.intensity;
    if (amb.groundColor) amb.groundColor.set(t.ambient.ground);
  }

  // ── Материалы (слои Spline NodeMaterial, правим uniforms напрямую) ──
  const layersOf = (mesh: any) => {
    const m = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
    if (!m || !m.layers) return null;
    return m.layers.layers || m.layers;
  };
  const setColorLayer = (L: any[], hex: string) => {
    const cl = L.find((l: any) => l.type === 'color');
    const ck = cl && cl.uniforms && Object.keys(cl.uniforms).find((k) => k.endsWith('_color'));
    if (ck) cl.uniforms[ck].value.set(hex);
  };
  scene.traverse((o: any) => {
    if (!o.isMesh) return;
    const L = layersOf(o);
    if (!Array.isArray(L)) return;

    // «Мордочка»-экран (меш Boolean 2)
    if (o.name === 'Boolean 2') {
      setColorLayer(L, t.face);
      // Приглушить реакцию экрана на свет, чтобы не желтил пятнами
      const ll = L.find((l: any) => l.type === 'light');
      if (ll && ll.uniforms) {
        Object.keys(ll.uniforms)
          .filter((k) => k.toLowerCase().includes('alpha'))
          .forEach((k) => { if (typeof ll.uniforms[k].value === 'number') ll.uniforms[k].value = 0.68; });
      }
    }

    // Пол (свет-слой не трогаем — он даёт тени)
    if (o.name === 'Plane') setColorLayer(L, t.floor);

    // Голова: шелл + боковые кольца
    if (['Boolean', 'Ears', 'Cylinder', 'Cylinder 2'].includes(o.name)) {
      const mc = L.find((l: any) => l.type === 'matcap');
      if (mc && mc.uniforms) {
        Object.keys(mc.uniforms)
          .filter((k) => k.endsWith('_alpha'))
          .forEach((k) => { if (typeof mc.uniforms[k].value === 'number') mc.uniforms[k].value = t.head.matcap; });
      }
      setColorLayer(L, t.head.base);
    }
  });
}

/** onLoad для Spline: применяет перекраску по текущей теме и следит за переключением темы. */
export function whobeeThemedOnLoad(app: any) {
  const current = (): WhobeeTheme =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  applyWhobeeTheme(app, current());

  // Живое переключение темы без перезагрузки сцены
  const g = window as any;
  if (g.__whobeeThemeObserver) g.__whobeeThemeObserver.disconnect();
  g.__whobeeThemeObserver = new MutationObserver(() => applyWhobeeTheme(app, current()));
  g.__whobeeThemeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
}

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
  onLoad?: (app: any) => void;
}

export function InteractiveRobotSpline({ scene, className, onLoad }: InteractiveRobotSplineProps) {
  return (
    <Suspense
      fallback={
        <div className={`w-full h-full flex items-center justify-center ${className ?? ''}`}>
          <svg className="animate-spin h-5 w-5 text-gray-400 dark:text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l2-2.647z"></path>
          </svg>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
        onLoad={onLoad}
      />
    </Suspense>
  );
}

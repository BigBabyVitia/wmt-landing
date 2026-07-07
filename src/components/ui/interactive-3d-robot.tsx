'use client';

import { Suspense, lazy, useEffect, useRef, useState } from 'react';
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

/* ── Загрузка/деградация тяжёлой 3D-сцены ─────────────────────────────────────────
   Робот весит: runtime Spline (~6.5 МБ распаковано) + сама сцена с CDN. Чтобы hero
   рисовался мгновенно и работал на слабых устройствах:
     1. Poster (WebP-снимок этой же сцены, ~27 КБ, точный по теме) рисуется сразу и
        служит LCP-картинкой — пользователь видит робота, а не спиннер.
     2. Интерактивную сцену монтируем ОТЛОЖЕННО (когда hero в зоне видимости + в
        простое браузера), чтобы её чанк не конкурировал с первой отрисовкой.
     3. На data-saver / мало-ОЗУ / prefers-reduced-motion сцену НЕ грузим вовсе —
        остаётся статичный poster, сайт лёгкий и полностью рабочий.
     4. Когда сцена готова — плавно проявляем canvas поверх poster'а. */

/** Стоит ли вообще грузить интерактивную 3D-сцену на этом устройстве. */
export function shouldLoad3D(): boolean {
  if (typeof window === 'undefined') return false;
  const nav = navigator as any;
  if (nav.connection?.saveData) return false; // режим экономии трафика
  if (typeof nav.deviceMemory === 'number' && nav.deviceMemory > 0 && nav.deviceMemory < 4) return false; // слабое ОЗУ
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false; // пользователь просит меньше анимации
  return true;
}

/* ── Управление нагрузкой робота на GPU ───────────────────────────────────────────
   Spline в режиме `auto` рисует сцену КАЖДЫЙ кадр (60 fps), пока она «играет» — у
   робота непрерывная idle-анимация. На слабых интегрированных GPU это держит 3D-движок
   у ~100% даже когда на робота просто смотрят, и подтормаживает скролл всей страницы.
   Два рычага, оба через штатный рантайм Spline (без перезагрузки сцены):
     1) FPS-кэп: `renderMode='manual'` глушит собственный безлимитный луп Spline, а
        кадры мы гоним сами throttled-циклом (по умолчанию 30 fps) — и только пока робот
        НА экране И вкладка видима. Вне экрана/при скрытии/сворачивании не гоним ни кадра
        → GPU простаивает. Возобновление мгновенное.
     2) Разрешение: на HiDPI сцена рендерится в 2× (в 4× больше пикселей на кадр) —
        клампим pixelRatio three-renderer'а (см. capRenderResolution). */

interface Toggleable3D {
  play?: () => void;
  stop?: () => void;
  requestRender?: () => void;
  renderMode?: 'auto' | 'manual' | 'continuous';
}

interface RafHost {
  requestAnimationFrame: (cb: FrameRequestCallback) => number;
  cancelAnimationFrame: (id: number) => void;
}

/**
 * Гонит рендер сцены с ограничением по fps, только пока элемент во вьюпорте И вкладка
 * видима; иначе не рендерит вовсе → GPU простаивает. Возвращает функцию очистки.
 * Параметризовано (IO/doc/win/fps), чтобы поведение можно было детерминированно
 * протестировать без реальной 3D-сцены. Если рантайм не умеет manual-рендер —
 * откатывается на play()/stop() (пауза без FPS-кэпа).
 */
export function createRenderActivityController(
  el: Element,
  app: Toggleable3D,
  { IO = window.IntersectionObserver, doc = document, win = window as unknown as RafHost, fps = 30 }:
    { IO?: typeof IntersectionObserver; doc?: Document; win?: RafHost; fps?: number } = {},
): () => void {
  // Ручной режим: сами решаем, когда и как часто рисовать кадр.
  const manual = typeof app.requestRender === 'function' && 'renderMode' in app;
  const prevMode = app.renderMode;
  if (manual) app.renderMode = 'manual';

  const minDelta = 1000 / fps;
  let onScreen = true;
  let rafId: number | null = null;
  let lastRender = -Infinity;

  const pump = (t: number) => {
    rafId = win.requestAnimationFrame(pump);
    if (t - lastRender >= minDelta) {
      lastRender = t;
      app.requestRender!();
    }
  };

  let running: boolean | null = null; // текущее состояние — guard от лишних переключений
  const sync = () => {
    const active = onScreen && doc.visibilityState !== 'hidden';
    if (active === running) return;
    running = active;
    if (active) {
      if (manual) {
        lastRender = -Infinity; // первый кадр после возобновления — сразу
        if (rafId === null) rafId = win.requestAnimationFrame(pump);
      } else {
        app.play?.();
      }
    } else if (manual) {
      if (rafId !== null) { win.cancelAnimationFrame(rafId); rafId = null; }
    } else {
      app.stop?.();
    }
  };

  const io = new IO((entries) => {
    onScreen = entries.some((e) => e.isIntersecting);
    sync();
  });
  io.observe(el);
  doc.addEventListener('visibilitychange', sync);
  sync(); // применить исходное состояние (например, вкладка уже в фоне)

  return () => {
    io.disconnect();
    doc.removeEventListener('visibilitychange', sync);
    if (rafId !== null) { win.cancelAnimationFrame(rafId); rafId = null; }
    if (manual) app.renderMode = prevMode; // вернуть исходный режим на случай переиспользования сцены
  };
}

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
  onLoad?: (app: any) => void;
  /** Статичные снимки сцены под тему — мгновенная отрисовка + фолбэк без 3D. */
  posterLight: string;
  posterDark: string;
}

export function InteractiveRobotSpline({ scene, className, onLoad, posterLight, posterDark }: InteractiveRobotSplineProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [mount3D, setMount3D] = useState(false); // разрешили создать узел Spline
  const [ready, setReady] = useState(false); // сцена догрузилась → проявляем canvas
  const [app, setApp] = useState<any>(null); // экземпляр Spline Application (для pause/resume)

  useEffect(() => {
    if (!shouldLoad3D()) return; // capability-gated: остаётся только poster
    const el = wrapRef.current;
    if (!el) return;
    let idleId: number | undefined;
    const ric: (cb: () => void) => number =
      (window as any).requestIdleCallback || ((cb: () => void) => window.setTimeout(cb, 200));
    const cancelRic: (id: number) => void =
      (window as any).cancelIdleCallback || ((id: number) => clearTimeout(id));
    // Стартуем только когда hero реально виден (выше сгиба — сработает сразу),
    // и откладываем монтаж до простоя, чтобы не мешать первой отрисовке/LCP.
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          idleId = ric(() => setMount3D(true));
        }
      },
      { rootMargin: '200px' },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (idleId !== undefined) cancelRic(idleId);
    };
  }, []);

  const handleLoad = (loadedApp: any) => {
    setApp(loadedApp);
    setReady(true);
    onLoad?.(loadedApp);
  };

  // Снижаем нагрузку робота на GPU: кэп кадров (30 fps) пока он на экране, и полная
  // остановка рендера, когда он ушёл за экран / вкладка скрыта — иначе на слабых GPU
  // сцена молотит на 100% даже в простое и тормозит скролл. Всё через штатный рантайм,
  // без перезагрузки сцены. Ключ по экземпляру `app`, поэтому при его пересоздании
  // (напр. StrictMode-двойной монтаж в dev) управляем живой сценой. Разрешение НЕ трогаем
  // (кэп pixelRatio конфликтовал с внутренним ресайзом Spline). См. createRenderActivityController.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !app || typeof app.stop !== 'function') return;
    return createRenderActivityController(el, app, { fps: 30 });
  }, [app]);

  return (
    <div ref={wrapRef} className={className}>
      {/* Poster — мгновенная отрисовка и постоянный визуал на устройствах без 3D.
          Две картинки под тему переключаются CSS'ом (без JS, без мигания).
          Как только живая сцена готова (`ready`) — гасим poster: у canvas прозрачный фон,
          и оставшийся снизу poster просвечивал бы рядом с роботом (двоение головы, особенно
          на мобильном, где object-cover кадрирует иначе, чем камера сцены). На устройствах
          без 3D `ready` не наступает — poster остаётся навсегда. */}
      <img
        src={posterLight}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        className={`absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none transition-opacity duration-500 dark:hidden ${ready ? 'opacity-0' : 'opacity-100'}`}
      />
      <img
        src={posterDark}
        alt=""
        aria-hidden="true"
        decoding="async"
        className={`absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none transition-opacity duration-500 hidden dark:block ${ready ? 'opacity-0' : 'opacity-100'}`}
      />
      {/* Интерактивная сцена проявляется поверх poster'а, когда готова */}
      {mount3D && (
        <Suspense fallback={null}>
          <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}>
            <Spline scene={scene} onLoad={handleLoad} className="!w-full !h-full" />
          </div>
        </Suspense>
      )}
    </div>
  );
}

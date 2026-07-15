import React, { useEffect, useLayoutEffect, useRef, useState, lazy, Suspense } from "react"
import { NavbarV2 } from "@/components/NavbarV2"
import { useVersion, type HeroStyle } from "@/context/VersionContext"
import { useTheme } from "@/context/ThemeContext"
import { LogoCloud } from "@/components/ui/logo-cloud"
import { clients } from "@/data/clients"

const UnicornScene = lazy(() => import("unicornstudio-react"))
import { TrustStrip } from "@/components/TrustStrip"
import { CasesSection } from "@/components/CasesSection"
import { V2Card } from "@/components/ui/V2Card"
import { Testimonials } from "@/components/Testimonials"
import { MainCta } from "@/components/MainCta"
import { directions, hub } from "@/data/directions"
import { Flash, Buildings, Hierarchy, ChartFail, Strategy, People, CpuCharge, Diagram, Code, Cpu, TickCircle, ArrowUp, Learning, SearchStatus, MagicPen, StatusUp } from "@/components/ui/icons"
import { InteractiveRobotSpline, whobeeThemedOnLoad } from "@/components/ui/interactive-3d-robot"
import Beams from "@/components/ui/Beams"
import PixelBlast from "@/components/ui/PixelBlast"
import GlowHorizon from "@/components/ui/glow-horizon"
import { AnimatedTitleFM } from "@/components/ui/glow-horizon-utils/animated-title-fm"

function useScrollVisible(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, visible }
}


/* ── Data ── */
/* Simple app-icon style icons for challenge cards */
function ChallengeAppIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="challenge-icon w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 group-hover:bg-brand/10 group-hover:border-brand/20 group-hover:shadow-sm group-hover:shadow-brand/20">
      {children}
    </div>
  )
}

const challengeIcons = [Flash, Buildings, Hierarchy, ChartFail]

// Bulk icons per direction (order matches `directions`): руководители · команда · агенты · процессы
const directionIcons = [Strategy, People, CpuCharge, Diagram]

const challenges = [
  {
    title: "Нейросети уже в работе, но по‑разному",
    desc: "Каждый пробует свои инструменты и подходы. Часть команды сопротивляется изменениям. Польза остаётся точечной и неуправляемой.",
  },
  {
    title: "Результаты есть, общих правил нет",
    desc: "Где‑то ИИ ускоряет работу, где‑то создаёт риски по качеству и данным. Без общих принципов трудно понять, что масштабировать.",
  },
  {
    title: "Инициативы сотрудников не складываются в систему",
    desc: "Удачные практики остаются личными, а не корпоративными. Руководству сложно связать их с целями и показателями компании.",
  },
  {
    title: "Обучение запускает настоящую ИИ‑трансформацию",
    desc: "Команда получает общий язык, базовые навыки и понятные рамки работы с ИИ. Это создаёт основу, на которой можно безопасно автоматизировать процессы и создавать ИИ-агентов без сопротивления и ненужных рисков.",
  },
]

/** Визуал hero. Публичный вариант — фото-слайд-шоу обучений. Робот (Spline) НЕ удалён из
 *  проекта — чтобы вернуть его, поменяй значение на "robot" (одна строка). Реализация робота
 *  живёт в `HeroSplit` (ветка variant==="robot") + `InteractiveRobotSpline`. Дев-тумблер
 *  переключения (HeroVariantToggle) оставлен в коде, но НЕ рендерится — скрыт везде. */
const HERO_VARIANT_DEFAULT: HeroVisual = "slideshow"

export function HomeV2() {
  // Визуал hero зафиксирован на HERO_VARIANT_DEFAULT (slideshow). Тумблер робот↔слайд-шоу убран
  // из интерфейса; вернуть робота = поменять константу выше на "robot".
  const heroVariant = HERO_VARIANT_DEFAULT

  return (
    <>
      {/* ── HERO ──
          Визуал правой половины переключается пропом `variant`: "robot" (Spline-робот) или
          "slideshow" (фото-слайд-шоу обучений, Ken Burns). Публичный дефолт — slideshow
          (HERO_VARIANT_DEFAULT, 14.07.2026); робот сохранён, дев-тумблер снизу слева только в dev.
          Лого-маркиза зафиксирована на раскладке «полоса» (07.07.2026). */}
      <HeroSplit variant={heroVariant} />

      {/* ── ВЫЗОВЫ ── */}
      <ChallengesSection />

      {/* ── КЕЙСЫ ОБУЧЕНИЯ ──
          Перемещены сразу после блока проблемы («Готовы ли вы к переходу?») —
          сначала доказываем результатами, потом раскладываем маршрут и экспертизу. */}
      <CasesSection />

      {/* ── МАРШРУТ ИЗ 4 НАПРАВЛЕНИЙ ── */}
      <LevelsSection />

      {/* ── ОБУЧЕНИЕ КАК КАТАЛИЗАТОР (тёмная секция-последовательность) ── */}
      <CatalystSection />

      {/* ── TRUST / ЭКСПЕРТ ── */}
      <TrustStrip />

      {/* ── ОТЗЫВЫ ── */}
      <Testimonials />

      {/* ── КАК НАЧАТЬ ── */}
      <HowToStart />

      {/* ── ФИНАЛЬНЫЙ CTA ── */}
      <MainCta />

      {/* Дев-тумблер визуала hero (робот ↔ слайд-шоу) СКРЫТ — визуал зафиксирован в HomeV2.
          Компонент HeroVariantToggle оставлен ниже в коде на случай возврата к сравнению. */}
    </>
  )
}

/* ── Hero variants ──
   Дормантные (не рендерятся в проде, экспортированы, чтобы TS не считал их мёртвым кодом).
   Активный вариант — `HeroSplit` (Spline-робот), см. комментарий в HomeV2() выше. */

export function HeroVideo() {
  return (
    <section id="home" className="relative w-full h-[100svh] overflow-hidden bg-background flex flex-col pt-12 pb-24 sm:pt-24 sm:pb-40">
      {/* Overscroll fillers */}
      <div className="absolute -top-[100vh] -inset-x-[20vw] h-[100vh] bg-background z-0" />
      <div className="absolute -bottom-[100vh] -inset-x-[20vw] h-[100vh] bg-background z-0" />
      
      <NavbarV2 variant="home" />
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-65">
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-[1] bg-black/15" />
      {/* Centered radial scrim — lifts the copy off the busy background while keeping edges bright */}
      <div className="absolute inset-0 z-[1] pointer-events-none [background:radial-gradient(58%_48%_at_50%_44%,rgba(0,0,0,0.5),transparent_72%)]" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 pt-20 pb-20 sm:pb-24 md:pb-28">
        <span className="text-[11px] sm:text-sm font-bold uppercase tracking-[0.2em] text-white/60 mb-4 sm:mb-6 animate-fade-rise">
          {hub.hero.eyebrow}
        </span>
        <h1 className="text-3xl sm:text-5xl md:text-[52px] lg:text-[60px] leading-[1.1] tracking-tight max-w-[1100px] text-balance font-semibold text-white animate-fade-rise">
          {hub.hero.h1.replace(/ (\S+)$/, " $1")}
        </h1>
        <p className="text-gray-200 text-base sm:text-lg md:text-xl max-w-3xl mt-4 sm:mt-6 md:mt-10 leading-relaxed animate-fade-rise-delay">
          {hub.hero.lead}
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 md:mt-12 animate-fade-rise-delay-2 w-full max-w-xs sm:max-w-none mx-auto text-left">
          <a href="#directions" className="bg-white text-black rounded-full text-center px-6 py-3.5 sm:px-10 sm:py-4 text-sm sm:text-base font-semibold hover:bg-gray-100 transition-all duration-300 shadow-[0_4px_24px_rgba(255,255,255,0.2)] hover:shadow-[0_4px_32px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 inline-block btn-optical-hero">
            Посмотреть направления
          </a>
          <a href="#contact" className="text-white border border-white/25 bg-white/5 backdrop-blur-sm rounded-full text-center px-6 py-3.5 sm:px-10 sm:py-4 text-sm sm:text-base font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-300 hover:-translate-y-0.5 inline-block btn-optical-hero">
            Обсудить задачу
          </a>
        </div>

      </div>

      {/* Hero Logos Section */}
      <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 left-0 right-0 w-full z-20 animate-fade-rise-delay-2 pointer-events-none pb-[env(safe-area-inset-bottom)]">
        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="text-center mb-2 sm:mb-4">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">{hub.hero.trustLabel}</span>
          </div>
          <div className="relative [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] pointer-events-auto">
            <div className="opacity-100">
              <LogoCloud logos={clients} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function HeroWebGL() {
  const gradientClass = ""
  const subShadow = "0 1px 12px rgba(0,0,0,0.4)"

  return (
    <section id="home" className="relative w-full h-[100svh] overflow-hidden bg-background flex flex-col pt-12 pb-24 sm:pt-24 sm:pb-40">
      {/* Overscroll fillers */}
      <div className="absolute -top-[100vh] -inset-x-[20vw] h-[100vh] bg-background z-0" />
      <div className="absolute -bottom-[100vh] -inset-x-[20vw] h-[100vh] bg-background z-0" />
      
      <NavbarV2 variant="home" />

      {/* Unicorn Studio WebGL background */}
      <div className="absolute -inset-[2px] z-0">
        <Suspense fallback={<div className="w-full h-full bg-black dark:bg-[hsl(220,20%,4%)]" />}>
          <UnicornScene
            projectId="jJjGTV0vcy9VIfmO9Wr8"
            sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.5/dist/unicornStudio.umd.js"
            width="100%"
            height="100%"
          />
        </Suspense>
      </div>

      {/* Contrast layers - very subtle dark overlay for text contrast */}
      <div className="absolute inset-0 z-[2] bg-black/20" />
      {/* Centered radial scrim — lifts the copy off the busy WebGL while keeping edges bright */}
      <div className="absolute inset-0 z-[2] pointer-events-none [background:radial-gradient(58%_48%_at_50%_44%,rgba(0,0,0,0.5),transparent_72%)]" />
      {gradientClass && <div className={`absolute inset-0 z-[2] transition-all duration-500 ${gradientClass}`} />}

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 pt-20 pb-20 sm:pb-24 md:pb-28">
        <span className="text-[11px] sm:text-sm font-bold uppercase tracking-[0.2em] text-white/60 mb-4 sm:mb-6 animate-fade-rise">
          {hub.hero.eyebrow}
        </span>
        <h1
          className="text-3xl sm:text-5xl md:text-[52px] lg:text-[60px] leading-[1.1] tracking-tight max-w-[1100px] text-balance font-semibold text-white animate-fade-rise"
        >
          {hub.hero.h1.replace(/ (\S+)$/, " $1")}
        </h1>
        <p
          className="text-gray-200 text-base sm:text-lg md:text-xl max-w-3xl mt-4 sm:mt-6 md:mt-10 leading-relaxed animate-fade-rise-delay"
          style={subShadow ? { textShadow: subShadow } : undefined}
        >
          {hub.hero.lead}
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-12 animate-fade-rise-delay-2 w-full max-w-xs sm:max-w-none mx-auto text-left">
          <a href="#directions" className="bg-white text-black rounded-full text-center px-6 py-3.5 sm:px-10 sm:py-4 text-sm sm:text-base font-semibold hover:bg-gray-100 transition-all duration-300 shadow-[0_4px_24px_rgba(255,255,255,0.2)] hover:shadow-[0_4px_32px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 inline-block btn-optical-hero">
            Посмотреть направления
          </a>
          <a href="#contact" className="text-white border border-white/25 bg-white/5 backdrop-blur-sm rounded-full text-center px-6 py-3.5 sm:px-10 sm:py-4 text-sm sm:text-base font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-300 hover:-translate-y-0.5 inline-block btn-optical-hero">
            Обсудить задачу
          </a>
        </div>

      </div>

      {/* Hero Logos Section */}
      <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 left-0 right-0 w-full z-20 animate-fade-rise-delay-2 pointer-events-none pb-[env(safe-area-inset-bottom)]">
        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="text-center mb-4">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">{hub.hero.trustLabel}</span>
          </div>
          <div className="relative [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] pointer-events-auto">
            <div className="opacity-100">
              <LogoCloud logos={clients} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function HeroGlow() {
  const subShadow = "0 1px 12px rgba(0,0,0,0.45)"
  const titleWords = hub.hero.h1.split(" ")
  const titleLines = titleWords.length > 1 ? [titleWords[0], titleWords.slice(1).join(" ")] : titleWords
  return (
    <section id="home" className="relative w-full h-[100svh] overflow-hidden bg-background flex flex-col pt-12 pb-24 sm:pt-24 sm:pb-40">
      {/* Overscroll fillers */}
      <div className="absolute -top-[100vh] -inset-x-[20vw] h-[100vh] bg-background z-0" />
      <div className="absolute -bottom-[100vh] -inset-x-[20vw] h-[100vh] bg-background z-0" />

      <NavbarV2 variant="home" />

      {/* Warm glow-horizon background */}
      <div className="absolute inset-0 z-0 bg-[#050507]" />
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Wider than the viewport on mobile so the arc reads as a gentle glow, not a squished ellipse */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[235%] sm:w-full">
          <GlowHorizon variant="top" />
        </div>
      </div>
      {/* Warm bloom from the top-centre */}
      <div className="absolute inset-0 z-[1] pointer-events-none [background:radial-gradient(70%_55%_at_50%_-8%,rgba(255,140,50,0.22),transparent_68%)]" />
      {/* Centered scrim for text contrast */}
      <div className="absolute inset-0 z-[1] pointer-events-none [background:radial-gradient(56%_46%_at_50%_50%,rgba(0,0,0,0.5),transparent_72%)]" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 pt-20 pb-20 sm:pb-24 md:pb-28">
        <span className="text-[11px] sm:text-sm font-bold uppercase tracking-[0.2em] text-white/60 mb-4 sm:mb-6 animate-fade-rise">
          {hub.hero.eyebrow}
        </span>
        <h1 className="text-3xl sm:text-5xl md:text-[54px] lg:text-[64px] leading-[1.08] tracking-tight max-w-[1100px] font-semibold text-white">
          <AnimatedTitleFM lines={titleLines} />
        </h1>
        <p
          className="text-gray-200 text-base sm:text-lg md:text-xl max-w-3xl mt-4 sm:mt-6 md:mt-10 leading-relaxed animate-fade-rise-delay"
          style={{ textShadow: subShadow }}
        >
          {hub.hero.lead}
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 md:mt-12 animate-fade-rise-delay-2 w-full max-w-xs sm:max-w-none mx-auto text-left">
          <a href="#directions" className="bg-white text-black rounded-full text-center px-6 py-3.5 sm:px-10 sm:py-4 text-sm sm:text-base font-semibold hover:bg-gray-100 transition-all duration-300 shadow-[0_4px_24px_rgba(255,255,255,0.2)] hover:shadow-[0_4px_32px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 inline-block btn-optical-hero">
            Посмотреть направления
          </a>
          <a href="#contact" className="text-white border border-white/25 bg-white/5 backdrop-blur-sm rounded-full text-center px-6 py-3.5 sm:px-10 sm:py-4 text-sm sm:text-base font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-300 hover:-translate-y-0.5 inline-block btn-optical-hero">
            Обсудить задачу
          </a>
        </div>
      </div>

      {/* Hero Logos Section */}
      <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 left-0 right-0 w-full z-20 animate-fade-rise-delay-2 pointer-events-none pb-[env(safe-area-inset-bottom)]">
        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="text-center mb-2 sm:mb-4">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">{hub.hero.trustLabel}</span>
          </div>
          <div className="relative [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] pointer-events-auto">
            <div className="opacity-100">
              <LogoCloud logos={clients} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* Split hero — left: copy + integrated feature points, right: interactive 3D robot (Spline) */
export type HeroVisual = "robot" | "slideshow"

/* Слайды фото-героя — реальные фото обучений/сессий. Все уже опубликованы в блоке кейсов
   (/cases) и на живом сайте, поэтому по NDA чисто. cap — формат/клиент, sub — доказательство. */
// HQ-кадры (WebP 1800px из камерных оригиналов 4000–5700px, см. public/hero/slides).
// Telegram-экспорты (~1200px) и сжатые фото сюда НЕ идут — только резкие.
const heroSlides = [
  { src: "/hero/slides/hero-liga.webp",        cap: "Обучение команд в действии", sub: "от идеи до рабочего ИИ-агента", alt: "Спикер и аудитория практикума у экрана",  pos: "50% 38%", origin: "50% 36%" },
  { src: "/hero/slides/hero-iichnica.webp",    cap: "Дискуссии с практиками ИИ",  sub: "живые разговоры на сцене",     alt: "Спикер с микрофоном на сцене мероприятия WMT AI", pos: "50% 35%", origin: "50% 35%" },
  { src: "/hero/slides/hero-mgu.webp",         cap: "Интенсив «Личный ИИ»",       sub: "2 дня, 16 часов практики",     alt: "Выступление на интенсиве в МГУ",           pos: "50% 40%", origin: "50% 40%" },
  { src: "/hero/slides/hero-cba.webp",         cap: "Управляющие команды",        sub: "стратсессии по ИИ для C-level", alt: "Групповое фото команды после стратсессии", pos: "50% 48%", origin: "50% 46%" },
  { src: "/hero/slides/hero-gov-armenia.webp", cap: "Правительство Армении",      sub: "стратсессия по ИИ",            alt: "Команда правительства Армении",            pos: "50% 46%", origin: "50% 44%" },
]

/* Фото-слайд-шоу для правой половины hero. Медленный Ken Burns (зум) + кроссфейд; крутятся
   ТОЛЬКО картинки, подпись-пруф стабильна и читаема через скрим. Пауза на ховере, авто-смена,
   уважение к prefers-reduced-motion (без зума). Drop-in замена робота в правом слоте. */
function HeroPhotoStage() {
  const [i, setI] = useState(0)
  const paused = useRef(false)
  const reduce = useRef(typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  useEffect(() => {
    const id = setInterval(() => { if (!paused.current) setI((v) => (v + 1) % heroSlides.length) }, 3600)
    return () => clearInterval(id)
  }, [])
  return (
    <div
      /* Фото заполняет карточку-«плашку» целиком (скругление, клиренс навбара сверху и логополосы
         снизу задаёт родитель-контейнер в HeroSplit); здесь — просто fill + клип под её углы. */
      className="absolute inset-0 z-10 overflow-hidden rounded-[inherit]"
      onMouseEnter={() => { paused.current = true }}
      onMouseLeave={() => { paused.current = false }}
    >
      {heroSlides.map((sl, idx) => (
        <div key={sl.src} className={`absolute inset-0 transition-opacity duration-[1900ms] ease-in-out ${idx === i ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
          <img
            src={sl.src}
            alt={sl.alt}
            loading="eager"
            decoding="async"
            draggable={false}
            className={`w-full h-full object-cover select-none ${!reduce.current ? "animate-hero-kenburns" : ""}`}
            style={{ transformOrigin: sl.origin, objectPosition: sl.pos }}
          />
          {/* Скрим под подпись — НИЗКИЙ (не закрывает саму сцену) + лёгкая верхняя виньетка */}
          <div className="absolute inset-0 pointer-events-none [background:linear-gradient(to_top,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0.2)_11%,transparent_30%)]" />
          <div className="absolute inset-0 pointer-events-none [background:radial-gradient(120%_120%_at_50%_0%,transparent_62%,rgba(0,0,0,0.2)_100%)]" />
          {/* Подпись-пруф принадлежит слайду → кроссфейдится синхронно с фото (нет рассинхрона) */}
          <div className="absolute left-5 sm:left-6 bottom-11 sm:bottom-12 max-w-[85%]">
            <div className="text-white font-semibold text-base sm:text-lg leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">{sl.cap}</div>
            <div className="text-white/70 text-xs sm:text-[13px] mt-0.5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">{sl.sub}</div>
          </div>
        </div>
      ))}

      {/* Прогресс-точки — глобальные (стабильны, привязаны к активному i), над лого-полосой */}
      <div className="absolute left-5 sm:left-6 bottom-5 z-30 flex items-center gap-1.5">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Слайд ${idx + 1}`}
            onClick={() => setI(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${idx === i ? "w-6 bg-brand" : "w-1.5 bg-white/45 hover:bg-white/70"}`}
          />
        ))}
      </div>
    </div>
  )
}

function HeroSplit({ variant = "robot" }: { variant?: HeroVisual }) {
  // Правый слот: робот (Spline) или фото-слайд-шоу — переключается пропом variant.
  const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode"
  const [h1First, ...h1Rest] = hub.hero.h1.split(" ")
  const points = [
    { Icon: Strategy, label: hub.hero.points[0] },
    { Icon: Code, label: hub.hero.points[1] },
    { Icon: Diagram, label: hub.hero.points[2] },
  ]

  return (
    <section id="home" className="relative w-full overflow-hidden bg-background flex flex-col lg:min-h-[100svh]">
      {/* Overscroll-up filler */}
      <div className="absolute -top-[100vh] -inset-x-[20vw] h-[100vh] bg-background z-0" />

      {/* Split hero has a light content half — the transparent (dark-hero) navbar would be
          unreadable on it, so use the solid, theme-aware bar from the top. */}
      <NavbarV2 variant="home" solid />

      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-2 lg:min-h-0 lg:max-w-7xl lg:mx-auto lg:w-full">
        {/* ── LEFT: content ── */}
        <div className="relative flex flex-col justify-center px-6 sm:px-10 lg:px-8 pt-28 pb-14 lg:pt-24 lg:pb-24 order-2 lg:order-1">
          <div className="w-full max-w-xl lg:ml-auto">
            {/* Эйброу "Корпоративное обучение по ИИ" убран по просьбе заказчика (02.07.2026) —
                H1 сразу читается как первая строка. `hub.hero.eyebrow` не удалён из данных:
                его всё ещё рендерят дормантные hero-варианты (HeroVideo/WebGL/Glow/HeroSplitFrame). */}
            <h1 className="text-[34px] sm:text-5xl lg:text-[52px] xl:text-[60px] leading-[1.06] tracking-tight font-semibold text-gray-900 dark:text-white animate-fade-rise">
              <em className="not-italic text-brand font-bold">{h1First}</em> {h1Rest.join(" ")}
            </h1>

            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg lg:text-xl mt-5 sm:mt-6 leading-relaxed animate-fade-rise-delay">
              {hub.hero.lead}
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 mt-8 animate-fade-rise-delay-2 w-full max-w-sm sm:max-w-none">
              <a href="#directions" className="bg-gray-900 dark:bg-white text-white dark:text-black rounded-full text-center whitespace-nowrap px-6 py-3.5 sm:px-9 sm:py-4 text-sm sm:text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_4px_24px_rgba(255,255,255,0.18)] dark:hover:shadow-[0_4px_32px_rgba(255,255,255,0.32)] inline-block btn-optical-hero">
                Посмотреть направления
              </a>
              <a href="#contact" className="text-gray-900 dark:text-white border border-gray-300 dark:border-white/25 bg-white/60 dark:bg-white/5 backdrop-blur-sm rounded-full text-center whitespace-nowrap px-6 py-3.5 sm:px-9 sm:py-4 text-sm sm:text-base font-semibold hover:border-gray-400 dark:hover:border-white/40 hover:bg-white dark:hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5 inline-block btn-optical-hero">
                Обсудить задачу
              </a>
            </div>

            {/* Feature points — former hero pills, now living cleanly inside the hero */}
            <ul className="mt-10 sm:mt-12 flex flex-col gap-4 pt-7 border-t border-gray-200 dark:border-white/10 animate-fade-rise-delay-2">
              {points.map(({ Icon, label }) => (
                <li key={label} className="flex items-center gap-3">
                  <span
                    className="w-10 h-10 rounded-lg border flex items-center justify-center text-brand shrink-0"
                    style={{ backgroundColor: "rgba(255,83,49,0.10)", borderColor: "rgba(255,83,49,0.22)" }}
                  >
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="text-[15px] sm:text-base lg:text-lg font-medium text-gray-700 dark:text-gray-300 leading-snug">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── RIGHT: divider + interactive 3D robot ──
            The robot keeps the Spline scene's REAL lighting + shadows (no invert). Light theme
            lifts the dark scene into a warm studio range and matches the warm sandy backdrop to the
            lifted floor, so the platform melts seamlessly into the background (low-contrast = premium,
            the light mirror of the dark stage).
            Mobile/tablet clearance (02.07.2026): NavbarV2 is `fixed` (overlays, doesn't push flow),
            so on short mobile containers the robot's head sat right under the ~64px bar and got
            visually cropped by it. Fix: outer panel is taller by that clearance; the robot itself
            renders in an INNER wrapper pinned to the bottom at the ORIGINAL height (46svh/54svh) —
            same zoom/size as before, just shifted down into the added headroom. Desktop (`lg:`)
            unaffected — inner wrapper reverts to filling the panel exactly as it always did. */}
        <div className={`relative min-h-[calc(46svh+4.5rem)] sm:min-h-[calc(54svh+4.5rem)] lg:min-h-0 lg:h-full order-1 lg:order-2 ${variant === "slideshow" ? "bg-background" : "bg-[#e3d3c2] dark:bg-[hsl(222,28%,4%)]"}`}>
          {variant === "slideshow" ? (
            /* Фото-«плашка»: НЕ full-bleed, а скруглённая карточка, мягкая тень + ring — «парит»
               на фоне секции (приём с эталонного hero «ИИ-трансформация»).
               ВЫСОТА ≈ левому блоку контента: на десктопе карточка фикс-высоты (~540px) и
               ЦЕНТРИРУЕТСЯ вертикально, зеркаля отступы левой колонки (`lg:pt-0 lg:pb-24`),
               поэтому центры и верх/низ совпадают с контентом. max-h страхует от захода под
               навбар на низких окнах. Мобайл/sm — карточка заполняет свою область (клиренс
               навбара сверху, поля по краям). */
            <div className="absolute inset-0 px-4 pt-[80px] pb-4 sm:px-6 sm:pt-[88px] sm:pb-6 lg:flex lg:items-center lg:justify-center lg:pl-6 lg:pr-8 lg:pt-24 lg:pb-24">
              <div className="relative w-full h-full lg:h-[560px] rounded-[24px] overflow-hidden shadow-[0_16px_40px_-20px_rgba(0,0,0,0.22)] ring-1 ring-black/[0.06] dark:ring-white/10">
                <HeroPhotoStage />
              </div>
            </div>
          ) : (
          <>
          {/* Backdrop — warm sandy studio stage (light) whose gradient mirrors the sunset-lit floor so
              the platform blends in; deep warm base (dark). Spans the FULL (taller) panel, so the
              added mobile headroom above the robot still reads as the same stage, not empty space. */}
          <div className="absolute inset-0 z-0 [background:radial-gradient(78%_74%_at_57%_42%,#f9f3ea_0%,#f1e8da_55%,#e7dac8_100%)] dark:[background:linear-gradient(135deg,hsl(222,28%,6%),hsl(222,30%,3%))]" />
          {/* Warm brand glow — dark theme only (light gets its warmth from the lifted scene) */}
          <div className="absolute inset-0 z-0 pointer-events-none dark:[background:radial-gradient(60%_55%_at_58%_45%,rgba(255,83,49,0.20),transparent_72%)]" />

          {/* Robot layer — pinned to the panel's bottom at the original size on mobile/sm (see note
              above); fills the whole panel again from `lg:` up, exactly like before this fix.
              На десктопе робот приподнят (`lg:!bottom-[6.5rem]`), чтобы освободить снизу место
              под сплошную полосу логотипов. */}
          <div className="absolute inset-x-0 bottom-0 h-[46svh] sm:h-[54svh] lg:inset-0 lg:h-auto lg:!bottom-[6.5rem]">
            {/* Per-theme recolour of the LIVE scene — через runtime (whobeeThemedOnLoad),
                а не CSS-фильтры: настоящие материалы, мягкая PCFSoft-тень, точные цвета.
                · light — «закатная» студия: серебристый робот, оранжевая мордочка, кремовый пол
                · dark  — тёмная сцена с тёплым брендовым светом вместо фиолетового
                Poster (WebP-снимок сцены под тему) рисуется мгновенно и остаётся фолбэком
                на слабых устройствах — см. InteractiveRobotSpline. */}
            <InteractiveRobotSpline
              scene={ROBOT_SCENE_URL}
              onLoad={whobeeThemedOnLoad}
              posterLight="/hero/robot-light.webp"
              posterDark="/hero/robot-dark.webp"
              className="absolute inset-0 z-10 !w-full !h-full"
            />

            {/* Mask the baked-in Spline watermark (bottom-right of the canvas) — soft radial fade in the stage colour */}
            <div className="absolute bottom-0 right-0 w-[280px] h-[120px] z-20 pointer-events-none [background:radial-gradient(135%_135%_at_100%_100%,#e9dfce_52%,rgba(233,223,206,0)_80%)] dark:[background:radial-gradient(135%_135%_at_100%_100%,hsl(222,30%,3%)_52%,rgba(10,12,16,0)_80%)]" />
          </div>

          {/* Мягкое затухание низа «пола» сцены в фон, что лежит ниже (=белый/чёрный, как и
              ChallengesSection). Без него тёплый пол упирается встык — «пол» будто обрезан по
              линии. Поверх canvas (z-20), поэтому растворяет и сам пол. Нужно на МОБИЛЬНОЙ
              раскладке (панель робота над контентом); на десктопе робот приподнят и за
              растворение в полосу отвечает градиент над полосой (см. ниже), а это затухание
              оказывается за полосой и безвредно. */}
          <div className="absolute inset-x-0 bottom-0 h-20 lg:h-28 z-20 pointer-events-none [background:linear-gradient(to_bottom,transparent,#ffffff)] dark:[background:linear-gradient(to_bottom,transparent,#000000)]" />
          </>
          )}
        </div>
      </div>

      {/* Лого-маркиза — сплошная полоса во всю ширину у самого низа hero (под обеими колонками),
          собственный фон = фон страницы. Робот приподнят над ней (см. слой робота выше), поэтому
          наложения на сцену нет. На <lg скрыта: в стековой раскладке низ занят контентом. */}
      <div className="hidden lg:block absolute bottom-0 inset-x-0 z-30 bg-background animate-fade-in pb-[env(safe-area-inset-bottom)]">
        {/* Растворение «пола»/фото в полосу — белый (в тёмной теме чёрный) градиент у ВЕРХА
            полосы, правая половина (там визуал). Для робота — высокий (h-28, растворяет «пол»).
            Для слайд-шоу — КОРОТКИЙ (h-10): тот же белый переход, но маленький радиус, чтобы
            мягко сгладить стык фото↔полоса и не перекрывать слайдер/подпись (они подняты выше). */}
        {/* Растворение визуала в логополосу нужно только роботу (его «пол» упирается в полосу).
            У фото-«плашки» край карточки чистый и отделён отступом — дисольв выключен. */}
        {variant !== "slideshow" && (
          <div className="pointer-events-none absolute bottom-full right-0 w-1/2 h-28 bg-gradient-to-t from-white dark:from-black to-transparent" />
        )}
        <div className="w-full max-w-6xl mx-auto px-6 py-3">
          <div className="text-center mb-1">
            <span className="text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-white/60">{hub.hero.trustLabel}</span>
          </div>
          <div className="relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <LogoCloud logos={clients} className="py-1" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* Shared frame for the split heroes — the left content column is identical across split variants;
   only the right-side visual changes. Pass it as `visual` (absolutely positioned inside the dark
   right column). Used by HeroSplitBeams. (HeroSplit/Spline stays separate.) */
function HeroSplitFrame({ visual, rightBgClass = "bg-[#05070d]" }: { visual: React.ReactNode; rightBgClass?: string }) {
  const [h1First, ...h1Rest] = hub.hero.h1.split(" ")
  const points = [
    { Icon: Strategy, label: hub.hero.points[0] },
    { Icon: Code, label: hub.hero.points[1] },
    { Icon: Diagram, label: hub.hero.points[2] },
  ]

  return (
    <section id="home" className="relative w-full overflow-hidden bg-background flex flex-col lg:h-[100svh]">
      {/* Overscroll-up filler */}
      <div className="absolute -top-[100vh] -inset-x-[20vw] h-[100vh] bg-background z-0" />

      {/* Split hero has a light content half — use the solid, theme-aware bar from the top. */}
      <NavbarV2 variant="home" solid />

      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-2 lg:min-h-0">
        {/* ── LEFT: content ── */}
        <div className="relative flex flex-col justify-center px-6 sm:px-10 lg:px-14 xl:px-20 pt-28 pb-14 lg:py-0 order-2 lg:order-1">
          <div className="w-full max-w-xl lg:ml-auto">
            <span className="inline-block text-[11px] sm:text-sm font-bold uppercase tracking-[0.2em] text-brand/90 mb-4 sm:mb-5 animate-fade-rise">
              {hub.hero.eyebrow}
            </span>

            <h1 className="text-[34px] sm:text-5xl lg:text-[52px] xl:text-[60px] leading-[1.06] tracking-tight font-semibold text-gray-900 dark:text-white animate-fade-rise">
              <em className="not-italic text-brand font-bold">{h1First}</em> {h1Rest.join(" ")}
            </h1>

            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg lg:text-xl mt-5 sm:mt-6 leading-relaxed animate-fade-rise-delay">
              {hub.hero.lead}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-8 animate-fade-rise-delay-2 w-full max-w-sm sm:max-w-none">
              <a href="#directions" className="bg-gray-900 dark:bg-white text-white dark:text-black rounded-full text-center px-6 py-3.5 sm:px-9 sm:py-4 text-sm sm:text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_4px_24px_rgba(255,255,255,0.18)] dark:hover:shadow-[0_4px_32px_rgba(255,255,255,0.32)] inline-block btn-optical-hero">
                Посмотреть направления
              </a>
              <a href="#contact" className="text-gray-900 dark:text-white border border-gray-300 dark:border-white/25 bg-white/60 dark:bg-white/5 backdrop-blur-sm rounded-full text-center px-6 py-3.5 sm:px-9 sm:py-4 text-sm sm:text-base font-semibold hover:border-gray-400 dark:hover:border-white/40 hover:bg-white dark:hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5 inline-block btn-optical-hero">
                Обсудить задачу
              </a>
            </div>

            {/* Feature points — former hero pills, living cleanly inside the hero */}
            <ul className="mt-10 sm:mt-12 flex flex-col gap-4 pt-7 border-t border-gray-200 dark:border-white/10 animate-fade-rise-delay-2">
              {points.map(({ Icon, label }) => (
                <li key={label} className="flex items-center gap-3">
                  <span
                    className="w-10 h-10 rounded-lg border flex items-center justify-center text-brand shrink-0"
                    style={{ backgroundColor: "rgba(255,83,49,0.10)", borderColor: "rgba(255,83,49,0.22)" }}
                  >
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="text-[15px] sm:text-base lg:text-lg font-medium text-gray-700 dark:text-gray-300 leading-snug">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── RIGHT: divider + per-variant visual (dark by default; some variants pass a light bg) ── */}
        <div className={`relative min-h-[46svh] sm:min-h-[54svh] lg:min-h-0 lg:h-full order-1 lg:order-2 ${rightBgClass}`}>
          {/* Vertical divider between the two halves (desktop) */}
          <div className="hidden lg:block absolute left-0 inset-y-0 w-px bg-gradient-to-b from-transparent via-black/10 dark:via-white/15 to-transparent z-20" />
          {/* Horizontal divider on mobile (stacked) */}
          <div className="lg:hidden absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/15 to-transparent z-20" />
          {visual}
        </div>
      </div>
    </section>
  )
}

/* Split hero — right visual is the animated <Beams /> field (React Bits, three/@react-three)
   instead of the Spline robot. Theme-aware: deep warm-dark stage in dark, warm cream stage in light
   (the near-black beams read as warm ribbons over the cream). */
export function HeroSplitBeams() {
  const { isDark } = useTheme()
  return (
    <HeroSplitFrame
      rightBgClass={isDark ? "bg-[#05070d]" : "bg-[#f1ece4]"}
      visual={
        <>
          {/* Animated light-beams (full-bleed) — scene background + warmth tuned per theme */}
          <div className="absolute inset-0 z-10">
            <Beams
              beamWidth={2.4}
              beamHeight={28}
              beamNumber={20}
              lightColor={isDark ? "#ff8a5c" : "#ff7a45"}
              background={isDark ? "#05070d" : "#f1ece4"}
              beamColor={isDark ? "#000000" : "#e8855a"}
              speed={1.8}
              noiseIntensity={isDark ? 1.6 : 1.1}
              scale={0.22}
              rotation={32}
            />
          </div>
          {/* Warm brand glow + soft depth vignette — lighter in the light theme so the cream stays clean */}
          <div className="absolute inset-0 z-20 pointer-events-none [background:radial-gradient(60%_55%_at_58%_45%,rgba(255,83,49,0.16),transparent_72%)] dark:[background:radial-gradient(60%_55%_at_58%_45%,rgba(255,83,49,0.16),transparent_72%)]" />
          <div className="absolute inset-0 z-20 pointer-events-none [background:radial-gradient(120%_120%_at_50%_0%,transparent_60%,rgba(0,0,0,0.12)_100%)] dark:[background:radial-gradient(120%_120%_at_50%_0%,transparent_55%,rgba(0,0,0,0.45)_100%)]" />
        </>
      }
    />
  )
}

/* Split hero — right visual is the looping hero video (same clip as the full-bleed `video` hero). */
export function HeroSplitVideo() {
  return (
    <HeroSplitFrame
      visual={
        <>
          {/* Looping background video (full-bleed) */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-10"
          >
            <source
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
              type="video/mp4"
            />
          </video>
          {/* Warm brand glow + soft vignette over the video for depth and a clean seam */}
          <div className="absolute inset-0 z-20 pointer-events-none [background:radial-gradient(60%_55%_at_58%_45%,rgba(255,83,49,0.14),transparent_72%)]" />
          <div className="absolute inset-0 z-20 pointer-events-none [background:radial-gradient(120%_120%_at_50%_0%,transparent_55%,rgba(0,0,0,0.4)_100%)]" />
        </>
      }
    />
  )
}

/* Split hero — right visual is the interactive <PixelBlast /> dithered field (React Bits,
   three/postprocessing). Theme-aware: brand-coral pixels over a deep stage (dark) or a warm cream
   stage (light); PixelBlast is transparent so the panel background shows through. */
export function HeroSplitPixel() {
  const { isDark } = useTheme()
  return (
    <HeroSplitFrame
      rightBgClass={isDark ? "bg-[#05070d]" : "bg-[#f1ece4]"}
      visual={
        <>
          {/* PixelBlast interactive dithered field (full-bleed) — transparent, so the cream/dark
              panel shows between the brand-coloured pixels. */}
          <div className="absolute inset-0 z-10">
            <PixelBlast
              variant="circle"
              pixelSize={12}
              color={isDark ? "#ff5331" : "#e8420f"}
              patternScale={3}
              patternDensity={1.2}
              pixelSizeJitter={0.5}
              enableRipples
              rippleSpeed={0.4}
              rippleThickness={0.12}
              rippleIntensityScale={1.5}
              speed={0.6}
              edgeFade={0.25}
              transparent
            />
          </div>
          {/* Soft depth vignette — lighter in the light theme so the cream stays clean */}
          <div className="absolute inset-0 z-20 pointer-events-none [background:radial-gradient(120%_120%_at_50%_0%,transparent_65%,rgba(0,0,0,0.10)_100%)] dark:[background:radial-gradient(120%_120%_at_50%_0%,transparent_60%,rgba(0,0,0,0.4)_100%)]" />
        </>
      }
    />
  )
}

/* Split hero — BRAND-NATIVE right visual, built entirely from the site's own decor DNA:
   the CardDecor fading grid + orange radial glow, a warm gradient stage, two drifting warm
   auroras (brand orange + amber), a slow focal pulse-halo and rising brand embers. Pure CSS/SVG
   (no WebGL, no 3D) — the light mirror of the format-page background language, theme-aware. */
export function HeroSplitBrand() {
  const { isDark } = useTheme()
  // Deterministic ember field (fixed positions → stable across renders, no runtime randomness).
  const embers = [
    { left: "18%", size: 5, delay: "0s",   dur: "9s" },
    { left: "30%", size: 3, delay: "2.4s", dur: "11s" },
    { left: "42%", size: 6, delay: "1.2s", dur: "8.5s" },
    { left: "51%", size: 3, delay: "3.6s", dur: "12s" },
    { left: "58%", size: 4, delay: "0.8s", dur: "10s" },
    { left: "66%", size: 5, delay: "4.2s", dur: "9.5s" },
    { left: "74%", size: 3, delay: "1.8s", dur: "13s" },
    { left: "83%", size: 4, delay: "3s",   dur: "8s" },
    { left: "24%", size: 3, delay: "5s",   dur: "11.5s" },
    { left: "70%", size: 6, delay: "6s",   dur: "10.5s" },
  ]
  const emberColor = isDark ? "rgba(255,120,70,0.9)" : "rgba(232,66,15,0.55)"
  return (
    <HeroSplitFrame
      rightBgClass={isDark ? "bg-[#05070d]" : "bg-[#ece1d4]"}
      visual={
        <div className="absolute inset-0 overflow-hidden">
          {/* Warm gradient stage */}
          <div className="absolute inset-0 z-0 [background:radial-gradient(80%_75%_at_57%_42%,#f6f1ea_0%,#efe3d6_55%,#e6d7c6_100%)] dark:[background:radial-gradient(120%_100%_at_60%_35%,hsl(222,28%,7%)_0%,hsl(222,30%,4%)_55%,hsl(224,34%,2%)_100%)]" />

          {/* Faint fading grid — CardDecor DNA, scaled for the panel */}
          <div
            className="absolute inset-0 z-0 pointer-events-none opacity-70 dark:opacity-50 [mask-image:radial-gradient(ellipse_72%_70%_at_55%_45%,#000_32%,transparent_86%)]"
            style={{
              backgroundImage: isDark
                ? "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)"
                : "linear-gradient(to right, rgba(120,90,70,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(120,90,70,0.14) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              backgroundPosition: "center center",
            }}
          />

          {/* Two drifting warm auroras — brand orange (upper) + amber (lower) */}
          <div className="hero-aurora-a absolute z-0 left-[38%] top-[22%] h-[46%] w-[62%] rounded-full blur-3xl opacity-80 [background:radial-gradient(circle,rgba(255,83,49,0.30),transparent_68%)] dark:[background:radial-gradient(circle,rgba(255,83,49,0.42),transparent_68%)]" />
          <div className="hero-aurora-b absolute z-0 left-[16%] bottom-[14%] h-[42%] w-[56%] rounded-full blur-3xl opacity-70 [background:radial-gradient(circle,rgba(255,170,80,0.24),transparent_70%)] dark:[background:radial-gradient(circle,rgba(255,150,70,0.30),transparent_70%)]" />

          {/* Focal pulse-halo around the warm core */}
          <div className="absolute inset-0 z-10 grid place-items-center pointer-events-none">
            <span
              className="hero-halo block rounded-full opacity-0"
              style={{
                width: "clamp(180px, 26vw, 320px)",
                height: "clamp(180px, 26vw, 320px)",
                border: `1px solid ${isDark ? "rgba(255,83,49,0.40)" : "rgba(255,83,49,0.30)"}`,
              }}
            />
          </div>

          {/* Warm core bloom */}
          <div className="absolute inset-0 z-10 pointer-events-none [background:radial-gradient(42%_38%_at_55%_44%,rgba(255,83,49,0.20),transparent_70%)] dark:[background:radial-gradient(46%_42%_at_55%_44%,rgba(255,83,49,0.28),transparent_72%)]" />

          {/* Rising brand embers */}
          <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
            {embers.map((e, i) => (
              <span
                key={i}
                className="hero-ember absolute bottom-[22%] rounded-full"
                style={{
                  left: e.left,
                  width: e.size,
                  height: e.size,
                  animationDelay: e.delay,
                  animationDuration: e.dur,
                  background: emberColor,
                  boxShadow: isDark ? "0 0 8px rgba(255,120,70,0.7)" : "0 0 6px rgba(232,66,15,0.4)",
                }}
              />
            ))}
          </div>

          {/* Depth vignette + top seam */}
          <div className="absolute inset-0 z-20 pointer-events-none [background:radial-gradient(120%_120%_at_50%_0%,transparent_62%,rgba(0,0,0,0.10)_100%)] dark:[background:radial-gradient(120%_120%_at_50%_0%,transparent_55%,rgba(0,0,0,0.45)_100%)]" />
        </div>
      }
    />
  )
}

/* Дев-тумблер визуала hero: робот ↔ фото-слайд-шоу. СЕЙЧАС НЕ РЕНДЕРИТСЯ (скрыт) — оставлен
   в коде на случай возврата к сравнению вариантов. Экспортирован, чтобы TS не ругался на unused. */
export function HeroVariantToggle({ value, onChange }: { value: HeroVisual; onChange: (v: HeroVisual) => void }) {
  const opts: { key: HeroVisual; label: string }[] = [
    { key: "robot", label: "Робот" },
    { key: "slideshow", label: "Слайд-шоу" },
  ]
  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col items-center gap-1.5">
      <div className="inline-flex bg-black/45 backdrop-blur-md rounded-full p-1 border border-white/15 shadow-lg shadow-black/30">
        {opts.map((o) => (
          <button
            key={o.key}
            onClick={() => onChange(o.key)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
              value === o.key ? "bg-white text-black shadow-sm" : "text-white/70 hover:text-white"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
      <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/40">визуал hero</span>
    </div>
  )
}

/* Compact compare-toggle to switch the hero background (temporary — not the final public UI) */
export function HeroBgToggle() {
  const { heroStyle, setHeroStyle } = useVersion()
  const opts: { key: HeroStyle; label: string }[] = [
    { key: "glow", label: "Glow" },
    { key: "webgl", label: "WebGL" },
    { key: "video", label: "Видео" },
    { key: "split", label: "Split" },
    { key: "splitbrand", label: "Бренд" },
    { key: "beams", label: "Beams" },
    { key: "splitvideo", label: "Split Vid" },
    { key: "splitpixel", label: "Pixel" },
  ]
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-center gap-1.5">
      <div className="inline-flex bg-black/45 backdrop-blur-md rounded-full p-1 border border-white/15 shadow-lg shadow-black/30">
        {opts.map((o) => (
          <button
            key={o.key}
            onClick={() => setHeroStyle(o.key)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
              heroStyle === o.key ? "bg-white text-black shadow-sm" : "text-white/70 hover:text-white"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
      <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/40">фон hero</span>
    </div>
  )
}

/* Slim feature band under the hero — carries the former hero pills */
export function HeroFeatureBand() {
  const items = [
    { Icon: Strategy, label: hub.hero.points[0] },
    { Icon: Code, label: hub.hero.points[1] },
    { Icon: Diagram, label: hub.hero.points[2] },
  ]
  return (
    <section className="relative z-20 bg-white dark:bg-black border-b border-gray-100 dark:border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-4 sm:py-5">
        <ul className="flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-center gap-3 sm:gap-0 sm:divide-x divide-gray-200 dark:divide-white/10">
          {items.map(({ Icon, label }) => (
            <li key={label} className="flex items-center gap-3 justify-center sm:justify-start sm:px-6 md:px-9">
              <span
                className="w-9 h-9 rounded-lg border flex items-center justify-center text-brand shrink-0"
                style={{ backgroundColor: "rgba(255,83,49,0.10)", borderColor: "rgba(255,83,49,0.22)" }}
              >
                <Icon className="w-[18px] h-[18px]" />
              </span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-snug">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ── Sub-components ── */

function ChallengesSection() {
  const { ref, visible } = useScrollVisible()

  return (
    <section ref={ref} className="py-20 md:py-32 px-4 sm:px-6 md:px-12 bg-white dark:bg-black transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-16 md:mb-24 transition-all duration-600 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <h2 className="text-3xl md:text-6xl font-semibold tracking-tight text-gray-900 dark:text-white mb-8 leading-[1.15]">
            Корпоративное обучение —<br />
            <span className="bg-gradient-to-r from-gray-400 via-gray-900 to-gray-400 dark:from-white/40 dark:via-white dark:to-white/40 bg-clip-text text-transparent inline-block py-2 -my-2 animate-text-glow">
              первый шаг к ИИ‑трансформации
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-3xl leading-relaxed">
            Помогаем средним и крупным компаниям перейти от разовых экспериментов и хаотичных инициатив к всеобщей, безопасной и управляемой работе с ИИ.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {challenges.map((c, idx) => (
            <div
              key={idx}
              className={`transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: visible ? `${idx * 120}ms` : "0ms" }}
            >
              <div className="group relative bg-gray-50 dark:bg-white/[0.03] rounded-2xl p-6 sm:p-8 border border-gray-100 dark:border-white/[0.06] transition-all duration-300 cursor-default overflow-hidden hover:border-brand/30 hover:shadow-md hover:shadow-brand/10 hover:-translate-y-1 h-full">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand/[0.03] to-transparent transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                <div className="relative z-10 flex gap-4 sm:gap-5 items-start">
                  <div className="flex-shrink-0 mt-1">
                    <ChallengeAppIcon>
                      {(() => { const Ic = challengeIcons[idx]; return <Ic className="w-[22px] h-[22px] text-gray-500 dark:text-gray-400 group-hover:text-brand transition-colors duration-300" /> })()}
                    </ChallengeAppIcon>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">{c.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 dark:text-gray-500 leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function LevelsSection() {
  const { ref, visible } = useScrollVisible()

  return (
    <section ref={ref} id="directions" className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-gray-50 dark:bg-[hsl(220,18%,4%)] border-t border-gray-100 dark:border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-16 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Обучение состоит из 4 блоков
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {directions.map((d, idx) => (
            <div key={d.slug} className="block h-full">
              <V2Card
                visible={visible}
                index={idx}
                className="h-full"
                contentClassName="p-7 sm:p-8 md:p-9"
              >
                <div
                  className="w-12 h-12 rounded-xl border flex items-center justify-center mb-5 text-brand relative z-10"
                  style={{ backgroundColor: "rgba(255,83,49,0.10)", borderColor: "rgba(255,83,49,0.22)" }}
                >
                  {React.createElement(directionIcons[idx % directionIcons.length], { className: "w-6 h-6" })}
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mt-1 mb-3 relative z-10 leading-tight">
                  {d.cardTitle}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-6 relative z-10 max-w-md">
                  {d.card.teaser}
                </p>

                {/* Formats block */}
                <div className="relative z-10 mb-6">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400 dark:text-white/30 mb-2.5">
                    Форматы
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {d.card.formats.map((f) => (
                      <span
                        key={f}
                        className="text-xs font-medium text-gray-700 dark:text-white/70 bg-gray-100/80 dark:bg-white/[0.06] border border-gray-200/60 dark:border-white/[0.06] rounded-full px-3 py-1.5 leading-none backdrop-blur-sm"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Outcome footer */}
                <div className="relative z-10 mt-auto pt-5 border-t border-gray-100 dark:border-white/10">
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-snug">
                    <span className="font-semibold text-gray-900 dark:text-white">На выходе:</span> {d.card.out}
                  </p>
                </div>
              </V2Card>
            </div>
          ))}
        </div>

        {/* Bright CTA — ведёт к форме внизу */}
        <div className={`mt-12 md:mt-14 flex justify-center transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-[#ff5331] text-white text-center px-8 py-4 sm:px-10 text-sm sm:text-base font-semibold shadow-[0_8px_30px_rgba(255,83,49,0.35)] hover:bg-[#ff6b4d] hover:shadow-[0_10px_38px_rgba(255,83,49,0.45)] hover:-translate-y-0.5 transition-all duration-300 btn-optical"
          >
            Получить индивидуальную программу
          </a>
        </div>

      </div>
    </section>
  )
}

/* Обучение как катализатор — секция-аккордеон «от обучения к трансформации».
   Слева: заголовок + декоративная «орбита» (кольца, точечная сетка, дуга-коннектор).
   Справа: 4 этапа-карточки (01–04). Клик по карточке раскрывает её вниз: описание +
   три опоры этапа. Открыт всегда один этап (по умолчанию — первый). Бренд-цвет #ff5331
   заменяет фиолетовый из референса. Тема-aware (свет/тёмная). */
const catalystStages = [
  {
    Icon: Learning,
    t: "Обучение: единое понимание и базовые навыки",
    d: "Руководители и команда получают общий язык, представление о возможностях и ограничениях ИИ и первые отработанные практики на своих задачах.",
    features: [
      { Icon: People, h: "Общий язык", t: "Снимаем страхи и мифы, формируем общее понимание ИИ для всех уровней." },
      { Icon: Strategy, h: "Практические навыки", t: "Даём рабочие инструменты и отрабатываем их на задачах вашей команды." },
      { Icon: Flash, h: "Быстрые эффекты", t: "Показываем первые результаты и экономию времени уже в процессе обучения." },
    ],
  },
  {
    Icon: SearchStatus,
    t: "Совместная диагностика и выбор направлений",
    d: "После обучения вместе с командой формулируются приоритетные процессы и функции, где ИИ даст наибольший эффект и которые стоит брать в работу в первую очередь.",
    features: [
      { Icon: Diagram, h: "Карта процессов", t: "Разбираем, где именно в компании ИИ даёт наибольший эффект." },
      { Icon: TickCircle, h: "Приоритизация", t: "Отбираем направления с максимальной отдачей и понятным результатом." },
      { Icon: Hierarchy, h: "Фокус", t: "Договариваемся, что берём в работу первым, а что осознанно откладываем." },
    ],
  },
  {
    Icon: MagicPen,
    t: "Проектирование и запуск пилотных решений",
    d: "На выбранных направлениях проектируются и запускаются пилоты: конкретные сценарии, автоматизации и ИИ‑решения, по которым можно замерять результат и дорабатывать подход.",
    features: [
      { Icon: Code, h: "Сценарии", t: "Проектируем конкретные ИИ‑решения под выбранные процессы." },
      { Icon: CpuCharge, h: "Пилоты", t: "Запускаем автоматизации и ассистентов на реальных задачах." },
      { Icon: Strategy, h: "Замер результата", t: "Смотрим на метрики и дорабатываем подход по факту." },
    ],
  },
  {
    Icon: StatusUp,
    t: "Масштабирование и переход к ИИ‑агентам",
    d: "Успешные пилоты масштабируются, процессы перестраиваются под новую логику, появляются специализированные ИИ‑агенты и цифровые сотрудники, работающие уже в рамках общей архитектуры.",
    features: [
      { Icon: Buildings, h: "Масштаб", t: "Успешные пилоты разворачиваем на всю компанию." },
      { Icon: Cpu, h: "ИИ‑агенты", t: "Появляются цифровые сотрудники, работающие в общей архитектуре." },
      { Icon: Hierarchy, h: "Новая логика", t: "Процессы и регламенты перестраиваются под ежедневную работу с ИИ." },
    ],
  },
]

/* Геометрия орбиты. Считается в CatalystSection из РЕАЛЬНЫХ позиций карточек (px
   относительно грид-обёртки), поэтому узлы дуги и сами карточки лежат на одном круге:
   · главный круг с сеткой (концентричен дуге узлов, виден целиком) — слева;
   · пологая, но явно КРУГЛАЯ дуга радиуса CAT_R_DOT с 4 узлами на ней;
   · карточки сдвинуты вправо (translateX) на ту же кривизну → «встают по кругу», сохраняя
     равный зазор CAT_GAP от своего узла. */
const CAT_R_DOT = 300 // радиус дуги с узлами
const CAT_R_MAIN = 238 // радиус главного круга (концентричен дуге)
const CAT_GAP = 54 // зазор узел → левый край карточки

interface CatGeo {
  W: number; H: number
  cx: number; cy: number // центр круга (px отн. грид-обёртки)
  dots: { x: number; y: number }[]
  arcTop: { x: number; y: number }
  arcBot: { x: number; y: number }
}

function CatalystOrbit({ geo }: { geo: CatGeo }) {
  const { W, H, cx, cy, dots, arcTop, arcBot } = geo
  // Точечная сетка в главном круге, с радиальным затуханием к краям.
  const cols = 7, rows = 6, step = 22
  const grid: React.ReactNode[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = cx + (c - (cols - 1) / 2) * step
      const y = cy + (r - (rows - 1) / 2) * step
      const op = Math.max(0.06, 0.5 - Math.hypot(x - cx, y - cy) / 150)
      grid.push(<circle key={`${r}-${c}`} cx={x} cy={y} r={2} fill="currentColor" fillOpacity={op} />)
    }
  }
  const decX = (y: number) => cx - Math.sqrt(Math.max(0, CAT_R_MAIN * CAT_R_MAIN - (y - cy) ** 2))
  // Горизонтальное затухание орбиты: слева (под заголовком) → в прозрачность,
  // справа (к дуге/карточкам) → видимо. Так круг «заходит под текст», не перегружая его.
  const fadeX1 = cx - CAT_R_MAIN
  const fadeX2 = cx + CAT_R_MAIN

  return (
    <svg viewBox={`0 0 ${W} ${H}`} fill="none" className="w-full h-full" aria-hidden="true" preserveAspectRatio="none">
      <defs>
        <linearGradient id="catOrbitFade" gradientUnits="userSpaceOnUse" x1={fadeX1} y1="0" x2={fadeX2} y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.4" stopColor="#fff" stopOpacity="0.12" />
          <stop offset="0.7" stopColor="#fff" stopOpacity="0.72" />
          <stop offset="0.9" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask id="catOrbitMask">
          <rect x="0" y="0" width={W} height={H} fill="url(#catOrbitFade)" />
        </mask>
      </defs>

      {/* Мягкая орбита — акцентная (оранжевая), но приглушённая и затухающая влево под заголовок.
          НЕ жёсткая: кольца/сетка/декор-точки живут под маской затухания. */}
      <g className="text-[#ff5331]" mask="url(#catOrbitMask)">
        <g>{grid}</g>
        <circle cx={cx} cy={cy} r={CAT_R_MAIN} stroke="currentColor" strokeOpacity="0.35" />
        <circle cx={cx} cy={cy} r={CAT_R_MAIN * 0.6} stroke="currentColor" strokeOpacity="0.26" />
        <circle cx={decX(cy + 120)} cy={cy + 120} r={4} fill="currentColor" fillOpacity="0.55" />
        <circle cx={decX(cy + 156)} cy={cy + 156} r={3.5} fill="currentColor" fillOpacity="0.45" />
      </g>

      {/* ЖЁСТКИЙ акцент — только дуга и её узлы (плашки). Без маски: полный, резкий цвет. */}
      <g className="text-[#ff5331]">
      {/* Круглая дуга с узлами (чуть длиннее блока узлов сверху и снизу) */}
      <path
        d={`M ${arcTop.x} ${arcTop.y} A ${CAT_R_DOT} ${CAT_R_DOT} 0 0 1 ${arcBot.x} ${arcBot.y}`}
        stroke="currentColor" strokeOpacity="0.9" strokeLinecap="round"
      />
      {/* Узлы на дуге — точно по центрам карточек */}
      {dots.map((d, i) => (
        <g key={i}>
          <circle cx={d.x} cy={d.y} r={9} fill="currentColor" fillOpacity="0.16" />
          <circle cx={d.x} cy={d.y} r={5} fill="currentColor" />
        </g>
      ))}
      </g>
    </svg>
  )
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-5 h-5 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function CatalystSection() {
  const { ref, visible } = useScrollVisible()
  // Этап раскрывается модалкой-попапом по центру (карточки не двигаются, орбита
  // всегда выровнена, без скролла страницы). open = индекс открытого этапа или -1.
  const [open, setOpen] = useState(-1)
  const gridRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [geo, setGeo] = useState<CatGeo | null>(null)
  const [stagger, setStagger] = useState<number[]>([])

  // Считаем орбиту из реальных позиций СВЁРНУТЫХ карточек (десктоп). Узлы дуги и сдвиг
  // карточек берутся из одного круга → карточки «встают по кругу» с равным зазором.
  useLayoutEffect(() => {
    const compute = () => {
      const grid = gridRef.current
      if (!grid) return
      if (!window.matchMedia("(min-width: 1024px)").matches) { setGeo(null); setStagger([]); return }
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]
      if (cards.length < 4) return
      const W = grid.offsetWidth, H = grid.offsetHeight
      const cY = cards.map((c) => c.offsetTop + c.offsetHeight / 2)
      const X0 = cards[0].offsetLeft
      const cy = (cY[0] + cY[cY.length - 1]) / 2
      const sq = (y: number) => Math.sqrt(Math.max(0, CAT_R_DOT * CAT_R_DOT - (y - cy) ** 2))
      const s0 = sq(cY[0])
      const cx = X0 - s0 - CAT_GAP
      const dots = cY.map((y) => ({ x: cx + sq(y), y }))
      const stag = cY.map((y) => sq(y) - s0)
      const arcTopY = cY[0] - 30, arcBotY = cY[cY.length - 1] + 30
      setGeo({ W, H, cx, cy, dots, arcTop: { x: cx + sq(arcTopY), y: arcTopY }, arcBot: { x: cx + sq(arcBotY), y: arcBotY } })
      setStagger(stag)
    }
    compute()
    window.addEventListener("resize", compute)
    return () => window.removeEventListener("resize", compute)
  }, [visible])

  const maxStagger = stagger.length ? Math.max(...stagger) : 0

  return (
    <section
      ref={ref}
      // `dark` на самой секции включает все внутренние dark:-стили независимо от темы сайта
      // → секция всегда тёмная «полоса» на фоне белых блоков. Фон/бордер самой секции
      // (dark:-варианты на этом же элементе не срабатывают) выставлены явно тёмными.
      className="dark relative py-20 md:py-28 px-4 sm:px-6 md:px-12 bg-[hsl(222,30%,4%)] border-y border-white/[0.06] overflow-hidden transition-colors duration-500"
    >
      <div ref={gridRef} className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Декоративная орбита — абсолютно, за колонками; узлы дуги совпадают с карточками.
            Фикс. размер = свёрнутому блоку (geo.W×geo.H): не растягивается при раскрытии
            карточки, поэтому круг остаётся кругом (без искажения в эллипс). */}
        {geo && (
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-0 left-0 z-0 pointer-events-none"
            style={{ width: geo.W, height: geo.H }}
          >
            <CatalystOrbit geo={geo} />
          </div>
        )}

        {/* ── ЛЕВО: заголовок ── */}
        <div className={`z-10 lg:col-span-5 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <h2 className="text-3xl sm:text-4xl md:text-[42px] lg:text-[44px] font-semibold tracking-tight text-gray-900 dark:text-white leading-[1.08]">
            Обучение запускает ИИ‑трансформацию
          </h2>
          <p className="text-base md:text-lg text-gray-500 dark:text-white/50 mt-5 leading-relaxed max-w-[470px]">
            Команда не только освоит ИИ на практике, но и подготовится к следующим шагам, с которыми мы также помогаем.
          </p>
        </div>

        {/* ── ПРАВО: аккордеон этапов (сдвинуты по дуге) ──
            lg:pt-8 опускает карточки (и привязанный к ним круг) чуть ниже → заголовок
            и подзаголовок читаются выше плашек и круга (чище композиция, как в референсе). */}
        <div className="z-10 lg:col-span-7 lg:pt-8 flex flex-col gap-4" style={maxStagger ? { paddingRight: maxStagger } : undefined}>
          {catalystStages.map((s, idx) => {
            const isOpen = open === idx
            return (
              <div
                key={idx}
                ref={(el) => { cardRefs.current[idx] = el }}
                className={`transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: visible ? `${idx * 110}ms` : "0ms" }}
              >
                {/* внутренний слой — сдвиг по дуге (translateX), не влияет на измерения */}
                <div style={{ transform: stagger[idx] ? `translateX(${stagger[idx]}px)` : undefined, transition: "transform 500ms ease" }}>
                  <div
                    className={`rounded-[2rem] border transition-all duration-300 ${
                      isOpen
                        ? "border-[#ff5331]/45 bg-[#ff5331]/[0.03] dark:bg-white/[0.05] shadow-lg shadow-[#ff5331]/[0.07]"
                        : "border-gray-200/80 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] hover:border-[#ff5331]/35 hover:shadow-md hover:shadow-black/[0.03]"
                    }`}
                  >
                    {/* Шапка-кнопка */}
                    <button
                      onClick={() => setOpen(isOpen ? -1 : idx)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center gap-5 text-left px-6 sm:px-7 min-h-[112px]"
                    >
                      <span
                        className={`shrink-0 w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300 ${
                          isOpen ? "bg-brand text-white" : "bg-[#ff5331]/10 text-brand"
                        }`}
                      >
                        <s.Icon className="w-7 h-7" />
                      </span>
                      <h3 className="flex-1 text-base sm:text-lg font-semibold text-gray-900 dark:text-white leading-snug text-balance">
                        {s.t}
                      </h3>
                      <span className={`transition-colors ${isOpen ? "text-brand" : "text-gray-400 dark:text-white/40"}`}>
                        <Chevron open={isOpen} />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Неакцентная ссылка (без обводки, в левом углу) — пока ведёт на главную.
          Стрелка вверх (iconsax) в круглой кнопке. */}
      <div className={`relative z-10 max-w-7xl mx-auto mt-7 md:mt-9 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <a
          href="/"
          className="group inline-flex items-center gap-3 text-sm sm:text-base font-semibold text-gray-700 dark:text-white/80 hover:text-brand dark:hover:text-brand transition-colors"
        >
          Подробнее про ИИ‑трансформацию
          <span className="w-10 h-10 rounded-full border border-gray-300 dark:border-white/20 flex items-center justify-center text-gray-500 dark:text-white/60 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-[#ff5331] group-hover:text-brand group-hover:bg-[#ff5331]/10">
            {/* диагональная ↗ — ArrowUp повёрнут на 45° */}
            <ArrowUp className="w-[18px] h-[18px] rotate-45" />
          </span>
        </a>
      </div>

      {/* Модалка этапа по центру экрана */}
      {open >= 0 && (
        <CatalystPopup stage={catalystStages[open]} onClose={() => setOpen(-1)} />
      )}
    </section>
  )
}

/* Модалка этапа (режим 'popup') — по центру, в рамках экрана, без скролла страницы. */
function CatalystPopup({ stage, onClose }: { stage: (typeof catalystStages)[number]; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-popup-fade" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-[2rem] border border-gray-200 dark:border-white/10 bg-white dark:bg-[hsl(222,28%,7%)] shadow-2xl shadow-black/20 p-7 sm:p-9 animate-popup-pop"
      >
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute top-5 right-5 w-9 h-9 rounded-full border border-gray-200 dark:border-white/15 flex items-center justify-center text-gray-500 dark:text-white/60 hover:border-[#ff5331]/50 hover:text-brand transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>

        <div className="flex items-center gap-4 pr-10">
          <span className="shrink-0 w-16 h-16 rounded-full bg-brand text-white flex items-center justify-center">
            <stage.Icon className="w-7 h-7" />
          </span>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white leading-snug">{stage.t}</h3>
        </div>

        <p className="mt-6 text-sm sm:text-[15px] text-gray-600 dark:text-white/60 leading-relaxed">{stage.d}</p>

        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0">
          {stage.features.map(({ Icon, h, t }, fi) => (
            <div key={h} className={`sm:px-5 sm:first:pl-0 sm:last:pr-0 ${fi > 0 ? "sm:border-l border-gray-100 dark:border-white/[0.08]" : ""}`}>
              <Icon className="w-6 h-6 text-brand mb-3" />
              <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1.5">{h}</div>
              <p className="text-[13px] text-gray-500 dark:text-white/50 leading-relaxed">{t}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StepCards({ title, subtitle, steps, band }: { title: string; subtitle: string; steps: { n: string; t: string }[]; band?: boolean }) {
  const { ref, visible } = useScrollVisible()
  return (
    <section
      ref={ref}
      className={`py-16 md:py-24 px-4 sm:px-6 md:px-12 transition-colors duration-500 ${band ? "bg-gray-50 dark:bg-[hsl(220,18%,10%)] border-t border-gray-100 dark:border-white/[0.06]" : "bg-white dark:bg-black"}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className={`mb-12 md:mb-16 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-3xl leading-relaxed">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <div
              key={step.n}
              className={`transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: visible ? `${idx * 120}ms` : "0ms" }}
            >
              <div className="group relative bg-gray-50 dark:bg-white/[0.03] rounded-2xl p-6 sm:p-8 border border-gray-100 dark:border-white/[0.06] transition-all duration-300 hover:border-brand/30 hover:shadow-md hover:shadow-brand/10 hover:-translate-y-1 h-full">
                <div className="text-sm font-bold text-brand mb-3">{step.n}</div>
                <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">{step.t}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowToStart() {
  return <StepCards title={hub.start.title} subtitle={hub.start.subtitle} steps={hub.start.steps} />
}

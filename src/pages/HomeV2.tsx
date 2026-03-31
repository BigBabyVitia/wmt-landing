import { useEffect, useRef, useState, lazy, Suspense } from "react"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { NavbarV2 } from "@/components/NavbarV2"
import { useVersion } from "@/context/VersionContext"
import { LogoCloud } from "@/components/ui/logo-cloud"
import { clients } from "@/data/clients"

const UnicornScene = lazy(() => import("unicornstudio-react"))
import { TrustStrip } from "@/components/TrustStrip"
import { FreePlatform } from "@/components/FreePlatform"
import { MainCta } from "@/components/MainCta"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"

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

/* ── SVG stroke-draw icons for levels ── */
const sparkle = (cx: number, cy: number, r: number) =>
  `M${cx} ${cy - r} C${cx + r * 0.15} ${cy - r * 0.15} ${cx + r * 0.15} ${cy - r * 0.15} ${cx + r} ${cy} C${cx + r * 0.15} ${cy + r * 0.15} ${cx + r * 0.15} ${cy + r * 0.15} ${cx} ${cy + r} C${cx - r * 0.15} ${cy + r * 0.15} ${cx - r * 0.15} ${cy + r * 0.15} ${cx - r} ${cy} C${cx - r * 0.15} ${cy - r * 0.15} ${cx - r * 0.15} ${cy - r * 0.15} ${cx} ${cy - r}Z`

const P = "format-svg-path"
const C = "#ff5331"

const levelIcons = [
  // Level 1: Management — diamond + arrows (strategic direction)
  <svg key="l1" viewBox="-20 -20 200 200" fill="none" className="w-full h-full">
    <path d="M80 20 L140 80 L80 140 L20 80 Z" stroke={C} strokeWidth="2" strokeLinejoin="round"
      className={P} style={{ strokeDasharray: 340, strokeDashoffset: 340 }} />
    <path d="M120 40 L155 5" stroke={C} strokeWidth="1.5" strokeLinecap="round"
      className={P} style={{ strokeDasharray: 50, strokeDashoffset: 50 }} />
    <path d="M140 5 L155 5 L155 20" stroke={C} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={P} style={{ strokeDasharray: 30, strokeDashoffset: 30 }} />
    <path d={sparkle(160, 80, 10)} stroke={C} strokeWidth="1.5"
      className={P} style={{ strokeDasharray: 80, strokeDashoffset: 80 }} />
    <path d={sparkle(0, 140, 8)} stroke={C} strokeWidth="1"
      className={P} style={{ strokeDasharray: 64, strokeDashoffset: 64 }} />
  </svg>,

  // Level 2: Teams — overlapping squares (collaboration)
  <svg key="l2" viewBox="-20 -20 200 200" fill="none" className="w-full h-full">
    <rect x="10" y="10" width="70" height="70" rx="8" stroke={C} strokeWidth="2"
      className={P} style={{ strokeDasharray: 280, strokeDashoffset: 280 }} />
    <rect x="60" y="60" width="70" height="70" rx="8" stroke={C} strokeWidth="2"
      className={P} style={{ strokeDasharray: 280, strokeDashoffset: 280 }} />
    <path d={sparkle(145, 25, 12)} stroke={C} strokeWidth="1.5"
      className={P} style={{ strokeDasharray: 95, strokeDashoffset: 95 }} />
    <path d={sparkle(20, 145, 8)} stroke={C} strokeWidth="1"
      className={P} style={{ strokeDasharray: 64, strokeDashoffset: 64 }} />
  </svg>,

  // Level 3: Personal — concentric circles (individual focus)
  <svg key="l3" viewBox="-20 -20 200 200" fill="none" className="w-full h-full">
    <circle cx="80" cy="80" r="20" stroke={C} strokeWidth="1.5"
      className={P} style={{ strokeDasharray: 126, strokeDashoffset: 126 }} />
    <circle cx="80" cy="80" r="40" stroke={C} strokeWidth="1.5"
      className={P} style={{ strokeDasharray: 251, strokeDashoffset: 251 }} />
    <circle cx="80" cy="80" r="60" stroke={C} strokeWidth="1.5"
      className={P} style={{ strokeDasharray: 377, strokeDashoffset: 377 }} />
    <path d={sparkle(145, 20, 13)} stroke={C} strokeWidth="1.5"
      className={P} style={{ strokeDasharray: 104, strokeDashoffset: 104 }} />
    <path d={sparkle(15, 150, 9)} stroke={C} strokeWidth="1"
      className={P} style={{ strokeDasharray: 72, strokeDashoffset: 72 }} />
  </svg>,
]

/* ── Data ── */
/* Simple app-icon style icons for challenge cards */
function ChallengeAppIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="challenge-icon w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 group-hover:bg-brand/10 group-hover:border-brand/20 group-hover:shadow-sm group-hover:shadow-brand/20">
      {children}
    </div>
  )
}

const challengeSvgs = [
  // 1. Порог входа — молния
  () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-300 text-gray-500 dark:text-gray-400 dark:text-gray-500 group-hover:text-brand">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  // 2. Большой бизнес — здание
  () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-300 text-gray-500 dark:text-gray-400 dark:text-gray-500 group-hover:text-brand">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="9" y1="6" x2="9" y2="6.01" />
      <line x1="15" y1="6" x2="15" y2="6.01" />
      <line x1="9" y1="10" x2="9" y2="10.01" />
      <line x1="15" y1="10" x2="15" y2="10.01" />
      <line x1="9" y1="14" x2="9" y2="14.01" />
      <line x1="15" y1="14" x2="15" y2="14.01" />
      <path d="M9 22v-4h6v4" />
    </svg>
  ),
  // 3. Локальная польза — разъединённые точки
  () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-300 text-gray-500 dark:text-gray-400 dark:text-gray-500 group-hover:text-brand">
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
      <line x1="8" y1="6" x2="16" y2="6" strokeDasharray="2 3" opacity="0.4" />
      <line x1="6" y1="8" x2="6" y2="16" strokeDasharray="2 3" opacity="0.4" />
      <line x1="18" y1="8" x2="18" y2="16" strokeDasharray="2 3" opacity="0.4" />
      <line x1="8" y1="18" x2="16" y2="18" strokeDasharray="2 3" opacity="0.4" />
    </svg>
  ),
  // 4. Ошибка в треке — график вниз
  () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-300 text-gray-500 dark:text-gray-400 dark:text-gray-500 group-hover:text-brand">
      <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
      <polyline points="16 17 22 17 22 11" />
    </svg>
  ),
]

const challenges = [
  {
    title: "Порог входа уже пройден",
    desc: "ИИ стал базовым фактором скорости и эффективности, который нельзя игнорировать.",
  },
  {
    title: "Большой бизнес не перестраивается сам",
    desc: "Масштаб мешает быстро превратить интерес к ИИ в реальное изменение процессов.",
  },
  {
    title: "Локальная польза не меняет систему",
    desc: "Точечные тесты не дают эффекта без системного внедрения в структуру бизнеса.",
  },
  {
    title: "Ошибка в треке обходится слишком дорого",
    desc: "Ошибки в стратегии ведут к трате ресурсов на улучшения без реального результата.",
  },
]

const levels = [
  {
    label: "Уровень 1. Управленческий",
    title: "Руководство принимает решение и видит ценность",
    desc: "Три управленческих формата — под разную глубину и задачу. Результат: руководство понимает, зачем ИИ, как внедрять и что запускать первым.",
    tags: ["Системный ИИ", "ИИ-архитектура бизнеса", "ИИ-марафон для топов"],
    link: "/executive",
    linkText: "Выбрать управленческий формат",
  },
  {
    label: "Уровень 2. Масштабирование",
    title: "Практика расширяется на команды и компанию",
    desc: "Пилоты, команды-чемпионы, корпоративная волна, сборка агентов. ИИ выходит из кабинета руководителя в рабочие процессы.",
    tags: ["Цифровой каркас", "Мышление 2.0", "ИИ-марафон", "День сборки агентов", "Сборка агентов (n8n + Claude)"],
    link: "/teams",
    linkText: "Подобрать программу для команды",
  },
  {
    label: "Уровень 3. Личный",
    title: "Личный трек для тех, кто хочет пройти тему глубоко",
    desc: "Двухдневный интенсив — работаем руками с вашей стратегией и конкретными агентами. Часто после этого тема возвращается в компанию на совершенно другом уровне.",
    tags: ["Личный ИИ"],
    link: "/personal-ai",
    linkText: "Узнать про личный интенсив",
  },
]

export function HomeV2() {
  const { heroStyle } = useVersion()

  return (
    <>
      {/* ── HERO ── */}
      {heroStyle === "webgl" ? <HeroWebGL /> : <HeroVideo />}

      {/* ── ВЫЗОВЫ ── */}
      <ChallengesSection />

      {/* ── ВАРИАНТЫ ВОРОНОК И КАРТОЧЕК (ТЕСТИРОВАНИЕ) ── */}
      <CombinedLevelsViewer />

      {/* ── TRUST ── */}
      <TrustStrip />

      {/* ── ПЛАТФОРМА ── */}
      <FreePlatform />

      {/* ── ФИНАЛЬНЫЙ CTA ── */}
      <MainCta />
    </>
  )
}

/* ── Hero variants ── */

function HeroVideo() {
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
      <div className="relative z-10 flex flex-col items-center justify-start sm:justify-center h-full text-center px-6 pt-10 sm:pt-0 sm:mt-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.1] tracking-tight max-w-[1200px] font-semibold text-white animate-fade-rise">
          ИИвизация бизнеса от&nbsp;стратегического решения до&nbsp;масштаба всей компании
        </h1>
        <p className="text-gray-200 text-base sm:text-lg md:text-xl max-w-4xl mt-6 sm:mt-10 leading-relaxed animate-fade-rise-delay">
          Инструменты AI-трансформации для первых лиц, руководителей и команд: от стратсессий и обучения до персональной работы и практики внедрения
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-12 animate-fade-rise-delay-2 w-full max-w-xs sm:max-w-none mx-auto">
          <a href="#directions" className="bg-white dark:bg-[hsl(220,20%,7%)] text-gray-900 dark:text-white rounded-full text-center px-6 py-3.5 sm:px-12 sm:py-4 text-sm sm:text-base font-semibold hover:bg-gray-100 dark:hover:bg-[hsl(220,18%,14%)] transition-all duration-300 shadow-[0_4px_24px_rgba(255,255,255,0.2)] hover:shadow-[0_4px_32px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 inline-block">
            Узнать, что подойдёт
          </a>
          
        </div>

      </div>

      {/* Hero Logos Section */}
      <div className="absolute bottom-10 sm:bottom-6 md:bottom-10 left-0 right-0 w-full z-20 animate-fade-rise-delay-2 pointer-events-none pb-[env(safe-area-inset-bottom)]">
        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="text-center mb-4">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">Нам доверяют трансформацию</span>
          </div>
          <div className="relative [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] pointer-events-auto">
            <div className="opacity-90">
              <LogoCloud logos={clients} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function HeroWebGL() {
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
      {gradientClass && <div className={`absolute inset-0 z-[2] transition-all duration-500 ${gradientClass}`} />}

      <div className="relative z-10 flex flex-col items-center justify-start sm:justify-center h-full text-center px-6 pt-10 sm:pt-0 sm:mt-12">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.1] tracking-tight max-w-[1200px] font-semibold text-white animate-fade-rise"
        >
          ИИвизация бизнеса от&nbsp;стратегического решения до&nbsp;масштаба всей компании
        </h1>
        <p
          className="text-gray-200 text-base sm:text-lg md:text-xl max-w-4xl mt-6 sm:mt-10 leading-relaxed animate-fade-rise-delay"
          style={subShadow ? { textShadow: subShadow } : undefined}
        >
          Инструменты AI-трансформации для первых лиц, руководителей и команд: от стратсессий и обучения до персональной работы и практики внедрения
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-12 animate-fade-rise-delay-2 w-full max-w-xs sm:max-w-none mx-auto">
          <a href="#directions" className="bg-white dark:bg-[hsl(220,20%,7%)] text-gray-900 dark:text-white rounded-full text-center px-6 py-3.5 sm:px-12 sm:py-4 text-sm sm:text-base font-semibold hover:bg-gray-100 dark:hover:bg-[hsl(220,18%,14%)] transition-all duration-300 shadow-[0_4px_24px_rgba(255,255,255,0.2)] hover:shadow-[0_4px_32px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 inline-block">
            Узнать, что подойдёт
          </a>
          
        </div>

      </div>

      {/* Hero Logos Section */}
      <div className="absolute bottom-10 sm:bottom-6 md:bottom-10 left-0 right-0 w-full z-20 animate-fade-rise-delay-2 pointer-events-none pb-[env(safe-area-inset-bottom)]">
        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="text-center mb-4">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">Нам доверяют трансформацию</span>
          </div>
          <div className="relative [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] pointer-events-auto">
            <div className="opacity-90">
              <LogoCloud logos={clients} />
            </div>
          </div>
        </div>
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
        <div className={`mb-16 md:mb-24 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl md:text-6xl font-semibold tracking-tight text-gray-900 dark:text-white mb-8 leading-[1.15]">
            ИИ уже меняет рынок.<br />
            <span className="bg-gradient-to-r from-gray-400 via-gray-900 to-gray-400 dark:from-white/40 dark:via-white dark:to-white/40 bg-clip-text text-transparent inline-block py-2 -my-2 animate-text-glow">
              Готовы ли вы к переходу?
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-3xl leading-relaxed">
            Мы помогаем крупному бизнесу не просто «попробовать» нейросети, а встроить их в ДНК процессов и решений.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {challenges.map((c, idx) => (
            <div
              key={idx}
              className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: visible ? `${idx * 120}ms` : "0ms" }}
            >
              <div className="group relative bg-gray-50 dark:bg-white/[0.03] rounded-2xl p-6 sm:p-8 border border-gray-100 dark:border-white/[0.06] transition-all duration-300 cursor-default overflow-hidden hover:border-brand/30 hover:shadow-md hover:shadow-brand/10 hover:-translate-y-1 h-full transform-gpu [backface-visibility:hidden] antialiased will-change-transform">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand/[0.03] to-transparent transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                <div className="relative z-10 flex gap-4 sm:gap-5 items-start">
                  <div className="flex-shrink-0 mt-1">
                    <ChallengeAppIcon>
                      {challengeSvgs[idx]()}
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
  const [activeLevel, setActiveLevel] = useState<number | null>(null)

  return (
    <section ref={ref} id="directions" className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-gray-50 dark:bg-[hsl(220,18%,10%)] border-t border-gray-100 dark:border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6">
            Одна система — три уровня готовности
          </h2>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 dark:text-gray-500 max-w-5xl">
            WMT не продаёт отдельные курсы. Каждый формат работает самостоятельно и переводит в следующий: <span className="text-brand font-medium">управление</span> → <span className="text-brand font-medium">практика</span> → <span className="text-brand font-medium">масштабирование</span>. Каждый уровень вытекает из предыдущего, компания продвигается в своём темпе.
          </p>
        </div>

        <div className="space-y-0">
          {levels.map((l, idx) => (
            <div key={idx}>
              <Link
                to={l.link}
                className={`relative block group bg-white dark:bg-[hsl(220,20%,7%)] rounded-2xl p-8 md:p-10 border border-gray-100 dark:border-white/[0.06] transition-all duration-500 hover:border-gray-300 dark:hover:border-white/20 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-0.5
                  ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: visible ? `${200 + idx * 150}ms` : "0ms" }}
                onMouseEnter={() => setActiveLevel(idx)}
                onMouseLeave={() => setActiveLevel(null)}
              >
                {/* SVG stroke-draw icon — right side, large, overflows card ~1/3 */}
                <div className={`absolute -top-16 -right-16 w-64 h-64 lg:w-72 lg:h-72 transition-opacity duration-500 hidden md:block pointer-events-none ${activeLevel === idx ? "opacity-100 format-active" : "opacity-0"}`}>
                  {levelIcons[idx]}
                </div>

                <div className="relative z-10">
                  <span className="inline-block text-xs font-semibold text-brand uppercase tracking-wider mb-3">
                    {l.label}
                  </span>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">{l.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 dark:text-gray-500 leading-relaxed text-base mb-5 max-w-2xl">{l.desc}</p>

                  {/* Program tags — gray style with label */}
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <span className="text-[11px] text-gray-400 dark:text-gray-500 font-medium mr-1">Программы:</span>
                    {l.tags.map((tag) => (
                      <span key={tag} className="text-[11px] text-gray-600 dark:text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-[hsl(220,18%,14%)] px-3 py-[7px] rounded-full font-medium leading-[1]">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-2 text-brand font-medium group-hover:gap-3 transition-all">
                    {l.linkText} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>

              {/* Arrow divider between levels — larger spacing */}
              {idx < levels.length - 1 && (
                <div className="flex flex-col items-center py-2">
                  <div className="w-px h-5 bg-brand/30" />
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-brand my-1">
                    <path d="M12 4v16m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="w-px h-5 bg-brand/30" />
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-400 dark:text-gray-500 mt-8">
          Платформа и библиотека уроков — бесплатный подготовительный уровень для самостоятельного старта.
        </p>
      </div>
    </section>
  )
}

const teaserData = [
  {
    id: "exec-teaser",
    title: "Топ-менеджмент",
    desc: "Когда на столе много предложений, а общего решения нет — начинать нужно не с пилота и не с массового обучения. Нужен управленческий ход.",
    mobileDesc: "Когда общего решения нет — начинать нужно не с обучения, а с управленческого хода.",
    items: [
      {
        title: "Системный ИИ",
        desc: "когда нужно выровнять руководство и получить план на 90 дней.",
        tags: { format: "Офлайн / Онлайн", duration: "1,5–2 часа", people: "до 15 человек" }
      },
      {
        title: "Цифровой каркас",
        desc: "построение архитектуры ИИ-перехода и запуск первого пилота.",
        tags: { format: "Офлайн", duration: "1–2 дня", people: "до 30 человек" }
      },
      {
        title: "ИИ-архитектура бизнеса",
        desc: "когда нужен глубокий пересмотр стратегии и операционной модели под ИИ.",
        tags: { format: "Офлайн", duration: "2 дня", people: "до 15 человек" }
      },
      {
        title: "ИИ-практикум для руководителей",
        desc: "когда руководители должны не только понять тему, а пройти практику работы.",
        tags: { format: "Онлайн", duration: "6 сессий", people: "8–20 человек" }
      },
      {
        title: "Персональная работа с ИИ",
        desc: "индивидуальный трек для собственников и первых лиц.",
        tags: { format: "Офлайн / Онлайн", duration: "По запросу", people: "1 человек" },
        isPersonal: true
      },
      {
        title: "Корпоративная программа под ваш запрос",
        desc: "сборка уникальной архитектуры трансформации под задачи вашей компании.",
        tags: { format: "Офлайн / Онлайн", duration: "Индивидуально", people: "Любая аудитория" },
        isCorporate: true
      }
    ],
    link: "/executive",
    linkText: "Выбрать управленческий формат",
  },
  {
    id: "teams-teaser",
    title: "Масштабирование",
    desc: "Практика расширяется на отделы и процессы. Обучение команд на собственных задачах и внедрение лучших решений на сотни сотрудников.",
    mobileDesc: "Внедрение практики на отделы и процессы. Обучение команд на собственных задачах.",
    items: [
      {
        title: "Мышление 2.0",
        desc: "ядро практиков за 1–1,5 дня, 80% практики.",
        tags: { format: "Офлайн", duration: "1–1,5 дня", people: "10–30 человек" }
      },
      {
        title: "ИИ-марафон (корп. волна)",
        desc: "широкая волна на 10 недель, 100% руками.",
        tags: { format: "Онлайн", duration: "10 недель", people: "Сотни человек" }
      },
      {
        title: "День сборки агентов",
        desc: "рабочий агент у каждого за один день.",
        tags: { format: "Офлайн", duration: "1 день", people: "30–40 человек" }
      },
      {
        title: "Сборка (n8n + Claude)",
        desc: "глубокая малогрупповая программа по сборке агентов.",
        tags: { format: "Офлайн / Онлайн", duration: "По запросу", people: "до 6 человек" }
      }
    ],
    link: "/teams",
    linkText: "Подобрать программу внедрения",
  },
  {
    id: "personal-teaser",
    title: "Личный ИИ",
    desc: "Полное погружение с анализом процессов и сборкой решения под вашу специфику. Если вы хотите глубоко разобраться в теме самостоятельно, вне корпоративного контекста.",
    mobileDesc: "Глубокое погружение и сборка решения под вашу специфику вне корпоративного контекста.",
    personalSteps: [
      { title: "1. Изучение", desc: "Анализируем бизнес-потребность и текущие процессы." },
      { title: "2. Подготовка", desc: "Разрабатываем индивидуальную программу и готовим материалы." },
      { title: "3. Работа", desc: "Личное обучение, передача стратегии и сборка навыков." }
    ],
    items: [
      {
        title: "Стратегическая сессия",
        desc: "Сжатый формат для построения плана и решения острых задач",
        tags: { format: "Офлайн / Онлайн", duration: "4 часа", people: "1 человек" }
      },
      {
        title: "ИИ-марафон (выезд)",
        desc: "Полное погружение с собственной стратегией и сборкой агента",
        tags: { format: "Офлайн", duration: "2 дня", people: "1 человек" }
      }
    ],
    link: "/personal-ai",
    linkText: "Узнать про личный ИИ",
  }
];

export function DirectionTeasersCards() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-gray-50/50 dark:bg-[hsl(220,18%,5%)] relative overflow-hidden border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-300">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col gap-10 relative z-10 text-center">
        {teaserData.map((teaser, i) => (
          <TeaserCard key={teaser.id} {...teaser} index={i} />
        ))}
      </div>
    </section>
  );
}

function TeaserCard({ id, title, desc, mobileDesc, items, personalSteps, link, linkText, index }: any) {
  const { ref, visible } = useScrollVisible(0.15);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      ref={ref}
      id={id}
      className={`relative group w-full rounded-[2rem] border border-gray-200 dark:border-white/10/60 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] transition-all duration-700 overflow-hidden text-left ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
      style={{ transitionDelay: visible ? `${index * 150}ms` : "0ms" }}
      onMouseMove={handleMouseMove}
    >
      {/* Background Glow Pattern - more punchy */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.6] dark:opacity-[0.8]"
        style={{
          background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255, 83, 49, 0.12) 0%, rgba(255, 83, 49, 0.04) 45%, transparent 100%)"
        }}
      />

      {/* Background Grid Pattern with fade-out mask - balanced visibility */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.6] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)]" 
        style={{
          backgroundImage: `linear-gradient(to right, rgba(128,128,128,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(128,128,128,0.18) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          backgroundPosition: 'center center'
        }}
      />

      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(255, 83, 49, 0.18), transparent 80%)`,
        }}
      />
      
      <div className="p-4 py-6 sm:p-8 md:p-14 relative z-10 flex flex-col gap-4 sm:gap-6 md:gap-10">
        <div className="w-full text-center xl:text-left">
          <h3 className="text-xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-1 md:mb-5">{title}</h3>
          <p className="hidden sm:block text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 dark:text-gray-500 leading-relaxed max-w-3xl mx-auto xl:mx-0">{desc}</p>
          <p className="block sm:hidden text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto italic">
            {mobileDesc || desc}
          </p>
        </div>
        
        {personalSteps && personalSteps.length > 0 && (
          <div className="w-full mb-0 sm:mb-2">
            <h4 className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 md:mb-5 text-center xl:text-left">Процесс</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-4 relative">
               {/* Соединительная линия (только на десктопе) */}
               <div className="hidden sm:block absolute top-[28px] left-[15%] right-[15%] h-[1px] bg-brand/30 z-0 border-t border-dashed border-brand/50" />
               
               {personalSteps.map((step: any, idx: number) => (
                  <div key={idx} className="flex flex-col gap-0.5 p-3 md:p-5 relative z-10 sm:items-center sm:text-center bg-transparent border border-brand/10 dark:border-brand/[0.05] rounded-xl sm:rounded-2xl">
                    <span className="font-semibold text-brand text-xs sm:text-base leading-tight inline-block">{step.title}</span>
                    <span className="text-gray-700 dark:text-gray-300 text-[10px] sm:text-sm leading-snug">{step.desc}</span>
                  </div>
               ))}
            </div>
          </div>
        )}

        {items && items.length > 0 && (
          <div className="w-full">
            <h4 className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 md:mb-5 text-center xl:text-left">
              {personalSteps ? "Доступные форматы" : "Программы"}
            </h4>
            <div className={`grid grid-cols-1 gap-2 md:gap-4 ${personalSteps ? "sm:grid-cols-2 lg:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
              {items.map((item: any, idx: number) => {
                const isPersonal = item.isPersonal;
                const isCorporate = item.isCorporate;
                
                let cardClassName = "flex flex-col bg-gray-50/80 dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.06] rounded-xl sm:rounded-2xl p-3 sm:p-5 content-start relative group/card hover:border-brand/20 transition-colors";
                let titleClassName = "font-semibold text-gray-900 dark:text-white text-sm sm:text-[16px] leading-tight";
                
                if (isPersonal) {
                  cardClassName = "flex flex-col bg-gray-50/80 dark:bg-white/[0.03] border border-brand/20 dark:border-brand/30 rounded-xl sm:rounded-2xl p-3 sm:p-5 content-start relative group/card hover:border-brand/50 transition-colors shadow-md shadow-brand/5 overflow-hidden";
                } else if (isCorporate) {
                  cardClassName = "flex flex-col bg-gradient-to-br from-gray-50/80 to-brand/5 dark:from-white/[0.04] dark:to-brand/10 border border-gray-100 dark:border-white/[0.06] rounded-xl sm:rounded-2xl p-3 sm:p-5 content-start relative group/card hover:border-brand/30 transition-colors shadow-lg shadow-brand/10 overflow-hidden";
                  titleClassName = "font-semibold text-brand dark:text-brand text-sm sm:text-[16px] leading-tight";
                }

                return (
                  <div key={idx} className={cardClassName}>
                    {(isPersonal || isCorporate) && (
                      <div 
                        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(255,83,49,0.18)_0%,transparent_70%)] z-0 group-hover:scale-110 transition-transform duration-700" 
                      />
                    )}
                    <div className="flex justify-between items-start gap-3 mb-1 sm:mb-2 relative z-10">
                       <span className={titleClassName}>{item.title}</span>
                       {item.tags && item.tags.format && (
                         <span className="shrink-0 inline-flex items-center gap-1 text-[9px] sm:text-[11px] font-medium bg-gray-200/60 dark:bg-white/10 text-gray-700 dark:text-gray-300 px-1.5 py-0.5 rounded-md">{item.tags.format}</span>
                       )}
                    </div>
                    {item.desc && <span className="text-gray-600 dark:text-gray-400 text-[11px] sm:text-[13px] leading-relaxed mb-2 sm:mb-3">{item.desc}</span>}
                    
                    {item.tags && (
                      <div className="flex flex-nowrap items-center gap-1.5 mt-auto overflow-x-auto w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-0.5">
                        {item.tags.duration && (
                           <span className="shrink-0 whitespace-nowrap inline-flex items-center gap-1 text-[9px] sm:text-[11px] font-medium bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 px-1.5 py-1 rounded-md">
                             <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 text-brand"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                             {item.tags.duration}
                           </span>
                        )}
                        {item.tags.people && (
                           <span className="shrink-0 whitespace-nowrap inline-flex items-center gap-1 text-[9px] sm:text-[11px] font-medium bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 px-1.5 py-1 rounded-md">
                             <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 text-brand"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                             {item.tags.people}
                           </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-1 sm:mt-2 text-center xl:text-left w-full sm:w-auto">
          <Link
            to={link}
            className="inline-flex items-center justify-center w-full sm:w-auto gap-2 bg-brand text-white hover:bg-[#e64627] rounded-full px-6 py-3 sm:px-8 sm:py-3.5 sm:pt-[14px] sm:pb-[18px] font-medium transition-colors duration-300 text-xs sm:text-base hover:-translate-y-0.5"
          >
            {linkText} <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 mt-0.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

function CombinedLevelsViewer() {
  const { ref, visible } = useScrollVisible()

  return (
    <section ref={ref} id="directions" className="flex flex-col items-center pb-16 md:pb-24 border-t border-gray-100 dark:border-white/[0.06] bg-gray-50/50 dark:bg-[hsl(220,18%,5%)] pt-16 md:pt-24 min-h-screen transition-colors duration-300">
      <div className="px-4 sm:px-6 md:px-12 w-full max-w-7xl mx-auto flex flex-col items-center">
        <div className={`w-full text-center xl:text-left mb-12 md:mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl sm:text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4 md:mb-6">
            Одна система — три вектора AI-трансформации
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-500 dark:text-gray-400 dark:text-gray-500 max-w-5xl mx-auto xl:mx-0">
            Мы выстраиваем интеграцию нейросетей на трех равноправных уровнях: <span className="text-brand font-medium">топ-менеджмент</span> (стратегия), <span className="text-brand font-medium">масштаб на команды</span> (практика) и <span className="text-brand font-medium">личный трек</span> (индивидуальное погружение).
          </p>
          
        </div>

        {/* Visual Flow Schemes - Hidden per user request */}
        <div className="hidden w-full mb-16">
          <TransformationVectors />
        </div>

        <div className="w-full flex flex-col gap-10">
          {teaserData.map((t, i) => <TeaserCard key={t.id} {...t} index={i} />)}
        </div>
      </div>
    </section>
  )
}

function TransformationVectors() {
  const { ref, visible } = useScrollVisible(0.7)
  const vectors = [
    { 
      num: "01", 
      title: "Топ-менеджмент", 
      desc: "Управленческие форматы",
      color: "text-gray-900 dark:text-white"
    },
    { 
      num: "02", 
      title: "Масштабирование", 
      desc: "Внедрение в команды",
      color: "text-gray-900 dark:text-white"
    },
    { 
      num: "03", 
      title: "Личный ИИ", 
      desc: "Индивидуальный трек",
      color: "text-gray-900 dark:text-white"
    }
  ];

  return (
    <div ref={ref} className="relative w-full">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 w-full relative z-10">
        {vectors.map((vector, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
            className="flex-1 rounded-[1.5rem] bg-white dark:bg-[hsl(220,18%,10%)] border border-gray-200 dark:border-white/[0.06] p-6 lg:p-8 flex flex-col items-start lg:items-center lg:text-center relative overflow-hidden group hover:border-brand/30 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <div className="absolute top-0 right-0 lg:left-1/2 w-32 h-32 bg-brand/5 blur-[40px] rounded-full lg:-translate-x-1/2 -translate-y-1/2 pointer-events-none group-hover:bg-brand/10 transition-colors duration-500" />
            
            <div className="flex flex-row lg:flex-col items-center gap-4 lg:gap-0 w-full lg:w-auto">
              <div className="w-12 h-12 rounded-full bg-brand/10 text-brand flex items-center justify-center font-bold text-lg lg:mb-4 relative z-10 transition-transform duration-500 group-hover:scale-110 shrink-0">
                {vector.num}
              </div>
              
              <div className="relative z-10 flex-1">
                 <h3 className={`text-xl font-bold tracking-tight mb-1 lg:mb-2 ${vector.color}`}>{vector.title}</h3>
                 <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{vector.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}


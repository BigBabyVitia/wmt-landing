import React, { useEffect, useRef, useState, lazy, Suspense } from "react"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { NavbarV2 } from "@/components/NavbarV2"
import { useVersion } from "@/context/VersionContext"
import { LogoCloud } from "@/components/ui/logo-cloud"
import { clients } from "@/data/clients"

const UnicornScene = lazy(() => import("unicornstudio-react"))
import { TrustStrip } from "@/components/TrustStrip"
import { V2Card } from "@/components/ui/V2Card"
import { FreePlatform } from "@/components/FreePlatform"
import { MainCta } from "@/components/MainCta"
import { directions, hub } from "@/data/directions"

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

export function HomeV2() {
  const { heroStyle } = useVersion()

  return (
    <>
      {/* ── HERO ── */}
      {heroStyle === "webgl" ? <HeroWebGL /> : <HeroVideo />}

      {/* ── ВЫЗОВЫ ── */}
      <ChallengesSection />

      {/* ── МАРШРУТ ИЗ 4 НАПРАВЛЕНИЙ ── */}
      <LevelsSection />

      {/* ── TRUST / ЭКСПЕРТ ── */}
      <TrustStrip />

      {/* ── КАК НАЧАТЬ ── */}
      <HowToStart />

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
          <a href="#directions" className="bg-black text-white border border-white/10 rounded-full text-center px-6 py-3.5 sm:px-12 sm:py-4 text-sm sm:text-base font-semibold hover:bg-zinc-900 transition-all duration-300 shadow-xl hover:-translate-y-0.5 inline-block btn-optical-hero">
            Посмотреть направления
          </a>
          <a href="#contact" className="bg-white text-black rounded-full text-center px-6 py-3.5 sm:px-10 sm:py-4 text-sm sm:text-base font-semibold hover:bg-gray-100 transition-all duration-300 shadow-[0_4px_24px_rgba(255,255,255,0.2)] hover:shadow-[0_4px_32px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 inline-block btn-optical-hero">
            Обсудить задачу
          </a>
        </div>

      </div>

      {/* Hero Logos Section */}
      <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 left-0 right-0 w-full z-20 animate-fade-rise-delay-2 pointer-events-none pb-[env(safe-area-inset-bottom)]">
        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="text-center mb-2 sm:mb-4">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">Нам доверяют обучение</span>
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
          <a href="#directions" className="bg-black text-white border border-white/10 rounded-full text-center px-6 py-3.5 sm:px-12 sm:py-4 text-sm sm:text-base font-semibold hover:bg-zinc-900 transition-all duration-300 shadow-xl hover:-translate-y-0.5 inline-block btn-optical-hero">
            Посмотреть направления
          </a>
          <a href="#contact" className="bg-white text-black rounded-full text-center px-6 py-3.5 sm:px-10 sm:py-4 text-sm sm:text-base font-semibold hover:bg-gray-100 transition-all duration-300 shadow-[0_4px_24px_rgba(255,255,255,0.2)] hover:shadow-[0_4px_32px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 inline-block btn-optical-hero">
            Обсудить задачу
          </a>
        </div>

      </div>

      {/* Hero Logos Section */}
      <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 left-0 right-0 w-full z-20 animate-fade-rise-delay-2 pointer-events-none pb-[env(safe-area-inset-bottom)]">
        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="text-center mb-4">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">Нам доверяют обучение</span>
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

  return (
    <section ref={ref} id="directions" className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-gray-50 dark:bg-[hsl(220,18%,4%)] border-t border-gray-100 dark:border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6">
            Маршрут из 4 направлений
          </h2>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 dark:text-gray-500 max-w-5xl">
            Не набор курсов, а единый маршрут: <span className="text-brand font-medium">руководители</span> → <span className="text-brand font-medium">команда</span> → <span className="text-brand font-medium">агенты</span> → <span className="text-brand font-medium">процессы</span>. Каждое направление работает само по себе и ведёт к следующему — а состав собираем под вашу компанию.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {directions.map((d, idx) => (
            <Link
              key={d.slug}
              to={`/${d.slug}`}
              className="block h-full"
            >
              <V2Card
                visible={visible}
                index={idx}
                className="h-full"
                contentClassName="p-7 sm:p-8 md:p-9"
              >
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mt-1 mb-3 relative z-10 group-hover:text-brand transition-colors leading-tight">
                  {d.cardTitle}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-6 relative z-10 max-w-md">
                  {d.card.teaser}
                </p>

                {/* Nested programs block */}
                <div className="relative z-10 mb-6">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400 dark:text-white/30 mb-2.5">
                    Программы
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {d.card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium text-gray-700 dark:text-white/70 bg-gray-100/80 dark:bg-white/[0.06] border border-gray-200/60 dark:border-white/[0.06] rounded-full px-3 py-1.5 leading-none backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Outcome footer */}
                <div className="relative z-10 mt-auto pt-5 border-t border-gray-100 dark:border-white/10">
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-snug">
                    <span className="font-semibold text-gray-900 dark:text-white">На выходе:</span> {d.card.out}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-brand font-semibold text-sm group-hover:gap-3 transition-all">
                    Подробнее о направлении <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </V2Card>
            </Link>
          ))}
        </div>

        <p className="text-sm text-gray-400 dark:text-gray-500 mt-8">
          Платформа и библиотека уроков — бесплатный подготовительный уровень для самостоятельного старта.
        </p>
      </div>
    </section>
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
        <div className={`mb-12 md:mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-3xl leading-relaxed">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <div
              key={step.n}
              className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
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

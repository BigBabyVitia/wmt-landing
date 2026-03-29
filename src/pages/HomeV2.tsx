import { useEffect, useRef, useState, lazy, Suspense } from "react"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { NavbarV2 } from "@/components/NavbarV2"
import { useVersion } from "@/context/VersionContext"

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
    desc: "ИИ перестал быть темой «на потом» и стал фактором скорости, качества и эффективности.",
  },
  {
    title: "Большой бизнес не перестраивается сам",
    desc: "Чем крупнее компания, тем сложнее превратить интерес к ИИ в реальное изменение процессов, решений и повседневной работы.",
  },
  {
    title: "Локальная польза не меняет систему",
    desc: "Отдельные эксперименты могут быть полезны, но без глубокого и последовательного внедрения почти не влияют на результат компании в целом.",
  },
  {
    title: "Ошибка в треке обходится слишком дорого",
    desc: "Если AI-трансформация идёт хаотично или по неподходящему сценарию, усилия, время и инвестиции легко уходят в точечные улучшения без большого эффекта для бизнеса.",
  },
]

const levels = [
  {
    label: "Уровень 1. Управленческий",
    title: "Руководство принимает решение и видит ценность",
    desc: "Три управленческих формата — под разную глубину и задачу. Результат: руководство понимает, зачем ИИ, как внедрять и что запускать первым.",
    tags: ["Системный ИИ", "Бизнес 2.0", "ИИ-марафон для топов"],
    link: "/executive",
    linkText: "Выбрать управленческий формат",
  },
  {
    label: "Уровень 2. Масштабирование",
    title: "Практика расширяется на команды и компанию",
    desc: "Пилоты, команды-чемпионы, корпоративная волна, сборка агентов. ИИ выходит из кабинета руководителя в рабочие процессы.",
    tags: ["Цифровой каркас", "Мышление 2.0", "ИИ-марафон", "Agent Builder Day", "n8n + Claude"],
    link: "/teams",
    linkText: "Подобрать программу для команды",
  },
  {
    label: "Уровень 3. Личный",
    title: "Углубление для тех, кто хочет пройти тему лично",
    desc: "Офлайн-интенсив — два дня руками, с собственной стратегией и агентом. Часто после него тема возвращается в компанию на другом уровне.",
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
    <section id="home" className="relative w-full h-screen overflow-hidden bg-black flex flex-col pt-24 pb-40">
      <NavbarV2 variant="home" />
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-70">
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 mt-12">
        <h1 className="text-5xl md:text-6xl lg:text-[72px] leading-[1.05] tracking-tight max-w-[1000px] font-semibold text-white animate-fade-rise">
          WMT перестраивает бизнес под&nbsp;<em className="not-italic text-brand font-bold">ИИ</em>
        </h1>
        <p className="text-gray-200 text-base md:text-lg lg:text-xl max-w-3xl mt-8 leading-relaxed animate-fade-rise-delay">
          От решения руководства до рабочих команд. Каждый формат работает сам по себе и ведёт в следующий.
        </p>
        <div className="flex flex-wrap justify-center items-center gap-4 mt-8 animate-fade-rise-delay-2">
          {["50+ проектов 2024–2026", "80–85% практики руками", "Рабочие агенты на выходе"].map((t) => (
            <div key={t} className="bg-white/5 backdrop-blur-md border border-white/10 text-white/90 px-4 py-2 rounded-full text-sm font-medium">
              {t}
            </div>
          ))}
        </div>
        <div className="flex flex-row items-center justify-center gap-4 mt-12 animate-fade-rise-delay-2">
          <a href="#directions" className="bg-white dark:bg-[hsl(220,20%,7%)] text-gray-900 dark:text-white rounded-full px-12 py-4 text-base font-semibold hover:bg-gray-100 dark:hover:bg-[hsl(220,18%,14%)] transition-all duration-300 shadow-[0_4px_24px_rgba(255,255,255,0.2)] hover:shadow-[0_4px_32px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 inline-block">
            Узнать, что подойдёт
          </a>
          <Link to="/all-formats" className="liquid-glass rounded-full px-12 py-4 text-base font-medium text-white hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5 inline-block">
            Сравнить программы
          </Link>
        </div>
      </div>
    </section>
  )
}

function HeroWebGL() {
  const overlayClass = "bg-black dark:bg-[hsl(220,20%,4%)]/25"
  const gradientClass = ""
  const subShadow = "0 1px 12px rgba(0,0,0,0.4)"

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden bg-black flex flex-col pt-24 pb-40">
      <NavbarV2 variant="home" />

      {/* Unicorn Studio WebGL background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-black dark:bg-[hsl(220,20%,4%)]" />}>
          <UnicornScene
            projectId="jJjGTV0vcy9VIfmO9Wr8"
            sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.5/dist/unicornStudio.umd.js"
            width="100%"
            height="100%"
          />
        </Suspense>
      </div>

      {/* Contrast layers */}
      {overlayClass && <div className={`absolute inset-0 z-[1] transition-all duration-500 ${overlayClass}`} />}
      {gradientClass && <div className={`absolute inset-0 z-[2] transition-all duration-500 ${gradientClass}`} />}

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 mt-12">
        <h1
          className="text-5xl md:text-6xl lg:text-[72px] leading-[1.05] tracking-tight max-w-[1000px] font-semibold text-white animate-fade-rise"
        >
          WMT перестраивает бизнес под&nbsp;<em className="not-italic text-white font-bold">ИИ</em>
        </h1>
        <p
          className="text-gray-200 text-base md:text-lg lg:text-xl max-w-3xl mt-8 leading-relaxed animate-fade-rise-delay"
          style={subShadow ? { textShadow: subShadow } : undefined}
        >
          От решения руководства до рабочих команд. Каждый формат работает сам по себе и ведёт в следующий.
        </p>
        <div className="flex flex-wrap justify-center items-center gap-4 mt-8 animate-fade-rise-delay-2">
          {["50+ проектов 2024–2026", "80–85% практики руками", "Рабочие агенты на выходе"].map((t) => (
            <div key={t} className="bg-black dark:bg-[hsl(220,20%,4%)]/30 backdrop-blur-md border border-white/10 text-white/90 px-4 py-2 rounded-full text-sm font-medium" style={subShadow ? { textShadow: subShadow } : undefined}>
              {t}
            </div>
          ))}
        </div>
        <div className="flex flex-row items-center justify-center gap-4 mt-12 animate-fade-rise-delay-2">
          <a href="#directions" className="bg-white dark:bg-[hsl(220,20%,7%)] text-gray-900 dark:text-white rounded-full px-12 py-4 text-base font-semibold hover:bg-gray-100 dark:hover:bg-[hsl(220,18%,14%)] transition-all duration-300 shadow-[0_4px_24px_rgba(255,255,255,0.2)] hover:shadow-[0_4px_32px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 inline-block">
            Узнать, что подойдёт
          </a>
          <Link to="/all-formats" className="liquid-glass rounded-full px-12 py-4 text-base font-medium text-white hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5 inline-block">
            Сравнить программы
          </Link>
        </div>
      </div>


    </section>
  )
}

/* ── Sub-components ── */

function ChallengesSection() {
  const { ref, visible } = useScrollVisible()

  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-white dark:bg-[hsl(220,20%,7%)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6">
            ИИ уже меняет рынок.<br />Готова ли ваша компания к этому переходу?
          </h2>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 dark:text-gray-500 max-w-4xl">
            Многие уже видят потенциал ИИ. Но чем крупнее компания, тем сложнее добиться реального эффекта. Нужен точный подход к AI-трансформации и свой трек изменений.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {challenges.map((c, idx) => (
            <div
              key={idx}
              className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: visible ? `${200 + idx * 120}ms` : "0ms" }}
            >
              <div className="group relative bg-gray-50 dark:bg-white/[0.03] rounded-2xl p-8 border border-gray-100 dark:border-white/[0.06] transition-all duration-300 cursor-default overflow-hidden hover:border-brand/30 hover:shadow-md hover:shadow-brand/10 hover:-translate-y-1 h-full transform-gpu [backface-visibility:hidden] antialiased will-change-transform">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand/[0.03] to-transparent transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                <div className="relative z-10 flex gap-5 items-start">
                  <div className="flex-shrink-0 mt-1">
                    <ChallengeAppIcon>
                      {challengeSvgs[idx]()}
                    </ChallengeAppIcon>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{c.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 dark:text-gray-500 leading-relaxed text-base">{c.desc}</p>
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
    <section ref={ref} id="directions" className="py-24 px-6 md:px-12 bg-gray-50 dark:bg-[hsl(220,18%,10%)] border-t border-gray-100 dark:border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6">
            Одна система — три уровня готовности
          </h2>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 dark:text-gray-500 max-w-5xl">
            WMT не продаёт отдельные курсы. Каждый формат работает самостоятельно и переводит в следующий: <span className="text-brand font-medium">управление</span> → <span className="text-brand font-medium">масштабирование</span> → <span className="text-brand font-medium">личное углубление</span>. Каждый уровень вытекает из предыдущего, компания продвигается в своём темпе.
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
    title: "Когда ИИ нужно запускать сверху",
    desc: "Когда на столе много предложений, а общего решения нет — начинать нужно не с пилота и не с массового обучения. Нужен управленческий ход.",
    items: [
      "Системный ИИ — когда нужно выровнять руководство и получить план на 90 дней.",
      "Бизнес 2.0 — когда нужен глубокий пересмотр стратегии и операционной модели под ИИ.",
      "ИИ-марафон для топ-менеджеров — когда руководители должны не только понять тему, а пройти месяц практики.",
    ],
    link: "/executive",
    linkText: "Выбрать управленческий формат",
  },
  {
    id: "teams-teaser",
    title: "Когда команде нужна практика, а не ещё один разговор",
    desc: "Здесь живут форматы для тех, кто уже прошёл управленческое выравнивание или кому оно не нужно — задача и люди уже есть.",
    items: [
      "Цифровой каркас — построение архитектуры ИИ-перехода и запуск первого пилота за 3–5 часов.",
      "Мышление 2.0 — ядро практиков за 1–1,5 дня, 80% практики.",
      "ИИ-марафон — широкая волна на 10 недель, 100% руками.",
      "Agent Builder Day — рабочий агент у каждого за один день.",
      "n8n + Claude — глубокая малогрупповая программа по сборке агентов.",
    ],
    link: "/teams",
    linkText: "Подобрать программу для команды",
  },
  {
    id: "personal-teaser",
    title: "Если вы хотите разобраться сами, а не отправлять команду",
    desc: "Два дня, руками, с собственной стратегией и собственным агентом. Без корпоративного контекста и без массовой группы. После интенсива тема часто возвращается в компанию — уже с другим пониманием и другим качеством вопросов.",
    items: [],
    link: "/personal-ai",
    linkText: "Узнать про личный интенсив",
  }
];

export function DirectionTeasersCards() {
  return (
    <section className="py-24 px-6 md:px-12 bg-gray-50/50 dark:bg-[hsl(220,18%,5%)] relative overflow-hidden border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-300">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col gap-10 relative z-10 text-center">
        {teaserData.map((teaser, i) => (
          <TeaserCard key={teaser.id} {...teaser} index={i} />
        ))}
      </div>
    </section>
  );
}

function TeaserCard({ id, title, desc, items, link, linkText, index }: any) {
  const { ref, visible } = useScrollVisible(0.15);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      ref={ref}
      id={id}
      className={`relative group w-full rounded-[2.5rem] border border-gray-200 dark:border-white/10/60 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] transition-all duration-700 overflow-hidden text-left ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
      style={{ transitionDelay: visible ? `${index * 150}ms` : "0ms" }}
      onMouseMove={handleMouseMove}
    >
      {/* Background Glow Pattern (like EllipseGradient) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255, 83, 49, 0.08) 0%, rgba(255, 83, 49, 0.03) 40%, transparent 100%)"
        }}
      />

      {/* Background Grid Pattern with fade-out mask */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.5] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_30%,transparent_100%)]" 
        style={{
          backgroundImage: `linear-gradient(to right, rgba(128,128,128,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(128,128,128,0.15) 1px, transparent 1px)`,
          backgroundSize: '72px 72px',
          backgroundPosition: 'center center'
        }}
      />

      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(700px circle at ${mouseX}px ${mouseY}px, rgba(255, 83, 49, 0.08), transparent 80%)`,
        }}
      />
      
      <div className="p-8 md:p-14 relative z-10 flex flex-col gap-10">
        <div className="w-full text-center xl:text-left">
          <h3 className="text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-5">{title}</h3>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 dark:text-gray-500 leading-relaxed max-w-3xl mx-auto xl:mx-0">{desc}</p>
        </div>
        
        {items.length > 0 && (
          <div className="w-full">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 dark:text-gray-500 mb-5 text-center xl:text-left">Программы</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item: string, idx: number) => {
                const parts = item.split(" — ");
                return (
                  <div key={idx} className="flex flex-col gap-1.5 bg-gray-50/80 dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.06] rounded-2xl p-5 content-start">
                    <span className="font-semibold text-gray-900 dark:text-white text-base leading-tight">{parts[0]}</span>
                    {parts[1] && <span className="text-gray-600 dark:text-gray-400 dark:text-gray-500 text-sm leading-snug">{parts[1]}</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-2 text-center xl:text-left">
          <Link
            to={link}
            className="inline-flex items-center gap-2 bg-brand text-white hover:bg-[#e64627] rounded-full px-8 pt-[14px] pb-[18px] font-medium transition-colors duration-300 text-base hover:-translate-y-0.5"
          >
            {linkText} <ArrowRight className="w-5 h-5 ml-1 mt-0.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

function CombinedLevelsViewer() {
  const { ref, visible } = useScrollVisible()

  const mergedData = [
    {
      ...teaserData[0],
      title: "Шаг 1. Управленческий ход",
      desc: "Руководство принимает решение и видит бизнес-ценность ИИ. Эффективно, когда нужно запускать тему сверху — если на столе много хаотичных предложений, а единой стратегии масштабирования нет."
    },
    {
      ...teaserData[1],
      title: "Шаг 2. Масштабирование на команды",
      desc: "Практика расширяется на отделы и рабочих агентов. Здесь живут форматы для тех, кто уже прошёл управленческое выравнивание или кому оно не нужно — конкретная задача и люди под неё уже есть."
    },
    {
      ...teaserData[2],
      title: "Шаг 3. Личное углубление",
      desc: "Если вы хотите разобраться во всём руками, а не просто управлять командой. Два дня интенсива, с собственной стратегией и сборкой собственного агента без корпоративного контекста."
    }
  ]
  
  return (
    <section ref={ref} id="directions" className="flex flex-col items-center pb-24 border-t border-gray-100 dark:border-white/[0.06] bg-gray-50/50 dark:bg-[hsl(220,18%,5%)] pt-24 min-h-screen transition-colors duration-300">
      <div className="px-6 md:px-12 w-full max-w-7xl mx-auto flex flex-col items-center">
        <div className={`w-full mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6">
            Одна система — три уровня готовности
          </h2>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 dark:text-gray-500 max-w-5xl">
            WMT не продаёт отдельные курсы. Каждый формат работает самостоятельно и переводит компанию на следующий уровень: <span className="text-brand font-medium">от управления</span> → <span className="text-brand font-medium">через масштабирование</span> → <span className="text-brand font-medium">в практику</span>.
          </p>
        </div>

        <div className="w-full flex flex-col gap-10">
          {mergedData.map((t, i) => <TeaserCard key={t.id} {...t} index={i} />)}
        </div>
      </div>
    </section>
  )
}



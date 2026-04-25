import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

/* 4-point sparkle star path */
const sparkle = (cx: number, cy: number, r: number) =>
  `M${cx} ${cy - r} C${cx + r * 0.15} ${cy - r * 0.15} ${cx + r * 0.15} ${cy - r * 0.15} ${cx + r} ${cy} C${cx + r * 0.15} ${cy + r * 0.15} ${cx + r * 0.15} ${cy + r * 0.15} ${cx} ${cy + r} C${cx - r * 0.15} ${cy + r * 0.15} ${cx - r * 0.15} ${cy + r * 0.15} ${cx - r} ${cy} C${cx - r * 0.15} ${cy - r * 0.15} ${cx - r * 0.15} ${cy - r * 0.15} ${cx} ${cy - r}Z`

const P = "format-svg-path"
const C = "#ff5331"

const icons = [
  // 1. Ромб + расходящиеся стрелки + sparkle
  <svg viewBox="-20 -20 200 200" fill="none" className="w-full h-full">
    {/* Ромб */}
    <path d="M80 20 L140 80 L80 140 L20 80 Z" stroke={C} strokeWidth="2" strokeLinejoin="round"
      className={P} style={{ strokeDasharray: 340, strokeDashoffset: 340 }} />
    {/* Стрелки по диагоналям */}
    <path d="M120 40 L155 5" stroke={C} strokeWidth="1.5" strokeLinecap="round"
      className={P} style={{ strokeDasharray: 50, strokeDashoffset: 50 }} />
    <path d="M140 5 L155 5 L155 20" stroke={C} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={P} style={{ strokeDasharray: 30, strokeDashoffset: 30 }} />
    <path d="M40 40 L10 10" stroke={C} strokeWidth="1.5" strokeLinecap="round"
      className={P} style={{ strokeDasharray: 42, strokeDashoffset: 42 }} />
    <path d="M120 120 L150 150" stroke={C} strokeWidth="1.5" strokeLinecap="round"
      className={P} style={{ strokeDasharray: 42, strokeDashoffset: 42 }} />
    {/* Sparkle */}
    <path d={sparkle(160, 80, 10)} stroke={C} strokeWidth="1.5"
      className={P} style={{ strokeDasharray: 80, strokeDashoffset: 80 }} />
    <path d={sparkle(0, 140, 8)} stroke={C} strokeWidth="1"
      className={P} style={{ strokeDasharray: 64, strokeDashoffset: 64 }} />
    <path d={sparkle(80, 165, 6)} stroke={C} strokeWidth="1"
      className={P} style={{ strokeDasharray: 48, strokeDashoffset: 48 }} />
  </svg>,

  // 2. Два квадрата со смещением + sparkle
  <svg viewBox="-20 -20 200 200" fill="none" className="w-full h-full">
    <rect x="10" y="10" width="70" height="70" rx="8" stroke={C} strokeWidth="2"
      className={P} style={{ strokeDasharray: 280, strokeDashoffset: 280 }} />
    <rect x="60" y="60" width="70" height="70" rx="8" stroke={C} strokeWidth="2"
      className={P} style={{ strokeDasharray: 280, strokeDashoffset: 280 }} />
    <path d={sparkle(145, 25, 12)} stroke={C} strokeWidth="1.5"
      className={P} style={{ strokeDasharray: 95, strokeDashoffset: 95 }} />
    <path d={sparkle(20, 145, 8)} stroke={C} strokeWidth="1"
      className={P} style={{ strokeDasharray: 64, strokeDashoffset: 64 }} />
    <path d={sparkle(155, 110, 6)} stroke={C} strokeWidth="1"
      className={P} style={{ strokeDasharray: 48, strokeDashoffset: 48 }} />
  </svg>,

  // 3. Фигурные скобки { } + sparkle внутри
  <svg viewBox="-20 -20 200 200" fill="none" className="w-full h-full">
    {/* Левая скобка { */}
    <path d="M55 10 C30 10 30 40 30 60 C30 75 15 80 15 80 C15 80 30 85 30 100 C30 120 30 150 55 150"
      stroke={C} strokeWidth="2.5" strokeLinecap="round" fill="none"
      className={P} style={{ strokeDasharray: 280, strokeDashoffset: 280 }} />
    {/* Правая скобка } */}
    <path d="M105 10 C130 10 130 40 130 60 C130 75 145 80 145 80 C145 80 130 85 130 100 C130 120 130 150 105 150"
      stroke={C} strokeWidth="2.5" strokeLinecap="round" fill="none"
      className={P} style={{ strokeDasharray: 280, strokeDashoffset: 280 }} />
    {/* Sparkle внутри скобок */}
    <path d={sparkle(80, 80, 14)} stroke={C} strokeWidth="1.5"
      className={P} style={{ strokeDasharray: 110, strokeDashoffset: 110 }} />
    <path d={sparkle(65, 45, 7)} stroke={C} strokeWidth="1"
      className={P} style={{ strokeDasharray: 56, strokeDashoffset: 56 }} />
    <path d={sparkle(100, 120, 9)} stroke={C} strokeWidth="1"
      className={P} style={{ strokeDasharray: 72, strokeDashoffset: 72 }} />
    {/* Sparkle снаружи */}
    <path d={sparkle(155, 30, 8)} stroke={C} strokeWidth="1"
      className={P} style={{ strokeDasharray: 64, strokeDashoffset: 64 }} />
    <path d={sparkle(5, 140, 6)} stroke={C} strokeWidth="1"
      className={P} style={{ strokeDasharray: 48, strokeDashoffset: 48 }} />
  </svg>,

  // 4. Концентрические круги + sparkle
  <svg viewBox="-20 -20 200 200" fill="none" className="w-full h-full">
    <circle cx="80" cy="80" r="20" stroke={C} strokeWidth="1.5"
      className={P} style={{ strokeDasharray: 126, strokeDashoffset: 126 }} />
    <circle cx="80" cy="80" r="40" stroke={C} strokeWidth="1.5"
      className={P} style={{ strokeDasharray: 251, strokeDashoffset: 251 }} />
    <circle cx="80" cy="80" r="60" stroke={C} strokeWidth="1.5"
      className={P} style={{ strokeDasharray: 377, strokeDashoffset: 377 }} />
    <circle cx="80" cy="80" r="80" stroke={C} strokeWidth="1" opacity="0.4"
      className={P} style={{ strokeDasharray: 503, strokeDashoffset: 503 }} />
    <path d={sparkle(145, 20, 13)} stroke={C} strokeWidth="1.5"
      className={P} style={{ strokeDasharray: 104, strokeDashoffset: 104 }} />
    <path d={sparkle(15, 150, 9)} stroke={C} strokeWidth="1"
      className={P} style={{ strokeDasharray: 72, strokeDashoffset: 72 }} />
    <path d={sparkle(160, 140, 7)} stroke={C} strokeWidth="1"
      className={P} style={{ strokeDasharray: 56, strokeDashoffset: 56 }} />
  </svg>,
]

export function Formats() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [activeCard, setActiveCard] = useState<number>(0)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const formats = [
    {
      title: "Стратегическая сессия",
      subtitle: "2 часа с CEO и советом директоров",
      items: ["Приоритеты и road-map на 90 дней", "Три live-демо агентов", "15 кейсов с ROI"],
      path: "/managers"
    },
    {
      title: "Цифровой каркас",
      subtitle: "3-5 часов рабочей сессии",
      items: ["1-2 пилота, готовых к запуску", "Владельцы и метрики", "Карта блокеров и порядок согласования"],
      path: "/pilots"
    },
    {
      title: "Хакатон Мышление 2.0",
      subtitle: "10 часов, команда 10-30 человек",
      items: ["ИИ-рабочее место для каждого", "Сборка агента на реальных данных", "Решённый бизнес-кейс"],
      path: "/team"
    },
    {
      title: "Волна",
      subtitle: "10 недель, 50-500 сотрудников",
      items: ["30 занятий с геймификацией", "Проверки заданий и рейтинги", "Библиотека решений и внутренние проводники"],
      path: "/wave"
    }
  ]

  return (
    <section id="formats" className="py-20 md:py-32 px-4 sm:px-6 md:px-12 bg-[#0F0F24] dark:bg-[#0F0F24]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24">
          <div className="text-brand text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-4">Форматы</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            Как мы работаем
          </h2>
          <p className="text-lg md:text-2xl text-gray-500 dark:text-[#94A3B8] max-w-3xl leading-relaxed">
            Выберите точку входа в зависимости от вашей ситуации
          </p>
        </div>

        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {formats.map((f, idx) => (
            <Link
              key={idx}
              to={f.path}
              onMouseEnter={() => setActiveCard(idx)}
              className={`group relative flex flex-col justify-between border border-white/5 bg-[#161B26] hover:border-white/10 rounded-2xl p-8 lg:p-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: visible ? `${idx * 150}ms` : "0ms" }}
            >
              {/* Animated SVG — large, overflows card edges */}
              <div className={`absolute -top-12 -right-12 w-56 h-56 lg:w-64 lg:h-64 transition-opacity duration-500 hidden md:block pointer-events-none opacity-20 group-hover:opacity-40 ${activeCard === idx ? "format-active" : ""}`}>
                {icons[idx]}
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-brand transition-colors">
                  {f.title}
                </h3>
                <p className="text-[#94A3B8] text-sm md:text-base mb-8 uppercase tracking-wide font-medium">{f.subtitle}</p>
                <ul className="space-y-4">
                  {f.items.map((item, i) => (
                    <li key={i} className="flex items-start text-gray-700 dark:text-[#CBD5E1] text-base md:text-lg">
                      <span className="text-brand mr-3 mt-1.5 text-[10px] shrink-0">&#9679;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative z-10 mt-12 md:mt-16">
                <span className="inline-flex items-center text-brand text-lg font-bold group-hover:translate-x-2 transition-transform">
                  Узнать программу <ArrowRight className="w-5 h-5 ml-2" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

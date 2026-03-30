import { useEffect, useRef, useState } from "react"
import { AnimatedCard, CardBody, CardTitle, CardDescription, CardVisual, Visual1, Visual2, VisualTeam, Visual3 } from "@/components/ui/animated-card-chart"

const C = "#ff5331"
// const P = "format-svg-path"

/* ── Вариант A: UI-компоненты ── */
const uiIllustrations = [
  // 1. Нет приоритета — широкая схема со стрелками
  <div className="flex items-center justify-center">
    <svg viewBox="0 0 400 180" fill="none" className="w-full max-w-md">
      <defs>
        <marker id="arrowGray" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M1 1 L7 4 L1 7" stroke="#9ca3af" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
      {/* Центральная точка */}
      <circle cx="200" cy="90" r="12" fill={C} opacity="0.12" />
      <circle cx="200" cy="90" r="4" fill={C} />

      {/* Маркетинг — верх-лево */}
      <line x1="192" y1="83" x2="110" y2="35" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowGray)" />
      <rect x="30" y="20" width="75" height="24" rx="12" fill="#f3f4f6" />
      <text x="67" y="36" textAnchor="middle" fontSize="10" fill="#4b5563" fontFamily="sans-serif">Маркетинг</text>

      {/* ИТ — верх-право */}
      <line x1="208" y1="83" x2="320" y2="30" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowGray)" />
      <rect x="325" y="16" width="50" height="24" rx="12" fill="#f3f4f6" />
      <text x="350" y="32" textAnchor="middle" fontSize="10" fill="#4b5563" fontFamily="sans-serif">ИТ</text>

      {/* Финансы — низ-лево */}
      <line x1="192" y1="97" x2="110" y2="142" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowGray)" />
      <rect x="30" y="130" width="75" height="24" rx="12" fill="#f3f4f6" />
      <text x="67" y="146" textAnchor="middle" fontSize="10" fill="#4b5563" fontFamily="sans-serif">Финансы</text>

      {/* HR — низ-право */}
      <line x1="208" y1="97" x2="325" y2="148" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowGray)" />
      <rect x="330" y="136" width="50" height="24" rx="12" fill="#f3f4f6" />
      <text x="355" y="152" textAnchor="middle" fontSize="10" fill="#4b5563" fontFamily="sans-serif">HR</text>

      {/* Стрелка вниз */}
      <line x1="200" y1="102" x2="200" y2="165" stroke="#d1d5db" strokeWidth="1.5" markerEnd="url(#arrowGray)" />
    </svg>
  </div>,

  // 2. Нет первого пилота — список идей со статусами
  <div className="flex flex-col gap-2 justify-center">
    {[
      { text: "ИИ-ассистент для продаж", status: "отложено" },
      { text: "Автоматизация отчётности", status: "нет владельца" },
      { text: "Чат-бот поддержки", status: "не прошёл ИБ" },
    ].map((item, i) => (
      <div key={i} className="flex items-center justify-between rounded-xl bg-gray-50 dark:bg-[hsl(220,18%,10%)] px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded border-2 border-gray-200 dark:border-white/10 shrink-0" />
          <span className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-500">{item.text}</span>
        </div>
        <span className="text-xs text-gray-400 dark:text-gray-500 bg-white dark:bg-[hsl(220,20%,7%)] px-3 py-1.5 rounded-lg whitespace-nowrap">{item.status}</span>
      </div>
    ))}
    <div className="flex items-center justify-between rounded-xl px-4 py-2.5" style={{ backgroundColor: `${C}08`, border: `1.5px solid ${C}20` }}>
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 rounded border-2 shrink-0" style={{ borderColor: C }} />
        <span className="text-sm font-semibold text-gray-900 dark:text-white">Ваш первый пилот</span>
      </div>
      <span className="text-xs font-semibold text-white px-3.5 py-1.5 rounded-lg" style={{ backgroundColor: C }}>запустить</span>
    </div>
  </div>,

  // 3. Нет команды — две плашки в ряд
  <div className="flex gap-4 items-stretch">
    <div className="flex-1 bg-gray-50 dark:bg-[hsl(220,18%,10%)] rounded-xl px-4 py-4">
      <div className="text-[11px] text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Слышали про ИИ</div>
      <div className="flex -space-x-2 mb-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-8 h-8 rounded-full bg-gray-200 dark:bg-[hsl(220,18%,18%)] border-2 border-gray-50 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M5 20c0-4 3.5-7 7-7s7 3 7 7" />
            </svg>
          </div>
        ))}
      </div>
      <span className="text-xs text-gray-400 dark:text-gray-500">+240</span>
    </div>
    <div className="flex-1 rounded-xl px-4 py-4" style={{ backgroundColor: `${C}06` }}>
      <div className="text-[11px] uppercase tracking-wider mb-3" style={{ color: C }}>Умеют делать</div>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-full border-2 border-dashed flex items-center justify-center" style={{ borderColor: C }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C} strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="8" r="4" />
            <path d="M5 20c0-4 3.5-7 7-7s7 3 7 7" />
          </svg>
        </div>
      </div>
      <span className="text-xs" style={{ color: C }}>0 человек</span>
    </div>
  </div>,

  // 4. placeholder — рендерится отдельно через AnimatedCard
  null,
]

/* ── Вариант B: Крупные SVG (видны сразу) ── */
const svgIllustrations = [
  // 1. Стрелки веером — с маркерами-наконечниками
  <svg viewBox="0 0 300 160" fill="none" className="w-full h-full">
    <defs>
      <marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
        <path d="M1 1 L7 4 L1 7" stroke={C} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </marker>
    </defs>
    <circle cx="150" cy="85" r="10" fill={C} opacity="0.12" />
    <circle cx="150" cy="85" r="4" fill={C} />
    <line x1="150" y1="85" x2="45" y2="20" stroke={C} strokeWidth="1.8" markerEnd="url(#ah)" />
    <line x1="150" y1="85" x2="255" y2="15" stroke={C} strokeWidth="1.8" markerEnd="url(#ah)" />
    <line x1="150" y1="85" x2="25" y2="105" stroke={C} strokeWidth="1.8" markerEnd="url(#ah)" />
    <line x1="150" y1="85" x2="275" y2="115" stroke={C} strokeWidth="1.8" markerEnd="url(#ah)" />
    <line x1="150" y1="85" x2="90" y2="148" stroke={C} strokeWidth="1.8" markerEnd="url(#ah)" />
    <line x1="150" y1="85" x2="210" y2="148" stroke={C} strokeWidth="1.8" markerEnd="url(#ah)" />
  </svg>,

  // 2. Дорога с развилками — путь к пилоту
  <svg viewBox="0 0 300 160" fill="none" className="w-full h-full">
    {/* Основной путь */}
    <path d="M20 80 C60 80 80 80 110 80" stroke={C} strokeWidth="2.5" strokeLinecap="round" />
    {/* Первая развилка — тупик вверх */}
    <path d="M110 80 C130 80 130 50 150 30" stroke={C} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    <circle cx="150" cy="30" r="4" stroke={C} strokeWidth="1.5" opacity="0.3" />
    <path d="M147 27 L153 33 M153 27 L147 33" stroke={C} strokeWidth="1" opacity="0.3" />
    {/* Первая развилка — тупик вниз */}
    <path d="M110 80 C130 80 130 110 150 130" stroke={C} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    <circle cx="150" cy="130" r="4" stroke={C} strokeWidth="1.5" opacity="0.3" />
    <path d="M147 127 L153 133 M153 127 L147 133" stroke={C} strokeWidth="1" opacity="0.3" />
    {/* Продолжение */}
    <path d="M110 80 L180 80" stroke={C} strokeWidth="2.5" strokeLinecap="round" />
    {/* Вторая развилка — тупик */}
    <path d="M180 80 C200 80 200 45 220 30" stroke={C} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    <circle cx="220" cy="30" r="4" stroke={C} strokeWidth="1.5" opacity="0.3" />
    <path d="M217 27 L223 33 M223 27 L217 33" stroke={C} strokeWidth="1" opacity="0.3" />
    {/* Правильный путь */}
    <path d="M180 80 C210 80 230 80 260 80" stroke={C} strokeWidth="2.5" strokeLinecap="round" />
    {/* Финальная точка — успех */}
    <circle cx="270" cy="80" r="8" fill={C} opacity="0.15" />
    <circle cx="270" cy="80" r="4" fill={C} />
    <path d="M265 80 L269 84 L277 76" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,

  // 3. Силуэты людей
  <svg viewBox="0 0 300 160" fill="none" className="w-full h-full">
    <circle cx="55" cy="55" r="18" stroke={C} strokeWidth="1.5" opacity="0.2" />
    <path d="M30 110 Q55 90 80 110" stroke={C} strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
    <circle cx="120" cy="55" r="18" stroke={C} strokeWidth="1.5" opacity="0.2" />
    <path d="M95 110 Q120 90 145 110" stroke={C} strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
    <circle cx="245" cy="55" r="18" stroke={C} strokeWidth="1.5" opacity="0.2" />
    <path d="M220 110 Q245 90 270 110" stroke={C} strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
    {/* Выделенный */}
    <circle cx="185" cy="48" r="22" stroke={C} strokeWidth="3" />
    <path d="M155 110 Q185 88 215 110" stroke={C} strokeWidth="3" strokeLinecap="round" />
  </svg>,

  // 4. Линейный график — плоская линия → резкий взлёт одного
  <svg viewBox="0 0 300 150" fill="none" className="w-full h-full">
    {/* Сетка */}
    <path d="M30 130 L280 130" stroke={C} strokeWidth="0.5" opacity="0.1" />
    <path d="M30 100 L280 100" stroke={C} strokeWidth="0.5" opacity="0.06" />
    <path d="M30 70 L280 70" stroke={C} strokeWidth="0.5" opacity="0.06" />
    <path d="M30 40 L280 40" stroke={C} strokeWidth="0.5" opacity="0.06" />
    {/* Плоская линия компании */}
    <path d="M30 118 Q80 115 120 120 Q160 124 200 118 Q220 115 240 120 L270 118"
      stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* Заливка под плоской линией */}
    <path d="M30 118 Q80 115 120 120 Q160 124 200 118 Q220 115 240 120 L270 118 L270 130 L30 130 Z"
      fill="#d1d5db" opacity="0.08" />
    {/* Взлёт энтузиастов */}
    <path d="M30 110 Q60 108 90 105 Q120 100 150 85 Q180 60 210 35 L240 15"
      stroke={C} strokeWidth="2.5" strokeLinecap="round" fill="none" />
    {/* Заливка под взлётом */}
    <path d="M30 110 Q60 108 90 105 Q120 100 150 85 Q180 60 210 35 L240 15 L240 130 L30 130 Z"
      fill={C} opacity="0.06" />
    {/* Точка на пике */}
    <circle cx="240" cy="15" r="5" fill={C} opacity="0.2" />
    <circle cx="240" cy="15" r="2.5" fill={C} />
    {/* Пунктир — разрыв */}
    <path d="M240 15 L240 130" stroke={C} strokeWidth="1" strokeDasharray="3 3" opacity="0.15" />
  </svg>,
]

export function Problems() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [variant] = useState<"ui" | "svg">("ui")

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

  const illustrations = variant === "ui" ? uiIllustrations : svgIllustrations

  const problems = [
    {
      title: "Презентации вместо решений",
      desc: "Про ИИ говорят на каждом совете, но ни одного решения за три месяца так и не приняли. Тема зависла между «важно» и «непонятно, с чего начинать».",
      symptoms: ["Темы ИИ нет в календаре CEO", "ROI считается «на салфетке»", "Нет выделенного бюджета"],
      action: "Нужен Системный ИИ",
      actionPath: "/executive"
    },
    {
      title: "Локальные эксперименты без системы",
      desc: "Кто-то купил ChatGPT, кто-то сделал бота. Общей картины нет, управленческого решения нет, каждый тянет в свою сторону.",
      symptoms: ["Разрозненные подписки", "ИТ и бизнес не договорятся", "Риски безопасности не закрыты"],
      action: "Нужен Цифровой каркас",
      actionPath: "/pilots"
    },
    {
      title: "Дорогие контракты, которые буксуют",
      desc: "Компания уже подписала вендора или консультанта, но через три месяца стало понятно: люди не готовы, процессы не перестроены, результат под вопросом.",
      symptoms: ["Вендор ждёт ТЗ, а его нет", "Сотрудники саботируют внедрение", "Лицензии куплены, но не используются"],
      action: "Нужно Мышление 2.0",
      actionPath: "/team"
    },
    {
      title: "Руководство ждёт, пока ИТ разберётся",
      desc: "Топ-команда одобрила тему, но сама не включилась. Ожидание: «пусть ИТ или HR сделают». Тема распадается на чужие зоны ответственности.",
      symptoms: ["ИИ воспринимается как ИТ-проект", "Руководители не работают руками", "Нет владельцев бизнес-результата"],
      action: "Нужен ИИ-марафон для топов",
      actionPath: "/executive"
    },
    {
      title: "Один человек тащит тему в одиночку",
      desc: "Руководитель трансформации или CDO взял тему на себя. У него нет мандата сверху, нет команды и нет понятного следующего шага.",
      symptoms: ["Нет мандата на изменения", "Бюджет нужно выпрашивать", "Команда не выделена официально"],
      action: "Нужна стратегия Бизнес 2.0",
      actionPath: "/executive"
    },
  ]

  return (
    <section id="problems" className="py-20 md:py-32 px-4 sm:px-6 md:px-12 bg-[#0B0B1A] dark:bg-[#0B0B1A]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <div className="text-brand text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-4">Знакомо?</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            Где компании обычно застревают
          </h2>
          <p className="text-lg md:text-2xl text-[#94A3B8] max-w-3xl mx-auto leading-relaxed">
            Большинство компаний, которые приходят к нам, находятся в одной из этих ситуаций.
          </p>
        </div>

        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((p, idx) => (
            <div
              key={idx}
              className={`group relative flex flex-col bg-[#161B26] border border-white/5 rounded-2xl p-8 transition-all duration-700 hover:border-white/10 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${idx === 4 ? "md:col-span-2 lg:col-span-1" : ""}`}
              style={{ transitionDelay: visible ? `${idx * 120}ms` : "0ms" }}
            >
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-4 leading-tight group-hover:text-brand transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed mb-8">
                  {p.desc}
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Признаки ситуации</div>
                  {p.symptoms.map((s, i) => (
                    <div key={i} className="flex items-start text-xs text-[#CBD5E1]">
                      <span className="text-brand mr-2 font-bold">✕</span>
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/5">
                <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">Следующий шаг</div>
                <Link 
                  to={p.actionPath}
                  className="inline-flex items-center text-sm font-bold text-brand hover:translate-x-1 transition-transform"
                >
                  {p.action} <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-[#475569] text-sm italic">
            Ни одна из ситуаций не ваша? <Link to="/all-formats" className="text-brand hover:underline">Сравните все программы</Link> или сразу <a href="#apply" className="text-brand hover:underline">обсудите задачу</a>.
          </p>
        </div>
      </div>
    </section>
  )
}

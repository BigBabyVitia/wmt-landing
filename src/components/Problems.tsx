import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
// import { AnimatedCard, CardBody, CardTitle, CardDescription, CardVisual, Visual1, Visual2, VisualTeam, Visual3 } from "@/components/ui/animated-card-chart"

// const C = "#ff5331"
// const P = "format-svg-path"

/* ── Вариант A: UI-компоненты ── */
/*
const uiIllustrations = [
  ... (JSX content) ...
]
*/

/* ── Вариант B: Крупные SVG (видны сразу) ── */
/*
const svgIllustrations = [
 ... (SVG content) ...
]
*/

export function Problems() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [/* variant */] = useState<"ui" | "svg">("ui")

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

  // const illustrations = variant === "ui" ? uiIllustrations : svgIllustrations

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
            Ни одна из ситуаций не ваша? Сразу <a href="#apply" className="text-brand hover:underline">обсудите задачу</a>.
          </p>
        </div>
      </div>
    </section>
  )
}

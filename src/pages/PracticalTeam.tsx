import { useEffect, useRef, useState } from "react"
import { NavbarInner } from "../components/InnerHero"
import { ContactForm } from "../components/ContactForm"
import { AnimatedCard, CardBody, CardTitle as ACardTitle, CardDescription, CardVisual, VisualWorkspace, VisualAgent, VisualCase } from "@/components/ui/animated-card-chart"
import { WavePath } from "@/components/ui/wave-path"

const C = "#ff5331"

const results = [
  { title: "Настроенное AI-рабочее место", desc: "У каждого сотрудника кастомные инструкции и личные ассистенты готовы к ежедневной работе" },
  { title: "Работающий ИИ-агент", desc: "Собранный командой агент на реальных данных вашей компании" },
  { title: "Решённый бизнес-кейс", desc: "Реальная задача решена за полтора часа — идеи готовы к внедрению" },
]

function ResultsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

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

  const visuals = [
    <VisualWorkspace mainColor={C} secondaryColor="#f54900" />,
    <VisualAgent mainColor={C} secondaryColor="#f54900" />,
    <VisualCase mainColor={C} secondaryColor="#f54900" />,
  ]

  return (
    <section className="py-24 px-6 md:px-12 bg-white dark:bg-[hsl(220,20%,7%)]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">Что останется после хакатона?</h2>
        <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 dark:text-gray-500 mb-16">Три конкретных результата, которые уходят с вами</p>
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((r, idx) => (
            <AnimatedCard
              key={idx}
              className={`w-full transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: visible ? `${idx * 120}ms` : "0ms" }}
            >
              <CardVisual className="aspect-[2/1] h-auto w-full">
                {visuals[idx]}
              </CardVisual>
              <CardBody>
                <ACardTitle>{r.title}</ACardTitle>
                <CardDescription>{r.desc}</CardDescription>
              </CardBody>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  )
}

export function PracticalTeam() {
  const program = [
    { num: "1", time: "45 мин", title: "Старт-сессия", text: "Быстрый тест через реальные задачи. Демонстрация работы агента, который экономит полдня рутины." },
    { num: "2", time: "90 мин", title: "Практикум: генеративный ИИ", text: "Каждый на своём ноутбуке настраивает кастомные инструкции и делает своего GPT-ассистента." },
    { num: "3", time: "60 мин", title: "Игра: 3 гипотезы за 30 мин", text: "Формируем гипотезу, за десять минут проверяем её с ИИ и презентуем остальным." },
    { num: "4", time: "90 мин", title: "Собираем первого агента", text: "Каждая команда проектирует логику агента, подключает источники и тестирует работу." },
    { num: "5", time: "90 мин", title: "Мини-хакатон", text: "Реальный бизнес-кейс за полтора часа. Решаем его полностью, используя весь стек инструментов." }
  ]

  return (
    <>
      <section className="relative w-full overflow-hidden flex flex-col pt-32 pb-24 md:pb-32 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/brand/hero-bg.webp')" }}>
        <NavbarInner />

        <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-12 max-w-7xl mx-auto w-full">
          <span className="inline-block text-sm md:text-base font-medium text-white/70 tracking-wider uppercase mb-4 animate-fade-rise">
            Хакатон Мышление 2.0
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.15] font-semibold text-white animate-fade-rise">
            Ваша команда начнёт применять ИИ через 10 часов
          </h1>

          <p className="text-white/80 text-lg md:text-xl lg:text-2xl max-w-3xl mt-8 leading-relaxed animate-fade-rise-delay">
            За 10 часов хакатона каждый настроит себе AI-рабочее место, соберет полноценного ассистента, построит агента и решит реальный бизнес-кейс. 80% времени — работа руками на ноутбуках.
          </p>

          <div className="flex flex-wrap gap-4 mt-10 animate-fade-rise-delay-2">
            {["10 часов", "80% практики", "Свой AI-рабочий стол"].map((pill, idx) => (
              <div key={idx} className="flex items-center text-white bg-white/20 px-4 py-2 rounded-full border border-white/30 backdrop-blur-sm text-sm font-medium">
                {pill}
              </div>
            ))}
          </div>
        </div>
      </section>

      <ResultsSection />

      <section id="program" className="py-24 px-6 md:px-12 bg-gray-50 dark:bg-[hsl(220,18%,10%)] border-t border-gray-100 dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-semibold mb-16">Как проходят эти 10 часов</h2>
          <div className="space-y-12">
            {program.map((b, i) => (
              <div key={i} className="flex flex-col md:flex-row border-b border-gray-200 dark:border-white/10 pb-12 gap-8">
                <div className="md:w-1/4 flex flex-col">
                  <span className="text-5xl font-semibold text-gray-300">0{b.num}</span>
                  <span className="text-brand font-medium mt-2">{b.time}</span>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-2xl font-semibold mb-4">{b.title}</h3>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-lg">{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="budget" className="py-24 px-6 md:px-12 bg-white dark:bg-[hsl(220,20%,7%)]">
        <div className="max-w-7xl mx-auto flex gap-12 flex-col lg:flex-row items-center">
            <div className="lg:w-2/3">
                <h2 className="text-4xl font-semibold mb-6">Бюджет: от 900 тыс. руб. за команду</h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 dark:text-gray-500 mb-8">Тренинг-хакатон «Мышление 2.0» (10-30 человек)</p>
                <div className="prose prose-lg text-gray-700 dark:text-gray-200 mb-10">
                    <p>Точная стоимость зависит от числа участников, площадки (онлайн/офлайн) и количества требуемых помощников или интеграторов на сессии.</p>
                </div>
                <a href="#contact" className="inline-block bg-brand text-white rounded-full px-10 py-4 font-medium hover:bg-[#e64627] transition-colors">
                    Обсудить бюджет
                </a>
            </div>
        </div>
      </section>

      <ContactForm
        quoteSlot={
          <div className="relative overflow-hidden pt-32 md:pt-44 pb-24">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0.06)_35%,transparent_65%)]"
            />
            <div className="relative flex flex-col items-center">
              <WavePath className="mb-14 text-white" />
              <div className="flex w-[70vw] flex-col items-end">
                <div className="flex justify-end">
                  <p className="text-gray-400 dark:text-gray-500 mt-2 text-base md:text-lg lg:text-xl font-medium">Игорь Никитин</p>
                  <p className="text-gray-300 ml-8 w-3/4 text-2xl md:text-4xl italic">
                    Мы не учим «про ИИ». Мы открываем ноутбуки и за несколько часов делаем то, о чём другие рассказывают неделями.
                  </p>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </>
  )
}

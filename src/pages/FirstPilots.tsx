import { useEffect, useRef, useState } from "react"
import { InnerHero } from "../components/InnerHero"
import { ContactForm } from "../components/ContactForm"
import { AnimatedCard, CardBody, CardTitle as ACardTitle, CardDescription, CardVisual, VisualMatrix, VisualPilot, VisualBlockers, VisualRoadmap } from "@/components/ui/animated-card-chart"

const C = "#ff5331"

const deliverables = [
  { title: "Ваша матрица ИИ-зрелости", desc: "Команда оценивает 5–7 ключевых процессов. Оценку делают ваши люди, а не консультанты." },
  { title: "1–2 пилота, готовых к старту", desc: "Каждый пилот имеет адрес: какой процесс, кто владелец, какая метрика и ограничения ИБ." },
  { title: "Карта блокеров", desc: "Кто должен согласовать запуск: отделы ИБ, владельцы данных, финансовый комитет." },
  { title: "Дорожная карта на листе A4", desc: "Что делать первые 4 недели. Кто отвечает. Какие нужны ресурсы и метрики успеха." },
]

function DeliverablesSection() {
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
    <VisualMatrix mainColor={C} secondaryColor="#f54900" />,
    <VisualPilot mainColor={C} secondaryColor="#f54900" />,
    <VisualBlockers mainColor={C} secondaryColor="#f54900" />,
    <VisualRoadmap mainColor={C} secondaryColor="#f54900" />,
  ]

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-white dark:bg-[hsl(220,20%,7%)]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">Что вы получите на руках после сессии</h2>
        <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 dark:text-gray-500 mb-16">Четыре конкретных результата, которые уходят с вами</p>
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deliverables.map((d, idx) => (
            <AnimatedCard
              key={idx}
              className={`w-full transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: visible ? `${idx * 120}ms` : "0ms" }}
            >
              <CardVisual className="aspect-[2/1] h-auto w-full">
                {visuals[idx]}
              </CardVisual>
              <CardBody>
                <ACardTitle>{d.title}</ACardTitle>
                <CardDescription>{d.desc}</CardDescription>
              </CardBody>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FirstPilots() {

  const program = [
    { num: "1", time: "30 мин", title: "ИИ меняет логику бизнеса + live-демо", text: "Как агентские системы перестраивают оргструктуру. Live-демо: агент-координатор управляет цепочкой из 3 подагентов." },
    { num: "2", time: "45 мин", title: "Практикум: матрица ИИ-зрелости", text: "Команда разбивается на группы и заполняет матрицу зрелости на 5-7 своих ключевых процессов." },
    { num: "3", time: "40 мин", title: "Запуск агента из зала", text: "Берём вашу задачу, настраиваем агента за 10 минут прямо при всех, и он её решает." },
    { num: "4", time: "60 мин", title: "Дорожная карта", text: "Каждая команда проектирует своё агентское решение. Выдаем дорожную карту на один лист A4." }
  ]

  return (
    <>
      <InnerHero
        formatName="Цифровой каркас"
        headline={"Выберите 1–2 пилота,\nкоторые реально запустятся"}
        subheadline="Программа «Цифровой каркас» — это не лекции и слайды. 3-5 часов рабочей сессии с воркшопами и live-демо. Участники работают руками на своих процессах."
        pills={["3-5 часов сессии", "60% практики", "1-2 готовых пилота"]}
      />

      <DeliverablesSection />

      <section id="program" className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-gray-50 dark:bg-[hsl(220,18%,10%)] border-t border-gray-100 dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-semibold mb-16">Программа (4 блока)</h2>
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

      <section id="budget" className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-white dark:bg-[hsl(220,20%,7%)]">
        <div className="max-w-7xl mx-auto flex gap-12 flex-col lg:flex-row items-center">
            <div className="lg:w-2/3">
                <h2 className="text-4xl font-semibold mb-6">Бюджет: 650K - 1.2M руб.</h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 dark:text-gray-500 mb-8">Стратегическая сессия «Цифровой каркас» (3-5 часов)</p>
                <div className="prose prose-lg text-gray-700 dark:text-gray-200 mb-10">
                    <p>Финальная стоимость зависит от количества участников, количества процессов и глубины адаптации под вашу отрасль.</p>
                </div>
                <a href="#contact" className="inline-block bg-brand text-white rounded-full px-10 py-4 font-medium hover:bg-[#e64627] transition-colors">
                    Обсудить бюджет
                </a>
            </div>
            <div className="lg:w-1/3">
               <div className="bg-gray-50 dark:bg-[hsl(220,18%,10%)] p-8 rounded-3xl border border-gray-200 dark:border-white/10 text-center">
                   <p className="font-semibold text-gray-900 dark:text-white text-xl mb-4">Включено:</p>
                   <p className="text-gray-600 dark:text-gray-400 dark:text-gray-500 mb-2">• Подбор кейсов и адаптация</p>
                   <p className="text-gray-600 dark:text-gray-400 dark:text-gray-500 mb-2">• Сессия 3-5 часов с live-демо</p>
                   <p className="text-gray-600 dark:text-gray-400 dark:text-gray-500">• Заполненные матрицы и roadmap</p>
               </div>
            </div>
        </div>
      </section>

      <ContactForm />
    </>
  )
}

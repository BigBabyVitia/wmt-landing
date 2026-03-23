import { useEffect, useRef, useState } from "react"

export function Experts() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const experts = [
    {
      name: "Игорь Никитин",
      desc: "Эксперт в области искусственного интеллекта, продвигает концепцию использования ИИ в качестве интеллектуального партнера для ускорения мышления и является автором методик по управлению IT-командами.",
      imgUrl: "/experts/nikitin.png.webp"
    },
    {
      name: "Гор Нахапетян",
      desc: "Серийный предприниматель, соавтор образовательной программы «Тандемократия» Сколково, сооснователь Школы управления Сколково, сооснователь Sensemakers, соучредитель фонда «Друзья».",
      imgUrl: "/experts/nahapetyan.png.webp"
    },
    {
      name: "Владислав Завадский",
      desc: "Эксперт по внедрению ИИ в бизнес и автор концепции «экзомышления», основанной на стратегическом партнерстве человека и искусственного интеллекта.",
      imgUrl: "/experts/zavadsky.png.webp"
    },
    {
      name: "Владимир Никонов",
      desc: "Ведущий эксперт по автоматизации бизнес-процессов на платформе n8n, обладающий уникальным опытом преподавания и внедрения no-code решений на азиатских рынках. Консультирует и обучает команды в ведущих технологических компаниях Китая.",
      imgUrl: "/experts/nikonov.png.webp"
    },
    {
      name: "Дина Дусова",
      desc: "Бизнес-тренер по продажам и переговорам. Ведущий инструктор Школы продаж Сергея Азимова. Специализация: Разработка скриптов продаж и сценариев продаж.",
      imgUrl: "/experts/dusova.png.webp"
    }
  ]

  return (
    <section ref={sectionRef} className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className={`text-4xl md:text-5xl font-semibold text-center mb-16 text-gray-900 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          Наши <span className="text-brand">эксперты</span>
        </h2>

        {/* Row 1: 3 experts */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-16 lg:gap-x-12 mb-16">
          {experts.slice(0, 3).map((expert, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center text-center w-full sm:w-[calc(50%-2rem)] md:w-[calc(33.33%-2rem)] max-w-sm transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: visible ? `${200 + idx * 150}ms` : "0ms" }}
            >
              <div className="w-56 h-56 md:w-64 md:h-64 mb-6 transition-transform duration-500 hover:scale-105">
                <img src={expert.imgUrl} alt={expert.name} className="w-full h-full object-contain pointer-events-none" />
              </div>
              <h3 className="text-2xl font-semibold text-brand mb-3 w-full text-center">{expert.name}</h3>
              <p className="text-gray-600 text-[15px] leading-[1.6] flex-grow w-full text-left">
                {expert.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Row 2: 2 experts (centered) */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-16 lg:gap-x-16">
          {experts.slice(3, 5).map((expert, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center text-center w-full sm:w-[calc(50%-2rem)] md:w-[calc(40%-2rem)] max-w-sm transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: visible ? `${650 + idx * 150}ms` : "0ms" }}
            >
              <div className="w-56 h-56 md:w-64 md:h-64 mb-6 transition-transform duration-500 hover:scale-105">
                <img src={expert.imgUrl} alt={expert.name} className="w-full h-full object-contain pointer-events-none" />
              </div>
              <h3 className="text-2xl font-semibold text-brand mb-3 w-full text-center">{expert.name}</h3>
              <p className="text-gray-600 text-[15px] leading-[1.6] flex-grow w-full text-left">
                {expert.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

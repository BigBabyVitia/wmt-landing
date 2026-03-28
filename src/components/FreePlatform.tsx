import { useEffect, useRef, useState } from "react"
import { Sparkles, BrainCircuit, Users, Bot } from "lucide-react"

const modules = [
  { title: "Думать с ИИ", desc: "Основы работы с языковыми моделями. Перестройка мышления под AI-Native.", icon: BrainCircuit },
  { title: "ИИ в отделе", desc: "Применение ИИ в регулярных задачах вашего подразделения.", icon: Users },
  { title: "Первый агент", desc: "Практическая сборка своего первого рабочего агента.", icon: Bot },
  { title: "Вайбкодинг", desc: "Инструменты создания продуктов и интерфейсов без кода.", icon: Sparkles },
]

export function FreePlatform() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="mb-16">
            <div className="max-w-3xl">
              <span className="inline-block text-sm font-bold tracking-widest text-brand uppercase mb-4">Демо-доступ</span>
              <h2 className="text-4xl md:text-5xl lg:text-[56px] leading-[1.1] font-semibold tracking-tight text-gray-900 mb-6">
                Начните с видеоуроков — <span className="text-brand">бесплатно</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-500 leading-relaxed font-light mb-8">
                Библиотека уроков, практические модули и рабочая среда. На платформе WMT AI уже открыты 4 базовых модуля, которые дадут вам реальную практику и понимание технологий до того, как вы решите двигаться дальше.
              </p>
              <a
                href="https://transformation.wmtunnel.ru"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900 shadow-lg shadow-gray-300/50 text-white hover:bg-brand hover:-translate-y-0.5 transition-all duration-300 rounded-full px-8 py-4 font-medium text-lg inline-block"
              >
                Получить доступ
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((m, idx) => (
            <div
              key={idx}
              className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: visible ? `${200 + idx * 100}ms` : "0ms" }}
            >
              <div className="bg-white rounded-[2rem] p-8 border border-gray-200 shadow-sm hover:shadow-lg hover:shadow-brand/20 hover:-translate-y-1 hover:border-brand/30 transition-all duration-300 group h-full cursor-default transform-gpu [backface-visibility:hidden] antialiased will-change-transform">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-brand/10 transition-colors duration-300">
                  <m.icon />
                </div>
                <p className="text-[13px] font-bold tracking-wider text-brand uppercase mb-3 text-left">Бесплатно</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{m.title}</h3>
                <p className="text-gray-500 text-[15px] leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

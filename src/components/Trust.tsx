import { useEffect, useRef, useState } from "react"
import { ShieldCheck, Building2, Lock } from "lucide-react"
import { LogoCloud } from "@/components/ui/logo-cloud"

const clients = [
  { name: "Газпром Медиа", src: "/logos/газпром.svg", invert: true },
  { name: "Wildberries", src: "/logos/wb-full-black.svg" },
  { name: "ЕвроХим", src: "/logos/logo-ru-white.svg", invert: true },
  { name: "Renaissance", src: "/logos/cropped-logo_new-2048x1406.png" },
  { name: "Согласие", src: "/logos/Логотип_согласие.png" },
  { name: "Нацпроектстрой", src: "/logos/NPS_Logo_NEW_L_White_RU.svg", invert: true },
  { name: "R1" },
  { name: "T1", src: "/logos/T1_Logo-Description.svg" },
  { name: "Центральный банк Армении", src: "/logos/logo_en.svg", invert: true },
]

export function Trust() {
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

  const blocks = [
    {
      title: "50+ внедрений ИИ в 2024-2026 годах.",
      desc: "Это не учебные кейсы и не внешняя витрина. Команда работает с корпоративными сценариями, где нужно связать управленческое решение, пилот и внедрение.",
      icon: <ShieldCheck className="w-10 h-10 text-brand mb-6" />
    },
    {
      title: "Опыт в сложных корпоративных средах.",
      desc: "Работаем с компаниями, где решения проходят через комплаенс, ИБ и сложные процессы согласования. Знаем, как довести пилот до продакшена в таких условиях.",
      icon: <Building2 className="w-10 h-10 text-brand mb-6" />
    },
    {
      title: "Предметный разговор про безопасность и данные.",
      desc: "Если у компании чувствительный контур, отдельно разбираются роли доступа, маскирование данных, аудит действий и безопасная схема работы.",
      icon: <Lock className="w-10 h-10 text-brand mb-6" />
    }
  ]

  return (
    <section id="trust" ref={sectionRef} className="py-20 md:py-32 px-4 sm:px-6 md:px-12 bg-[#0B0B1A] dark:bg-[#0B0B1A] border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-16 md:mb-24 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-brand text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-4">Доверие</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 max-w-4xl">
            Почему нам доверяют
          </h2>
          <p className="text-lg md:text-2xl text-gray-500 dark:text-[#94A3B8] max-w-3xl leading-relaxed">
            Работаем с корпоративными сценариями, где важна не презентация, а результат.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {blocks.map((b, idx) => (
            <div
              key={idx}
              className={`flex flex-col bg-[#161B26] border border-white/5 p-8 lg:p-10 rounded-2xl transition-all duration-700 hover:border-white/10 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: visible ? `${200 + idx * 150}ms` : "0ms" }}
            >
              <div className="mb-8">{b.icon}</div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">{b.title}</h3>
              <p className="text-gray-600 dark:text-[#94A3B8] leading-relaxed text-base md:text-lg">{b.desc}</p>
            </div>
          ))}
        </div>

        <div className={`mt-20 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: visible ? "700ms" : "0ms" }}>
          <div className="mx-auto max-w-3xl text-center mb-6">
            <h3 className="text-xl md:text-3xl font-medium tracking-tight">
              <span className="text-gray-400 dark:text-gray-500">Проверено на практике.</span>
              <br />
              <span className="font-semibold text-gray-900 dark:text-white">Работаем с лидерами рынка.</span>
            </h3>
          </div>
          <div className="mx-auto max-w-3xl">
            <div className="my-5 h-px bg-gray-200 dark:bg-[hsl(220,18%,18%)] [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
            <LogoCloud logos={clients} />
            <div className="mt-5 h-px bg-gray-200 dark:bg-[hsl(220,18%,18%)] [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
          </div>
        </div>

        <div className={`mt-12 flex justify-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: visible ? "900ms" : "0ms" }}>
          <a href="#contact" className="bg-brand text-white hover:bg-[#e64627] transition-colors rounded-full px-8 py-4 font-medium text-lg inline-block">
            Обсудить задачу
          </a>
        </div>
      </div>
    </section>
  )
}

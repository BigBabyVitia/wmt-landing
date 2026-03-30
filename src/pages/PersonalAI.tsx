import { ArrowRight, CheckCircle2, Clock, MapPin, Zap, Target } from "lucide-react"
import { Link } from "react-router-dom"
import { TrustStrip } from "@/components/TrustStrip"
import { MainCta } from "@/components/MainCta"
import { FitAssessment } from "@/components/sections/FitAssessment"
import { useScrollVisible } from "@/hooks/useScrollVisible"
import { V2Hero } from "@/components/ui/V2Hero"

const fitItems = [
  { text: "Вы сами принимаете решения и хотите пройти ИИ-перестройку лично", fit: true },
  { text: "Вам нужна плотная практика руками, а не лекции «посмотреть про ИИ»", fit: true },
  { text: "Вы готовы два дня работать рядом с тренерами и группой", fit: true },
  { text: "Вам важно уехать с рабочими инструментами, а не с общим ощущением", fit: true },
  { text: "Вы ищете программу, куда отправить сотрудников", fit: false },
  { text: "Вам нужна онлайн-библиотека или мягкое знакомство с темой", fit: false },
  { text: "У вас корпоративная задача и нужна программа для компании", fit: false },
  { text: "Вы хотите просто «быть в курсе» без собственной практики", fit: false },
]

const components = [
  { title: "Карта ИИ и реальный ландшафт", desc: "Что происходит в мире ИИ прямо сейчас, чем рабочие сдвиги отличаются от шума и как не потеряться в потоке новых инструментов." },
  { title: "Личная стратегия развития", desc: "Где ИИ должен усиливать именно вас. Не абстрактный план, а конкретные точки, в которых ИИ меняет ваш рабочий процесс." },
  { title: "Промпты и плотная практика", desc: "Почему одна формулировка даёт мусор, а другая — результат. Разбор на реальных запросах, с тренерами рядом." },
  { title: "Сборка своего агента", desc: "Не «узнать, что агенты бывают», а собрать своего помощника под свою задачу и увидеть, как он работает." },
]

const outputs = [
  { title: "Понимание реального ландшафта ИИ", desc: "Вы лучше видите, что важно именно вам, а что остаётся чужим шумом." },
  { title: "Личная стратегия развития", desc: "Свои приоритеты и конкретный следующий шаг, а не общий интерес к теме." },
  { title: "Библиотека рабочих промптов", desc: "Промпты, которые уже работают, а не случайная подборка из интернета." },
  { title: "Собственный AI-агент", desc: "Рабочий помощник под конкретную задачу, собранный вашими руками." },
  { title: "Новый способ работы с ИИ", desc: "Навык формулировать задачи, получать результат и думать вместе с ИИ, а не зависеть от кнопок и инструкций." },
]

const whyOffline = [
  { title: "Коррекция в моменте", desc: "Когда вы работаете руками, нужна быстрая обратная связь рядом, а не отложенный комментарий через сутки." },
  { title: "Плотность двух дней", desc: "За два офлайн-дня легче удержать фокус, пройти весь путь от карты ИИ до агента и не растянуть процесс на месяцы." },
  { title: "Группа и темп", desc: "Сильный офлайн-формат держит темп, который в онлайне неизбежно рассыпается." },
]

export function PersonalAI() {
  const paramsTags = [
    { label: "Длительность", value: "2 дня / 16 часов", icon: Clock },
    { label: "Формат", value: "Офлайн, в офисе", icon: MapPin },
    { label: "Практика", value: "С тренерами рядом", icon: Zap },
    { label: "Результат", value: "Свой AI-агент", icon: Target },
  ].map((p, i) => (
    <div key={i} className="group relative bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-6 transition-all duration-500 hover:border-brand/30 h-full flex flex-col items-start text-left">
      <div className="mb-4 relative z-10 flex items-center gap-2">
        <p className="text-[10px] font-bold tracking-[0.2em] text-brand uppercase">{p.label}</p>
      </div>
      <div className="flex items-center gap-3 relative z-10">
        <p className="text-white font-semibold text-base md:text-lg leading-[1.1]">{p.value}</p>
      </div>
    </div>
  ))

  return (
    <div className="bg-black min-h-screen text-white">
      <V2Hero 
        label="Личный ИИ"
        title={<>Перестройте свою работу с&nbsp;<em className="not-italic text-brand font-bold">ИИ</em> за&nbsp;два плотных дня</>}
        description="Интенсив на 16 часов для тех, кто хочет выйти из общего интереса к ИИ в рабочее владение. Вы пройдете путь от реальной карты возможностей до сборки собственного агента под свои задачи."
        tags={paramsTags}
        buttons={
          <div className="flex flex-col gap-4">
            <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-brand text-white rounded-full px-10 py-4 font-bold hover:bg-[#e64627] transition-all duration-300 shadow-[0_8px_32px_rgba(255,83,49,0.25)] hover:-translate-y-1 transform-gpu">
              Записаться в лист ожидания <ArrowRight className="w-5 h-5 ml-1" />
            </a>
            <div className="text-white/50 text-sm text-center md:text-left">Поток 4–5 апреля 2026 уже заполнен.</div>
          </div>
        }
      />

      <section className="py-20 md:py-32 px-4 sm:px-6 md:px-12 bg-white dark:bg-black border-t border-white/[0.06] transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <FitAssessment items={fitItems} title="Этот интенсив работает, когда вы действительно хотите пройти его сами" />
        </div>
      </section>

      <ProgramContent />
      <OutputsSection />
      <WhyOfflineSection />
      <StreamStatus />
      
      <TrustStrip />
      <MainCta />
    </div>
  )
}

function ProgramContent() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-16 md:py-32 px-4 sm:px-6 md:px-12 bg-gray-50 dark:bg-[hsl(220,20%,7%)] border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-12 md:mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-2xl md:text-5xl font-semibold tracking-tight text-white mb-6 leading-tight">16 часов практики, а не лекций</h2>
          <p className="text-white/60 text-base md:text-xl max-w-3xl leading-relaxed">Внутри — карта ИИ, личная стратегия, работа с промптами и сборка собственного агента. Основной объём — работа руками с тренерами.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {components.map((c, idx) => (
            <div
              key={idx}
              className={`flex flex-col bg-white/[0.02] border border-white/[0.06] rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 transition-all duration-500 hover:border-brand/30 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: visible ? `${idx * 120}ms` : "0ms" }}
            >
              <h3 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4 leading-tight">{c.title}</h3>
              <p className="text-white/60 text-sm md:text-base leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function OutputsSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-16 md:py-32 px-4 sm:px-6 md:px-12 bg-white dark:bg-black transition-colors duration-500 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-2xl md:text-5xl font-semibold mb-6 text-white leading-tight">Вы уезжаете с рабочими инструментами</h2>
          <p className="text-white/60 text-base md:text-xl max-w-3xl mb-12 md:mb-16 leading-relaxed">Каждый результат ниже — то, что вы действительно забираете с собой.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {outputs.map((o, idx) => (
              <div key={idx} className="flex items-start gap-4 md:gap-6 bg-white/[0.02] border border-white/[0.06] rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 transition-all duration-500 hover:border-brand/30">
                <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-brand shrink-0 mt-1" />
                <div>
                  <p className="text-white text-lg md:text-xl font-semibold tracking-tight leading-tight">{o.title}</p>
                  <p className="text-white/60 text-sm md:text-base mt-2 md:mt-3 leading-relaxed">{o.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function WhyOfflineSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-16 md:py-32 px-4 sm:px-6 md:px-12 bg-gray-50 dark:bg-[hsl(220,20%,7%)] border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-12 md:mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-2xl md:text-5xl font-semibold tracking-tight text-white mb-6 leading-tight">Офлайн здесь нужен по функции</h2>
          <p className="text-white/60 text-base md:text-xl max-w-3xl leading-relaxed">Интенсив собран офлайн потому, что плотную практику, мгновенную обратную связь и сборку агента проще сделать сильно именно так.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {whyOffline.map((w, idx) => (
            <div
              key={idx}
              className={`flex flex-col bg-white/[0.02] border border-white/[0.06] rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 transition-all duration-500 hover:border-brand/30 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: visible ? `${idx * 120}ms` : "0ms" }}
            >
              <h3 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4 leading-tight">{w.title}</h3>
              <p className="text-white/60 text-sm md:text-base leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function StreamStatus() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-16 md:py-32 px-4 sm:px-6 md:px-12 bg-white dark:bg-black transition-colors duration-500 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        <div className={`relative bg-white/[0.02] backdrop-blur-xl rounded-[2.5rem] p-10 md:p-20 border border-white/[0.08] overflow-hidden max-w-5xl transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 blur-[100px] pointer-events-none rounded-full -translate-y-1/2 translate-x-1/4" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-6 leading-tight">Ближайший поток закрыт</h2>
            <p className="text-lg md:text-xl text-white/50 mb-10 leading-relaxed max-w-3xl">Поток 4–5 апреля 2026 года заполнен. Мы не создаём ложного ажиотажа, сейчас собираем лист ожидания на следующий набор.</p>
            
            <div className="bg-white/[0.05] rounded-2xl p-8 md:p-10 border border-white/[0.08] mb-10 max-w-3xl shadow-2xl">
              <p className="text-xl text-white font-semibold mb-3 leading-tight">Правильный следующий шаг</p>
              <p className="text-white/60 leading-relaxed">Зафиксировать интерес на следующий набор. Так вы попадёте в список уведомления о новых датах, заранее получите программу и сможете принять решение без спешки.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-brand text-white rounded-full px-10 py-4 font-bold hover:bg-[#e64627] transition-all duration-300 shadow-xl shadow-brand/20 hover:-translate-y-0.5">
                Лист ожидания
              </a>
              <Link to="/executive" className="inline-flex items-center justify-center gap-2 border border-white/10 text-white bg-white/5 rounded-full px-10 py-4 font-bold hover:border-white/30 transition-all duration-300">
                Корпоративные форматы <ArrowRight className="w-5 h-5 ml-1" />
              </Link>
            </div>
            <p className="text-white/40 text-sm">После записи вы получите подтверждение и останетесь в приоритете.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

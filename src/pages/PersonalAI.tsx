import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Link } from "react-router-dom"
import { TrustStrip } from "@/components/TrustStrip"
import { MainCta } from "@/components/MainCta"
import { FitAssessment } from "@/components/sections/FitAssessment"
import { useScrollVisible } from "@/hooks/useScrollVisible"
import { V2Hero } from "@/components/ui/V2Hero"
import { V2Card } from "@/components/ui/V2Card"

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
  return (
    <>
      <V2Hero 
        label="Личный ИИ"
        title={<>Перестройте свою работу с&nbsp;<em className="not-italic text-brand font-bold">ИИ</em> за&nbsp;два плотных дня</>}
        description={
          <>
            Офлайн-интенсив на&nbsp;16&nbsp;часов для тех, кто принимает решения сам и&nbsp;хочет выйти из&nbsp;общего интереса к&nbsp;ИИ в&nbsp;рабочее владение.
            <span className="block mt-4 text-white/60 text-base max-w-3xl leading-relaxed">
              Это не&nbsp;программа, куда отправляют сотрудников. Это личный интенсив для человека, который хочет сам пройти перестройку: понять реальную карту ИИ, собрать личную стратегию, наработать промпты и&nbsp;собрать своего первого агента.
            </span>
          </>
        }
        tags={["2 дня / 16 часов", "Офлайн, в офисе", "Практика с тренерами", "Свой агент на выходе"]}
        buttons={
          <>
            <a href="#contact" className="inline-flex items-center gap-2 bg-white text-gray-900 rounded-full px-8 py-4 font-semibold hover:bg-gray-100 transition-all duration-300 shadow-[0_4px_24px_rgba(255,255,255,0.2)] hover:shadow-[0_4px_32px_rgba(255,255,255,0.4)] hover:-translate-y-0.5">
              Записаться в лист ожидания <ArrowRight className="w-5 h-5" />
            </a>
            <div className="w-full text-white/50 text-sm mt-2">Поток 4–5 апреля 2026 уже заполнен.</div>
          </>
        }
      />

      <section className="py-24 px-6 md:px-12 bg-white dark:bg-[hsl(220,20%,7%)] transition-colors duration-300">
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
    </>
  )
}

function ProgramContent() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-gray-50/50 dark:bg-[hsl(220,18%,5%)] border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">16&nbsp;часов практики, а&nbsp;не&nbsp;16&nbsp;часов про&nbsp;будущее ИИ</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl">Внутри — карта ИИ, личная стратегия, работа с&nbsp;промптами рядом с&nbsp;тренерами и&nbsp;сборка собственного агента. Лекций мало. Основной объём — работа руками.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {components.map((c, idx) => (
            <V2Card
              key={idx}
              visible={visible}
              index={idx}
              className="!p-6 !rounded-2xl hover:border-brand/30 hover:shadow-brand/10 hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 relative z-10">{c.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed relative z-10">{c.desc}</p>
            </V2Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function OutputsSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-white dark:bg-[hsl(220,20%,7%)] transition-colors duration-300 border-t border-gray-100 dark:border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl font-semibold mb-4 text-gray-900 dark:text-white">Вы&nbsp;уезжаете с&nbsp;рабочими инструментами</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mb-12">Каждый результат ниже — то, что вы действительно забираете с собой.</p>
          <div className="space-y-4">
            {outputs.map((o, idx) => (
              <div key={idx} className="flex items-start gap-5 bg-gray-50/80 dark:bg-[hsl(220,18%,10%)] rounded-2xl p-6 border border-gray-100 dark:border-white/[0.06] hover:border-brand/30 dark:hover:border-brand/20 hover:shadow-sm transition-all duration-300 w-full md:w-3/4">
                <CheckCircle2 className="w-7 h-7 text-brand shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-900 dark:text-white text-[19px] font-semibold tracking-tight">{o.title}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-[15px] mt-1.5 leading-relaxed">{o.desc}</p>
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
    <section ref={ref} className="py-24 px-6 md:px-12 bg-gray-50/50 dark:bg-[hsl(220,18%,5%)] border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">Офлайн здесь нужен по&nbsp;функции</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl">Интенсив собран офлайн потому, что плотную практику, мгновенную обратную связь и&nbsp;сборку агента проще сделать сильно именно так.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {whyOffline.map((w, idx) => (
            <V2Card key={idx} visible={visible} index={idx} className="!p-8 !rounded-2xl hover:border-brand/30 hover:shadow-brand/10 hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 relative z-10">{w.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed relative z-10">{w.desc}</p>
            </V2Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function StreamStatus() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-white dark:bg-[hsl(220,20%,7%)] border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className={`relative bg-gray-50/50 dark:bg-white/[0.03] rounded-[2.5rem] p-10 md:p-16 border border-gray-100 dark:border-white/[0.06] overflow-hidden max-w-4xl transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-brand/5 blur-[80px] pointer-events-none rounded-full" />

          <div className="relative z-10">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">Ближайший поток закрыт</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">Поток 4–5&nbsp;апреля 2026&nbsp;года заполнен. Мы&nbsp;не&nbsp;создаём ложного ажиотажа, сейчас собираем лист ожидания.</p>
            
            <div className="bg-white dark:bg-white/5 rounded-2xl p-8 border border-gray-100 dark:border-white/[0.06] shadow-sm mb-8">
              <p className="text-lg text-gray-900 dark:text-white font-semibold mb-2">Правильный следующий шаг</p>
              <p className="text-gray-600 dark:text-gray-400">Зафиксировать интерес на&nbsp;следующий набор. Так вы попадёте в&nbsp;список уведомления о&nbsp;новых датах, заранее получите программу и&nbsp;сможете принять решение без&nbsp;спешки.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-brand text-white rounded-full px-8 py-4 font-medium hover:bg-[#e64627] transition-all duration-300 shadow-md shadow-brand/20 hover:-translate-y-0.5">
                Лист ожидания
              </a>
              <Link to="/executive" className="inline-flex items-center justify-center gap-2 border border-brand/20 dark:border-brand/40 text-brand bg-brand/5 dark:bg-brand/10 rounded-full px-8 py-4 font-medium hover:border-brand hover:bg-brand/10 transition-colors">
                Корпоративные форматы <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">После записи вы получите подтверждение и останетесь в приоритете.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

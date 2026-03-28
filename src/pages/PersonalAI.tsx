import { useEffect, useRef, useState } from "react"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { NavbarV2 } from "@/components/NavbarV2"
import { TrustStrip } from "@/components/TrustStrip"
import { MainCta } from "@/components/MainCta"
import { FitAssessment } from "@/components/sections/FitAssessment"
import { Link } from "react-router-dom"

function useScrollVisible(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, visible }
}

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
      {/* HERO */}
      <section className="relative w-full overflow-hidden flex flex-col pt-32 pb-24 md:pb-32 bg-[#0a1628] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/brand/hero-bg.webp')" }}>
        <NavbarV2 variant="inner" />
        {/* Removed overlay */}
        <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto w-full">
          <span className="inline-block text-sm font-medium text-white/70 tracking-wider uppercase mb-4 animate-fade-rise">Личный ИИ</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.15] font-semibold text-white animate-fade-rise max-w-4xl">
            Перестройте свою работу с&nbsp;ИИ за&nbsp;два плотных дня
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-3xl mt-8 leading-relaxed animate-fade-rise-delay">
            Офлайн-интенсив на&nbsp;16&nbsp;часов для тех, кто принимает решения сам и&nbsp;хочет выйти из&nbsp;общего интереса к&nbsp;ИИ в&nbsp;рабочее владение.
          </p>
          <p className="text-white/60 text-base max-w-3xl mt-4 leading-relaxed animate-fade-rise-delay">
            Это не&nbsp;программа, куда отправляют сотрудников. Это личный интенсив для человека, который хочет сам пройти перестройку: понять реальную карту ИИ, собрать личную стратегию, наработать промпты и&nbsp;собрать своего первого агента. Два дня. Офлайн. Руками.
          </p>
          <div className="flex flex-wrap gap-4 mt-10 animate-fade-rise-delay-2">
            {["2 дня / 16 часов", "Офлайн, в офисе", "Практика с тренерами рядом", "Свой агент на выходе"].map((t) => (
              <span key={t} className="text-white bg-white/20 px-4 py-2 rounded-full border border-white/30 backdrop-blur-sm text-sm font-medium">{t}</span>
            ))}
          </div>
          <p className="text-white/50 text-sm mt-6 animate-fade-rise-delay-2">Поток 4–5 апреля 2026 уже заполнен. Сейчас собираем запись на следующий.</p>
        </div>
      </section>

      {/* FIT */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <FitAssessment items={fitItems} title="Этот интенсив работает, когда вы действительно хотите пройти его сами" />
        </div>
      </section>

      {/* 16 ЧАСОВ */}
      <ProgramContent />

      {/* РЕЗУЛЬТАТЫ */}
      <OutputsSection />

      {/* ПОЧЕМУ ОФЛАЙН */}
      <WhyOfflineSection />

      {/* СТАТУС ПОТОКА */}
      <StreamStatus />

      {/* TRUST */}
      <TrustStrip />

      {/* ФОРМА */}
      <MainCta />
    </>
  )
}

function ProgramContent() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 mb-4">16&nbsp;часов практики, а&nbsp;не&nbsp;16&nbsp;часов про&nbsp;будущее ИИ</h2>
          <p className="text-gray-600 text-lg max-w-3xl">Внутри — карта ИИ, личная стратегия, работа с&nbsp;промптами рядом с&nbsp;тренерами и&nbsp;сборка собственного агента. Лекций мало. Основной объём — работа руками.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {components.map((c, idx) => (
            <div key={idx} className={`bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: visible ? `${200 + idx * 120}ms` : "0ms" }}>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{c.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{c.desc}</p>
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
    <section ref={ref} className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl font-semibold mb-4">Вы&nbsp;уезжаете с&nbsp;рабочими инструментами, а&nbsp;не&nbsp;с&nbsp;ощущением «было интересно»</h2>
          <p className="text-gray-600 text-lg max-w-3xl mb-12">Каждый результат ниже — то, что вы действительно забираете с собой и используете в работе на следующей неделе.</p>
          <div className="space-y-4">
            {outputs.map((o, idx) => (
              <div key={idx} className="flex items-start gap-4 bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-300">
                <CheckCircle2 className="w-6 h-6 text-brand shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-900 text-lg font-medium">{o.title}</p>
                  <p className="text-gray-600 text-sm mt-1">{o.desc}</p>
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
    <section ref={ref} className="py-24 px-6 md:px-12 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 mb-4">Офлайн здесь нужен по&nbsp;функции, а&nbsp;не&nbsp;ради атмосферы</h2>
          <p className="text-gray-600 text-lg max-w-3xl">Интенсив собран офлайн потому, что плотную практику, мгновенную обратную связь и&nbsp;сборку агента проще сделать сильно именно так.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {whyOffline.map((w, idx) => (
            <div key={idx} className={`bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: visible ? `${200 + idx * 150}ms` : "0ms" }}>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{w.title}</h3>
              <p className="text-gray-600 leading-relaxed">{w.desc}</p>
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
    <section ref={ref} className="py-24 px-6 md:px-12 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className={`max-w-3xl transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 mb-4">Ближайший поток уже закрыт. Следующий набирается сейчас.</h2>
          <p className="text-gray-600 text-lg mb-8">Поток 4–5&nbsp;апреля 2026&nbsp;года заполнен. Мы&nbsp;не&nbsp;маскируем это и&nbsp;не&nbsp;создаём ложного ажиотажа.</p>
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-300 mb-8">
            <p className="text-lg text-gray-900 font-medium mb-2">Правильный следующий шаг</p>
            <p className="text-gray-600">Зафиксировать интерес на&nbsp;следующий набор. Так вы попадёте в&nbsp;список уведомления о&nbsp;новых датах, заранее получите программу и&nbsp;сможете принять решение без&nbsp;спешки.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-brand text-white rounded-full px-8 py-4 font-medium hover:bg-[#e64627] transition-colors">
              Записаться в лист ожидания
            </a>
            <Link to="/executive" className="inline-flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 rounded-full px-8 py-4 font-medium hover:border-brand hover:text-brand transition-colors">
              Корпоративные программы <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-gray-500 text-sm mt-4">После записи вы получите подтверждение и останетесь в приоритетном списке уведомления о датах следующего потока.</p>
        </div>
      </div>
    </section>
  )
}

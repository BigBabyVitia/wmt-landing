import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { NavbarV2 } from "@/components/NavbarV2"
import { TrustStrip } from "@/components/TrustStrip"
import { FreePlatform } from "@/components/FreePlatform"
import { MainCta } from "@/components/MainCta"

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

const situations = [
  { title: "Нужен первый пилот", desc: "Идеи есть, но нет ни одного сценария с владельцем и критериями результата. Нужно взять 1–2 процесса и довести до защищаемого старта.", format: "Цифровой каркас" },
  { title: "Нужно ядро практиков", desc: "Внутри компании уже видны люди, которые готовы работать руками. Им нужен плотный формат, чтобы стать командой-чемпионом и тянуть тему дальше.", format: "Мышление 2.0" },
  { title: "Пора расширять практику", desc: "Первые результаты уже есть. Компании нужна управляемая волна: десятки или сотни сотрудников, программа по ролям, видимость для руководства.", format: "ИИ-марафон" },
  { title: "Нужна продвинутая сборка", desc: "Есть подготовленная команда и конкретная задача. Нужен рабочий день или глубокая программа по сборке агентов.", format: "Agent Builder Day / n8n + Claude" },
]

const programs = [
  {
    title: "Цифровой каркас: 1–2 процесса, владельцы, критерии, защита",
    subtitle: "Когда компания уже знает, что ИИ нужен, но ни один сценарий ещё не дошёл до реального запуска. Стратегическая сессия с практикумами и live-демо агентов.",
    body: "Цифровой каркас — это 3–5 часов работы с C-level и руководителями подразделений. За это время команда выбирает 1–2 конкретных процесса, строит архитектуру ИИ-перехода, определяет владельцев и метрики. На выходе — паспорт пилота: что запускаем, кто отвечает, как измеряем результат.",
    params: ["3–5 часов, 3 блока", "60% практики руками", "1–2 пилотных сценария на выходе", "Live-демо агентов"],
    results: [
      { title: "Паспорт пилота", desc: "С владельцами и метриками для защиты перед руководством." },
      { title: "Live-демо", desc: "Агенты на реальных задачах компании — не абстрактные примеры." },
      { title: "Следующий шаг", desc: "Понятно, кто делает что дальше и когда." },
    ],
  },
  {
    title: "Мышление 2.0: 10–30 человек, которые потянут тему руками",
    subtitle: "Тренинг-хакатон для тех, кто должен стать ядром практиков внутри компании. 80% работы руками: собирают агентов, проверяют кейсы, фиксируют 30-дневный план.",
    body: "Мышление 2.0 длится 1–1,5 дня и работает с группой 10–30 человек. Участники берут реальные задачи компании, собирают агентов, проверяют гипотезы и уходят с рабочими артефактами. После этого формата внутри компании появляются люди-носители — те, кто может объяснить, показать и продолжить тему без внешней поддержки.",
    params: ["10 часов, 1–1,5 дня", "80% практики руками", "Собственные агенты и артефакты", "30-дневный план"],
    results: [
      { title: "Ядро практиков", desc: "10–30 человек с реальным опытом работы с ИИ." },
      { title: "Рабочие артефакты", desc: "Промпты, сценарии, агенты — не конспекты." },
      { title: "План на 30 дней", desc: "Каждый участник знает, что делать после программы." },
    ],
  },
  {
    title: "Корпоративный ИИ-марафон: когда практика нужна не пяти, а пятистам",
    subtitle: "Онлайн-марафон на 10 недель. 30 занятий. 100% работы руками. Программа по ролям, библиотека кейсов, видимость для руководства.",
    body: "Корпоративный ИИ-марафон — это управляемая программа масштаба: участники работают по ролям, собирают агентов под свои задачи, фиксируют результаты. Руководство видит прогресс, получает отчётность и понимает, кто двигает тему. После марафона компания получает рабочую привычку использования ИИ в десятках процессов.",
    params: ["10 недель, 30 занятий", "100% практики руками", "Программа по ролям", "Отчётность для руководства"],
    results: [
      { title: "ИИ-привычки", desc: "Десятки процессов переведены на работу с ИИ." },
      { title: "Отчётность", desc: "Руководство видит, кто, что и как использует." },
      { title: "Масштаб", desc: "Не 10–30 человек, а сотни — по ролям и функциям." },
    ],
  },
]

export function Teams() {
  return (
    <>
      {/* HERO */}
      <section className="relative w-full overflow-hidden flex flex-col pt-32 pb-24 md:pb-32 bg-[#0a1628] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/brand/hero-bg.webp')" }}>
        <NavbarV2 variant="inner" />
        {/* Removed overlay to make background saturated */}
        <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto w-full">
          <span className="inline-block text-sm font-medium text-white/70 tracking-wider uppercase mb-4 animate-fade-rise">Для команд</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.15] font-semibold text-white animate-fade-rise max-w-4xl">
            Практические форматы ИИвизации для команд и компаний
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-3xl mt-8 leading-relaxed animate-fade-rise-delay">
            Здесь собраны все практические форматы WMT AI — от первого пилота до продвинутой сборки агентов. Они связаны между собой и подбираются под текущую ситуацию компании.
          </p>
          <a href="#contact" className="mt-8 inline-flex items-center gap-2 bg-black text-white rounded-full px-8 py-4 font-medium hover:bg-gray-900 transition-colors animate-fade-rise-delay-2">
            Подобрать программу <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* СИТУАЦИИ */}
      <SituationsSection />

      {/* ПРОГРАММЫ */}
      {programs.map((p, i) => (
        <TeamProgramSection key={i} program={p} index={i} />
      ))}

      {/* BUILDER FORMATS */}
      <BuilderFormats />

      {/* TRUST + PLATFORM */}
      <TrustStrip />
      <FreePlatform />

      {/* ФОРМА */}
      <MainCta />
    </>
  )
}

function SituationsSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-6">Какая ситуация у вашей компании сейчас</h2>
          <p className="text-lg text-gray-500 max-w-3xl">Практический формат зависит от того, где компания находится. Узнайте свою ситуацию — и ниже увидите, что подходит.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {situations.map((s, idx) => (
            <div
              key={idx}
              className={`group bg-gray-50 rounded-2xl p-8 border border-gray-100 transition-all duration-500 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1 cursor-default ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: visible ? `${200 + idx * 120}ms` : "0ms" }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{s.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{s.desc}</p>
              <span className="text-brand font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">&rarr; {s.format}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

interface TeamProgram {
  title: string
  subtitle: string
  body: string
  params: string[]
  results: { title: string; desc: string }[]
}

function TeamProgramSection({ program: p, index }: { program: TeamProgram; index: number }) {
  const { ref, visible } = useScrollVisible()
  const bg = index % 2 === 0 ? "bg-gray-50" : "bg-white"
  return (
    <section ref={ref} className={`py-24 px-6 md:px-12 ${bg} border-t border-gray-100`}>
      <div className="max-w-7xl mx-auto">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 mb-4">{p.title}</h2>
          <p className="text-lg text-gray-500 max-w-3xl mb-4">{p.subtitle}</p>
          <p className="text-base text-gray-600 max-w-3xl mb-8 leading-relaxed">{p.body}</p>

          <div className="flex flex-wrap gap-3 mb-8">
            {p.params.map((t, i) => (
              <span key={i} className="text-sm text-gray-700 bg-gray-100 px-4 py-2 rounded-lg font-medium">{t}</span>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {p.results.map((r, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-gray-100 transition-all duration-300 hover:border-gray-200 hover:shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">{r.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>

          <a href="#contact" className="inline-flex items-center gap-2 bg-brand text-white rounded-full px-8 py-4 font-medium hover:bg-[#e64627] transition-colors">
            Узнать детали <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

function BuilderFormats() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 mb-6">Продвинутая сборка: два формата для тех, кто готов строить агентов</h2>
          <p className="text-lg text-gray-500 max-w-3xl">Agent Builder Day и n8n + Claude решают разные задачи, работают с разной аудиторией и требуют разной подготовки.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className={`bg-gray-50 rounded-2xl p-8 border border-gray-100 transition-all duration-500 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/50 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: visible ? "200ms" : "0ms" }}>
            <span className="inline-block text-xs font-semibold text-brand uppercase tracking-wider mb-3">Agent Builder Day</span>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Рабочий агент у каждого за один день</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">Один практический день для собранной команды из 30–40 человек. Мини-группы по 3–4. На выходе — рабочий агент, настроенный n8n workflow и алгоритм пересборки.</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {["1 день", "5 часов", "30–40 человек", "80–85% практики"].map((t, i) => (
                <span key={i} className="text-xs text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg font-medium">{t}</span>
              ))}
            </div>
            <Link to="/builder-day" className="inline-flex items-center gap-2 text-brand font-medium hover:underline">
              Подробнее про Builder Day <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className={`bg-gray-50 rounded-2xl p-8 border border-gray-100 transition-all duration-500 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/50 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: visible ? "350ms" : "0ms" }}>
            <span className="inline-block text-xs font-semibold text-brand uppercase tracking-wider mb-3">n8n + Claude</span>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Групповая программа по агентам</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">Малая группа до 6 человек. 4 занятия по 1,5 часа. Последовательное погружение: экосистема Claude, основы n8n, AI-агенты в n8n, продвинутая сборка с RAG, memory, multi-agent и error handling.</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {["4 сессии × 1,5 ч", "До 6 человек", "3–5 агентов на выходе"].map((t, i) => (
                <span key={i} className="text-xs text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg font-medium">{t}</span>
              ))}
            </div>
            <a href="#contact" className="inline-flex items-center gap-2 text-brand font-medium hover:underline">
              Узнать детали <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

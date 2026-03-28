import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { NavbarV2 } from "@/components/NavbarV2"
import { TrustStrip } from "@/components/TrustStrip"
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

const signals = [
  "На столе уже лежат дорогие предложения по ИИ, но никто не уверен, с чего начинать",
  "В компании много разговоров про ИИ, но нет общего языка решений",
  "Нужно принять решение так, чтобы через 90 дней тема не развалилась",
  "Один человек тащит тему — ему нужен мандат и команда, а не ещё одно поручение",
]

const situations = [
  {
    title: "«Нужен безопасный первый шаг — без ложного старта и без потерянного квартала»",
    desc: "Компания только входит в тему. Руководству нужно увидеть живые демонстрации, понять приоритеты и получить план на ближайшие 90 дней.",
    format: "Системный ИИ",
  },
  {
    title: "«Тема ИИ уже горит — нужен серьёзный пересмотр стратегии и операционной модели»",
    desc: "Компания понимает, что косметических изменений мало. Нужно перестроить портфель решений, пересмотреть операционную модель и зафиксировать, как ИИ меняет ключевые процессы.",
    format: "Бизнес 2.0",
  },
  {
    title: "«Руководители понимают тему в теории, но не прошли через практику»",
    desc: "Управленческое решение уже принято, но топ-команда ещё не работала руками. Нужна месячная практика, после которой руководители смогут принимать решения по собственному опыту.",
    format: "ИИ-марафон для топ-менеджеров",
  },
]

const programs = [
  {
    title: "Системный ИИ: первый управленческий ход за один шаг",
    subtitle: "Для компаний, которые входят в тему ИИ и хотят сделать это правильно. Управленческий старт с живыми демонстрациями, разбором ситуации и конкретным результатом.",
    body: "Системный ИИ — это встреча руководства с живыми демонстрациями, разбором ситуации компании и фиксацией приоритетов. После старта у компании появляется управленческая карта: что запускать, чего не делать, кого подключать и какой следующий шаг.",
    results: [
      { title: "Приоритеты", desc: "Что запускать первым, а что сознательно не брать в работу сейчас." },
      { title: "Границы", desc: "Где ИИ уже даёт результат, а где цена ошибки пока слишком высока." },
      { title: "Команда", desc: "Кто должен остаться в управленческом процессе дальше и кого подключать следующим." },
      { title: "План на 90 дней", desc: "Какой формат уместен после старта: практика для команды, пилот, марафон или программа компании." },
    ],
    badge: "1,5–2 часа, живые демонстрации, план на ближайшие 90 дней",
  },
  {
    title: "Бизнес 2.0: стратегический пересмотр, а не обзорная встреча",
    subtitle: "Для компаний, которым мало выровнять руководство. Нужно перестроить стратегию, пересмотреть операционную модель и зафиксировать, как ИИ меняет ключевые процессы.",
    body: "Бизнес 2.0 — это глубокая работа с управленческой командой, где предметом является конкретная стратегия конкретной компании. Как пересобрать портфель решений. Что происходит с ролями и функциями. Где ИИ создаёт новую экономику, а где разрушает старую. Какие процессы перестраивать первыми и почему.",
    diff: "Системный ИИ даёт план на 90 дней. Бизнес 2.0 перестраивает то, что стоит за этим планом: стратегию, операционную модель и понимание, как компания будет работать через два года.",
    params: ["16 часов", "2 дня", "70% практики руками"],
    audience: "Компании с масштабом, где тема ИИ уже вышла за рамки пилотов и экспериментов. Собственник и топ-команда готовы к серьёзному пересмотру, а не к обзорной встрече.",
  },
  {
    title: "ИИ-марафон для топ-менеджеров: месяц практики для управленческой команды",
    subtitle: "Для компаний, где управленческое решение уже принято, а топ-команде нужно пройти через реальные задачи — не за один день, а за месяц.",
    body: "ИИ-марафон для топ-менеджеров — это месячная программа для 8–20 руководителей. Каждую неделю — новый блок: от анализа ИИ-возможностей в своей функции до сборки собственных рабочих сценариев. К концу месяца руководители принимают решения по ИИ на основе собственного опыта, а не пересказа чужих кейсов.",
    diff: "Системный ИИ — это первый ход для руководства. Бизнес 2.0 — глубокий стратегический пересмотр. Марафон — это практика уже после стратегического решения: руководители работают руками целый месяц.",
    params: ["8 модулей", "4 недели", "8–20 руководителей"],
    audience: "Управленческая команда из 8–20 руководителей. Руководство уже выровнено. Нужно, чтобы следующий уровень перестал зависеть от внешних консультантов и начал принимать ИИ-решения самостоятельно.",
  },
]

export function Executive() {
  return (
    <>
      {/* HERO */}
      <section className="relative w-full overflow-hidden flex flex-col pt-32 pb-24 md:pb-32 bg-[#0a1628] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/brand/hero-bg.webp')" }}>
        <NavbarV2 variant="inner" />
        {/* Removes bg-black/50 to keep background saturated */}
        <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="inline-block text-sm font-medium text-white/70 tracking-wider uppercase mb-4 animate-fade-rise">Для руководителей</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.15] font-semibold text-white animate-fade-rise">
                Пока руководство не приняло решение, компания теряет время
              </h1>
              <p className="text-white/80 text-lg md:text-xl max-w-xl mt-8 leading-relaxed animate-fade-rise-delay">
                Эта страница для собственника, генерального директора и тех, кто отвечает за управленческий старт по ИИ. Здесь три формата — под разную глубину и разную задачу.
              </p>
              <a href="#contact" className="mt-8 inline-flex items-center gap-2 bg-black text-white rounded-full px-8 py-4 font-medium hover:bg-gray-900 transition-colors animate-fade-rise-delay-2">
                Обсудить с экспертом <ArrowRight className="w-5 h-5" />
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-rise-delay">
              {signals.map((s, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 text-white/90 text-sm leading-relaxed">
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* СИТУАЦИИ */}
      <SituationsSection />

      {/* ПРОГРАММЫ */}
      {programs.map((p, i) => (
        <ProgramSection key={i} program={p} index={i} />
      ))}

      {/* TRUST + МОСТ */}
      <TrustStrip />

      <BridgeSection />

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
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-6">Какая из этих ситуаций ваша?</h2>
          <p className="text-lg text-gray-500 max-w-3xl">Каждая — реальная точка, с которой приходят компании. Каждой отвечает свой формат.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {situations.map((s, idx) => (
            <div
              key={idx}
              className={`group bg-gray-50 rounded-2xl p-8 border border-gray-100 transition-all duration-500 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1 cursor-default ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: visible ? `${200 + idx * 150}ms` : "0ms" }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-snug">{s.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">{s.desc}</p>
              <span className="text-brand font-semibold text-sm group-hover:gap-2 inline-flex items-center gap-1 transition-all">&rarr; {s.format}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

interface ProgramData {
  title: string
  subtitle: string
  body: string
  results?: { title: string; desc: string }[]
  badge?: string
  diff?: string
  params?: string[]
  audience?: string
}

function ProgramSection({ program: p, index }: { program: ProgramData; index: number }) {
  const { ref, visible } = useScrollVisible()
  const bg = index % 2 === 0 ? "bg-gray-50" : "bg-white"

  return (
    <section ref={ref} className={`py-24 px-6 md:px-12 ${bg} border-t border-gray-100`}>
      <div className="max-w-7xl mx-auto">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 mb-4">{p.title}</h2>
          <p className="text-lg text-gray-500 max-w-3xl mb-4">{p.subtitle}</p>
          <p className="text-base text-gray-600 max-w-3xl mb-8 leading-relaxed">{p.body}</p>

          {p.results && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {p.results.map((r, i) => (
                <div key={i} className="bg-white rounded-xl p-5 border border-gray-100 transition-all duration-300 hover:border-gray-200 hover:shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-2">{r.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>
          )}

          {p.diff && (
            <div className="bg-white rounded-xl p-6 border border-gray-100 mb-8 max-w-3xl">
              <h4 className="font-semibold text-gray-900 mb-2">Ключевое отличие</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{p.diff}</p>
            </div>
          )}

          {p.params && (
            <div className="flex flex-wrap gap-3 mb-6">
              {p.params.map((t, i) => (
                <span key={i} className="text-sm text-gray-700 bg-gray-100 px-4 py-2 rounded-lg font-medium">{t}</span>
              ))}
            </div>
          )}

          {p.audience && (
            <p className="text-sm text-gray-500 mb-8 max-w-2xl">
              <strong className="text-gray-700">Для кого:</strong> {p.audience}
            </p>
          )}

          {p.badge && (
            <span className="inline-block text-sm text-brand font-semibold bg-brand/10 px-5 py-2 rounded-full mb-6">{p.badge}</span>
          )}

          <div className="mt-4">
            <a href="#contact" className="inline-flex items-center gap-2 bg-brand text-white rounded-full px-8 py-4 font-medium hover:bg-[#e64627] transition-colors">
              Узнать детали <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function BridgeSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className={`bg-gray-50 rounded-2xl p-10 md:p-12 border border-gray-100 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">ИИ не должен застрять в кабинете руководителя</h2>
          <p className="text-lg text-gray-500 mb-4 max-w-3xl">Когда управленческая команда выровнена, дальше подключаются команды, пилоты и программа компании.</p>
          <p className="text-base text-gray-600 mb-8 max-w-3xl leading-relaxed">
            Управленческий старт нужен не ради самого разговора, а ради следующего шага. Подготовленная команда идёт в{" "}
            <Link to="/builder-day" className="text-brand hover:underline">Agent Builder Day</Link>.
            Функция получает защищаемый пилот. Компания собирает программу от команды-чемпиона до широкой волны. Всё это — следующий уровень после управленческого решения, и он уже описан.
          </p>
          <Link
            to="/teams"
            className="inline-flex items-center gap-2 border-2 border-gray-300 text-gray-700 rounded-full px-8 py-3 font-medium hover:border-brand hover:text-brand transition-colors"
          >
            Посмотреть программы для команды <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

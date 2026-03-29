import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { TrustStrip } from "@/components/TrustStrip"
import { MainCta } from "@/components/MainCta"
import { useScrollVisible } from "@/hooks/useScrollVisible"
import { V2Hero } from "@/components/ui/V2Hero"
import { V2Card } from "@/components/ui/V2Card"

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
      <V2Hero 
        label="Для руководителей"
        title={<>Пока руководство не приняло решение, <em className="not-italic text-brand font-bold">компания теряет время</em></>}
        description="Эта страница для собственника, генерального директора и тех, кто отвечает за управленческий старт по ИИ. Здесь три формата — под разную глубину и разную задачу."
        tags={signals}
        buttons={
          <a href="#contact" className="inline-flex items-center gap-2 bg-white text-gray-900 rounded-full px-8 py-4 font-semibold hover:bg-gray-100 transition-all duration-300 shadow-[0_4px_24px_rgba(255,255,255,0.2)] hover:shadow-[0_4px_32px_rgba(255,255,255,0.4)] hover:-translate-y-0.5">
            Обсудить с экспертом <ArrowRight className="w-5 h-5" />
          </a>
        }
      />

      <SituationsSection />

      {programs.map((p, i) => (
        <ProgramSection key={i} program={p} index={i} />
      ))}

      <TrustStrip />
      <BridgeSection />
      <MainCta />
    </>
  )
}

function SituationsSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-white dark:bg-[hsl(220,20%,7%)] border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6">Какая из этих ситуаций ваша?</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl">Каждая — реальная точка, с которой приходят компании. Каждой отвечает свой формат.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {situations.map((s, idx) => (
            <V2Card
              key={idx}
              visible={visible}
              index={idx}
              className="flex flex-col gap-4 !p-8 border-gray-100 dark:border-white/[0.06] hover:border-brand/30 hover:shadow-brand/10 hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 leading-snug relative z-10">{s.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-1 relative z-10">{s.desc}</p>
              <span className="text-brand font-semibold text-sm group-hover:gap-2 inline-flex items-center gap-1 transition-all mt-auto relative z-10">&rarr; {s.format}</span>
            </V2Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProgramSection({ program: p, index }: any) {
  const { ref, visible } = useScrollVisible()
  const bg = index % 2 === 0 ? "bg-gray-50/50 dark:bg-[hsl(220,18%,5%)]" : "bg-white dark:bg-[hsl(220,20%,7%)]"

  return (
    <section ref={ref} className={`py-24 px-6 md:px-12 ${bg} border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">{p.title}</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl mb-4">{p.subtitle}</p>
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-3xl mb-8 leading-relaxed">{p.body}</p>

          {p.results && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {p.results.map((r: any, i: number) => (
                <div key={i} className="bg-white/80 dark:bg-white/[0.02] rounded-2xl p-6 border border-gray-100 dark:border-white/[0.06] transition-all duration-300 hover:border-brand/30 dark:hover:border-brand/20 hover:shadow-sm">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{r.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>
          )}

          {p.diff && (
            <div className="bg-white/80 dark:bg-white/[0.02] rounded-2xl p-6 border border-gray-100 dark:border-white/[0.06] mb-8 max-w-3xl shadow-sm">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Ключевое отличие</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{p.diff}</p>
            </div>
          )}

          {p.params && (
            <div className="flex flex-wrap gap-3 mb-6">
              {p.params.map((t: string, i: number) => (
                <span key={i} className="text-[13px] text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-white/10 px-4 py-2 rounded-full font-medium">{t}</span>
              ))}
            </div>
          )}

          {p.audience && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 max-w-2xl">
              <strong className="text-gray-700 dark:text-gray-200">Для кого:</strong> {p.audience}
            </p>
          )}

          {p.badge && (
            <span className="inline-block text-sm text-brand font-semibold bg-brand/10 px-5 py-2 rounded-full mb-6">{p.badge}</span>
          )}

          <div className="mt-8">
            <a href="#contact" className="inline-flex items-center gap-2 bg-brand text-white rounded-full px-8 pt-[14px] pb-[18px] font-medium hover:bg-[#e64627] transition-all duration-300 text-base hover:-translate-y-0.5">
              Узнать детали <ArrowRight className="w-5 h-5 ml-1 mt-0.5" />
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
    <section ref={ref} className="py-24 px-6 md:px-12 bg-white dark:bg-[hsl(220,20%,7%)] transition-colors duration-300 border-t border-gray-100 dark:border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        <div className={`relative overflow-hidden bg-gray-50/50 dark:bg-white/[0.03] rounded-[2.5rem] p-10 md:p-16 border border-gray-100 dark:border-white/[0.06] transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Subtle glow background */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-brand/5 blur-[80px] pointer-events-none rounded-full" />
          
          <div className="relative z-10 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">ИИ не должен застрять в кабинете руководителя</h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-6 font-medium">Когда управленческая команда выровнена, дальше подключаются команды, пилоты и программа компании.</p>
            <p className="text-base text-gray-600 dark:text-gray-400 mb-10 leading-relaxed max-w-3xl">
              Управленческий старт нужен не ради самого разговора, а ради следующего шага. Подготовленная команда идёт в{" "}
              <Link to="/builder-day" className="text-brand hover:underline font-medium">Agent Builder Day</Link>.
              Функция получает защищаемый пилот. Компания собирает программу от команды-чемпиона до широкой волны. Всё это — следующий уровень после управленческого решения, и он уже описан.
            </p>
            <Link
              to="/teams"
              className="inline-flex items-center gap-2 border border-gray-300 dark:border-white/20 hover:border-brand/40 text-gray-700 dark:text-white bg-white/50 dark:bg-white/5 hover:bg-brand/5 dark:hover:bg-brand/10 rounded-full px-8 py-4 font-medium transition-all duration-300 hover:-translate-y-0.5 shadow-sm"
            >
              Смотреть программы для команды <ArrowRight className="w-5 h-5 ml-1 mt-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

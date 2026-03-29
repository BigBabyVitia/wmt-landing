import { ArrowRight, Clock, Target, Users, Layers, Zap, ListTodo, ShieldAlert, Map, Workflow, TrendingUp, Users2, Component, Award, ShieldCheck } from "lucide-react"
import { Link } from "react-router-dom"
import { TrustStrip } from "@/components/TrustStrip"
import { MainCta } from "@/components/MainCta"
import { useScrollVisible } from "@/hooks/useScrollVisible"
import { V2Hero } from "@/components/ui/V2Hero"
import { V2Card } from "@/components/ui/V2Card"

const signalsData = {
  status: [
    { code: "ХАОС", title: "Система не выровнена", desc: "Отделы внедряют ИИ без стратегии.", icon: Layers },
    { code: "БЛОК", title: "Решение отложено", desc: "Страх ошибки парализует старт.", icon: ShieldCheck },
    { code: "РИСК", title: "Избыточные затраты", desc: "Дорогие решения без гарантии результата.", icon: Target },
    { code: "ТУПИК", title: "Нет мандата", desc: "ИИ занимается энтузиаст без полномочий.", icon: Users },
  ]
}

const situations = [
  {
    title: "Безопасный старт без потери квартала",
    desc: "Входим в тему ИИ. Нужно увидеть демо, расставить приоритеты и получить план действий на 90 дней.",
    mobileDesc: "Входим в ИИ. Нужно увидеть демо, приоритеты и план на 90 дней.",
    format: "Системный ИИ",
  },
  {
    title: "Глубокий пересмотр стратегии под ИИ",
    desc: "Косметических правок уже мало. Перестраиваем бизнес-модель и процессы под новую реальность.",
    mobileDesc: "Косметики мало. Перестраиваем бизнес-модель и процессы под ИИ.",
    format: "Бизнес 2.0",
  },
  {
    title: "Переход от теории к личной практике",
    desc: "Решение принято, пора работать руками. Месяц практики для принятия решений на основе опыта.",
    mobileDesc: "Пора работать руками. Месяц практики для принятия решений на опыте.",
    format: "ИИ-марафон для топов",
  },
]

const programs = [
  {
    id: "system-ai",
    title: "Системный ИИ",
    tagline: "Выровнять руководство и получить план на 90 дней",
    desc: "Когда на столе много предложений, а единого решения нет. Проводим встречу с живыми демонстрациями, разбираем ситуацию компании и фиксируем приоритеты. На выходе — управленческая карта: что запускать, чего не делать и кто отвечает за результат.",
    results: [
      { title: "Приоритеты", desc: "Что запускать первым, а что сознательно не брать в работу.", icon: ListTodo },
      { title: "Границы", desc: "Где ИИ уже даёт результат, а где цена ошибки пока высока.", icon: ShieldAlert },
      { title: "План на 90 дней", desc: "Конкретная дорожная карта перехода в практику.", icon: Map },
    ],
    params: [
      { label: "Длительность", value: "1,5–2 часа", icon: Clock },
      { label: "Результат", value: "План на 90 дней", icon: Target },
      { label: "Участники", value: "до 15 человек", icon: Users }
    ],
    badge: "Первый ход",
  },
  {
    id: "business-2",
    title: "Бизнес 2.0",
    tagline: "Глубокий пересмотр стратегии и операционной модели под ИИ",
    desc: "Когда обзорной встречи мало. Глубокая стратегия с топ-командой: пересборка экономики, ролей и бизнес-модели под новую ИИ-реальность.",
    diff: "Системный ИИ даёт план на квартал. Бизнес 2.0 перестраивает фундамент: как компания будет работать и зарабатывать через два года.",
    results: [
      { title: "Модель 2.0", desc: "Обновленная операционная структура компании под ИИ.", icon: Workflow },
      { title: "ROI-кейсы", desc: "Список точек, где ИИ создает кратный рост эффективности.", icon: TrendingUp },
      { title: "Трансформация", desc: "Пересмотр ролей и функций ключевых сотрудников.", icon: Users2 },
    ],
    params: [
      { label: "Длительность", value: "2 дня / 16 часов", icon: Clock },
      { label: "Практика", value: "70% работы руками", icon: Zap },
      { label: "Участники", value: "Топ-команда", icon: Users }
    ],
    badge: "Стратегия",
  },
  {
    id: "exec-marathon",
    title: "ИИ-марафон для топов",
    tagline: "Месяц личной практики для принятия ИИ-решений",
    desc: "Когда руководители должны не только понимать тему, а пройти месяц реальной работы. От анализа ИИ-возможностей в своей функции до сборки рабочих сценариев. К концу месяца руководство принимает решения на основе личного опыта.",
    results: [
      { title: "Навык", desc: "Умение ставить задачи ИИ и проверять качество ответа.", icon: Zap },
      { title: "Сборка", desc: "Собственные работающие сценарии под свои функции.", icon: Component },
      { title: "Опыт", desc: "Принятие решений без зависимости от консультантов.", icon: Award },
    ],
    params: [
      { label: "Формат", value: "8 модулей / Онлайн", icon: Clock },
      { label: "Срок", value: "4 недели практики", icon: Zap },
      { label: "Группа", value: "8–20 руководителей", icon: Users }
    ],
    badge: "Практика",
  }
]

export function Executive() {
  const statusTags = signalsData.status.map((s, i) => (
    <div key={i} className="group relative bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 transition-all duration-500 hover:border-brand/30 h-full flex flex-col items-start text-left">
      <div className="mb-4 relative z-10">
        <span className="text-[10px] font-bold tracking-[0.2em] text-brand uppercase bg-brand/10 px-2.5 py-1 rounded-full">СТАТУС: {s.code}</span>
      </div>
      <h3 className="text-white font-semibold text-lg mb-2 relative z-10 leading-snug">{s.title}</h3>
      <p className="text-white/50 text-sm leading-relaxed relative z-10">{s.desc}</p>
    </div>
  ))

  return (
    <>
      <V2Hero 
        layout="mosaic"
        label="Executive track"
        title={<>Пока руководство не приняло решение, <em className="not-italic text-brand font-bold">компания теряет время</em></>}
        description="Эта страница для собственника, генерального директора и тех, кто отвечает за управленческий старт по ИИ. Здесь три формата — под разную глубину и разную задачу."
        tags={statusTags}
        buttons={
          <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 rounded-full px-8 md:px-10 py-3.5 md:py-4 font-bold hover:bg-gray-100 transition-all duration-300 shadow-[0_8px_32px_rgba(255,255,255,0.2)] hover:-translate-y-1 transform-gpu text-sm md:text-base">
            Обсудить с экспертом <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-1" />
          </a>
        }
      />

      <SituationsSection />

      {programs.map((p, i) => (
        <ProgramSection key={p.id} program={p} index={i} />
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
    <section ref={ref} className="py-16 md:py-32 px-4 sm:px-6 md:px-12 bg-white dark:bg-black border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-10 md:mb-20 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4 md:mb-6 leading-[1.15]">Какая из этих ситуаций ваша?</h2>
          <p className="text-base md:text-xl text-gray-500 dark:text-gray-400 max-w-3xl font-medium leading-relaxed">Каждая — реальная точка, с которой приходят компании. Каждой отвечает свой формат.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {situations.map((s, idx) => (
            <V2Card
              key={idx}
              visible={visible}
              index={idx}
              className="flex flex-col gap-4 border-gray-100 dark:border-white/[0.06] hover:border-brand/30 transition-all duration-500"
              contentClassName="!p-6 md:!p-10"
            >
              <h3 className="text-lg md:text-2xl font-semibold text-gray-900 dark:text-white mb-2 leading-snug relative z-10">{s.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed mb-6 md:mb-8 flex-1 relative z-10 hidden md:block">{s.desc}</p>
              <p className="text-gray-600 dark:text-gray-400 text-[13px] leading-relaxed mb-4 flex-1 relative z-10 block md:hidden">{s.mobileDesc}</p>
              <div className="mt-auto relative z-10">
                <span className="text-brand font-semibold text-[11px] md:text-sm uppercase tracking-wider inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  {s.format} <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </span>
              </div>
            </V2Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProgramSection({ program: p, index }: any) {
  const { ref, visible } = useScrollVisible()
  const isEven = index % 2 === 0
  const bg = isEven ? "bg-gray-50/50 dark:bg-white/[0.02]" : "bg-white dark:bg-black"

  return (
    <section ref={ref} className={`py-16 md:py-32 px-4 sm:px-6 md:px-12 ${bg} border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-500 relative overflow-hidden`}>
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-brand/[0.03] blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-start">
            {/* Left Column: Content */}
            <div className="lg:col-span-7">
              <div className="mb-8 md:mb-10">
                <span className="inline-block text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-brand uppercase bg-brand/5 px-2.5 py-0.5 rounded-full border border-brand/10 mb-4 md:mb-6">{p.badge}</span>
                <h2 className="text-2xl md:text-6xl font-semibold tracking-tight text-gray-900 dark:text-white mb-3 md:mb-4 leading-tight">{p.title}</h2>
                <p className="text-base md:text-xl text-brand font-medium tracking-tight mb-6 md:mb-8 leading-relaxed">{p.tagline}</p>
                
                <div className="flex flex-wrap items-center gap-2 mb-8 md:mb-10">
                  {p.params.map((param: any, i: number) => (
                    <div key={i} className="flex items-center gap-1.5 bg-white/50 dark:bg-white/[0.05] border border-gray-100 dark:border-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded-full">
                      <param.icon className="w-3 md:w-3.5 h-3 md:h-3.5 text-brand/70" />
                      <span className="text-[10px] md:text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">{param.value}</span>
                    </div>
                  ))}
                </div>

                <p className="text-[15px] md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed mb-8 md:mb-10">{p.desc}</p>
              </div>

              {p.diff && (
                <div className="relative overflow-hidden bg-gradient-to-br from-brand/[0.08] to-transparent dark:from-brand/[0.12] border border-brand/20 p-6 md:p-8 rounded-[2rem] mb-10 md:mb-12 max-w-2xl shadow-sm">
                  <h4 className="font-bold text-brand text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-2 md:mb-3 flex items-center gap-2">
                    <Zap className="w-3 md:w-3.5 h-3 md:h-3.5 text-brand fill-brand/20" /> Ключевое отличие
                  </h4>
                  <p className="text-gray-700 dark:text-gray-200 text-[13px] md:text-base leading-relaxed font-medium">{p.diff}</p>
                </div>
              )}

              <div className="flex">
                <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-brand text-white rounded-full px-8 md:px-10 py-3.5 md:py-4 font-bold hover:bg-[#e64627] hover:scale-[1.03] transition-all duration-300 text-sm md:text-base shadow-xl shadow-brand/20 w-full sm:w-auto">
                  Обсудить программу <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-1" />
                </a>
              </div>
            </div>

            {/* Right Column: Artifacts Card */}
            <div className="lg:col-span-5 lg:pt-[42px] mt-8 lg:mt-0">
              <div className="bg-white dark:bg-white/[0.03] backdrop-blur-sm border border-gray-100 dark:border-white/[0.06] rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-10 md:pt-8 shadow-sm relative overflow-hidden group hover:border-brand/20 transition-all duration-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />
                
                <div className="mb-6 md:mb-10 relative z-10 text-left">
                  <span className="text-[9px] md:text-[10px] font-bold text-brand uppercase tracking-[0.2em] mb-2 block">Результаты уровня</span>
                  <div className="h-px w-10 md:w-12 bg-brand/30 rounded-full" />
                </div>
                
                <div className="space-y-6 md:space-y-10 relative z-10">
                  {p.results.map((r: any, i: number) => (
                    <div key={i} className="flex gap-4 md:gap-6 group/item">
                      <div className="flex-shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-[1.25rem] bg-gray-50 dark:bg-white/[0.05] border border-gray-100 dark:border-white/10 flex items-center justify-center text-brand group-hover/item:scale-110 transition-all duration-500 shadow-sm">
                        <r.icon className="w-5 h-5 md:w-7 md:h-7" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-1 leading-snug text-[15px] md:text-lg">{r.title}</h5>
                        <p className="text-[13px] md:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{r.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

function BridgeSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-16 md:py-32 px-4 sm:px-6 md:px-12 bg-white dark:bg-black transition-colors duration-300 border-t border-gray-100 dark:border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        <div className={`relative overflow-hidden bg-gray-50 dark:bg-white/[0.03] rounded-[3rem] md:rounded-[4rem] p-8 md:p-20 border border-gray-100 dark:border-white/[0.06] transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 blur-[100px] pointer-events-none rounded-full -translate-y-1/2 translate-x-1/4" />
          
          <div className="relative z-10 max-w-4xl">
            <h2 className="text-2xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">ИИ не должен застрять в кабинете руководителя</h2>
            <p className="text-base md:text-xl text-gray-500 dark:text-gray-400 mb-8 md:mb-10 font-medium leading-relaxed">
              Управленческий старт нужен ради следующего шага. Команды идут в <Link to="/builder-day" className="text-brand hover:underline">сборку</Link>, функции — в пилоты, компания — в волну перемен.
            </p>
            <Link
              to="/teams"
              className="inline-flex items-center gap-3 bg-brand text-white rounded-full px-8 md:px-10 py-4 md:py-4 font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-brand/20 text-sm md:text-base w-full sm:w-auto justify-center"
            >
              Программы для команд <ArrowRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

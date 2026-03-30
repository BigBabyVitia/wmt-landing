import { ArrowRight, Clock, Users, Zap, CheckCircle2 } from "lucide-react"
import { Link } from "react-router-dom"
import { TrustStrip } from "@/components/TrustStrip"
import { FreePlatform } from "@/components/FreePlatform"
import { MainCta } from "@/components/MainCta"
import { useScrollVisible } from "@/hooks/useScrollVisible"
import { V2Hero } from "@/components/ui/V2Hero"
import { V2Card } from "@/components/ui/V2Card"

const situations = [
  { title: "Нужно ядро практиков", desc: "Внутри компании уже видны люди, которые готовы работать руками. Им нужен плотный формат, чтобы стать командой-чемпионом и тянуть тему дальше.", format: "Мышление 2.0" },
  { title: "Пора расширять практику", desc: "Первые результаты уже есть. Компании нужна управляемая волна: десятки или сотни сотрудников, программа по ролям, видимость для руководства.", format: "ИИ-марафон" },
  { title: "Нужна продвинутая сборка", desc: "Есть подготовленная команда и конкретная задача. Нужен рабочий день или глубокая программа по сборке агентов.", format: "День сборки агентов / n8n + Claude" },
]

const programs = [
  {
    id: "mindset-2",
    badge: "Команда",
    title: "Мышление 2.0",
    tagline: "10–30 человек, которые потянут тему руками",
    desc: "Тренинг-хакатон для тех, кто должен стать ядром практиков. Участники берут реальные задачи компании, собирают агентов, проверяют гипотезы и уходят с рабочими артефактами. После этого внутри компании появляются свои люди-носители навыка — те, кто может продолжить тему без внешней поддержки.",
    params: [
      { label: "Длительность", value: "1–1,5 дня", icon: Clock },
      { label: "Практика", value: "80% руками", icon: Zap },
      { label: "Группа", value: "10–30 человек", icon: Users },
    ],
    results: [
      { title: "Ядро практиков", desc: "10–30 человек с реальным опытом работы с ИИ.", icon: CheckCircle2 },
      { title: "Рабочие артефакты", desc: "Промпты, сценарии, агенты — не конспекты.", icon: CheckCircle2 },
      { title: "План на 30 дней", desc: "Каждый участник знает, что делать после программы.", icon: CheckCircle2 },
    ],
  },
  {
    id: "ai-marathon",
    badge: "Масштаб",
    title: "ИИ-марафон",
    tagline: "Управляемая волна перемен на 10 недель",
    desc: "Когда практика нужна не пяти, а пятистам сотрудникам. Участники работают по ролям, собирают агентов под свои задачи, фиксируют результаты. Руководство видит прогресс, получает отчётность и понимает, кто действительно двигает тему. После марафона компания получает рабочую привычку использования ИИ в десятках процессов.",
    params: [
      { label: "Срок", value: "10 недель", icon: Clock },
      { label: "Занятия", value: "30 модулей", icon: Zap },
      { label: "Масштаб", value: "Сотни сотрудников", icon: Users },
    ],
    results: [
      { title: "ИИ-привычки", desc: "Десятки процессов переведены на работу с ИИ.", icon: CheckCircle2 },
      { title: "Отчётность", desc: "Руководство видит, кто, что и как использует.", icon: CheckCircle2 },
      { title: "Масштаб", desc: "Не 10–30 человек, а сотни — по ролям и функциям.", icon: CheckCircle2 },
    ],
  },
]

export function Teams() {
  return (
    <>
      <V2Hero 
        label="Для команд"
        title="Практические форматы ИИвизации для команд и компаний"
        description="Здесь собраны все практические форматы WMT AI — от первого пилота до продвинутой сборки агентов. Они связаны между собой и подбираются под текущую ситуацию компании."
        buttons={
          <a href="#contact" className="inline-flex items-center gap-2 bg-white text-gray-900 rounded-full px-8 py-4 font-semibold hover:bg-gray-100 transition-all duration-300 shadow-[0_4px_24px_rgba(255,255,255,0.2)] hover:shadow-[0_4px_32px_rgba(255,255,255,0.4)] hover:-translate-y-0.5">
            Подобрать программу <ArrowRight className="w-5 h-5" />
          </a>
        }
      />

      <SituationsSection />

      {programs.map((p, i) => (
        <TeamProgramSection key={i} program={p} index={i} />
      ))}

      <BuilderFormats />

      <TrustStrip />
      <FreePlatform />
      <MainCta />
    </>
  )
}

function SituationsSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-white dark:bg-[hsl(220,20%,7%)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6">Какая ситуация у вашей компании сейчас</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl">Практический формат зависит от того, где компания находится. Узнайте свою ситуацию — и ниже увидите, что подходит.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {situations.map((s, idx) => (
            <V2Card
              key={idx}
              visible={visible}
              index={idx}
              delayMult={120}
              className="flex flex-col gap-4 border-gray-100 dark:border-white/[0.06] hover:border-brand/30 hover:shadow-brand/10 hover:-translate-y-1 transition-all duration-500"
              contentClassName="!p-6 md:!p-10"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 relative z-10">{s.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-1 relative z-10">{s.desc}</p>
              <span className="text-brand font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all mt-auto relative z-10">&rarr; {s.format}</span>
            </V2Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function TeamProgramSection({ program: p, index }: any) {
  const { ref, visible } = useScrollVisible()
  const isEven = index % 2 === 0
  const bg = isEven ? "bg-white dark:bg-black" : "bg-gray-50/50 dark:bg-[hsl(220,20%,7%)]"

  return (
    <section ref={ref} className={`py-16 md:py-32 px-4 sm:px-6 md:px-12 ${bg} border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-500 relative overflow-hidden text-left`}>
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-brand/[0.03] blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-start text-left">
            {/* Left Column: Content */}
            <div className="lg:col-span-7">
              <div className="mb-8 md:mb-10 text-left">
                <span className="inline-block text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-brand uppercase mb-4 md:mb-6">{p.badge}</span>
                <h2 className="text-2xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 dark:text-white mb-3 md:mb-4 leading-tight">{p.title}</h2>
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
                
                <div className="flex">
                  <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-brand text-white rounded-full px-8 md:px-10 py-3.5 md:py-4 font-bold hover:bg-[#e64627] hover:scale-[1.03] transition-all duration-300 text-sm md:text-base shadow-xl shadow-brand/20 w-full sm:w-auto">
                    Узнать детали <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-1" />
                  </a>
                </div>
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
                    <div key={i} className="flex gap-4 md:gap-6 group/item text-left">
                      <div className="flex-shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-[1.25rem] bg-gray-50 dark:bg-white/[0.05] border border-gray-100 dark:border-white/10 flex items-center justify-center text-brand group-hover/item:scale-110 transition-all duration-500 shadow-sm">
                        <r.icon className="w-5 h-5 md:w-7 md:h-7" />
                      </div>
                      <div className="flex flex-col justify-center text-left">
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-1 leading-snug text-[15px] md:text-lg text-left">{r.title}</h5>
                        <p className="text-[13px] md:text-sm text-gray-500 dark:text-gray-400 leading-relaxed text-left">{r.desc}</p>
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

function BuilderFormats() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-white dark:bg-[hsl(220,20%,7%)] border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6">Продвинутая сборка: два формата для тех, кто готов строить агентов</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl font-medium">Agent Builder Day и n8n + Claude решают разные задачи, работают с разной аудиторией и требуют разной подготовки.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <V2Card visible={visible} index={0} contentClassName="!p-6 md:!p-10">
            <span className="inline-block text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-brand uppercase mb-4 md:mb-6 relative z-10">Agent Builder Day</span>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 relative z-10">Рабочий агент у каждого за один день</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8 flex-1 relative z-10">Один практический день для собранной команды из 30–40 человек. Мини-группы по 3–4. На выходе — рабочий агент, настроенный n8n workflow и алгоритм пересборки.</p>
            <div className="flex flex-wrap gap-2 mb-8 relative z-10">
              {["1 день", "5 часов", "30–40 человек", "80–85% практики"].map((t, i) => (
                <span key={i} className="text-[12px] text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-white/10 px-3 py-1.5 rounded-md font-medium">{t}</span>
              ))}
            </div>
            <Link to="/builder-day" className="inline-flex items-center gap-2 text-brand font-medium hover:text-brand/80 transition-colors mt-auto relative z-10">
              Подробнее про Builder Day <ArrowRight className="w-4 h-4" />
            </Link>
          </V2Card>

          <V2Card visible={visible} index={1} contentClassName="!p-6 md:!p-10">
            <span className="inline-block text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-brand uppercase mb-4 md:mb-6 relative z-10">n8n + Claude</span>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 relative z-10">Групповая программа по агентам</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8 flex-1 relative z-10">Малая группа до 6 человек. 4 занятия по 1,5 часа. Последовательное погружение: экосистема Claude, основы n8n, AI-агенты в n8n, продвинутая сборка с RAG, memory, multi-agent и error handling.</p>
            <div className="flex flex-wrap gap-2 mb-8 relative z-10">
              {["4 сессии × 1,5 ч", "До 6 человек", "3–5 агентов на выходе"].map((t, i) => (
                <span key={i} className="text-[12px] text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-white/10 px-3 py-1.5 rounded-md font-medium">{t}</span>
              ))}
            </div>
            <a href="#contact" className="inline-flex items-center gap-2 text-brand font-medium hover:text-brand/80 transition-colors mt-auto relative z-10">
              Узнать детали <ArrowRight className="w-4 h-4" />
            </a>
          </V2Card>
        </div>
      </div>
    </section>
  )
}

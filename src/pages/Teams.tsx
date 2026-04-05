import { ArrowRight, Clock, Users, Zap, CheckCircle2 } from "lucide-react"
import { TrustStrip } from "@/components/TrustStrip"
import { FreePlatform } from "@/components/FreePlatform"
import { MainCta } from "@/components/MainCta"
import { useScrollVisible } from "@/hooks/useScrollVisible"
import { V2Hero } from "@/components/ui/V2Hero"
import { V2Card } from "@/components/ui/V2Card"

const situations = [
  { title: "Нужно ядро практиков", desc: "Команда собирает первых агентов на своих задачах и становится ядром AI-трансформации компании.", format: "Мышление 2.0" },
  { title: "Пора расширять практику", desc: "Широкий практический формат для компании: от базовых навыков ИИ до первых агентов и рабочих сценариев.", format: "ИИ Волна" },
  { title: "Нужна быстрая сборка", desc: "Есть собранная команда и конкретная задача. Нужен рабочий день, чтобы собрать первого агента.", format: "Агенты за 1 день" },
  { title: "Нужна продвинутая сборка", desc: "Группа хочет глубоко погрузиться в RAG, multi-agent и n8n для сложных решений.", format: "Мастерская AI-агентов" },
  { title: "Нужен гибкий формат", desc: "Запрос на индивидуальную программу под специфические задачи и график команды.", format: "Индивидуальная программа" },
]

const programs = [
  {
    id: "mindset-2",
    badge: "Команда",
    title: "Мышление 2.0",
    tagline: "Команда собирает первых агентов на своих задачах",
    desc: "Команда собирает первых агентов на своих задачах и становится ядром AI-трансформации. Участники берут реальные задачи компании, собирают агентов, проверяют гипотезы и уходят с рабочими артефактами. После этого внутри компании появляются свои люди-носители навыка — те, кто может продолжить тему без внешней поддержки.",
    params: [
      { label: "Длительность", value: "1–1,5 дня / 10 ч", icon: Clock },
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
    id: "ai-wave",
    badge: "Масштаб",
    title: "ИИ Волна",
    tagline: "Широкий практический формат для всей компании",
    desc: "Широкий практический формат для компании: от базовых навыков ИИ до первых агентов и рабочих сценариев. Участники работают по ролям, собирают агентов под свои задачи, фиксируют результаты. Руководство видит прогресс, получает отчётность и понимает, кто действительно двигает тему. После программы компания получает рабочую привычку использования ИИ в десятках процессов.",
    params: [
      { label: "Срок", value: "8 мод / Месяц", icon: Clock },
      { label: "Занятия", value: "80% практики", icon: Zap },
      { label: "Масштаб", value: "Группа компании", icon: Users },
    ],
    results: [
      { title: "ИИ-привычки", desc: "Десятки процессов переведены на работу с ИИ.", icon: CheckCircle2 },
      { title: "Отчётность", desc: "Руководство видит, кто, что и как использует.", icon: CheckCircle2 },
      { title: "Масштабирование", desc: "Навык ИИ становится доступен каждому в компании.", icon: CheckCircle2 },
    ],
  },
  {
    id: "builder-day",
    badge: "Сборка",
    title: "Агенты за 1 день",
    tagline: "За один день команда собирает рабочего агента",
    desc: "Практический интенсив для собранной команды с конкретной задачей. Каждый участник проходит через 5 блоков сборки: от выбора мозга модели до финального интерфейса. На выходе — рабочий агент, настроенный n8n workflow и алгоритм пересборки. Мини-группы по 3–4 человека работают над реальными сценариями компании.",
    params: [
      { label: "Длительность", value: "1 день / 5 ч", icon: Clock },
      { label: "Практика", value: "80–85% руками", icon: Zap },
      { label: "Группа", value: "до 50 человек", icon: Users },
    ],
    results: [
      { title: "Собранный агент", desc: "Агент, который работает на реальной задаче компании.", icon: CheckCircle2 },
      { title: "n8n Workflow", desc: "Рабочая автоматизация, которую можно развивать.", icon: CheckCircle2 },
      { title: "Навык сборки", desc: "Участники понимают алгоритм сборки новых агентов.", icon: CheckCircle2 },
    ],
  },
  {
    id: "ai-mastery",
    badge: "Продвинуто",
    title: "Мастерская AI-агентов",
    tagline: "Глубокий разбор Claude и n8n под процессы компании",
    desc: "Малая группа до 6 человек. 4 занятия по 1,5 часа. Последовательное погружение: экосистема Claude, основы n8n, AI-агенты в n8n, продвинутая сборка с RAG, memory, multi-agent и error handling. Идеально для тех, кто готов стать внутренним архитектором ИИ-решений и внедрять сложные цепочки автоматизации.",
    params: [
      { label: "Срок", value: "4 зан × 1,5 ч", icon: Clock },
      { label: "Результат", value: "3–5 агентов", icon: Zap },
      { label: "Группа", value: "до 6 человек", icon: Users },
    ],
    results: [
      { title: "Библиотека агентов", desc: "3–5 работающих агентов под ваши процессы.", icon: CheckCircle2 },
      { title: "Продвинутый n8n", desc: "Опыт работы с RAG, памятью и мульти-агентными схемами.", icon: CheckCircle2 },
      { title: "Готовый артефакт", desc: "Настроенные и проверенные цепочки автоматизации.", icon: CheckCircle2 },
    ],
  },
  {
    id: "custom-team",
    badge: "Персонально",
    title: "Индивидуальная программа под команду",
    tagline: "Программа под ваши задачи, процессы и масштаб",
    desc: "Собираем программу AI-трансформации под ваши задачи, команду, процессы и нужный масштаб внедрения. Мы проводим предварительный аудит, интервьюируем ключевых участников и собираем формат, который даст максимальный эффект именно вашему подразделению.",
    params: [
      { label: "Формат", value: "Онлайн / Офлайн", icon: Clock },
      { label: "Срок", value: "По запросу", icon: Zap },
      { label: "Группа", value: "Под ваш состав", icon: Users },
    ],
    results: [
      { title: "Индивидуальный подход", desc: "Программа, полностью адаптированная под ваш бизнес.", icon: CheckCircle2 },
      { title: "Фокус на задачи", desc: "Решаем именно те проблемы, которые стоят перед вами.", icon: CheckCircle2 },
      { title: "Готовый результат", desc: "Внедрение ИИ в конкретные процессы вашей команды.", icon: CheckCircle2 },
    ],
  }
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

      <TrustStrip />
      <FreePlatform />
      <MainCta />
    </>
  )
}

function SituationsSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6">Какая ситуация у вашей компании сейчас</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl">Практический формат зависит от того, где компания находится. Узнайте свою ситуацию — и ниже увидите, что подходит.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
  const bg = isEven ? "bg-white dark:bg-black" : "bg-gray-50/50 dark:bg-white/[0.02]"

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

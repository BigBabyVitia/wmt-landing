import { ArrowRight, Clock, Users, Zap, CheckCircle2 } from "lucide-react"
import { TrustStrip } from "@/components/TrustStrip"
import { FreePlatform } from "@/components/FreePlatform"
import { MainCta } from "@/components/MainCta"
import { useScrollVisible } from "@/hooks/useScrollVisible"
import { V2Hero } from "@/components/ui/V2Hero"
import { V2Card } from "@/components/ui/V2Card"

const teamsSignalsData = [
  { title: "Каркас AI-трансформации уже собран — теперь его нужно перевести в практику команд" },
  { title: "Компании нужно собрать ядро сильных практиков, которые будут тянуть тему дальше внутри" },
  { title: "Локальная польза уже есть — теперь её нужно масштабировать на процессы, подразделения и команду" },
]

const overviewPrograms = [
  {
    id: "mindset-2",
    title: "Мышление 2.0",
    desc: "Команда собирает первых агентов на своих задачах и становится ядром AI-трансформации",
    tags: { format: "Офлайн", duration: "1–1,5 дня / 10 ч", people: "10–30 человек" }
  },
  {
    id: "ai-wave",
    title: "ИИ Волна",
    desc: "Широкий практический формат для компании: от базовых навыков ИИ до первых агентов и рабочих сценариев",
    tags: { format: "Онлайн", duration: "8 мод / Месяц", people: "Широкая группа" }
  },
  {
    id: "builder-day",
    title: "Агенты за 1 день",
    desc: "За один день команда собирает рабочего агента и формирует навык сборки",
    tags: { format: "Офлайн", duration: "1 день / 5 ч", people: "до 50 человек" }
  },
  {
    id: "ai-mastery",
    title: "Мастерская AI-агентов",
    desc: "Малая группа глубоко разбирает Claude и n8n, собирает агентов под реальные процессы компании",
    tags: { format: "Онлайн / Офлайн", duration: "4 зан × 1,5 ч", people: "до 6 человек" }
  },
  {
    id: "custom-team",
    title: "Индивидуальная программа под команду",
    desc: "Собираем программу AI-трансформации под ваши задачи, команду, процессы и нужный масштаб внедрения.",
    tags: { format: "Онлайн / Офлайн", duration: "По запросу", people: "Под ваш состав" },
    isCorporate: true
  }
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
  const statusTags = teamsSignalsData.map((s, i) => (
    <div 
      key={i} 
      className="group relative bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 md:p-8 transition-all duration-500 hover:border-brand/40 h-full flex flex-col justify-center items-start text-left shadow-md overflow-hidden min-h-[140px]"
    >
      <h3 className="text-white font-medium text-[15px] md:text-xl relative z-10 leading-[1.3] max-w-[90%] md:max-w-[320px]">
        {s.title}
      </h3>
    </div>
  ))

  return (
    <>
      <V2Hero 
        layout="mosaic"
        label="Для подразделений, команд и внутренних драйверов изменений"
        title={<><span className="text-brand">AI-трансформация</span> для команд: от практики к масштабированию</>}
        description="Здесь собраны программы WMT AI, которые помогают командам освоить ИИ на реальных задачах, собрать сильное внутреннее ядро и масштабировать рабочие подходы на процессы и подразделения компании."
        tagsTitle="Когда компании нужен слой практики и масштабирования:"
        tags={statusTags}
        buttons={
          <>
            <a href="#programs" className="inline-flex items-center gap-2 bg-white text-gray-900 rounded-full px-8 py-4 font-semibold hover:bg-gray-100 transition-all duration-300 shadow-[0_4px_24px_rgba(255,255,255,0.2)] hover:shadow-[0_4px_32px_rgba(255,255,255,0.4)] hover:-translate-y-0.5">
              К программам для команд <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 bg-transparent text-white border border-white/20 rounded-full px-8 py-4 font-semibold hover:bg-white/5 transition-all duration-300">
              Обсудить задачу
            </a>
          </>
        }
      />

      <ProgramsOverviewSection />

      {programs.map((p, i) => (
        <TeamProgramSection key={i} program={p} index={i} />
      ))}

      <TrustStrip />
      <FreePlatform />
      <MainCta />
    </>
  )
}

function ProgramsOverviewSection() {
  const { ref, visible } = useScrollVisible()

  const scrollToProgram = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section ref={ref} className="py-16 md:py-32 px-4 sm:px-6 md:px-12 bg-white dark:bg-black border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-10 md:mb-16 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4 leading-tight">Линейка программ для команд</h2>
          <p className="text-base md:text-xl text-gray-500 dark:text-gray-400 max-w-5xl font-medium leading-relaxed">От сборки первых агентов до масштабирования AI-привычек на процессы подразделений.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {overviewPrograms.map((program, idx) => {
            const isPersonal = (program as any).isPersonal;
            const isCorporate = (program as any).isCorporate;
            const isHighlighted = isPersonal || isCorporate;

            let cardClassName = "flex flex-col border border-gray-100 dark:border-white/[0.06] !rounded-[1.5rem] group/card hover:border-brand/20 shrink-0 !bg-gray-50/80 dark:!bg-white/[0.04]";
            let titleClassName = "font-bold text-gray-900 dark:text-white text-base sm:text-lg lg:text-xl leading-tight transition-colors duration-300 group-hover/card:text-brand";

            if (isHighlighted) {
              cardClassName = "flex flex-col !rounded-[1.5rem] group/card shadow-2xl shadow-brand/10 hover:shadow-brand/20 transform-gpu border border-brand/30 !bg-[#181413] shrink-0";
              titleClassName = "font-bold text-white text-base sm:text-lg lg:text-xl leading-tight relative z-10 transition-colors duration-300";
            }

            const tagClass = isHighlighted 
              ? "shrink-0 whitespace-nowrap inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-medium bg-transparent text-brand px-3.5 py-1.5 rounded-full border border-brand/25 transition-colors hover:bg-brand/5"
              : "shrink-0 whitespace-nowrap inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-medium bg-transparent text-gray-700 dark:text-white/60 px-3.5 py-1.5 rounded-full border border-gray-200/60 dark:border-white/10 transition-colors hover:bg-gray-50/50 dark:hover:bg-white/5";

            const processText = (text: string) => {
              if (text) {
                return text.replace("занятий", "зан.").replace("человек", "чел.").replace("участников", "уч.");
              }
              return text;
            };

            return (
              <V2Card
                key={idx}
                visible={visible}
                index={idx}
                className={`${cardClassName} cursor-pointer active:scale-[0.98] transition-all duration-700`}
                contentClassName="!p-5 sm:!p-6 md:!p-7 flex flex-col h-full content-start"
                onClick={() => {
                  scrollToProgram(program.id);
                }}
              >
                {isHighlighted && (
                  <div className="absolute inset-0 z-0 pointer-events-none rounded-[1.5rem] overflow-hidden">
                    <div className="absolute inset-0 bg-[#0f0e0d]" />
                    <div className="absolute inset-0 shadow-[inset_0_0_15px_0_rgba(255,83,49,0.3),inset_0_0_50px_0_rgba(255,83,49,0.15)] group-hover/card:shadow-[inset_0_0_20px_0_rgba(255,83,49,0.4),inset_0_0_80px_0_rgba(255,83,49,0.2)] transition-shadow duration-700 rounded-[1.5rem]" />
                    <div className="absolute inset-0 mix-blend-screen opacity-80 group-hover/card:opacity-100 transition-opacity duration-700" style={{ background: 'radial-gradient(circle at 0% 0%, rgba(255,83,49,0.3) 0%, rgba(255,83,49,0.05) 30%, transparent 60%)' }} />
                    <div className="absolute inset-0 mix-blend-screen opacity-80 group-hover/card:opacity-100 transition-opacity duration-700" style={{ background: 'radial-gradient(circle at 100% 100%, rgba(255,42,95,0.15) 0%, transparent 40%)' }} />
                    <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E")' }} />
                  </div>
                )}
                
                <div className="mb-4 relative z-10 text-left">
                   {program.tags.format && (
                     <span className="block text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] mb-3 opacity-100 text-brand">
                       {program.tags.format.replace(" / ", " • ")}
                     </span>
                   )}
                   <h5 className={titleClassName}>{program.title}</h5>
                </div>
                
                {program.desc && (
                  <p className={`text-[13.5px] sm:text-[15px] mb-6 relative z-10 font-medium text-left leading-relaxed ${isHighlighted ? 'text-white/70' : 'text-gray-600 dark:text-white/50'}`}>
                    {program.desc}
                  </p>
                )}
                
                <div className="flex flex-wrap items-center mt-auto relative z-10 gap-3">
                  {program.tags.duration && (
                     <span className={tagClass}>
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-90"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                       <span className="translate-y-[0.5px]">{processText(program.tags.duration)}</span>
                     </span>
                  )}
                  {program.tags.people && (
                     <span className={tagClass}>
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-90"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                       <span className="translate-y-[0.5px]">{processText(program.tags.people)}</span>
                     </span>
                  )}
                </div>
              </V2Card>
            )
          })}
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
    <section id={p.id} ref={ref} className={`py-16 md:py-32 px-4 sm:px-6 md:px-12 ${bg} border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-500 relative overflow-hidden text-left`}>
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

import { ArrowRight, Clock, Users, Layers, Zap, ListTodo, ShieldAlert, Map, Workflow, TrendingUp, Users2, Component, Award, ShieldCheck, Target } from "lucide-react"
import { TrustStrip } from "@/components/TrustStrip"
import { MainCta } from "@/components/MainCta"
import { useScrollVisible } from "@/hooks/useScrollVisible"
import { V2Hero } from "@/components/ui/V2Hero"
import { V2Card } from "@/components/ui/V2Card"

const signalsData = [
  { title: "Непонятно, насколько ИИ нужен компании", icon: ShieldAlert },
  { title: "Понятно, что в ИИ нужно идти... Но неясно, как именно", icon: Map },
  { title: "ИИ уже даёт локальный эффект, но заметного результата в компании нет", icon: Layers },
]

const overviewPrograms = [
  {
    id: "system-ai",
    title: "Системный ИИ",
    desc: "Быстрый старт: какой эффект ИИ даст компании и с какого шага стоит начинать",
    tags: { format: "Офлайн / Онлайн", duration: "1,5–2 часа", people: "до 15 человек" }
  },
  {
    id: "skeleton",
    title: "Цифровой каркас",
    desc: "Команда собирает архитектуру AI-перехода и проектирует первые пилоты на своих процессах",
    tags: { format: "Офлайн", duration: "3–5 часов", people: "до 30 человек" }
  },
  {
    id: "business-2",
    title: "ИИ-архитектура бизнеса",
    desc: "Двухдневный интенсив по пересборке ключевых процессов и портфеля ИИ-инициатив компании.",
    tags: { format: "Офлайн", duration: "2 дня", people: "8–20 человек" }
  },
  {
    id: "exec-workshop",
    title: "ИИ-практикум для руководителей",
    desc: "Практическая работы с ИИ на ваших задачах и подготовка следующего шага для компании",
    tags: { format: "Онлайн", duration: "6 занятий", people: "8–20 человек" }
  },
  {
    id: "personal-ai",
    title: "Персональная работа с ИИ",
    desc: "Глубокий персональный формат под ваши задачи: от первых шагов в ИИ до стратегии, рабочих сценариев и сопровождения.",
    tags: { format: "Онлайн / Офлайн", duration: "По запросу", people: "1 человек" },
    isPersonal: true
  },
  {
    id: "corporate-request",
    title: "Корпоративная программа под ваш запрос",
    desc: "Программа AI-трансформации, собранная под цели, процессы и задачи вашей компании.",
    tags: { format: "Онлайн / Офлайн", duration: "По запросу", people: "Под ваш состав" },
    isCorporate: true
  }
];

const programs = [
  {
    id: "system-ai",
    title: "Системный ИИ",
    tagline: "Быстрый старт: какой эффект ИИ даст компании и с какого шага стоит начинать",
    when: "Когда компания хочет быстро и на реальных кейсах понять, насколько ИИ ей действительно нужен, где он может дать эффект и с какого первого шага стоит начинать",
    result: "Руководство получает ясное понимание, где ИИ может дать компании реальный эффект, а компания — первый осмысленный шаг в AI-трансформации вместо абстрактного интереса",
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
    id: "skeleton",
    title: "Цифровой каркас",
    tagline: "Архитектура и первый работающий пилот",
    when: "Команда собирает архитектуру AI-перехода и проектирует первые пилоты на своих процессах",
    result: "Компания получает архитектуру AI-перехода, приоритизированные направления и 1–2 пилота, готовых к запуску, а руководство — ясность, как двигаться дальше без хаоса и распыления.",
    results: [
      { title: "Анализ ИИ-потенциала", desc: "Глубокий аудит для выбора участка с максимальным ROI.", icon: Target },
      { title: "Архитектура систем", desc: "Как ИИ встроится в ваши данные, безопасность и IT-ландшафт.", icon: ShieldCheck },
      { title: "Запущенный пилот", desc: "Живой, работающий агент, решающий реальную задачу компании.", icon: Zap },
    ],
    params: [
      { label: "Длительность", value: "3–5 часов", icon: Clock },
      { label: "Результат", value: "Запущенный пилот", icon: Target },
      { label: "Участники", value: "до 30 человек", icon: Users }
    ],
    badge: "Строительство",
  },
  {
    id: "business-2",
    title: "ИИ-архитектура бизнеса",
    tagline: "Глубокий пересмотр операционной модели под ИИ",
    when: "Когда руководство хочет не просто внедрить ИИ в отдельные функции, а связать его с устройством бизнеса и перестроить процессы так, чтобы ИИ стал частью общей архитектуры эффективности",
    result: "Компания получает портфель ИИ-проектов, новую логику развития под ИИ и первые прототипы, а руководство — общее понимание, как перестраивать бизнес и на чём делать ставку дальше",
    diff: "Системный ИИ даёт план на квартал. ИИ-архитектура бизнеса перестраивает фундамент: как компания будет работать и зарабатывать через два года.",
    results: [
      { title: "Модель 2.0", desc: "Обновленная операционная структура компании под ИИ.", icon: Workflow },
      { title: "ROI-кейсы", desc: "Список точек, где ИИ создает кратный рост эффективности.", icon: TrendingUp },
      { title: "Трансформация", desc: "Пересмотр ролей и функций ключевых сотрудников.", icon: Users2 },
    ],
    params: [
      { label: "Длительность", value: "2 дня / 16 часов", icon: Clock },
      { label: "Практика", value: "70% работы руками", icon: Zap },
      { label: "Участники", value: "8–20 человек", icon: Users }
    ],
    badge: "Стратегия",
  },
  {
    id: "exec-workshop",
    title: "ИИ-практикум для руководителей",
    tagline: "Практическая работа с ИИ на ваших задачах",
    when: "Практическая работы с ИИ на ваших задачах и подготовка следующего шага для компании",
    result: "Руководители получают рабочее понимание ИИ через практику на собственных задачах, а компания — топ-команду, которая уверенно задаёт следующий шаг AI-трансформации и готова масштабировать его дальше.",
    results: [
      { title: "Навык", desc: "Умение ставить задачи ИИ и проверять качество ответа.", icon: Zap },
      { title: "Сборка", desc: "Собственные работающие сценарии под свои функции.", icon: Component },
      { title: "Опыт", desc: "Принятие решений без зависимости от разработчиков.", icon: Award },
    ],
    params: [
      { label: "Формат", value: "6 занятий / Онлайн", icon: Clock },
      { label: "Срок", value: "Синхронная практика", icon: Zap },
      { label: "Группа", value: "8–20 руководителей", icon: Users }
    ],
    badge: "Практика",
  },
  {
    id: "personal-ai",
    title: "Персональная работа с ИИ",
    tagline: "Индивидуальный трек под ваш контекст",
    when: "Глубокий персональный формат под ваши задачи: от первых шагов в ИИ до стратегии, рабочих сценариев и сопровождения.",
    result: "Руководитель получает персонально собранную работу с ИИ под свои цели, уровень и контекст, а компания — сильного внутреннего драйвера, который понимает, как двигать AI-трансформацию дальше.",
    results: [
      { title: "Личная стратегия", desc: "Понимание своих точек роста с ИИ.", icon: Target },
      { title: "Практика", desc: "Навык работы с ИИ в своем контексте.", icon: Zap },
      { title: "Драйвер перемен", desc: "Готовность вести компанию за собой.", icon: Award },
    ],
    params: [
      { label: "Формат", value: "По запросу", icon: Clock },
      { label: "Участники", value: "1 человек", icon: Users }
    ],
    badge: "Индивидуально",
  },
  {
    id: "corporate-request",
    title: "Корпоративная программа под ваш запрос",
    tagline: "Сборка уникальной архитектуры под задачи компании",
    when: "Программа AI-трансформации, собранная под цели, процессы и задачи вашей компании.",
    result: "Компания получает индивидуальную программу обучения и внедрения, собранную под её реальную задачу, а руководство — формат, который точно соответствует бизнес-контексту и даёт нужный следующий шаг",
    results: [
      { title: "Реальные задачи", desc: "Программа под ваш контекст и зрелость.", icon: Component },
      { title: "Масштабирование", desc: "Методика подготовки всей компании.", icon: Layers },
      { title: "Бизнес-эффект", desc: "Решение конкретных управленческих задач.", icon: TrendingUp },
    ],
    params: [
      { label: "Формат", value: "Офлайн / Онлайн", icon: Clock },
      { label: "Срок", value: "По запросу", icon: Zap },
      { label: "Аудитория", value: "Под ваш состав", icon: Users }
    ],
    badge: "Решение",
  }
];

export function Executive() {
  const statusTags = signalsData.map((s, i) => (
    <div 
      key={i} 
      className="group relative bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 md:p-8 transition-all duration-500 hover:border-brand/40 h-full flex flex-col justify-center items-start text-left shadow-md overflow-hidden min-h-[140px]"
    >
      <div className="absolute top-0 right-0 p-8 text-white/[0.04] text-8xl md:text-9xl font-black font-mono leading-none z-0 transform translate-x-4 -translate-y-4 pointer-events-none group-hover:scale-110 group-hover:text-brand/5 transition-all duration-500">
        0{i + 1}
      </div>
      <h3 className="text-white font-medium text-[15px] md:text-xl relative z-10 leading-[1.3] max-w-[90%] md:max-w-[320px]">
        {s.title}
      </h3>
    </div>
  ))

  return (
    <>
      <V2Hero 
        layout="mosaic"
        label="EXECUTIVE TRACK / Для владельцев и команды руководителей"
        title={<>WMT AI помогает собрать архитектуру <em className="not-italic text-brand font-bold">AI-трансформации</em> компании</>}
        description="Управленческая сборка нужна, когда компания уже понимает, что ИИ — это всерьёз, но пока нет единого взгляда, как именно его применять. Мы помогаем первым лицам и топ-менеджерам сформулировать стратегию, выбрать точки приложения усилий и запустить системные изменения сверху вниз."
        tagsTitle="Когда компании нужен стратегический старт:"
        tags={statusTags}
        buttons={
          <>
            <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 rounded-full px-8 md:px-10 py-3.5 md:py-4 font-bold hover:bg-gray-100 transition-all duration-300 shadow-[0_8px_32px_rgba(255,255,255,0.2)] hover:-translate-y-1 transform-gpu text-sm md:text-base">
              Обсудить с экспертом <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-1" />
            </a>
            <a href="#programs" className="inline-flex items-center justify-center gap-2 bg-transparent text-white border border-white/20 rounded-full px-8 md:px-10 py-3.5 md:py-4 font-bold hover:bg-white/5 transition-all duration-300 text-sm md:text-base">
              К вариантам программ
            </a>
            <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-transparent text-brand underline decoration-brand/30 hover:decoration-brand/80 px-4 py-3.5 md:py-4 font-semibold transition-all duration-300 text-sm md:text-base">
              Получить рекомендацию
            </a>
          </>
        }
      />

      <ProgramsOverviewSection />

      {programs.map((p, i) => (
        <ProgramSection key={p.id} program={p} index={i} />
      ))}

      <TrustStrip />
      <BridgeSection />
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
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4 leading-tight">Линейка программ для руководства</h2>
          <p className="text-base md:text-xl text-gray-500 dark:text-gray-400 max-w-5xl font-medium leading-relaxed">От управленческого выравнивания до архитектуры ИИ-перехода и личной практики.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {overviewPrograms.map((program, idx) => {
            const isPersonal = (program as any).isPersonal;
            const isCorporate = (program as any).isCorporate;
            
            let cardClassName = "flex flex-col bg-gray-50/80 dark:bg-white/[0.08] border border-gray-100 dark:border-white/10 rounded-[2rem] hover:border-brand/40 transition-all duration-500 group shadow-sm";
            let titleClassName = "font-semibold text-gray-900 dark:text-white text-base md:text-[17px] leading-tight group-hover:text-brand transition-colors";
            
            const isHighlighted = isPersonal || isCorporate;
            
            if (isHighlighted) {
              cardClassName = "flex flex-col bg-gradient-to-br from-white/10 to-brand/5 dark:from-white/10 dark:to-brand/20 backdrop-blur-xl border border-brand/30 rounded-[2rem] hover:border-brand/60 transition-all duration-700 shadow-2xl shadow-brand/10 overflow-hidden h-full";
              titleClassName = "font-bold text-gray-900 dark:text-white text-base md:text-[17px] leading-tight transition-colors";
            }
            
            return (
              <V2Card
                key={idx}
                visible={visible}
                index={idx}
                className={cardClassName + " cursor-pointer group active:scale-[0.98] transform-gpu"}
                contentClassName="p-6 md:p-8 flex flex-col h-full"
                onClick={() => {
                  scrollToProgram(program.id);
                }}
              >
                {(isPersonal || isCorporate) && (
                  <>
                    <div 
                      className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_20%,rgba(255,83,49,0.15)_0%,transparent_70%)] z-0 transition-opacity duration-700" 
                    />
                     <div 
                      className="absolute -bottom-24 -right-24 w-64 h-64 pointer-events-none bg-brand/10 blur-[80px] rounded-full z-0 opacity-50 group-hover:opacity-80 transition-all duration-1000" 
                    />
                  </>
                )}
                
                <div className="mb-4 relative z-10 text-left">
                  {program.tags.format && (
                    <span className="block text-[9px] md:text-[10px] font-bold text-brand uppercase tracking-[0.2em] mb-1.5 opacity-90 transition-colors">
                      {program.tags.format}
                    </span>
                  )}
                  <h3 className={titleClassName}>{program.title}</h3>
                </div>
                
                {program.desc && (
                  <p className="text-gray-600 dark:text-white/50 text-sm md:text-base leading-relaxed mb-6 relative z-10 font-medium text-left leading-relaxed">
                    {program.desc}
                  </p>
                )}
                
                <div className="flex flex-wrap items-center gap-3 mt-auto relative z-10">
                  {program.tags.duration && (
                    <span className="shrink-0 whitespace-nowrap inline-flex items-center gap-1.5 text-[9px] md:text-[10px] font-bold bg-gray-100/50 dark:bg-white/[0.04] text-gray-700 dark:text-brand px-3 py-1.5 rounded-xl border border-gray-200/50 dark:border-brand/10">
                      <Clock className="w-3.5 h-3.5 opacity-80" />
                      {program.tags.duration}
                    </span>
                  )}
                  {program.tags.people && (
                    <span className="shrink-0 whitespace-nowrap inline-flex items-center gap-1.5 text-[9px] md:text-[10px] font-bold bg-gray-100/50 dark:bg-white/[0.04] text-gray-700 dark:text-brand px-3 py-1.5 rounded-xl border border-gray-200/50 dark:border-brand/10">
                      <Users className="w-3.5 h-3.5 opacity-80" />
                      {program.tags.people}
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

function ProgramSection({ program: p, index }: any) {
  const { ref, visible } = useScrollVisible()
  const isEven = index % 2 === 0
  const bg = isEven ? "bg-gray-50/50 dark:bg-white/[0.02]" : "bg-white dark:bg-black"

  return (
    <section id={p.id} ref={ref} className={`py-16 md:py-32 px-4 sm:px-6 md:px-12 ${bg} border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-500 relative overflow-hidden`}>
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

                  {p.when && (
                    <div className="relative">
                      <span className="text-[10px] font-bold text-brand uppercase tracking-[0.2em] mb-2 block opacity-80">Когда</span>
                      <p className="text-gray-900 dark:text-white text-base md:text-xl leading-relaxed font-medium">
                        {p.when}
                      </p>
                    </div>
                  )}
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
                
                <div className="mb-6 md:mb-8 relative z-10 text-left">
                  <span className="text-[9px] md:text-[10px] font-bold text-brand uppercase tracking-[0.2em] mb-2 block">Результат уровня</span>
                  <div className="h-px w-10 md:w-12 bg-brand/30 rounded-full mb-6" />
                  
                  {p.result && (
                    <p className="text-[13px] md:text-base text-gray-700 dark:text-gray-200 leading-relaxed font-medium tracking-tight mb-4 text-left">
                      {p.result}
                    </p>
                  )}
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
              Управленческий старт нужен ради следующего шага. Команды идут в сборку, функции — в пилоты, компания — в волну перемен.
            </p>
            <a href="#contact"
              className="inline-flex items-center gap-3 bg-brand text-white rounded-full px-8 md:px-10 py-4 md:py-4 font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-brand/20 text-sm md:text-base w-full sm:w-auto justify-center"
            >
              Программы для команд <ArrowRight className="w-5 h-5 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

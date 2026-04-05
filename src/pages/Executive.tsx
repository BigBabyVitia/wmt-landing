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
      { title: "Зоны применения", desc: "Где ИИ уже даёт эффект, а где риск ошибки выше пользы.", icon: ShieldAlert },
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
  // Управление вариантами верстки скрыто. По умолчанию всегда рендерится Bento Grid.
  // const [variant, setVariant] = useState<"classic" | "split" | "bento" | "pathway">("bento")
  const statusTags = signalsData.map((s, i) => (
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
        label="Для владельцев и команды руководителей"
        title={<>WMT AI помогает собрать архитектуру <em className="not-italic text-brand font-bold">AI-трансформации</em> компании</>}
        description="Управленческая сборка нужна, когда компания уже понимает, что ИИ — это всерьёз, но пока нет единого взгляда, как именно его применять. Мы помогаем первым лицам и топ-менеджерам сформулировать стратегию, выбрать точки приложения усилий и запустить системные изменения сверху вниз."
        tagsTitle="Когда компании нужен стратегический старт:"
        tags={statusTags}
        buttons={
          <>
            <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 rounded-full px-8 md:px-10 py-3.5 md:py-4 font-bold hover:bg-gray-100 transition-all duration-300 shadow-[0_8px_32px_rgba(255,255,255,0.2)] hover:-translate-y-1 transform-gpu text-sm md:text-base">
              Обсудить задачу <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-1" />
            </a>
            <a href="#programs" className="inline-flex items-center justify-center gap-2 bg-transparent text-white border border-white/20 rounded-full px-8 md:px-10 py-3.5 md:py-4 font-bold hover:bg-white/5 transition-all duration-300 text-sm md:text-base">
              К вариантам программ
            </a>

          </>
        }
      />

      <ProgramsOverviewSection />

      {/* 
         UI-переключатель скрыт. Оставляем только вариант Bento Grid как целевой, 
         но код других карточек (Classic, Split, Pathway) сохранён в файле для истории.
      */}
      {programs.map((p, i) => {
        return <ProgramSectionBento key={p.id} program={p} index={i} />;
      })}

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

export function ProgramSectionClassic({ program: p, index }: any) {
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
                      <span className="text-[10px] font-bold text-brand uppercase tracking-[0.2em] mb-2 block opacity-80">В каких случаях полезно</span>
                      <p className="text-gray-900 dark:text-white text-base md:text-xl leading-relaxed font-medium">
                        {p.when.replace(/^Когда /i, "").replace(/^./, (c: string) => c.toUpperCase())}
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

export function ProgramSectionSplit({ program: p, index }: any) {
  const { ref, visible } = useScrollVisible()
  const isEven = index % 2 === 0
  const bg = isEven ? "bg-gray-50/50 dark:bg-white/[0.02]" : "bg-white dark:bg-black"

  return (
    <section id={p.id} ref={ref} className={`py-16 md:py-32 px-4 sm:px-6 md:px-12 ${bg} border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-500 relative overflow-hidden`}>
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-brand/[0.03] blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-start">
            
            {/* Left Column: Context & Params */}
            <div className="lg:col-span-6 flex flex-col">
              <span className="inline-block text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-brand uppercase bg-brand/5 px-2.5 py-0.5 rounded-full border border-brand/10 mb-4 w-max">{p.badge}</span>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4 leading-tight">{p.title}</h2>
              <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 font-medium tracking-tight mb-8 leading-relaxed max-w-lg">{p.tagline}</p>
              
              <div className="flex flex-wrap items-center gap-2 mb-10">
                {p.params.map((param: any, i: number) => (
                  <div key={i} className="flex items-center gap-1.5 bg-white/50 dark:bg-white/[0.05] border border-gray-100 dark:border-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded-full">
                    <param.icon className="w-3 md:w-3.5 h-3 md:h-3.5 text-brand/70" />
                    <span className="text-[10px] md:text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">{param.value}</span>
                  </div>
                ))}
              </div>

              {p.when && (
                <div className="relative p-6 sm:p-8 bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.05] rounded-3xl mb-8">
                  <h4 className="text-[10px] sm:text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-4">Для каких задач подходит</h4>
                  <p className="text-gray-900 dark:text-gray-200 text-sm md:text-base leading-relaxed font-medium">
                    {p.when.replace(/^Когда /i, "").replace(/^./, (c: string) => c.toUpperCase())}
                  </p>
                </div>
              )}
              
              <div className="mt-auto pt-4">
                <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-brand text-white rounded-full px-8 py-3.5 font-bold hover:bg-[#e64627] transition-all duration-300 text-sm shadow-xl shadow-brand/20 w-full sm:w-auto">
                  Обсудить программу <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>

            {/* Right Column: Outcomes */}
            <div className="lg:col-span-6 lg:pt-8">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Что получает компания</h3>
                {p.result && (
                  <p className="text-[15px] sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
                    {p.result}
                  </p>
                )}
              </div>

              <div className="space-y-3 md:space-y-4">
                {p.results.map((r: any, i: number) => (
                  <div key={i} className="flex p-5 sm:p-6 bg-white dark:bg-[#111] border border-gray-100 dark:border-white/10 rounded-2xl md:rounded-[24px] shadow-sm hover:border-brand/30 transition-colors">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand/10 text-brand flex items-center justify-center mr-4 sm:mr-5">
                      <r.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-white text-base mb-1.5">{r.title}</h5>
                      <p className="text-[13px] sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{r.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

function ProgramSectionBento({ program: p, index }: any) {
  const { ref, visible } = useScrollVisible()
  const isEven = index % 2 === 0
  const bg = isEven ? "bg-gray-50/50 dark:bg-white/[0.02]" : "bg-white dark:bg-black"

  const tagClass = "shrink-0 whitespace-nowrap inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-bold bg-brand/5 text-brand px-4 py-2 rounded-full border border-brand/20 transition-colors hover:bg-brand/10 shadow-[inset_0_0_10px_rgba(255,83,49,0.05)]";

  return (
    <section id={p.id} ref={ref} className={`py-16 md:py-24 px-4 sm:px-6 md:px-12 ${bg} border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-500 relative overflow-hidden`}>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-brand/[0.03] blur-[120px] pointer-events-none rounded-full" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          
          <div className="mb-12 md:mb-16">
            <span className="inline-block text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-brand uppercase bg-brand/5 px-2.5 py-0.5 rounded-full border border-brand/10 mb-4">{p.badge}</span>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white leading-tight mb-3">{p.title}</h2>
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 font-medium tracking-tight mb-8 max-w-3xl">{p.tagline}</p>
            
            <div className="flex flex-wrap items-center gap-3">
              {p.params.map((param: any, i: number) => (
                <span key={i} className={tagClass}>
                  <param.icon className="w-3.5 h-3.5 opacity-90" />
                  <span className="translate-y-[0.5px] uppercase tracking-wider text-[10px] sm:text-[11px]">{param.value}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-min">
            {/* Context Box */}
            <div className={`col-span-1 md:col-span-5 flex flex-col gap-4 sm:gap-6`}>
              {/* Box 1 */}
              <div className="flex-1 bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/10 rounded-[2rem] p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-[inset_0px_2px_10px_rgba(0,0,0,0.02)] transition-colors hover:border-gray-200 dark:hover:border-white/20">
                <h4 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-4">Ситуация и Задача</h4>
                <p className="text-gray-900 dark:text-white text-[14px] sm:text-[15px] leading-relaxed font-medium max-w-sm mb-0">
                  {p.when ? p.when.replace(/^Когда /i, "").replace(/^./, (c: string) => c.toUpperCase()) : "Поиск новых точек роста и архитектурных решений."}
                </p>
              </div>
              
              {/* Box 2 */}
              <div className="flex-1 bg-gradient-to-b from-brand/5 to-transparent dark:from-brand/[0.08] dark:to-transparent border border-brand/10 dark:border-brand/20 rounded-[2rem] p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-[inset_0px_2px_15px_rgba(255,83,49,0.04)] transition-colors hover:border-brand/30">
                <h4 className="text-[10px] font-bold text-brand uppercase tracking-[0.2em] mb-4">Главный эффект</h4>
                <p className="text-gray-800 dark:text-gray-200 text-[14px] sm:text-[15px] leading-relaxed font-medium max-w-sm mb-6">
                  {p.result || "Трансформация управленческого мышления и процессов."}
                </p>
                <a href="#contact" className="mt-auto inline-flex items-center justify-center gap-2 bg-brand text-white rounded-full px-8 py-3 font-bold hover:bg-[#e64627] hover:scale-[1.02] shadow-xl shadow-brand/20 transition-all duration-300 text-xs sm:text-sm max-w-full">
                  Обсудить задачу <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>

            {/* Results Grid Box */}
            <V2Card 
              visible={visible}
              className="col-span-1 md:col-span-7 !bg-[#111] dark:!bg-black/90 border border-gray-900 dark:border-white/[0.08] !rounded-[2rem] flex flex-col relative overflow-hidden group"
              contentClassName="!p-6 sm:!p-8 flex flex-col h-full w-full relative z-10"
            >
               <h4 className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] mb-6 relative z-10 w-full">Ключевые артефакты</h4>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 relative z-10">
                 {p.results.map((r: any, i: number) => (
                    <div key={i} className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[1.5rem] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
                      <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center mb-4 border border-brand/20">
                        <r.icon className="w-5 h-5 text-brand drop-shadow-sm" />
                      </div>
                      <h5 className="font-semibold text-white text-base mb-2">{r.title}</h5>
                      <p className="text-[13px] text-white/60 leading-relaxed font-medium">{r.desc}</p>
                    </div>
                 ))}
                 
                 {p.diff && (
                   <div className="sm:col-span-2 mt-2 bg-white/[0.02] backdrop-blur-xl border-l-4 border-brand border-y border-r border-white/5 p-5 rounded-[1.5rem] shadow-sm">
                     <h4 className="text-[10px] font-bold text-brand uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                       <Zap className="w-3.5 h-3.5" /> Отличие программы
                     </h4>
                     <p className="text-white/80 text-[13px] sm:text-sm leading-relaxed font-medium">
                       {p.diff}
                     </p>
                   </div>
                 )}
               </div>
            </V2Card>
          </div>

        </div>
      </div>
    </section>
  )
}

export function ProgramSectionPathway({ program: p, index }: any) {
  const { ref, visible } = useScrollVisible()
  const isEven = index % 2 === 0
  const bg = isEven ? "bg-gray-50/50 dark:bg-white/[0.02]" : "bg-white dark:bg-black"
  const tagClass = "shrink-0 whitespace-nowrap inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium bg-black/20 text-white px-3 py-1.5 rounded-full border border-white/10";

  return (
    <section id={p.id} ref={ref} className={`py-20 md:py-32 px-4 sm:px-6 md:px-12 ${bg} border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-500 relative overflow-hidden`}>
      <div className="max-w-4xl mx-auto relative z-10">
        <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          
          <div className="mb-16">
            <span className="inline-block text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-brand uppercase bg-brand/5 px-2.5 py-0.5 rounded-full border border-brand/10 mb-4">{p.badge}</span>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">{p.title}</h2>
            <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 font-medium max-w-2xl leading-relaxed">{p.tagline}</p>
          </div>

          <div className="relative isolate px-2 md:px-6">
            {/* Timeline vertical line */}
            <div className="absolute left-[28px] md:left-[52px] top-[40px] bottom-[40px] w-px bg-gray-200 dark:bg-white/10 -z-10" />

            {/* Step 1: Context */}
            <div className="flex gap-6 md:gap-10 items-start mb-12">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#f8f8f8] dark:bg-[#1a1a1a] border-[4px] border-white dark:border-black flex items-center justify-center text-[10px] md:text-xs font-bold text-gray-400 dark:text-gray-500 shrink-0 shadow-sm">
                А
              </div>
              <div className="flex-1 bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.06] p-6 md:p-8 rounded-[2rem] shadow-sm transform-gpu hover:-translate-y-1 transition-all duration-300">
                <span className="text-[9px] md:text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-4 block">Ситуация «До»</span>
                <p className="text-gray-900 dark:text-white text-[15px] md:text-base leading-relaxed font-medium">
                  {p.when ? p.when.replace(/^Когда /i, "").replace(/^./, (c: string) => c.toUpperCase()) : "Потребность в трансформации и поиске новых точек роста."}
                </p>
              </div>
            </div>

            {/* Step 2: Tool */}
            <div className="flex gap-6 md:gap-10 items-start mb-12 relative">
              <div className="absolute left-[28px] md:left-[52px] top-[-20%] bottom-[-20%] w-px bg-brand/30 -z-10 blur-[2px]" />
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-brand border-[4px] border-white dark:border-black flex items-center justify-center text-white shrink-0 shadow-lg shadow-brand/30">
                <Workflow className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div className="flex-1 bg-gradient-to-br from-brand to-[#cc3a1f] p-6 md:p-8 rounded-[2rem] shadow-xl shadow-brand/10 text-white">
                <h3 className="font-bold text-xl md:text-2xl mb-4">{p.title}</h3>
                {p.diff && <p className="text-white/80 text-sm md:text-[15px] leading-relaxed mb-6 font-medium">{p.diff}</p>}
                
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {p.params.map((param: any, i: number) => (
                    <span key={i} className={tagClass}>
                      <param.icon className="w-3.5 h-3.5 opacity-90" />
                      <span className="uppercase tracking-wider font-bold translate-y-[0.5px]">{param.value}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3: Result */}
            <div className="flex gap-6 md:gap-10 items-start">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white dark:bg-[#151515] border-[4px] border-brand dark:border-brand flex items-center justify-center text-[10px] md:text-xs font-bold text-brand shrink-0 shadow-lg shadow-brand/30 relative z-10">
                <div className="absolute inset-0 rounded-full bg-brand/5 animate-pulse" />
                Б
              </div>
              <div className="flex-1 bg-[#111] dark:bg-black border border-gray-800 dark:border-white/[0.08] p-6 md:p-8 rounded-[2rem] shadow-xl text-white">
                <span className="text-[9px] md:text-[10px] font-bold text-brand uppercase tracking-[0.2em] mb-4 block">Что получает компания</span>
                <p className="text-gray-300 text-[14px] md:text-[15px] leading-relaxed mb-8 font-medium">
                  {p.result}
                </p>

                <div className="space-y-5">
                  {p.results.map((r: any, i: number) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                        <r.icon className="w-4 h-4 text-brand" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-white text-[15px] mb-1">{r.title}</h5>
                        <p className="text-[13px] text-gray-400 leading-relaxed max-w-lg">{r.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Final CTA */}
            <div className="flex gap-6 md:gap-10 items-start mt-12 md:mt-16 justify-start pl-[64px] md:pl-[96px]">
              <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-brand text-white rounded-full px-8 py-3.5 md:py-4 font-bold hover:bg-[#e64627] transition-all duration-300 text-[13px] md:text-[15px] hover:scale-[1.03] transform-gpu shadow-xl shadow-brand/20">
                Обсудить формат <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-1" />
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

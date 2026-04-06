import { useState } from "react"
import { ArrowRight, Clock, Users, Layers, Zap, ListTodo, ShieldAlert, Map, Workflow, TrendingUp, Users2, Component, Award, ShieldCheck, Target, CheckCircle2 } from "lucide-react"
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
    whenBullets: ["Компания хочет понять, насколько ИИ ей действительно нужен", "Нужно на реальных кейсах увидеть, где он может дать эффект", "Определить, с какого первого шага стоит начинать"],
    result: "Руководство получает ясное понимание, где ИИ может дать компании реальный эффект, а компания — первый осмысленный шаг в AI-трансформации вместо абстрактного интереса",
    resultBullets: ["Руководство получает ясное понимание, где ИИ даст компании реальный эффект", "Компания получает первый осмысленный шаг в AI-трансформации", "Устраняется ситуация абстрактного интереса к технологиям"],
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
    when: "Когда компания готова переходить от экспериментов к системной работе: нужна понятная ИИ-архитектура, приоритизация направлений и несколько работающих пилотов, которые докажут эффективность подхода.",
    whenBullets: ["Компания готова переходить от экспериментов к системной работе", "Нужна понятная ИИ-архитектура и приоритизация направлений", "Хотите запустить пилоты, которые докажут эффективность подхода"],
    result: "Компания получает архитектуру AI-перехода, приоритизированные направления и 1–2 пилота, готовых к запуску, а руководство — ясность, как двигаться дальше без хаоса и распыления.",
    resultBullets: ["Компания получает архитектуру AI-перехода и приоритетные направления", "Подготовлены 1–2 пилота, готовых к запуску", "У руководства появляется ясность, как двигаться без хаоса и распыления"],
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
    whenBullets: ["Руководство хочет не просто внедрить ИИ в отдельные функции", "А связать его с устройством бизнеса и перестроить процессы", "Сделать ИИ частью общей архитектуры эффективности компании"],
    result: "Компания получает портфель ИИ-проектов, новую логику развития под ИИ и первые прототипы, а руководство — общее понимание, как перестраивать бизнес и на чём делать ставку дальше",
    resultBullets: ["Компания получает портфель ИИ-проектов и новую логику развития", "Первые собранные прототипы для ключевых процессов", "Руководство понимает, как перестраивать бизнес и на чём делать ставку"],
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
    when: "Когда руководителям нужно не слушать лекции, а своими руками поработать с ИИ на собственных задачах, чтобы через личный опыт понять его возможности и ограничения, и затем уверенно обсуждать следующий шаг компании.",
    whenBullets: ["Руководителям нужно своими руками поработать с ИИ на собственных задачах", "Через личный опыт понять его возможности и ограничения", "Затем уверенно обсуждать следующий шаг трансформации компании"],
    result: "Руководители получают рабочее понимание ИИ через практику на собственных задачах, а компания — топ-команду, которая уверенно задаёт следующий шаг AI-трансформации и готова масштабировать его дальше.",
    resultBullets: ["Руководители получают рабочее понимание ИИ через практику", "Компания получает топ-команду, которая уверенно задаёт следующий шаг", "Готовность руководства масштабировать ИИ дальше"],
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
    when: "Когда у первого лица или топ-менеджера есть запрос на глубокий, полностью индивидуальный трек развития в ИИ: от базовых навыков до личной стратегии и решения конфиденциальных задач.",
    whenBullets: ["У первого лица или топ-менеджера есть запрос на индивидуальный трек", "Нужно пройти путь от базовых навыков до личной стратегии", "Есть потребность в решении конфиденциальных задач с помощью ИИ"],
    result: "Руководитель получает персонально собранную работу с ИИ под свои цели, уровень и контекст, а компания — сильного внутреннего драйвера, который понимает, как двигать AI-трансформацию дальше.",
    resultBullets: ["Руководитель получает персонально собранную работу с ИИ под свои цели", "Учитывается личный уровень и глубокий рабочий контекст", "Компания получает сильного внутреннего драйвера AI-трансформации"],
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
    when: "Когда перед компанией стоит сложный, нетиповой вызов в сфере искусственного интеллекта, требующий индивидуальной архитектуры, комбинации форматов и разработки уникального решения под вашу специфику.",
    whenBullets: ["Перед компанией стоит сложный, нетиповой вызов в сфере ИИ", "Требуется индивидуальная архитектура и комбинация форматов обучения", "Нужна разработка уникального решения под вашу специфику"],
    result: "Компания получает полностью кастомную программу и индивидуально проработанное решение, которое точно отвечает её запросу, учитывает отраслевую специфику и ведёт к измеряемому бизнес-результату.",
    resultBullets: ["Компания получает полностью кастомную программу обучения и внедрения", "Индивидуально проработанное решение, которое точно отвечает её запросу", "Учитывается отраслевая специфика и измеряемый бизнес-результат"],
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
      className="group relative bg-gray-900/60 dark:bg-black/40 backdrop-blur-xl border border-gray-800/50 dark:border-white/5 rounded-[2rem] p-6 md:p-8 transition-all duration-500 hover:border-brand/40 h-full flex flex-col justify-center items-start text-left shadow-md overflow-hidden min-h-[140px]"
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
              cardClassName = "flex flex-col !rounded-[1.5rem] group/card shadow-none dark:shadow-2xl dark:shadow-brand/10 dark:hover:shadow-brand/20 transform-gpu border border-brand/30 bg-white dark:!bg-[#181413] shrink-0";
              titleClassName = "font-bold text-gray-900 dark:text-white text-base sm:text-lg lg:text-xl leading-tight relative z-10 transition-colors duration-300";
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
                    <div className="absolute inset-0 bg-white dark:bg-[#0f0e0d]" />
                    <div className="absolute inset-0 shadow-[inset_0_0_30px_0_rgba(255,83,49,0.15),inset_0_0_80px_0_rgba(255,83,49,0.05)] dark:shadow-[inset_0_0_15px_0_rgba(255,83,49,0.3),inset_0_0_50px_0_rgba(255,83,49,0.15)] group-hover/card:shadow-[inset_0_0_40px_0_rgba(255,83,49,0.25),inset_0_0_100px_0_rgba(255,83,49,0.1)] dark:group-hover/card:shadow-[inset_0_0_20px_0_rgba(255,83,49,0.4),inset_0_0_80px_0_rgba(255,83,49,0.2)] transition-shadow duration-700 rounded-[1.5rem]" />
                    <div className="absolute inset-0 dark:mix-blend-screen opacity-100 dark:opacity-80 group-hover/card:opacity-100 transition-opacity duration-700" style={{ background: 'radial-gradient(circle at 0% 0%, rgba(255,83,49,0.15) 0%, rgba(255,83,49,0.03) 30%, transparent 60%)' }} />
                    <div className="absolute inset-0 dark:mix-blend-screen opacity-100 dark:opacity-80 group-hover/card:opacity-100 transition-opacity duration-700" style={{ background: 'radial-gradient(circle at 100% 100%, rgba(255,83,49,0.1) 0%, transparent 40%)' }} />
                    <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E")' }} />
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
                  <p className={`text-[13.5px] sm:text-[15px] mb-6 relative z-10 font-medium text-left leading-relaxed ${isHighlighted ? 'text-gray-600 dark:text-white/70' : 'text-gray-600 dark:text-white/50'}`}>
                    {program.desc}
                  </p>
                )}
                
                <div className="flex flex-wrap items-center mt-auto relative z-10 gap-3">
                  {program.tags.duration && (
                     <span className={tagClass}>
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-90"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                       <span className="translate-y-[-1px]">{processText(program.tags.duration)}</span>
                     </span>
                  )}
                  {program.tags.people && (
                     <span className={tagClass}>
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-90"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                       <span className="translate-y-[-1px]">{processText(program.tags.people)}</span>
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
    <section id={p.id} ref={ref} className={`py-12 md:py-20 px-4 sm:px-6 md:px-12 ${bg} border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-500 relative overflow-hidden`}>
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-brand/[0.03] blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-start">
            {/* Left Column: Content */}
            <div className="lg:col-span-7">
              <div className="mb-6 md:mb-8">
                <span className="inline-block text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-brand uppercase bg-brand/5 px-2.5 py-0.5 rounded-full border border-brand/10 mb-4">{p.badge}</span>
                <h2 className="text-2xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-3 leading-tight">{p.title}</h2>
                <p className="text-base md:text-lg text-brand font-medium tracking-tight mb-6 leading-relaxed">{p.tagline}</p>
                
                <div className="flex flex-wrap items-center gap-2 mb-8">
                  {p.params.map((param: any, i: number) => (
                    <div key={i} className="flex items-center gap-1.5 bg-white/50 dark:bg-white/[0.05] border border-gray-100 dark:border-white/10 px-3 py-1.5 rounded-full">
                      <param.icon className="w-3 md:w-3.5 h-3 md:h-3.5 text-brand/70" />
                      <span className="text-[10px] md:text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">{param.value}</span>
                    </div>
                  ))}
                </div>

                  {p.when && (
                    <div className="relative">
                      <span className="text-[10px] font-bold text-brand uppercase tracking-[0.2em] mb-2 block opacity-80">В каких случаях полезно</span>
                      <p className="text-gray-900 dark:text-white text-lg md:text-xl leading-relaxed font-medium">
                        {p.when.replace(/^Когда /i, "").replace(/^./, (c: string) => c.toUpperCase())}
                      </p>
                    </div>
                  )}
              </div>

              {p.diff && (
                <div className="relative overflow-hidden bg-gradient-to-br from-brand/[0.08] to-transparent dark:from-brand/[0.12] border border-brand/20 p-6 md:p-8 rounded-[2rem] mb-8 max-w-2xl shadow-sm">
                  <h4 className="font-bold text-brand text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-brand fill-brand/20" /> Ключевое отличие
                  </h4>
                  <p className="text-gray-700 dark:text-gray-200 text-sm md:text-base leading-relaxed font-medium">{p.diff}</p>
                </div>
              )}

              <div className="flex">
                <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-brand text-white rounded-full px-8 py-3.5 font-bold hover:bg-[#e64627] hover:scale-[1.03] transition-all duration-300 text-sm shadow-xl shadow-brand/20 w-full sm:w-auto">
                  Обсудить программу <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>

            {/* Right Column: Artifacts Card */}
            <div className="lg:col-span-span-5 lg:pt-[42px] mt-8 lg:mt-0">
              <div className="bg-white dark:bg-white/[0.03] backdrop-blur-sm border border-gray-100 dark:border-white/[0.06] rounded-[2.5rem] p-6 md:p-10 shadow-sm relative overflow-hidden group hover:border-brand/20 transition-all duration-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />
                
                <div className="mb-6 relative z-10 text-left">
                  <span className="text-[9px] md:text-[10px] font-bold text-brand uppercase tracking-[0.2em] mb-2 block">Результат уровня</span>
                  <div className="h-px w-10 bg-brand/30 rounded-full mb-6" />
                  
                  {p.result && (
                    <p className="text-sm md:text-base text-gray-700 dark:text-gray-200 leading-relaxed font-medium tracking-tight mb-4 text-left">
                      {p.result}
                    </p>
                  )}
                </div>
                
                <div className="space-y-6 relative z-10">
                  {p.results.map((r: any, i: number) => (
                    <div key={i} className="flex gap-4 group/item">
                      <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-[1.25rem] bg-gray-50 dark:bg-white/[0.05] border border-gray-100 dark:border-white/10 flex items-center justify-center text-brand group-hover/item:scale-110 transition-all duration-500 shadow-sm">
                        <r.icon className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-1 leading-snug text-base md:text-lg">{r.title}</h5>
                        <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">{r.desc}</p>
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
    <section ref={ref} className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-white dark:bg-black transition-colors duration-300 border-t border-gray-100 dark:border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        <div className={`relative overflow-hidden bg-gray-50 dark:bg-white/[0.03] rounded-[3rem] p-8 md:p-16 border border-gray-100 dark:border-white/[0.06] transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 blur-[100px] pointer-events-none rounded-full -translate-y-1/2 translate-x-1/4" />
          
          <div className="relative z-10 max-w-4xl">
            <h2 className="text-2xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">ИИ не должен застрять в кабинете руководителя</h2>
            <p className="text-base md:text-xl text-gray-500 dark:text-gray-400 mb-8 font-medium leading-relaxed">
              Управленческий старт нужен ради следующего шага. Команды идут в сборку, функции — в пилоты, компания — в волну перемен.
            </p>
            <a href="#contact"
              className="inline-flex items-center gap-3 bg-brand text-white rounded-full px-8 md:px-10 py-4 font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-brand/20 text-sm md:text-base w-full sm:w-auto justify-center"
            >
              Программы для команд <ArrowRight className="w-5 h-5 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProgramSectionBento({ program: p, index }: any) {
  const { ref, visible } = useScrollVisible()
  const [layoutVariant] = useState<'classic' | 'modern'>('modern')
  const isEven = index % 2 === 0
  const bg = isEven ? "bg-gray-50/50 dark:bg-white/[0.02]" : "bg-white dark:bg-black"
  const tagClass = "shrink-0 whitespace-nowrap inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-bold bg-brand/5 text-brand px-3 py-1.5 rounded-full border border-brand/20 transition-colors hover:bg-brand/10 shadow-[inset_0_0_10px_rgba(255,83,49,0.05)]";

  return (
    <section id={p.id} ref={ref} className={`py-8 md:py-10 px-4 sm:px-6 md:px-12 ${bg} border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-500 relative overflow-hidden`}>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-brand/[0.03] blur-[120px] pointer-events-none rounded-full" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          
          <div className="mb-4 md:mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex-1">
              <span className="inline-block text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-brand uppercase bg-brand/5 px-2.5 py-0.5 rounded-full border border-brand/10 mb-2">{p.badge}</span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white leading-tight mb-1">{p.title}</h2>
              <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 font-medium tracking-tight mb-3 max-w-3xl leading-relaxed">{p.tagline}</p>
              
              <div className="flex flex-wrap items-center gap-2.5">
                {p.params.map((param: any, i: number) => (
                  <span key={i} className={tagClass}>
                    <param.icon className="w-3 h-3 opacity-90" />
                    <span className="translate-y-[-1px] uppercase tracking-wider text-[9px] sm:text-[10px]">{param.value}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Group */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 shrink-0 self-start md:self-end">
              <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-brand text-white rounded-full px-8 py-3.5 md:py-3 font-bold hover:bg-[#e64627] hover:scale-[1.02] shadow-xl shadow-brand/20 transition-all duration-300 text-sm md:text-base">
                Обсудить задачу <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>

          {layoutVariant === 'classic' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-min">
              {/* Context Box */}
              <div className={`col-span-1 md:col-span-5 flex flex-col gap-4`}>
                {/* Box 1 */}
                <div className="flex-1 bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/10 rounded-[2rem] p-5 sm:p-7 flex flex-col items-center justify-center text-center shadow-[inset_0px_2px_10px_rgba(0,0,0,0.02)] transition-colors hover:border-gray-200 dark:hover:border-white/20">
                  <h4 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-3">Ситуация и Задача</h4>
                  <p className="text-gray-900 dark:text-white text-[14px] sm:text-[15px] font-medium max-w-sm mb-0">
                    {p.when ? p.when.replace(/^Когда /i, "").replace(/^./, (c: string) => c.toUpperCase()) : "Поиск новых точек роста и архитектурных решений."}
                  </p>
                </div>
                
                {/* Box 2 */}
                <div className="flex-1 bg-gradient-to-b from-brand/5 to-transparent dark:from-brand/[0.08] dark:to-transparent border border-brand/10 dark:border-brand/20 rounded-[2rem] p-5 sm:p-7 flex flex-col items-center justify-center text-center shadow-[inset_0px_2px_15px_rgba(255,83,49,0.04)] transition-colors hover:border-brand/30">
                  <h4 className="text-[10px] font-bold text-brand uppercase tracking-[0.2em] mb-3">Главный эффект</h4>
                  <p className="text-gray-800 dark:text-gray-200 text-[14px] sm:text-[15px] font-medium max-w-sm mb-4">
                    {p.result || "Трансформация управленческого мышления и процессов."}
                  </p>
                </div>
              </div>

              {/* Results Grid Box */}
              <V2Card 
                visible={visible}
                className="col-span-1 md:col-span-7 bg-gray-50 dark:!bg-black/90 border border-gray-200 dark:border-white/[0.08] !rounded-[2rem] flex flex-col relative overflow-hidden group shadow-sm dark:shadow-md"
                contentClassName="!p-6 sm:!p-8 flex flex-col h-full w-full relative z-10"
              >
                 <h4 className="text-[10px] font-bold text-gray-500 dark:text-white/50 uppercase tracking-[0.2em] mb-6 relative z-10 w-full">Ключевые артефакты</h4>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 relative z-10">
                   {p.results.map((r: any, i: number) => (
                      <div key={i} className="bg-white dark:bg-white/[0.02] backdrop-blur-xl border border-gray-100 dark:border-white/10 rounded-[1.5rem] p-5 shadow-sm dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
                        <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center mb-4 border border-brand/20">
                          <r.icon className="w-5 h-5 text-brand drop-shadow-sm" />
                        </div>
                        <h5 className="font-semibold text-gray-900 dark:text-white text-base mb-2">{r.title}</h5>
                        <p className="text-[13px] text-gray-600 dark:text-white/60 leading-relaxed font-medium">{r.desc}</p>
                      </div>
                   ))}
                   
                   {p.diff && (
                     <div className="sm:col-span-2 mt-2 bg-white dark:bg-white/[0.02] backdrop-blur-xl border-l-4 border-brand border-y border-r border-gray-100 dark:border-white/5 p-5 rounded-[1.5rem] shadow-sm">
                       <h4 className="text-[10px] font-bold text-brand uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                         <Zap className="w-3.5 h-3.5" /> Отличие программы
                       </h4>
                       <p className="text-gray-800 dark:text-white/80 text-[13px] sm:text-sm leading-relaxed font-medium">
                         {p.diff}
                       </p>
                     </div>
                   )}
                 </div>
              </V2Card>
            </div>
          )}

          {layoutVariant === 'modern' && (
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
                 {/* Card 1: Situation & Task */}
                 <div className="col-span-1 md:col-span-7 bg-white/50 dark:bg-white/[0.03] backdrop-blur-sm border border-gray-100 dark:border-white/10 rounded-[2rem] p-5 md:p-6 transition-all hover:border-brand/30 shadow-sm group/context">
                    <h4 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                       <Target className="w-3.5 h-3.5 text-brand/60" /> Ситуация и Задача
                    </h4>
                    
                    <div className="space-y-3">
                      <p className="text-gray-900 dark:text-white text-lg md:text-xl font-bold tracking-tight leading-tight mb-3">
                        {p.id === 'system-ai' ? 'Быстрый переход от теории к практике ИИ' : (p.tagline.split(':')[0] || 'Системное решение задачи')}
                      </p>
                      
                      <ul className="space-y-2">
                        {(p.whenBullets || [p.when]).map((bullet: string, i: number) => (
                          <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-400 group-hover/context:text-gray-900 dark:group-hover/context:text-white transition-colors duration-300">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                            <span className="text-[14px] md:text-[15px] font-medium leading-relaxed">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                 </div>

                 {/* Card 2: Main Effect */}
                 <div className="col-span-1 md:col-span-5 bg-gradient-to-br from-brand/10 via-brand/[0.02] to-transparent border border-brand/20 rounded-[2rem] p-5 md:p-6 flex flex-col shadow-sm group/effect">
                    <h4 className="text-[10px] font-bold text-brand uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                       <Zap className="w-3.5 h-3.5 text-brand" /> Главный эффект
                    </h4>
                    
                    <div className="flex-1 space-y-4">
                      <p className="text-gray-900 dark:text-white text-lg font-bold tracking-tight leading-snug">
                        {p.id === 'system-ai' ? 'От абстрактного интереса — к реальной трансформации' : p.result.split(',')[0]}
                      </p>
                      
                      <ul className="space-y-2 mb-4">
                        {(p.resultBullets || []).map((bullet: string, i: number) => (
                          <li key={i} className="flex items-start gap-2.5 text-gray-700 dark:text-gray-300">
                            <CheckCircle2 className="w-4 h-4 text-brand mt-1 shrink-0" />
                            <span className="text-[13.5px] md:text-[14.5px] font-semibold leading-snug">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                 </div>
              </div>
              
              <V2Card 
                visible={visible}
                className="bg-gray-50 dark:!bg-black/90 border border-gray-200 dark:border-white/[0.08] !rounded-[2rem] flex flex-col relative overflow-hidden group shadow-sm"
                contentClassName="!p-5 md:!p-6 flex flex-col h-full w-full relative z-10"
              >
                 <h4 className="text-[10px] font-bold text-gray-500 dark:text-white/50 uppercase tracking-[0.2em] mb-4 relative z-10 w-full">Ключевые артефакты</h4>
                 <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${Math.min(p.results.length, 3)} gap-3 relative z-10`}>
                   {p.results.map((r: any, i: number) => (
                      <div key={i} className="bg-white dark:bg-white/[0.02] backdrop-blur-xl border border-gray-100 dark:border-white/10 rounded-[1.5rem] p-4 shadow-sm dark:shadow-md transition-transform duration-500 hover:scale-[1.02]">
                        <div className="w-8 h-8 rounded-xl bg-brand/10 flex items-center justify-center mb-3 border border-brand/20">
                          <r.icon className="w-4 h-4 text-brand drop-shadow-sm" />
                        </div>
                        <h5 className="font-bold text-gray-900 dark:text-white text-[15px] mb-1.5">{r.title}</h5>
                        <p className="text-[13px] text-gray-600 dark:text-white/60 leading-relaxed font-medium">{r.desc}</p>
                      </div>
                   ))}
                 </div>
                 {p.diff && (
                   <div className="mt-4 bg-brand/5 border-l-4 border-brand p-4 rounded-2xl">
                     <p className="text-gray-800 dark:text-white/80 text-[13px] font-semibold flex gap-3 leading-relaxed">
                       <Zap className="w-4 h-4 text-brand shrink-0" /> {p.diff}
                     </p>
                   </div>
                 )}
              </V2Card>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export function ProgramSectionPathway({ program: p, index }: any) {
  const { ref, visible } = useScrollVisible()
  const isEven = index % 2 === 0
  const bg = isEven ? "bg-gray-50/50 dark:bg-white/[0.02]" : "bg-white dark:bg-black"
  const tagClass = "shrink-0 whitespace-nowrap inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium bg-gray-900/20 dark:bg-black/20 text-gray-900 dark:text-white px-3 py-1.5 rounded-full border border-gray-300 dark:border-white/10";

  return (
    <section id={p.id} ref={ref} className={`py-12 md:py-16 px-4 sm:px-6 md:px-12 ${bg} border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-500 relative overflow-hidden`}>
      <div className="max-w-4xl mx-auto relative z-10">
        <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          
          <div className="mb-10 md:mb-12">
            <span className="inline-block text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-brand uppercase bg-brand/5 px-2.5 py-0.5 rounded-full border border-brand/10 mb-4">{p.badge}</span>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4 leading-tight">{p.title}</h2>
            <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 font-medium max-w-2xl leading-relaxed">{p.tagline}</p>
          </div>

          <div className="relative isolate px-2 md:px-6">
            <div className="absolute left-[28px] md:left-[52px] top-[40px] bottom-[40px] w-px bg-gray-200 dark:bg-white/10 -z-10" />

            <div className="flex gap-6 md:gap-10 items-start mb-10">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#f8f8f8] dark:bg-[#1a1a1a] border-[4px] border-white dark:border-black flex items-center justify-center text-[10px] md:text-xs font-bold text-gray-400 dark:text-gray-500 shrink-0 shadow-sm">
                А
              </div>
              <div className="flex-1 bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.06] p-6 md:p-8 rounded-[2rem] shadow-sm transform-gpu hover:-translate-y-1 transition-all duration-300">
                <span className="text-[9px] md:text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-4 block">Ситуация «До»</span>
                <p className="text-gray-900 dark:text-white text-sm md:text-base leading-relaxed font-medium">
                  {p.when ? p.when.replace(/^Когда /i, "").replace(/^./, (c: string) => c.toUpperCase()) : "Потребность в трансформации и поиске новых точек роста."}
                </p>
              </div>
            </div>

            <div className="flex gap-6 md:gap-10 items-start mb-10 relative">
              <div className="absolute left-[28px] md:left-[52px] top-[-10%] bottom-[-10%] w-px bg-brand/30 -z-10 blur-[2px]" />
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
                      <span className="uppercase tracking-wider font-bold translate-y-[-1px]">{param.value}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-6 md:gap-10 items-start">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white dark:bg-[#151515] border-[4px] border-brand dark:border-brand flex items-center justify-center text-[10px] md:text-xs font-bold text-brand shrink-0 shadow-lg shadow-brand/30 relative z-10">
                <div className="absolute inset-0 rounded-full bg-brand/5 animate-pulse" />
                Б
              </div>
              <div className="flex-1 bg-gray-900 dark:bg-black border border-gray-800 dark:border-white/[0.08] p-6 md:p-8 rounded-[2rem] shadow-xl text-white">
                <span className="text-[9px] md:text-[10px] font-bold text-brand uppercase tracking-[0.2em] mb-4 block">Что получает компания</span>
                <p className="text-gray-300 text-sm md:text-[15px] leading-relaxed mb-8 font-medium">
                  {p.result}
                </p>

                <div className="space-y-4 md:space-y-6">
                  {p.results.map((r: any, i: number) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                        <r.icon className="w-4 h-4 text-brand" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-white text-[15px] md:text-base mb-1">{r.title}</h5>
                        <p className="text-[13px] text-gray-400 leading-relaxed max-w-lg">{r.desc}</p>
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

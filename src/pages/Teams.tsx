import { useState } from 'react'
import { V2Hero } from '@/components/ui/V2Hero'
import { V2Card } from '@/components/ui/V2Card'
import { ArrowRight, Clock, Users, Zap, CheckCircle2 } from 'lucide-react'
import { useScrollVisible } from '@/hooks/useScrollVisible'
import { TrustStrip } from '@/components/TrustStrip'
import { FreePlatform } from '@/components/FreePlatform'
import { MainCta } from '@/components/MainCta'

const teamsSignalsData = [
  { title: "Нужен быстрый старт в использовании ИИ-инструментов" },
  { title: "Команда должна научиться собирать и делегировать задачи агентам" },
  { title: "Важно внедрить ИИ в регулярные процессы и подразделения" },
  { title: "Необходимо создать внутреннее ядро ИИ-экспертов компании" }
]

const overviewPrograms = [
  {
    id: "mindset-2",
    title: "Мышление 2.0",
    desc: "Команда собирает первых агентов на своих задачах и становится ядром AI-трансформации",
    tags: { format: "Онлайн / Офлайн", duration: "1–1,5 дня / 10 ч", people: "10–30 человек" }
  },
  {
    id: "ai-wave",
    title: "ИИ Волна",
    desc: "Широкий практический формат для всей компании: от навыков ИИ до первых рабочих сценариев",
    tags: { format: "Онлайн", duration: "8 мод / Месяц", people: "Группа компании" }
  },
  {
    id: "builder-day",
    title: "Агенты за 1 день",
    desc: "За один день команда собирает рабочего агента и формирует навык сборки",
    tags: { format: "Офлайн", duration: "1 день / 5 ч", people: "до 50 человек" }
  },
  {
    id: "ai-mastery",
    title: "Мастерская AI-Агентов",
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
];

const programs = [
  {
    id: "mindset-2",
    badge: "Команда",
    title: "Мышление 2.0",
    tagline: "Команда собирает первых агентов на своих задачах",
    when: "Когда компании нужно собрать сильную команду, которая сможет работать с ИИ руками, создавать рабочие решения на своих задачах и становиться внутренней опорой AI-трансформации.",
    whenBullets: ["Компании нужно собрать сильную команду для работы с ИИ руками", "Которая будет создавать рабочие решения на своих задачах", "И становиться внутренней опорой AI-трансформации"],
    result: "Участники настраивают своё ИИ-рабочее место, собирают первого агента, решают бизнес-кейс компании и выходят с личным планом на 30 дней. Компания получает практиков, которая уверенно развивает AI-подход внутри бизнеса",
    resultBullets: ["Участники настраивают своё ИИ-рабочее место и первого агента", "Решают реальный бизнес-кейс компании", "Компания получает команду практиков с планом на 30 дней"],
    desc: "Команда собирает первых агентов на своих задачах и становится ядром AI-трансформации. Участники берут реальные задачи компании, собирают агентов, проверяют гипотезы и уходят с рабочими артефактами. После того внутри компании появляются свои люди-носители навыка — те, кто может продолжить тему без внешней поддержки.",
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
    when: "Когда компании нужно развернуть AI-практику на широкую группу сотрудников - по ролям, функциям и регулярным задачам, чтобы ИИ начал работать не у единиц, а в масштабе всей команды.",
    whenBullets: ["Компании нужно развернуть AI-практику на широкую группу сотрудников", "Развернуть практику по ролям, функциям и регулярным задачам", "Чтобы ИИ начал работать не у единиц, а в масштабе всей команды"],
    result: "Компания получает управляемую волну AI-практики: сотрудники осваивают инструменты, начинают использовать ИИ в работе, а руководство получает видимость прогресса и рабочую привычку использования ИИ в процессах.",
    resultBullets: ["Компания получает управляемую волну AI-практики", "Сотрудники начинают использовать ИИ в своей работе", "Руководство получает видимость прогресса и рабочую привычку в процессах"],
    desc: "Широкий практический формат для компании: от базовых навыков ИИ до первых агентов и рабочих сценариев. Участники работают по ролям, собирают агентов под свои задачи, фиксируют результаты. Руководство видит прогресс, получает отчётность и понимает, кто действительно двигает тему. После программы компания получает рабочуя привычку использования ИИ в десятках процессов.",
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
    when: "Когда у компании уже есть подготовленная команда и конкретная задача, под которую нужно за один интенсивный день собрать рабочего агента и понять, как повторять эту сборку дальше.",
    whenBullets: ["У компании уже есть подготовленная команда и конкретная задача", "Нужно за один интенсивный день собрать рабочего агента", "Команде нужно понять, как повторять эту сборку дальше"],
    result: "Команда уходит с рабочим AI-агентом, настроенным workflow, подключённой логикой и алгоритмом повторной сборки за 30–60 минут под новые задачи.",
    resultBullets: ["Команда уходит с рабочим AI-агентом и настроенным workflow", "Идет работа с подключённой логикой", "Команда получает алгоритм повторной сборки за 30–60 минут"],
    desc: "Практический интенсив для собранной команды with конкретной задачей. Каждый участник проходит через 5 блоков сборки: от выбора мозга модели до финального интерфейса. На выходе — рабочий агент, настроенный n8n workflow и алгоритм пересборки. Мини-группы по 3–4 человека работают над реальными сценариями компании.",
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
    when: "Когда компании нужна малая продвинутая группа, которая глубоко разберётся в Claude, n8n, агентных workflow, памяти, RAG и сможет самостоятельно собирать рабочие автоматизации под реальные процессы.",
    whenBullets: ["Компании нужна малая продвинутая группа", "Которая глубоко разберётся в Claude, n8n, агентных workflow, памяти, RAG", "Сможет самостоятельно собирать рабочие автоматизации под реальные процессы"],
    result: "Участники уверенно владеют Claude и n8n, собирают 3–5 рабочих агентов и автоматизаций своими руками и понимают, как проектировать новые решения под любую следующую задачу.",
    resultBullets: ["Участники уверенно владеют Claude и n8n", "Собирают 3–5 рабочих агентов и автоматизаций своими руками", "Понимают, как проектировать новые решения под любую следующую задачу"],
    desc: "Малая группа до 6 человек. 4 занятия по 1,5 часа. Последовательное погружение: экосистема Claude, основы n8n, AI-агенты в n8n, продвинутая сборка with RAG, memory, multi-agent и error handling. Идеально для тех, кто готов стать внутренним архитектором ИИ-решений и внедрять сложные цепочки автоматизации.",
    params: [
      { label: "Срок", value: "4 зан × 1,5 ч", icon: Clock },
      { label: "Результат", value: "3–5 агентов", icon: Zap },
      { label: "Группа", value: "до 6 человек", icon: Users },
    ],
    results: [
      { title: "Библиотека агентов", desc: "3–5 работающих агентов под ваши процессы.", icon: CheckCircle2 },
      { title: "Продвинутый n8n", desc: "Опыт работы with RAG, памятью и мульти-агентными схемами.", icon: CheckCircle2 },
      { title: "Готовый артефакт", desc: "Настроенные и проверенные цепочки автоматизации.", icon: CheckCircle2 },
    ],
  },
  {
    id: "custom-team",
    badge: "Персонально",
    title: "Индивидуальная программа под команду",
    tagline: "Программа под ваши задачи, процессы и масштаб",
    when: "Когда AI-трансформация команды требует собственной программы: с учётом целей бизнеса, состава участников, уровня зрелости, процессов и того результата, который компания хочет получить на уровне практики и масштабирования.",
    whenBullets: ["AI-трансформация команды требует собственной программы", "С учётом целей бизнеса, состава участников и уровня зрелости процессов", "С учётом того результата, который компания хочет получить"],
    result: "Компания получает индивидуально собранную программу под свой контекст, а руководство и команда — формат, который точно соответствует их задачам и даёт следующий сильный шаг в AI-трансформации.",
    resultBullets: ["Компания получает индивидуально собранную программу под свой контекст", "Формат точно соответствует задачам руководства и команды", "Решение даёт следующий сильный шаг в AI-трансформации"],
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
];

export function Teams() {
  const statusTags = teamsSignalsData.map((s, i) => (
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
                   {(program as any).tags.format && (
                     <span className="block text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] mb-3 opacity-100 text-brand">
                       {(program as any).tags.format.replace(" / ", " • ")}
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
                  {(program as any).tags.duration && (
                     <span className={tagClass}>
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-90"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                       <span className="translate-y-[-1px]">{processText((program as any).tags.duration)}</span>
                     </span>
                  )}
                  {(program as any).tags.people && (
                     <span className={tagClass}>
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-90"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                       <span className="translate-y-[-1px]">{processText((program as any).tags.people)}</span>
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
                  <p className="text-gray-900 dark:text-white text-[14px] sm:text-[15px] font-medium max-w-sm mb-0 leading-relaxed">
                    {p.when ? p.when.replace(/^Когда /i, "").replace(/^./, (c: string) => c.toUpperCase()) : "Поиск новых точек роста и архитектурных решений."}
                  </p>
                </div>
                
                {/* Box 2 */}
                <div className="flex-1 bg-gradient-to-b from-brand/5 to-transparent dark:from-brand/[0.08] dark:to-transparent border border-brand/10 dark:border-brand/20 rounded-[2rem] p-5 sm:p-7 flex flex-col items-center justify-center text-center shadow-[inset_0px_2px_15px_rgba(255,83,49,0.04)] transition-colors hover:border-brand/30">
                  <h4 className="text-[10px] font-bold text-brand uppercase tracking-[0.2em] mb-3">Главный эффект</h4>
                  <p className="text-gray-800 dark:text-gray-200 text-[14px] sm:text-[15px] font-medium max-w-sm mb-4 leading-relaxed">
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
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand/60"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg> Ситуация и Задача
                    </h4>
                    
                    <div className="space-y-3">
                      <p className="text-gray-900 dark:text-white text-lg md:text-xl font-bold tracking-tight leading-tight mb-3">
                        {p.tagline.split(':')[0] || 'Системное решение задачи'}
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
                        {p.result.split(',')[0]}
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

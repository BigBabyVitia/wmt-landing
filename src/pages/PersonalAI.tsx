import { useState } from "react"
import { ArrowRight, Clock, Users, Zap, Target, CheckCircle2, Sparkles, Shield } from "lucide-react"
import { TrustStrip } from "@/components/TrustStrip"
import { MainCta } from "@/components/MainCta"
import { FitAssessment } from "@/components/sections/FitAssessment"
import { useScrollVisible } from "@/hooks/useScrollVisible"
import { V2Hero } from "@/components/ui/V2Hero"
import { V2Card } from "@/components/ui/V2Card"
import { Link } from "react-router-dom"

const fitItems = [
  { text: "Вам нужно персональное решение под ваши задачи, а не общий курс", fit: true },
  { text: "Вы хотите разобраться в ИИ глубоко и самостоятельно, вне корпоративного контекста", fit: true },
  { text: "Вам важна плотная практика 1-на-1 с тренером, а не лекции в Zoom", fit: true },
  { text: "Вы готовы к интенсивному погружению для быстрого результата", fit: true },
  { text: "Вы ищете массовые курсы или вебинары для ознакомления", fit: false },
  { text: "Вам нужна онлайн-библиотека промптов без обратной связи", fit: false },
  { text: "Вы хотите просто «быть в курсе» трендов без глубокой практики", fit: false },
  { text: "У вас задача обучить отдел (для этого есть корпоративный формат)", fit: false },
]

const signalsData = [
  { title: "Вы хотите пройти тему ИИ глубоко, но не внутри корпоративного контекста" },
  { title: "Вам нужен чёткий план действий и рабочие инструменты под ваши конкретные задачи" },
  { title: "Вы готовы к интенсивной работе 1-на-1 ради кратного ускорения" },
]

const overviewPrograms = [
  {
    id: "strategy-session",
    title: "Стратегическая сессия",
    desc: "Сжатый формат для построения плана, решения острых вопросов и определения первого шага в ИИ",
    tags: { format: "Офлайн / Онлайн", duration: "индивидуально", people: "1 человек" }
  },
  {
    id: "personal-track",
    title: "Персональный трек",
    desc: "Полное погружение с разработкой индивидуальной программы, сборкой стратегии и рабочего агента под ваши задачи",
    tags: { format: "Офлайн", duration: "индивидуально", people: "1 человек" },
    isPersonal: true,
  },
]

const programs = [
  {
    id: "strategy-session",
    badge: "Быстрый старт",
    title: "Стратегическая сессия",
    tagline: "Индивидуальный формат — план, приоритеты и первый шаг",
    when: "Когда нужно быстро разобраться в ландшафте ИИ, определить, где он даст максимальный эффект вашему бизнесу, и уйти с конкретным планом действий, а не с общими рекомендациями.",
    whenBullets: ["Вам нужно быстро разобраться в ландшафте ИИ", "Определить, где он даст максимальный эффект бизнесу", "Уйти с конкретным планом действий, а не рекомендациями"],
    result: "Вы уходите с чёткой картой приоритетов, персональным roadmap на 90 дней и пониманием, какой первый шаг даст вам максимальный результат.",
    resultBullets: ["Вы уходите с чёткой картой приоритетов", "Получаете персональный roadmap на 90 дней", "Понимаете, какой первый шаг даст максимальный результат"],
    params: [
      { label: "Длительность", value: "индивидуально", icon: Clock },
      { label: "Формат", value: "Офлайн / Онлайн", icon: Target },
      { label: "Участник", value: "1 человек", icon: Users },
    ],
    results: [
      { title: "Карта приоритетов", desc: "Что даст результат, а что — пустая трата ресурсов.", icon: CheckCircle2 },
      { title: "Roadmap на 90 дней", desc: "Конкретный пошаговый план с дедлайнами и метриками.", icon: CheckCircle2 },
      { title: "Первый шаг", desc: "Определённый и обоснованный — можно начинать в понедельник.", icon: CheckCircle2 },
    ],
  },
  {
    id: "personal-track",
    badge: "Глубокое погружение",
    title: "Персональный трек",
    tagline: "Индивидуальная программа, стратегия и рабочий агент — под ваш кейс",
    when: "Когда вам нужна не лекция, а полная перестройка — от аудита ваших процессов до работающего ИИ-агента и стратегии, собранных лично под ваш контекст и задачи.",
    whenBullets: ["Вам нужна не лекция, а полная перестройка компетенций", "От аудита ваших процессов до работающего ИИ-агента", "Стратегия, собранная лично под ваш контекст и задачи"],
    result: "Вы уходите с полностью готовым инструментарием: персональная стратегия, библиотека промптов, рабочий ИИ-агент и навык самостоятельного развития без внешней зависимости.",
    resultBullets: ["Вы уходите с полностью готовым ИИ-инструментарием", "Получаете персональную стратегию и рабочего ИИ-агента", "Формируете навык самостоятельного развития без внешних команд"],
    params: [
      { label: "Срок", value: "индивидуально", icon: Clock },
      { label: "Практика", value: "100% под ваш кейс", icon: Zap },
      { label: "Участник", value: "1 человек", icon: Users },
    ],
    results: [
      { title: "Персональная стратегия", desc: "Навигатор по ландшафту ИИ с фокусом на ваши приоритеты.", icon: CheckCircle2 },
      { title: "Библиотека промптов", desc: "Стек проверенных запросов под ваши задачи — работает сразу.", icon: CheckCircle2 },
      { title: "Рабочий ИИ-агент", desc: "Полноценный автономный помощник, собранный под ваш запрос.", icon: CheckCircle2 },
      { title: "Навык автономного развития", desc: "Умение осваивать новые ИИ-модели без чужих инструкций.", icon: CheckCircle2 },
    ],
    steps: [
      { badge: "Шаг 01", title: "Изучение и аудит", desc: "Анализируем ваш бизнес-процесс и текущие задачи. Находим «бутылочные горлышки», которые ИИ может расшить уже завтра." },
      { badge: "Шаг 02", title: "Индивидуальный трек", desc: "Разрабатываем программу обучения и инструменты специально под ваш кейс. Минимум теории — максимум того, что нужно именно вам." },
      { badge: "Шаг 03", title: "Личная сборка", desc: "Выходим на реализацию. Вместе собираем стратегию, промпты и ИИ-агентов, интегрируя их в ваш реальный рабочий процесс." },
    ],
  },
]

export function PersonalAI() {
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
        label="Личный ИИ — персональные форматы"
        title={<>Ваша личная <em className="not-italic text-brand font-bold">ИИ-трансформация</em></>}
        description="Два формата для тех, кто хочет пройти тему ИИ глубоко и лично: от стратегической сессии до полного погружения с разработкой персональной программы, сборкой стратегии и рабочего агента."
        tagsTitle="Когда нужен личный формат:"
        tags={statusTags}
        buttons={
          <>
            <a href="#programs" className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 rounded-full px-8 md:px-10 py-3.5 md:py-4 font-bold hover:bg-gray-100 transition-all duration-300 shadow-[0_8px_32px_rgba(255,255,255,0.2)] hover:-translate-y-1 transform-gpu text-sm md:text-base">
              К форматам <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-1" />
            </a>
            <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-transparent text-white border border-white/20 rounded-full px-8 md:px-10 py-3.5 md:py-4 font-bold hover:bg-white/5 transition-all duration-300 text-sm md:text-base">
              Обсудить задачу
            </a>
          </>
        }
      />

      <ProgramsOverviewSection />

      {programs.map((p, i) => (
        <PersonalProgramSection key={p.id} program={p} index={i} />
      ))}

      <section className="py-20 md:py-32 px-4 sm:px-6 md:px-12 bg-white dark:bg-black border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <FitAssessment items={fitItems} title="Личный формат подходит, если вы готовы к глубокой работе" />
        </div>
      </section>

      <AvailabilitySection />
      <BridgeSection />
      <TrustStrip />
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
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section id="programs" ref={ref} className="py-16 md:py-32 px-4 sm:px-6 md:px-12 bg-white dark:bg-black border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-10 md:mb-16 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4 leading-tight">Два персональных формата</h2>
          <p className="text-base md:text-xl text-gray-500 dark:text-gray-400 max-w-5xl font-medium leading-relaxed">От сфокусированной сессии до полного персонального трека с разработкой программы и сборкой агента.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {overviewPrograms.map((program, idx) => {
            const isPersonal = (program as any).isPersonal;
            const isHighlighted = isPersonal;

            let cardClassName = "flex flex-col border border-gray-100 dark:border-white/[0.06] !rounded-[1.5rem] group/card hover:border-brand/20 shrink-0 !bg-gray-50/80 dark:!bg-white/[0.04]";
            let titleClassName = "font-bold text-gray-900 dark:text-white text-base sm:text-lg lg:text-xl leading-tight transition-colors duration-300 group-hover/card:text-brand";

            if (isHighlighted) {
              cardClassName = "flex flex-col !rounded-[1.5rem] group/card shadow-none dark:shadow-2xl dark:shadow-brand/10 dark:hover:shadow-brand/20 transform-gpu border border-brand/30 bg-white dark:!bg-[#181413] shrink-0";
              titleClassName = "font-bold text-gray-900 dark:text-white text-base sm:text-lg lg:text-xl leading-tight relative z-10 transition-colors duration-300";
            }

            const tagClass = isHighlighted 
              ? "shrink-0 whitespace-nowrap inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-medium bg-transparent text-brand px-3.5 py-1.5 rounded-full border border-brand/25 transition-colors hover:bg-brand/5"
              : "shrink-0 whitespace-nowrap inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-medium bg-transparent text-gray-700 dark:text-white/60 px-3.5 py-1.5 rounded-full border border-gray-200/60 dark:border-white/10 transition-colors hover:bg-gray-50/50 dark:hover:bg-white/5";

            return (
              <V2Card
                key={idx}
                visible={visible}
                index={idx}
                className={`${cardClassName} cursor-pointer active:scale-[0.98] transition-all duration-700`}
                contentClassName="!p-5 sm:!p-6 md:!p-7 flex flex-col h-full content-start"
                onClick={() => scrollToProgram(program.id)}
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
                       <span className="translate-y-[-1px]">{program.tags.duration}</span>
                     </span>
                  )}
                  {program.tags.people && (
                     <span className={tagClass}>
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-90"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                       <span className="translate-y-[-1px]">{program.tags.people}</span>
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

function PersonalProgramSection({ program: p, index }: any) {
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
              <div className={`col-span-1 md:col-span-5 flex flex-col gap-4`}>
                <div className="flex-1 bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/10 rounded-[2rem] p-5 sm:p-7 flex flex-col items-center justify-center text-center shadow-[inset_0px_2px_10px_rgba(0,0,0,0.02)] transition-colors hover:border-gray-200 dark:hover:border-white/20">
                  <h4 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-3">Ситуация и Задача</h4>
                  <p className="text-gray-900 dark:text-white text-[14px] sm:text-[15px] leading-relaxed font-medium max-w-sm mb-0">
                    {p.when ? p.when.replace(/^Когда /i, "").replace(/^./, (c: string) => c.toUpperCase()) : "Поиск новых точек роста."}
                  </p>
                </div>
                
                <div className="flex-1 bg-gradient-to-b from-brand/5 to-transparent dark:from-brand/[0.08] dark:to-transparent border border-brand/10 dark:border-brand/20 rounded-[2rem] p-5 sm:p-7 flex flex-col items-center justify-center text-center shadow-[inset_0px_2px_15px_rgba(255,83,49,0.04)] transition-colors hover:border-brand/30">
                  <h4 className="text-[10px] font-bold text-brand uppercase tracking-[0.2em] mb-3">Главный эффект</h4>
                  <p className="text-gray-800 dark:text-gray-200 text-[14px] sm:text-[15px] leading-relaxed font-medium max-w-sm mb-4">
                    {p.result}
                  </p>
                </div>
              </div>

              <V2Card 
                visible={visible}
                className="col-span-1 md:col-span-7 bg-gray-50 dark:!bg-black/90 border border-gray-200 dark:border-white/[0.08] !rounded-[2rem] flex flex-col relative overflow-hidden group shadow-sm dark:shadow-md"
                contentClassName="!p-6 sm:!p-8 flex flex-col h-full w-full relative z-10"
              >
                 <h4 className="text-[10px] font-bold text-gray-500 dark:text-white/50 uppercase tracking-[0.2em] mb-6 relative z-10 w-full">Что вы получите</h4>
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
                 <h4 className="text-[10px] font-bold text-gray-500 dark:text-white/50 uppercase tracking-[0.2em] mb-4 relative z-10 w-full">Что вы получите</h4>
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
              </V2Card>
            </div>
          )}

          {/* Steps section (only for personal track) */}
          {p.steps && p.steps.length > 0 && (
            <div className="mt-6 md:mt-8">
              <h4 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-4">Как проходит работа</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {p.steps.map((step: any, idx: number) => (
                  <div 
                    key={idx}
                    className="group/step bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.08] rounded-[1.5rem] p-5 sm:p-7 transition-all duration-500 hover:border-brand/30 shadow-sm"
                  >
                    <span className="text-brand font-bold text-xs tracking-[0.2em] uppercase mb-2 block">{step.badge}</span>
                    <h5 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover/step:text-brand transition-colors duration-300">{step.title}</h5>
                    <p className="text-gray-500 dark:text-white/50 text-[13px] leading-relaxed font-medium">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}


function AvailabilitySection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-16 md:py-32 px-4 sm:px-6 md:px-12 bg-gray-50/50 dark:bg-white/[0.02] transition-colors duration-500 border-t border-gray-100 dark:border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className={`relative bg-white dark:bg-white/[0.02] backdrop-blur-3xl rounded-[3.5rem] p-8 md:p-16 border border-gray-200 dark:border-white/[0.08] overflow-hidden transition-all duration-1000 ${visible ? "opacity-100 translate-y-0 shadow-lg dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)]" : "opacity-0 translate-y-12"}`}>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/10 blur-[120px] pointer-events-none rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand/5 blur-[100px] pointer-events-none rounded-full translate-y-1/2 -translate-x-1/4 opacity-50" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-7 space-y-8">
               <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 border border-brand/20 rounded-xl">
                  <Shield className="w-4 h-4 text-brand" />
                  <span className="text-brand text-xs font-bold uppercase tracking-widest leading-none">Ограниченный набор</span>
               </div>

               <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
                 Доступность <br />
                 <span className="text-gray-400 dark:text-white/40">личного формата</span>
               </h2>

               <p className="text-gray-500 dark:text-white/60 text-lg md:text-xl leading-relaxed max-w-2xl">
                 Для обеспечения глубины погружения и качества сборки Игорь работает не более чем с 2-мя клиентами одновременно. Это гарантирует полный фокус на ваших задачах.
               </p>

               <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#contact" className="relative group/btn inline-flex items-center justify-center gap-2 bg-brand text-white rounded-2xl px-10 py-5 font-bold hover:bg-[#fb4119] transition-all duration-300 shadow-xl shadow-brand/20 overflow-hidden whitespace-nowrap">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]" />
                    Обсудить ваш проект
                  </a>
               </div>
            </div>

            <div className="lg:col-span-5">
               <div className="bg-gray-50/50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] rounded-[2.5rem] p-8 md:p-12 backdrop-blur-xl relative group h-full">
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-brand/10 blur-2xl group-hover:bg-brand/20 transition-colors duration-500" />
                  
                  <div className="flex items-center gap-4 mb-6 text-brand">
                     <Sparkles className="w-6 h-6" />
                     <span className="text-lg font-bold">Ближайшие окна</span>
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 leading-tight">Конец апреля / Начало мая</h3>
                  <p className="text-gray-500 dark:text-white/50 text-base leading-relaxed mb-6">
                    Слоты на текущий месяц заполнены. Заявка сейчас гарантирует вам приоритет при освобождении места.
                  </p>
                  <div className="text-gray-400 dark:text-white/30 text-xs font-bold tracking-[0.2em] uppercase">Стратегическая сессия — быстрее</div>
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
            <h2 className="text-2xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">Нужно перестроить целую команду?</h2>
            <p className="text-base md:text-xl text-gray-500 dark:text-gray-400 mb-8 md:mb-10 font-medium leading-relaxed">
              Личный формат — для глубокой индивидуальной работы. Если ваша задача — обучить подразделение, собрать ядро практиков или запустить AI-трансформацию на уровне компании — для этого есть командные программы.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/executive"
                className="inline-flex items-center gap-3 bg-brand text-white rounded-full px-8 md:px-10 py-4 font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-brand/20 text-sm md:text-base justify-center"
              >
                Для руководителей <ArrowRight className="w-5 h-5 ml-1" />
              </Link>
              <Link to="/teams"
                className="inline-flex items-center gap-3 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white bg-gray-50 dark:bg-white/5 rounded-full px-8 md:px-10 py-4 font-bold hover:border-brand/30 transition-all duration-300 text-sm md:text-base justify-center"
              >
                Для команд <ArrowRight className="w-5 h-5 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

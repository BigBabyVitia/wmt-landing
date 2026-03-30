import { ArrowRight, MapPin, Zap, Target, Bot, Compass, Terminal, Shield, Sparkles, UserCheck, Users, Radio, UserPlus } from "lucide-react"
import { Link } from "react-router-dom"
import { TrustStrip } from "@/components/TrustStrip"
import { MainCta } from "@/components/MainCta"
import { FitAssessment } from "@/components/sections/FitAssessment"
import { useScrollVisible } from "@/hooks/useScrollVisible"
import { V2Hero } from "@/components/ui/V2Hero"

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

const personalSteps = [
  { 
    title: "Изучение и аудит", 
    desc: "Анализируем ваш бизнес-процесс и текущие задачи. Находим «бутылочные горлышки», которые ИИ может расшить уже завтра.",
    badge: "Шаг 01"
  },
  { 
    title: "Индивидуальный трек", 
    desc: "Разрабатываем программу обучения и инструменты специально под ваш кейс. Минимум теории — максимум того, что нужно именно вам.",
    badge: "Шаг 02"
  },
  { 
    title: "Личная сборка", 
    desc: "Выходим на реализацию. Вместе собираем стратегию, промпты и ИИ-агентов, внедряя их в ваш реальный рабочий процесс.",
    badge: "Шаг 03"
  },
]

const outputs = [
  { 
    title: "Навигатор по ландшафту ИИ", 
    desc: "Различайте реальные сдвиги и шум. Фокус на приоритетах, важных именно для вашего бизнеса.",
    icon: <Compass className="w-8 h-8 text-brand" />,
    label: "Стратегия"
  },
  { 
    title: "Персональный Roadmap", 
    desc: "Пошаговый план внедрения ИИ-инструментов в ваши рабочие процессы на ближайшие 3–6 месяцев.",
    icon: <Target className="w-8 h-8 text-brand" />,
    label: "План"
  },
  { 
    title: "Библиотека рабочих промптов", 
    desc: "Стек проверенных запросов под ваши задачи, который работает сразу, а не после бесконечных правок.",
    icon: <Terminal className="w-8 h-8 text-brand" />,
    label: "Инструментарий"
  },
  { 
    title: "Готовый ИИ-агент под задачу", 
    desc: "Полноценный автономный помощник, собранный под ваш запрос. Самый ценный актив программы.",
    icon: <Bot className="w-12 h-12 text-white" />,
    label: "Главный результат"
  },
  { 
    title: "Навык автономного развития", 
    desc: "Навык внедрения любых новых ИИ-моделей без зависимости от чужих инструкций и гайдов.",
    icon: <Zap className="w-8 h-8 text-brand" />,
    label: "Компетенция"
  },
]

const whyOffline = [
  { 
    title: "Коррекция в моменте", 
    desc: "Когда мы работаем 1-на-1, я вижу каждую ошибку в промпте мгновенно. Это правит ваши руки сразу, достигая результата в 10 раз быстрее.",
    icon: <UserCheck className="w-8 h-8 text-brand" />
  },
  { 
    title: "Плотность работы", 
    desc: "Максимальная концентрация на ваших задачах без отвлечений на уведомления и сторонние темы. Только ваш кейс.",
    icon: <Zap className="w-8 h-8 text-brand" />
  },
  { 
    title: "Персональный фокус", 
    desc: "Вся энергия и опыт тренера направлены на решение ваших специфических проблем, что невозможно в групповом формате.",
    icon: <Users className="w-8 h-8 text-brand" />
  },
]

export function PersonalAI() {
  const paramsTags = [
    { label: "Формат", value: "Персонально, 1-на-1", icon: Users },
    { label: "Локация", value: "Офлайн / Онлайн", icon: MapPin },
    { label: "Фокус", value: "Сборка под ваш кейс", icon: Zap },
    { label: "Результат", value: "Работающий AI-агент", icon: Target },
  ].map((p, i) => (
    <div key={i} className="group relative bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-6 transition-all duration-500 hover:border-brand/30 h-full flex flex-col items-start text-left">
      <div className="mb-4 relative z-10 flex items-center gap-2">
        <p className="text-[10px] font-bold tracking-[0.2em] text-brand uppercase">{p.label}</p>
      </div>
      <div className="flex items-center gap-3 relative z-10">
        <p className="text-white font-semibold text-base md:text-lg leading-[1.1]">{p.value}</p>
      </div>
    </div>
  ))

  return (
    <div className="bg-black min-h-screen text-white">
      <V2Hero 
        label="Личный ИИ"
        title={<>Индивидуальная <em className="not-italic text-brand font-bold">ИИ-трансформация</em> под ваши задачи</>}
        description="Глубокое погружение в нейросети вне корпоративного контекста. Мы анализируем ваши процессы, разрабатываем персональную программу и вместе собираем рабочие решения."
        tags={paramsTags}
        buttons={
          <div className="flex flex-col gap-4">
            <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-brand text-white rounded-2xl px-10 py-5 font-bold hover:bg-[#fb4119] transition-all duration-300 shadow-[0_8px_32px_rgba(255,83,49,0.25)] hover:-translate-y-1 transform-gpu">
              Обсудить ваш проект <ArrowRight className="w-5 h-5 ml-1" />
            </a>
            <div className="text-white/50 text-sm text-center md:text-left">Ближайшие свободные окна: Конец апреля / Начало мая.</div>
          </div>
        }
      />

      <section className="py-20 md:py-32 px-4 sm:px-6 md:px-12 bg-white dark:bg-black border-t border-white/[0.06] transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <FitAssessment items={fitItems} title="Личное сопровождение подходит, если вы готовы к глубокой перестройке" />
        </div>
      </section>

      <ProgramContent />
      <OutputsSection />
      <WhyOfflineSection />
      <AvailabilityDashboard />
      
      <TrustStrip />
      <MainCta />
    </div>
  )
}

function ProgramContent() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-20 md:py-40 px-4 sm:px-6 md:px-12 bg-gray-50 dark:bg-[hsl(220,20%,7%)] border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-16 md:mb-24 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-8 border-l-4 border-brand pl-6">
            Три этапа <br />
            <span className="text-white/40">персональной работы</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative z-10">
          {personalSteps.map((step, idx) => (
            <div 
              key={idx}
              className={`group relative bg-white/[0.02] border border-white/[0.08] rounded-[2.5rem] p-8 md:p-12 transition-all duration-700 hover:border-brand/40 overflow-hidden ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${idx * 200}ms` }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="mb-8 flex justify-between items-start">
                 <div className="p-4 bg-white/[0.04] border border-white/10 rounded-2xl group-hover:bg-brand/10 group-hover:border-brand/30 transition-all duration-500">
                    {idx === 0 ? <Compass className="w-8 h-8 text-brand" /> : idx === 1 ? <Target className="w-8 h-8 text-brand" /> : <Zap className="w-8 h-8 text-brand" />}
                 </div>
                 <span className="text-white/20 font-bold text-lg tracking-widest">{step.badge}</span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight group-hover:text-brand transition-colors duration-500">{step.title}</h3>
              <p className="text-white/50 text-lg leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function OutputsSection() {
  const { ref, visible } = useScrollVisible()
  const featuredOutput = outputs[3];
  const otherOutputs = [outputs[0], outputs[1], outputs[2], outputs[4]];

  return (
    <section ref={ref} className="py-20 md:py-40 px-4 sm:px-6 md:px-12 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-brand" />
                <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">ВАШ ЛИЧНЫЙ АКТИВ</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">Результаты <br /><span className="text-white/40">программы</span></h2>
            </div>
            <p className="text-white/40 text-lg md:text-xl max-w-sm leading-relaxed border-l border-white/10 pl-8">
              Вы уезжаете с полностью готовым инструментарием и планом его развития.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">
            <div className="lg:col-span-12 xl:col-span-4 h-full">
              <div className="group relative h-full bg-brand p-8 md:p-10 rounded-[3rem] overflow-hidden flex flex-col justify-between transition-all duration-700 hover:bg-[#fb4119] shadow-[0_30px_60px_rgba(255,83,49,0.2)]">
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                  <div className="mb-10 p-5 bg-white/10 backdrop-blur-xl rounded-3xl w-fit group-hover:scale-110 transition-transform duration-500">
                    {featuredOutput.icon}
                  </div>
                  <div className="mb-4 inline-block px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">
                    {featuredOutput.label}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">{featuredOutput.title}</h3>
                  <p className="text-white/80 text-lg leading-relaxed">{featuredOutput.desc}</p>
                </div>
                <div className="mt-12 text-white/40 text-xs font-bold tracking-[0.2em] uppercase">#ВашЛичныйАктив</div>
              </div>
            </div>

            <div className="lg:col-span-12 xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {otherOutputs.map((o, idx) => (
                <div 
                  key={idx}
                  className="group relative bg-white/[0.03] border border-white/[0.08] rounded-[2.5rem] p-8 md:p-10 transition-all duration-700 hover:border-white/20 flex flex-col justify-between"
                >
                  <div className="relative z-10">
                    <div className="mb-8 text-brand group-hover:scale-110 transition-transform duration-500">{o.icon}</div>
                    <div className="mb-3 text-white/30 text-[10px] font-bold uppercase tracking-widest">{o.label}</div>
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 leading-tight group-hover:text-brand transition-colors duration-500">{o.title}</h3>
                    <p className="text-white/50 text-base leading-relaxed line-clamp-3">{o.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function WhyOfflineSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-20 md:py-40 px-4 sm:px-6 md:px-12 bg-white dark:bg-black transition-colors duration-500 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="max-w-3xl mb-16 md:mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/10 border border-brand/20 rounded-full mb-6">
              <Radio className="w-4 h-4 text-brand animate-pulse" />
              <span className="text-brand text-[10px] font-bold uppercase tracking-widest">ПЕРСОНАЛЬНАЯ РЕАЛИЗАЦИЯ</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-8 leading-tight">Почему результат возможен <br /><span className="text-brand">только в личном формате?</span></h2>
            <p className="text-white/60 text-lg md:text-xl leading-relaxed">
              При сборке ИИ-агента критична скорость: мгновенная правка «в руках» работает в 10 раз быстрее, чем переписка в чате или Zoom.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2 h-full">
              <div className="group relative h-full bg-white/[0.02] border border-white/[0.08] rounded-[3rem] p-10 md:p-14 transition-all duration-700 hover:border-brand/40 overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                
                <div>
                   <div className="mb-10 text-brand scale-125 origin-left">{whyOffline[0].icon}</div>
                   <h3 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight max-w-lg">{whyOffline[0].title}</h3>
                   <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-xl">{whyOffline[0].desc}</p>
                </div>
                
                <div className="mt-12 flex items-center gap-4 text-white/40 text-sm font-medium">
                   <div className="h-px flex-1 bg-white/[0.08]" />
                   <span>ЦЕННОСТЬ ПЕРСОНАЛЬНОЙ РАБОТЫ #01</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 grid grid-cols-1 gap-6 md:gap-8">
               {whyOffline.slice(1).map((w, idx) => (
                 <div 
                   key={idx} 
                   className="group relative bg-white/[0.02] border border-white/[0.08] rounded-[2.5rem] p-8 md:p-10 transition-all duration-700 hover:border-brand/40 overflow-hidden flex flex-col"
                   style={{ transitionDelay: `${(idx + 1) * 200}ms` }}
                 >
                    <div className="mb-6">{w.icon}</div>
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 leading-tight group-hover:text-brand transition-colors duration-500">{w.title}</h3>
                    <p className="text-white/60 text-base leading-relaxed">{w.desc}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AvailabilityDashboard() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-20 md:py-40 px-4 sm:px-6 md:px-12 bg-black transition-colors duration-500 border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className={`relative bg-white/[0.02] backdrop-blur-3xl rounded-[3.5rem] p-8 md:p-16 border border-white/[0.08] overflow-hidden transition-all duration-1000 ${visible ? "opacity-100 translate-y-0 shadow-[0_50px_100px_rgba(0,0,0,0.5)]" : "opacity-0 translate-y-12"}`}>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/10 blur-[120px] pointer-events-none rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand/5 blur-[100px] pointer-events-none rounded-full translate-y-1/2 -translate-x-1/4 opacity-50" />

          <div className="relative z-10 space-y-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 border border-brand/20 rounded-xl">
               <Shield className="w-4 h-4 text-brand" />
               <span className="text-brand text-xs font-bold uppercase tracking-widest leading-none">Ограниченный набор</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
              <div className="lg:col-span-12 xl:col-span-7 space-y-10">
                 <div className="space-y-8">
                    <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                      Доступность личного <br />
                      <span className="text-white/40">онбординга</span>
                    </h2>

                    <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-2xl">
                      Для обеспечения глубины погружения и качества сборки я работаю не более чем с 2-мя клиентами одновременно. Это гарантирует мой фокус на ваших задачах.
                    </p>
                 </div>

                 <div className="flex flex-col sm:flex-row gap-4">
                    <a href="#contact" className="relative group/btn inline-flex items-center justify-center gap-2 bg-brand text-white rounded-2xl px-10 py-5 font-bold hover:bg-[#fb4119] transition-all duration-300 shadow-xl shadow-brand/20 overflow-hidden whitespace-nowrap">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]" />
                      Обсудить ваш проект
                    </a>
                    <Link to="/executive" className="inline-flex items-center justify-center gap-2 border border-white/10 text-white bg-white/5 rounded-2xl px-10 py-5 font-bold hover:border-white/30 transition-all duration-300 whitespace-nowrap">
                      Для корпораций <ArrowRight className="w-5 h-5 ml-1" />
                    </Link>
                 </div>
              </div>

              <div className="lg:col-span-12 xl:col-span-5">
                 <div className="bg-white/[0.03] border border-white/[0.08] rounded-[2.5rem] p-8 md:p-12 backdrop-blur-xl relative group h-full">
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-brand/10 blur-2xl group-hover:bg-brand/20 transition-colors duration-500" />
                    
                    <div className="flex items-center gap-4 mb-6 text-brand">
                       <UserPlus className="w-6 h-6" />
                       <span className="text-lg font-bold">Текущий статус</span>
                    </div>
                    
                    <h3 className="text-2xl font-semibold text-white mb-6 leading-tight">Очередь на вход</h3>
                    <p className="text-white/50 text-lg leading-relaxed">
                      Слоты на текущий месяц заполнены. Заявка сейчас гарантирует вам приоритет при освобождении места и возможность начать подготовку заранее.
                    </p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

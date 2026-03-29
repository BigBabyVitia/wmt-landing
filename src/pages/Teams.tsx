import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { TrustStrip } from "@/components/TrustStrip"
import { FreePlatform } from "@/components/FreePlatform"
import { MainCta } from "@/components/MainCta"
import { useScrollVisible } from "@/hooks/useScrollVisible"
import { V2Hero } from "@/components/ui/V2Hero"
import { V2Card } from "@/components/ui/V2Card"

const situations = [
  { title: "Нужен первый пилот", desc: "Идеи есть, но нет ни одного сценария с владельцем и критериями результата. Нужно взять 1–2 процесса и довести до защищаемого старта.", format: "Цифровой каркас" },
  { title: "Нужно ядро практиков", desc: "Внутри компании уже видны люди, которые готовы работать руками. Им нужен плотный формат, чтобы стать командой-чемпионом и тянуть тему дальше.", format: "Мышление 2.0" },
  { title: "Пора расширять практику", desc: "Первые результаты уже есть. Компании нужна управляемая волна: десятки или сотни сотрудников, программа по ролям, видимость для руководства.", format: "ИИ-марафон" },
  { title: "Нужна продвинутая сборка", desc: "Есть подготовленная команда и конкретная задача. Нужен рабочий день или глубокая программа по сборке агентов.", format: "Agent Builder Day / n8n + Claude" },
]

const programs = [
  {
    title: "Цифровой каркас: 1–2 процесса, владельцы, критерии, защита",
    subtitle: "Когда компания уже знает, что ИИ нужен, но ни один сценарий ещё не дошёл до реального запуска. Стратегическая сессия с практикумами и live-демо агентов.",
    body: "Цифровой каркас — это 3–5 часов работы с C-level и руководителями подразделений. За это время команда выбирает 1–2 конкретных процесса, строит архитектуру ИИ-перехода, определяет владельцев и метрики. На выходе — паспорт пилота: что запускаем, кто отвечает, как измеряем результат.",
    params: ["3–5 часов, 3 блока", "60% практики руками", "1–2 пилотных сценария на выходе", "Live-демо агентов"],
    results: [
      { title: "Паспорт пилота", desc: "С владельцами и метриками для защиты перед руководством." },
      { title: "Live-демо", desc: "Агенты на реальных задачах компании — не абстрактные примеры." },
      { title: "Следующий шаг", desc: "Понятно, кто делает что дальше и когда." },
    ],
  },
  {
    title: "Мышление 2.0: 10–30 человек, которые потянут тему руками",
    subtitle: "Тренинг-хакатон для тех, кто должен стать ядром практиков внутри компании. 80% работы руками: собирают агентов, проверяют кейсы, фиксируют 30-дневный план.",
    body: "Мышление 2.0 длится 1–1,5 дня и работает с группами 10–30 человек. Участники берут реальные задачи компании, собирают агентов, проверяют гипотезы и уходят с рабочими артефактами. После этого формата внутри компании появляются люди-носители — те, кто может объяснить, показать и продолжить тему без внешней поддержки.",
    params: ["10 часов, 1–1,5 дня", "80% практики руками", "Собственные агенты и артефакты", "30-дневный план"],
    results: [
      { title: "Ядро практиков", desc: "10–30 человек с реальным опытом работы с ИИ." },
      { title: "Рабочие артефакты", desc: "Промпты, сценарии, агенты — не конспекты." },
      { title: "План на 30 дней", desc: "Каждый участник знает, что делать после программы." },
    ],
  },
  {
    title: "Корпоративный ИИ-марафон: когда практика нужна не пяти, а пятистам",
    subtitle: "Онлайн-марафон на 10 недель. 30 занятий. 100% работы руками. Программа по ролям, библиотека кейсов, видимость для руководства.",
    body: "Корпоративный ИИ-марафон — это управляемая программа масштаба: участники работают по ролям, собирают агентов под свои задачи, фиксируют результаты. Руководство видит прогресс, получает отчётность и понимает, кто двигает тему. После марафона компания получает рабочую привычку использования ИИ в десятках процессов.",
    params: ["10 недель, 30 занятий", "100% практики руками", "Программа по ролям", "Отчётность для руководства"],
    results: [
      { title: "ИИ-привычки", desc: "Десятки процессов переведены на работу с ИИ." },
      { title: "Отчётность", desc: "Руководство видит, кто, что и как использует." },
      { title: "Масштаб", desc: "Не 10–30 человек, а сотни — по ролям и функциям." },
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
    <section ref={ref} className="py-24 px-6 md:px-12 bg-white dark:bg-[hsl(220,20%,7%)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6">Какая ситуация у вашей компании сейчас</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl">Практический формат зависит от того, где компания находится. Узнайте свою ситуацию — и ниже увидите, что подходит.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {situations.map((s, idx) => (
            <V2Card
              key={idx}
              visible={visible}
              index={idx}
              delayMult={120}
              className="flex flex-col gap-4 !p-8 hover:border-brand/30 hover:shadow-brand/10 hover:-translate-y-1"
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
  const bg = index % 2 === 0 ? "bg-gray-50/50 dark:bg-[hsl(220,18%,5%)]" : "bg-white dark:bg-[hsl(220,20%,7%)]"
  
  return (
    <section ref={ref} className={`py-24 px-6 md:px-12 ${bg} border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">{p.title}</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl mb-4 font-medium">{p.subtitle}</p>
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-3xl mb-10 leading-relaxed">{p.body}</p>

          <div className="flex flex-wrap gap-3 mb-10">
            {p.params.map((t: string, i: number) => (
              <span key={i} className="text-[13px] text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-white/10 px-4 py-2 rounded-full font-medium">{t}</span>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {p.results.map((r: any, i: number) => (
              <div key={i} className="bg-white dark:bg-[hsl(220,20%,7%)] rounded-2xl p-6 border border-gray-100 dark:border-white/[0.06] transition-all duration-300 hover:border-brand/40 dark:hover:border-brand/30 shadow-sm hover:shadow-md hover:shadow-brand/5 hover:-translate-y-1">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{r.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-4">
             <a href="#contact" className="inline-flex items-center gap-2 bg-brand text-white rounded-full px-8 pt-[14px] pb-[18px] font-medium hover:bg-[#e64627] transition-all duration-300 text-base hover:-translate-y-0.5 shadow-md shadow-brand/20">
               Узнать детали <ArrowRight className="w-5 h-5 ml-1 mt-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function BuilderFormats() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-white dark:bg-[hsl(220,20%,7%)] border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6">Продвинутая сборка: два формата для тех, кто готов строить агентов</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl font-medium">Agent Builder Day и n8n + Claude решают разные задачи, работают с разной аудиторией и требуют разной подготовки.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <V2Card visible={visible} index={0}>
            <span className="inline-block text-xs font-semibold text-brand uppercase tracking-wider mb-4 relative z-10">Agent Builder Day</span>
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

          <V2Card visible={visible} index={1}>
            <span className="inline-block text-xs font-semibold text-brand uppercase tracking-wider mb-4 relative z-10">n8n + Claude</span>
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

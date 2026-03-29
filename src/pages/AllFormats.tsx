import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { MainCta } from "@/components/MainCta"
import { useScrollVisible } from "@/hooks/useScrollVisible"
import { V2Hero } from "@/components/ui/V2Hero"
import { V2Card } from "@/components/ui/V2Card"

const criteria = [
  { title: "Кто принимает решение?", desc: "Собственник и топ-команда — управленческие программы. Руководитель функции или трансформатор — практические. Сам человек лично — личное направление." },
  { title: "Какая задача стоит сейчас?", desc: "Стратегический старт сверху. Защищаемый пилот. Масштабирование на компанию. Продвинутая сборка агентов. Личная перестройка." },
  { title: "Какой следующий шаг?", desc: "Каждая программа ведёт к конкретному продолжению. Ниже это видно для каждого формата." },
]

const execPrograms = [
  { name: "Системный ИИ", audience: "Собственник или генеральный директор, которому нужен безопасный первый ход", result: "Стратегия ИИвизации и план на первые 90 дней", format: "Индивидуальная работа с основателем WMT AI", next: "Запуск практических программ для команды", proof: "50+ проектов, клиенты от Газпром Медиа до T1", },
  { name: "Бизнес 2.0", audience: "Управленческая команда, которой нужен стратегический пересмотр бизнеса через призму ИИ", result: "Пересмотр бизнес-модели и операционной логики", format: "Рабочие сессии с топ-командой", next: "Конкретные проекты трансформации", },
  { name: "ИИ-марафон для топ-менеджеров", audience: "Управленческая команда, которая уже понимает тему, но не перешла в практику", result: "Месяц практики: руководители работают с ИИ, а не только обсуждают его", format: "Месячная программа (8 модулей)", next: "Масштабирование на компанию", },
]

const teamPrograms = [
  { name: "Цифровой каркас", audience: "Компания, которой нужен защищаемый первый пилот", result: "1–2 пилота, архитектура перехода, владельцы процесса", format: "Корпоративный практикум, 1–2 дня", next: "От пилота к команде-чемпиону", group: "A. Ранние практические программы", proof: "60% практики руками, live-демо агентов", },
  { name: "Мышление 2.0", audience: "Компания, которой нужна команда-чемпион, ядро практиков", result: "10–30 человек, которые работают с ИИ и тянут остальных", format: "1–1,5 дня, 80% работы руками", next: "Масштабирование на компанию", group: "A. Ранние практические программы", proof: "Рабочий агент у каждого участника", },
  { name: "ИИ-марафон (корпоративная волна)", audience: "Компания, готовая к широкому охвату (сотни людей)", result: "Масштабная перестройка работы в десятках процессов", format: "10 недель, 30 занятий, трекинг прогресса", next: "Углубление лучших команд через сборку", group: "B. Масштабирование", proof: "100% практики, онлайн-формат", }
]

const builderPrograms = [
  { name: "Agent Builder Day", desc: "Один рабочий день, в который команда собирает агента под свой кейс", audience: "Собранная команда с задачей", format: "Офлайн, 30–40 человек", result: "Рабочий агент, n8n workflow", threshold: "Нужна конкретная задача", next: "Углубление через n8n + Claude", proof: "80–85% практики", link: "/builder-day", },
  { name: "n8n + Claude", desc: "Глубокая программа сборщиков с RAG и multi-agent", audience: "Продвинутый практик", format: "Малая группа до 6 человек", result: "3–5 агентов", threshold: "Аппетит на сборку", next: "Самостоятельная разработка в компании", proof: "Офлайн/Онлайн гибрид", link: "", }
]

const navCards = [
  { label: "Для руководителей", to: "/executive" },
  { label: "Для команд", to: "/teams" },
  { label: "Agent Builder Day", to: "/builder-day" },
  { label: "Личный ИИ", to: "/personal-ai" },
  { label: "Доказательства", to: "/proof" },
]

export function AllFormats() {
  return (
    <>
      <V2Hero 
        label="Все форматы"
        title={<>Все форматы WMT AI. <em className="not-italic text-brand font-bold">Карта решений.</em></>}
        description="Здесь собраны все программы WMT AI — от первого хода генерального директора до корпоративной волны на сотни человек. Эта страница создана как навигатор: выберите блок по своей задаче и перешлите коллегам."
        buttons={
          <div className="grid grid-cols-2 sm:flex sm:flex-row gap-3">
            <a href="#exec" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white rounded-xl px-5 py-3 text-sm font-medium transition-colors border border-white/10 backdrop-blur-sm">Руководителям</a>
            <a href="#teams" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white rounded-xl px-5 py-3 text-sm font-medium transition-colors border border-white/10 backdrop-blur-sm">Командам</a>
            <a href="#builder" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white rounded-xl px-5 py-3 text-sm font-medium transition-colors border border-white/10 backdrop-blur-sm">Сборщикам</a>
          </div>
        }
      />

      <CriteriaSection />
      <div id="exec"><ExecSection /></div>
      <div id="teams"><TeamFormats /></div>
      <div id="builder"><BuilderSection /></div>
      <PersonalSection />
      <TrustSignal />
      <NavSection />
      <MainCta />
    </>
  )
}

function CriteriaSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-white dark:bg-[hsl(220,20%,7%)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6">Как выбрать программу</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">Ответьте на три вопроса, чтобы сузить фокус.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {criteria.map((c, idx) => (
            <V2Card
              key={idx}
              visible={visible}
              index={idx}
              delayMult={100}
              className="!p-8 !rounded-2xl hover:border-brand/30 hover:shadow-brand/10 hover:-translate-y-1"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 relative z-10">{c.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-[15px] leading-relaxed relative z-10">{c.desc}</p>
            </V2Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function ExecSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-gray-50/50 dark:bg-[hsl(220,18%,5%)] border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">Для собственников и топ-команды</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">Три программы для старта сверху. От первого разговора до полного пересмотра стратегии.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {execPrograms.map((p, idx) => (
            <V2Card key={idx} visible={visible} index={idx} className="!p-6 !rounded-2xl group flex flex-col h-full hover:border-brand/30 hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 relative z-10 group-hover:text-brand transition-colors">{p.name}</h3>
              <div className="space-y-4 text-sm relative z-10 flex-1">
                <div><span className="text-gray-400 dark:text-gray-500 font-medium block mb-1">Для кого:</span> <span className="text-gray-700 dark:text-gray-200 leading-snug">{p.audience}</span></div>
                <div><span className="text-gray-400 dark:text-gray-500 font-medium block mb-1">Метрика успеха (Результат):</span> <span className="text-gray-700 dark:text-gray-200 leading-snug">{p.result}</span></div>
                <div><span className="text-gray-400 dark:text-gray-500 font-medium block mb-1">Формат:</span> <span className="text-gray-700 dark:text-gray-200 leading-snug">{p.format}</span></div>
                <div><span className="text-gray-400 dark:text-gray-500 font-medium block mb-1">Следующий шаг:</span> <span className="text-gray-700 dark:text-gray-200 leading-snug">{p.next}</span></div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/[0.06] relative z-10">
                <Link to="/executive" className="inline-flex items-center gap-1.5 text-brand font-medium text-[13px] hover:underline uppercase tracking-wider">Отрыть страницу <ArrowRight className="w-3.5 h-3.5" /></Link>
              </div>
            </V2Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function TeamFormats() {
  const { ref, visible } = useScrollVisible()
  const groups = ["A. Ранние практические программы", "B. Масштабирование"]
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-white dark:bg-[hsl(220,20%,7%)] border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">Для команд: пилоты, профи и волна перестройки</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">Программы для тех, кто двигает изменения изнутри руками.</p>
        </div>
        {groups.map((group, groupIdx) => {
          const groupPrograms = teamPrograms.filter(p => p.group === group)
          if (groupPrograms.length === 0) return null
          return (
            <div key={group} className="mb-12">
              <div className={`text-sm font-bold text-brand uppercase tracking-wider mb-6 pb-2 border-b border-brand/20 dark:border-white/10 opacity-0 ${visible ? "animate-fade-rise" : ""}`} style={{ animationDelay: `${groupIdx * 200}ms`, animationFillMode: "forwards" }}>{group}</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupPrograms.map((p, idx) => (
                  <V2Card key={idx} visible={visible} index={idx} className="!p-6 !rounded-2xl group flex flex-col h-full hover:border-brand/30 hover:-translate-y-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 relative z-10 group-hover:text-brand transition-colors">{p.name}</h3>
                    <div className="space-y-4 text-sm relative z-10 flex-1">
                      <div><span className="text-gray-400 dark:text-gray-500 font-medium block mb-1">Для кого:</span> <span className="text-gray-700 dark:text-gray-200 leading-snug">{p.audience}</span></div>
                      <div><span className="text-gray-400 dark:text-gray-500 font-medium block mb-1">Артефакт (Результат):</span> <span className="text-gray-700 dark:text-gray-200 leading-snug">{p.result}</span></div>
                      <div><span className="text-gray-400 dark:text-gray-500 font-medium block mb-1">Формат:</span> <span className="text-gray-700 dark:text-gray-200 leading-snug">{p.format}</span></div>
                    </div>
                  </V2Card>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function BuilderSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-gray-50/50 dark:bg-[hsl(220,18%,5%)] border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">Разработка агентов (Builders)</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">Форматы для подготовленных команд, которым нужен свой агент без написания кода.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {builderPrograms.map((p, idx) => (
            <V2Card key={idx} visible={visible} index={idx} className="!p-8 !rounded-2xl hover:border-brand/30 hover:-translate-y-1 group">
              <span className="inline-block text-xs font-semibold text-brand bg-brand/10 uppercase tracking-wider mb-3 px-3 py-1 rounded-full relative z-10">{p.format}</span>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 relative z-10 group-hover:text-brand transition-colors">{p.name}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-[15px] mb-6 relative z-10">{p.desc}</p>
              
              <div className="space-y-3 text-sm relative z-10 flex-1">
                <div className="border-l-2 border-brand/30 pl-3 py-0.5"><span className="text-gray-400 dark:text-gray-500 font-medium block mb-0.5">Для кого:</span> <span className="text-gray-700 dark:text-gray-200">{p.audience}</span></div>
                <div className="border-l-2 border-brand/30 pl-3 py-0.5"><span className="text-gray-400 dark:text-gray-500 font-medium block mb-0.5">Результат:</span> <span className="text-gray-700 dark:text-gray-200">{p.result}</span></div>
              </div>
              <div className="mt-8 relative z-10">
                <Link to={p.link || "#contact"} className="inline-flex items-center gap-1.5 text-brand font-medium text-sm hover:underline">
                  Узнать детали <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </V2Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function PersonalSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-white dark:bg-[hsl(220,20%,7%)] border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">Для себя лично и платформенное обучение</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">Личный офлайн-интенсив и база знаний в платформе.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <V2Card visible={visible} index={0} className="!p-8 !rounded-2xl hover:border-brand/30 hover:-translate-y-1">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3 relative z-10">Личный ИИ</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 relative z-10">Двухдневный офлайн-интенсив для руководителя, который хочет пройти перестройку сам.</p>
            <div className="mt-auto relative z-10">
              <Link to="/personal-ai" className="inline-flex items-center gap-1.5 text-brand font-medium hover:underline text-sm uppercase tracking-wider">
                Подробнее <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </V2Card>
          
          <V2Card visible={visible} index={1} className="!p-8 !rounded-2xl hover:border-brand/30 hover:-translate-y-1">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3 relative z-10">Платформа WMT AI</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 relative z-10">Онлайн-библиотека из 22 уроков для базовой теоретической подготовки.</p>
            <div className="mt-auto relative z-10">
              <a href="https://transformation.wmtunnel.ru" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-brand font-medium hover:underline text-sm uppercase tracking-wider">
                Вход на платформу <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </V2Card>
        </div>
      </div>
    </section>
  )
}

function TrustSignal() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-gray-50/50 dark:bg-[hsl(220,18%,5%)] border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className={`relative bg-white dark:bg-white/[0.03] rounded-[2.5rem] p-10 md:p-14 border border-gray-100 dark:border-white/[0.06] overflow-hidden transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="absolute top-0 right-1/4 -translate-y-1/2 w-64 h-64 bg-brand/5 blur-[80px] pointer-events-none rounded-full" />
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4 relative z-10">Нужно переслать это руководству?</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 font-medium mb-6 relative z-10">Эта страница работает как карта. Если нужны доказательства экспертизы — они собраны отдельно.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 relative z-10">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-[15px]">На странице доказательств: кто ведёт программы, 50+ клиентов, академическое признание от Stanford Global Studies, публикации и подкаст. Всё проверяемое.</p>
            <Link to="/proof" className="inline-flex items-center justify-center md:justify-start gap-2 text-brand font-medium hover:underline text-lg">
              Доказательства экспертизы <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function NavSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-white dark:bg-[hsl(220,20%,7%)] border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">Выберите точечное направление</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">Быстрая ссылка на нужную страницу.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {navCards.map((c, idx) => (
            <Link key={idx} to={c.to} className={`bg-gray-50/80 dark:bg-white/[0.03] rounded-xl p-5 border border-gray-100 dark:border-white/[0.06] hover:border-brand/30 dark:hover:border-brand/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: visible ? `${idx * 80}ms` : "0ms" }}>
              <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-brand transition-colors text-center block">{c.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

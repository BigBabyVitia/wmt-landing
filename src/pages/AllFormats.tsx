import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { NavbarV2 } from "@/components/NavbarV2"
import { TrustStrip } from "@/components/TrustStrip"
import { MainCta } from "@/components/MainCta"

function useScrollVisible(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, visible }
}

const criteria = [
  { title: "1. Кто принимает решение?", desc: "Собственник и управленческая команда — управленческие программы. Руководитель функции, L&D, спонсор пилота — практические программы. Сам человек лично — личное направление." },
  { title: "2. Какая задача стоит сейчас?", desc: "Стратегический старт сверху. Первый пилот. Масштабирование на компанию. Продвинутая сборка агентов. Личная перестройка." },
  { title: "3. Какой следующий шаг после программы?", desc: "Каждая программа ведёт к конкретному следующему шагу. Ниже это видно для каждого варианта." },
]

const execPrograms = [
  {
    name: "Системный ИИ",
    audience: "Собственник или генеральный директор, которому нужен безопасный первый ход",
    result: "Стратегия ИИвизации и план на первые 90 дней",
    format: "Индивидуальная работа с основателем WMT AI",
    next: "Запуск практических программ для команды",
    proof: "50+ проектов, клиенты от Газпром Медиа до T1",
  },
  {
    name: "Бизнес 2.0",
    audience: "Управленческая команда, которой нужен стратегический пересмотр бизнеса через призму ИИ",
    result: "Пересмотр бизнес-модели и операционной логики с учётом возможностей ИИ",
    format: "Рабочие сессии с управленческой командой",
    next: "Конкретные проекты трансформации",
  },
  {
    name: "ИИ-марафон для топ-менеджеров",
    audience: "Управленческая команда, которая уже понимает тему, но не перешла в практику",
    result: "Месяц практики, после которого управленческая команда работает с ИИ, а не только обсуждает его",
    format: "Месячная программа с регулярными сессиями",
    next: "Масштабирование на компанию",
  },
]

const teamPrograms = [
  {
    name: "Цифровой каркас",
    audience: "Компания, которой нужен защищаемый первый пилот с конкретным результатом",
    result: "Работающий пилот, который можно показать руководству",
    format: "Проектная работа с командой",
    next: "От пилота к команде-чемпиону",
    group: "A. Ранние практические программы",
    proof: "60% практики руками, live-демо агентов",
  },
  {
    name: "Мышление 2.0",
    audience: "Компания, которой нужна команда-чемпион, ядро практиков",
    result: "Группа людей, которые реально работают с ИИ и тянут за собой остальных",
    format: "Программа для команды практиков",
    next: "Масштабирование на компанию",
    group: "A. Ранние практические программы",
    proof: "80% практики руками, 10–30 человек",
  },
  {
    name: "ИИ-марафон (корпоративная волна)",
    audience: "Компания, которая готова к широкому охвату",
    result: "Сотни людей в компании начинают работать с ИИ в реальных задачах",
    format: "Массовая месячная программа",
    next: "Углубление через builder-программы",
    group: "B. Масштабирование",
    proof: "10 недель, 30 занятий, 100% практики",
  },
  {
    name: "Платформа и библиотека WMT AI",
    audience: "Человек или компания, которым нужно мягкое знакомство с темой",
    result: "Мягкое знакомство с темой и подготовка к более плотным программам",
    format: "22 видеоурока, 4 кластера: Думать с ИИ, ИИ в отделе, Первый агент, Вайбкодинг",
    next: "Любая из рабочих программ, когда готовность появится",
    group: "C. Подготовительный уровень",
  },
]

const builderPrograms = [
  {
    name: "Agent Builder Day",
    desc: "Один рабочий день, в который команда собирает работающего агента под свой кейс",
    audience: "Подготовленная команда с конкретной задачей и спонсором",
    format: "Офлайн, один день, 30–40 человек, мини-группы по 3–4 человека",
    result: "Рабочий агент, настроенный workflow, алгоритм повторной сборки",
    threshold: "Нужна конкретная задача, собранная команда и готовность работать руками",
    next: "Углубление через n8n + Claude или масштабирование опыта через Мышление 2.0",
    proof: "80–85% практики, свой агент у каждого",
    link: "/builder-day",
  },
  {
    name: "n8n + Claude",
    desc: "Групповая программа из 4 занятий по 1,5 часа, до 6 человек",
    audience: "Продвинутый практик или малая группа после Agent Builder Day или платформы",
    format: "Последовательное освоение экосистемы Claude, основ n8n, AI-агентов и продвинутой сборки",
    result: "3–5 рабочих агентов и автоматизаций, навык собирать нового агента за 30–60 минут",
    threshold: "Нужен конкретный аппетит на сборку и свои задачи; 80–85% работы руками",
    next: "Самостоятельная сборка под рабочие задачи компании",
    proof: "3–5 агентов на выходе, до 6 человек",
    link: "",
  },
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
      {/* HERO */}
      <section className="relative w-full overflow-hidden flex flex-col pt-32 pb-24 md:pb-32 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/brand/hero-bg.webp')" }}>
        <NavbarV2 variant="inner" />
        <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto w-full">
          <span className="inline-block text-sm font-medium text-white/70 tracking-wider uppercase mb-4 animate-fade-rise">Все форматы</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.15] font-semibold text-white animate-fade-rise max-w-4xl">
            Все форматы WMT AI. Выберите по задаче.
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-3xl mt-8 leading-relaxed animate-fade-rise-delay">
            У WMT AI несколько программ. Они работают для разных ролей и задач. Эта страница помогает найти нужную и переслать карту коллегам.
          </p>
        </div>
      </section>

      {/* КРИТЕРИИ */}
      <CriteriaSection />

      {/* УПРАВЛЕНЧЕСКИЕ */}
      <ExecSection />

      {/* КОМАНДНЫЕ */}
      <TeamFormats />

      {/* BUILDER */}
      <BuilderSection />

      {/* ЛИЧНЫЙ + ПЛАТФОРМА */}
      <PersonalSection />

      {/* TRUST */}
      <TrustSignal />

      {/* НАВИГАЦИЯ */}
      <NavSection />

      {/* ФОРМА */}
      <MainCta />
    </>
  )
}

function CriteriaSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-lg text-gray-500 mb-6">Чтобы выбрать программу, достаточно ответить на три вопроса:</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {criteria.map((c, idx) => (
            <div key={idx} className={`bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: visible ? `${200 + idx * 150}ms` : "0ms" }}>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{c.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ExecSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 mb-4">Для собственников, генеральных директоров и управленческой команды</h2>
          <p className="text-lg text-gray-500">Три программы для старта сверху. Выбор зависит от того, что нужно компании сейчас: безопасный первый ход, глубокий стратегический пересмотр или перевод управленческой команды в практику.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {execPrograms.map((p, idx) => (
            <div key={idx} className={`bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: visible ? `${200 + idx * 120}ms` : "0ms" }}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{p.name}</h3>
              <div className="space-y-3 text-sm">
                <div><span className="text-gray-400">Для кого:</span> <span className="text-gray-700">{p.audience}</span></div>
                <div><span className="text-gray-400">Результат:</span> <span className="text-gray-700">{p.result}</span></div>
                <div><span className="text-gray-400">Формат:</span> <span className="text-gray-700">{p.format}</span></div>
                <div><span className="text-gray-400">Следующий шаг:</span> <span className="text-gray-700">{p.next}</span></div>
              </div>
              {p.proof && (
                <p className="text-xs text-gray-400 mt-4 pt-3 border-t border-gray-100">{p.proof}</p>
              )}
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link to="/executive" className="inline-flex items-center gap-2 text-brand font-medium hover:underline">
            Подробнее о программах для руководителей <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function TeamFormats() {
  const { ref, visible } = useScrollVisible()
  const groups = ["A. Ранние практические программы", "B. Масштабирование", "C. Подготовительный уровень"]
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 mb-4">Для команд: пилоты, практика и масштабирование</h2>
          <p className="text-lg text-gray-500">Четыре программы по задачам. Что подходит сейчас зависит от того, где компания: первый пилот, команда-чемпион или широкое масштабирование.</p>
        </div>
        {groups.map((group) => {
          const groupPrograms = teamPrograms.filter(p => p.group === group)
          if (groupPrograms.length === 0) return null
          return (
            <div key={group} className="mb-8">
              <div className="text-xs font-semibold text-brand uppercase tracking-wider mb-4 pb-2 border-b border-gray-100">{group}</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {groupPrograms.map((p, idx) => (
                  <div key={idx} className={`bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: visible ? `${200 + idx * 120}ms` : "0ms" }}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{p.name}</h3>
                    <div className="space-y-3 text-sm">
                      <div><span className="text-gray-400">Для кого:</span> <span className="text-gray-700">{p.audience}</span></div>
                      <div><span className="text-gray-400">Результат:</span> <span className="text-gray-700">{p.result}</span></div>
                      <div><span className="text-gray-400">Формат:</span> <span className="text-gray-700">{p.format}</span></div>
                      <div><span className="text-gray-400">Следующий шаг:</span> <span className="text-gray-700">{p.next}</span></div>
                    </div>
                    {p.proof && (
                      <p className="text-xs text-gray-400 mt-4 pt-3 border-t border-gray-100">{p.proof}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
        <div className="mt-8">
          <Link to="/teams" className="inline-flex items-center gap-2 text-brand font-medium hover:underline">
            Подробнее о программах для команд <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function BuilderSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 mb-4">Для тех, кто готов собирать: два builder-формата</h2>
          <p className="text-lg text-gray-500">Agent Builder Day и n8n + Claude решают разные задачи. Ниже ясно, чем они отличаются и кому какой подходит.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {builderPrograms.map((p, idx) => (
            <div key={idx} className={`bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: visible ? `${200 + idx * 150}ms` : "0ms" }}>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{p.name}</h3>
              <p className="text-gray-500 text-sm mb-5">{p.desc}</p>
              <div className="space-y-3 text-sm">
                <div className="pl-3 border-l-2 border-gray-200"><span className="text-gray-400 font-medium">Для кого:</span> <span className="text-gray-700">{p.audience}</span></div>
                <div className="pl-3 border-l-2 border-gray-200"><span className="text-gray-400 font-medium">Формат:</span> <span className="text-gray-700">{p.format}</span></div>
                <div className="pl-3 border-l-2 border-gray-200"><span className="text-gray-400 font-medium">Результат:</span> <span className="text-gray-700">{p.result}</span></div>
                <div className="pl-3 border-l-2 border-gray-200"><span className="text-gray-400 font-medium">Порог готовности:</span> <span className="text-gray-700">{p.threshold}</span></div>
                <div className="pl-3 border-l-2 border-gray-200"><span className="text-gray-400 font-medium">Следующий шаг:</span> <span className="text-gray-700">{p.next}</span></div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                {p.link ? (
                  <Link to={p.link} className="inline-flex items-center gap-2 text-brand font-medium text-sm hover:underline">
                    Подробнее <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <a href="#contact" className="inline-flex items-center gap-2 text-brand font-medium text-sm hover:underline">
                    Узнать о программе <ArrowRight className="w-4 h-4" />
                  </a>
                )}
                <span className="text-xs text-gray-400">{p.proof}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PersonalSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 mb-4">Для себя лично или для мягкого знакомства с темой</h2>
          <p className="text-lg text-gray-500">Два направления для разных ситуаций: личный интенсив для тех, кто хочет пройти перестройку сам, и платформа для знакомства с темой.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Личный ИИ</h3>
            <div className="space-y-3 text-sm mb-5">
              <div className="pl-3 border-l-2 border-gray-200"><span className="text-gray-400 font-medium">Для кого:</span> <span className="text-gray-700">Руководитель или практик, который хочет пройти ИИ-перестройку лично</span></div>
              <div className="pl-3 border-l-2 border-gray-200"><span className="text-gray-400 font-medium">Что это:</span> <span className="text-gray-700">Двухдневный офлайн-интенсив на 16 часов</span></div>
              <div className="pl-3 border-l-2 border-gray-200"><span className="text-gray-400 font-medium">Результат:</span> <span className="text-gray-700">Карта ИИ, личная стратегия, библиотека промптов, собственный агент</span></div>
              <div className="pl-3 border-l-2 border-gray-200"><span className="text-gray-400 font-medium">Следующий шаг:</span> <span className="text-gray-700">После личного интенсива можно двигать тему в компании через управленческие программы</span></div>
            </div>
            <Link to="/personal-ai" className="inline-flex items-center gap-2 text-brand font-medium text-sm hover:underline">
              Записаться в лист ожидания <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className={`bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: visible ? "150ms" : "0ms" }}>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Платформа и библиотека</h3>
            <div className="space-y-3 text-sm mb-5">
              <div className="pl-3 border-l-2 border-gray-200"><span className="text-gray-400 font-medium">Для кого:</span> <span className="text-gray-700">Человек, которому нужно мягкое знакомство с темой; участник программ, которому нужен доступ к материалам</span></div>
              <div className="pl-3 border-l-2 border-gray-200"><span className="text-gray-400 font-medium">Что внутри:</span> <span className="text-gray-700">22 видеоурока, 4 кластера: Думать с ИИ, ИИ в отделе, Первый агент, Вайбкодинг</span></div>
              <div className="pl-3 border-l-2 border-gray-200"><span className="text-gray-400 font-medium">Результат:</span> <span className="text-gray-700">Мягкое знакомство с темой, подготовка к рабочим программам</span></div>
            </div>
            <a href="https://transformation.wmtunnel.ru" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-brand font-medium text-sm hover:underline">
              Войти в личный кабинет <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function TrustSignal() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 mb-4">Нужно переслать это руководству или коллегам?</h2>
          <p className="text-lg text-gray-500">Эта страница работает как карта для пересылки. Если нужны доказательства — они собраны отдельно.</p>
        </div>
        <div className={`bg-white rounded-2xl p-8 border border-gray-100 text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: visible ? "200ms" : "0ms" }}>
          <p className="text-gray-500 mb-4">50+ проектов ИИвизации. Клиенты: Газпром Медиа, Wildberries, ЕвроХим, Renaissance, T1. Методология признана Stanford Global Studies.</p>
          <p className="text-gray-700 text-sm mb-6">На странице доказательств: кто ведёт программы, клиенты, академическое признание, публикации и подкаст. Всё, что нужно для обсуждения внутри компании.</p>
          <Link to="/proof" className="inline-flex items-center gap-2 text-brand font-medium hover:underline">
            Открыть доказательства <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function NavSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Выберите программу или напишите — поможем подобрать</h2>
          <p className="text-lg text-gray-500">Если программа уже ясна — переходите на её страницу. Если нужна помощь в выборе — оставьте контакт, и мы поможем подобрать программу под вашу ситуацию.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {navCards.map((c, idx) => (
            <Link key={idx} to={c.to} className={`bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1 transition-all duration-500 group ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: visible ? `${idx * 80}ms` : "0ms" }}>
              <span className="text-sm font-medium text-gray-900 group-hover:text-brand transition-colors">{c.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

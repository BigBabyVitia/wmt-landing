import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { NavbarV2 } from "@/components/NavbarV2"
import { LogoCloud } from "@/components/ui/logo-cloud"
import { clients } from "@/data/clients"

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

const publications = [
  "Forbes Russia", "РБК", "РБК Trends", "РБК PRO",
  "Коммерсантъ", "Российская газета", "CNews",
  "Sber AI", "Intelligent Enterprise",
]

const events2025 = [
  "CIPR",
  "INNOPROM",
  "AI CON 2025, Сингапур",
  "AIE 2025, Макао",
  "Skolkovo — панель «AI Partnership»",
  "Moscow 2030, Merge",
]
const events2026 = [
  "Skolkovo — MBA, AI Shift",
  "Skolkovo — Tandemocracy",
  "VK Roundtable",
  "Стратегическая сессия, Центральный банк Армении",
]

const podcastGuests = [
  "Александр Машрабов — основатель Higgsfield AI (видеогенерация, $8M привлечённых инвестиций)",
  "Алексей Поперлюков — Head of AI, Газпром Нефть",
  "Владимир Алипов — нейроучёный, исследователь на стыке мозга и ИИ",
  "Влад Завадский — методолог ИИ-трансформации, автор фреймворка",
]

const navCards = [
  { label: "Для руководителей", to: "/executive" },
  { label: "Для команд", to: "/teams" },
  { label: "Личный ИИ", to: "/personal-ai" },
  { label: "Сравнить все программы", to: "/all-formats" },
]

export function Proof() {
  return (
    <>
      {/* HERO */}
      <section className="relative w-full overflow-hidden flex flex-col pt-32 pb-24 md:pb-32 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/brand/hero-bg.webp')" }}>
        <NavbarV2 variant="inner" />
        <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto w-full">
          <span className="inline-block text-sm font-medium text-white/70 tracking-wider uppercase mb-4 animate-fade-rise">Доказательства</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.15] font-semibold text-white animate-fade-rise max-w-4xl">
            Игорь Никитин. Основатель WMT&nbsp;AI. 400+&nbsp;сотрудников.
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-3xl mt-8 leading-relaxed animate-fade-rise-delay">
            Программы WMT&nbsp;AI&nbsp;&mdash; не анонимный онлайн-продукт. За ними стоит конкретный человек с&nbsp;проверяемым опытом и&nbsp;компания с&nbsp;реальным масштабом.
          </p>
        </div>
      </section>

      {/* FOUNDER */}
      <FounderSection />

      {/* CLIENTS */}
      <ClientsSection />

      {/* STANFORD */}
      <StanfordSection />

      {/* PUBLICATIONS */}
      <PublicationsSection />

      {/* PODCAST */}
      <PodcastSection />

      {/* EVENTS */}
      <EventsSection />

      {/* FORWARD */}
      <ForwardSection />

      {/* NAV BACK */}
      <NavBackSection />
    </>
  )
}

function FounderSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className={`flex flex-col sm:flex-row gap-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <img src="/experts/nikitin-large.webp" alt="Игорь Никитин" className="w-48 sm:w-56 h-auto self-start object-cover object-top rounded-2xl flex-shrink-0" />
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-2">Игорь Никитин</h2>
            <p className="text-brand font-medium mb-6">Основатель WMT AI, 400+ сотрудников</p>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="text-sm text-gray-700 bg-gray-100 px-4 py-2 rounded-lg font-medium">50+ проектов 2024–2026</span>
              <span className="text-sm text-gray-700 bg-gray-100 px-4 py-2 rounded-lg font-medium">Патент в области ИИ</span>
              <span className="text-sm text-gray-700 bg-gray-100 px-4 py-2 rounded-lg font-medium">Исследование с Ipsos</span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Игорь Никитин&nbsp;&mdash; основатель WMT&nbsp;AI. Компания ИИвизирует бизнес клиентов: перестраивает процессы и&nbsp;мышление так, чтобы ИИ стал частью оргструктуры, а&nbsp;не&nbsp;трендом. 50+&nbsp;проектов ИИвизации в&nbsp;2024&ndash;2026 годах. Патент в&nbsp;области искусственного интеллекта. Совместное международное исследование по&nbsp;ИИ&nbsp;в&nbsp;бизнесе с&nbsp;Ipsos&nbsp;&mdash; третьей крупнейшей исследовательской компанией мира.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function ClientsSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-16 px-6 md:px-12 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Клиенты</h2>
          <p className="text-gray-500 text-sm mb-8">Стратегические сессии для CEO и C-level, архитектура ИИ-процессов, воркшопы и консалтинг по ИИ-трансформации.</p>
          <div className="mx-auto max-w-3xl">
            <LogoCloud logos={clients} />
          </div>
        </div>
      </div>
    </section>
  )
}

function StanfordSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className={`max-w-3xl transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-block text-xs font-semibold text-brand uppercase tracking-wider mb-3">Академическое признание</span>
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">Методология WMT&nbsp;AI получила признание Stanford Global Studies</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            В&nbsp;марте 2026&nbsp;года Stanford Global Studies выдал Official Academic Recognition методологии AI&nbsp;Transformation Methodology, на&nbsp;которой построены программы WMT&nbsp;AI.
          </p>
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mb-6 transition-all duration-300 hover:border-gray-200 hover:shadow-sm">
            <p className="text-gray-600 leading-relaxed mb-3">
              Документ подтверждает: методология WMT&nbsp;AI признана как practical framework, а&nbsp;программа AI&nbsp;Transformation Intensive&nbsp;&mdash; как established executive education program с&nbsp;16-часовой двухдневной структурой. Академический руководитель&nbsp;&mdash; Dr.&nbsp;Markus Feldmann, Stanford Global Studies, Берлин.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="text-sm text-brand bg-blue-50 px-4 py-2 rounded-lg font-semibold">Stanford Global Studies, Official Academic Recognition</span>
            <span className="text-sm text-brand bg-blue-50 px-4 py-2 rounded-lg font-semibold">AI Transformation Methodology</span>
            <span className="text-sm text-brand bg-blue-50 px-4 py-2 rounded-lg font-semibold">Март 2026, Берлин</span>
          </div>
          <p className="text-gray-400 text-sm italic">
            Мы сознательно формулируем это аккуратно. Признание методологии и рамки программы&nbsp;&mdash; это ровно то, что подтверждено документом. Больших обещаний мы не даём.
          </p>
        </div>
      </div>
    </section>
  )
}

function PublicationsSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl font-semibold text-gray-900 mb-3">Проверьте до&nbsp;того, как примете решение</h2>
          <p className="text-gray-500 mb-8">Ниже&nbsp;&mdash; публичные материалы, которые вы можете открыть и изучить до разговора о программе.</p>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">20+ публикаций в деловых СМИ</h3>
          <div className="flex flex-wrap gap-3 mb-4">
            {publications.map((p, i) => (
              <span key={i} className="text-sm text-gray-700 bg-white px-5 py-3 rounded-xl border border-gray-100 font-medium transition-all duration-300 hover:border-gray-200 hover:shadow-sm">{p}</span>
            ))}
          </div>
          <p className="text-gray-400 text-sm">Тема публикаций&nbsp;&mdash; ИИ-трансформация бизнеса, организационные модели, стратегия ИИвизации.</p>
        </div>
      </div>
    </section>
  )
}

function PodcastSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className={`max-w-3xl transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Подкаст «AI Transformation»</h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            Авторский подкаст о&nbsp;том, как ИИ перестраивает целые отрасли&nbsp;&mdash; от нефтегаза до нейронауки. Глубокие разговоры с&nbsp;лидерами, которые запускают ИИ на&nbsp;передовой.
          </p>
          <div className="space-y-3">
            {podcastGuests.map((g, i) => (
              <div key={i} className="flex items-start gap-3 text-gray-700 bg-gray-50 rounded-xl px-5 py-3 border border-gray-100 transition-all duration-300 hover:border-gray-200 hover:shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0 mt-2" />
                {g}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function EventsSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Площадки, на&nbsp;которых выступает WMT&nbsp;AI</h2>
          <p className="text-gray-500 mb-12">Игорь Никитин и&nbsp;команда WMT&nbsp;AI регулярно выступают на&nbsp;площадках, которые можно проверить.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">2025</h3>
              <div className="space-y-2">
                {events2025.map((e, i) => (
                  <div key={i} className="text-gray-600 text-sm pl-4 border-l-2 border-brand py-1">{e}</div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">2026</h3>
              <div className="space-y-2">
                {events2026.map((e, i) => (
                  <div key={i} className="text-gray-600 text-sm pl-4 border-l-2 border-gray-300 py-1">{e}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ForwardSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-16 px-6 md:px-12 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">Эту страницу удобно переслать</h2>
          <p className="text-gray-500 mb-6">Если нужно показать коллегам или руководству, кто стоит за&nbsp;WMT&nbsp;AI и&nbsp;на&nbsp;чём это построено, перешлите эту страницу.</p>
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 transition-all duration-500 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1">
            <p className="text-gray-600 text-lg mb-6">Здесь собрано главное: основатель, клиенты, академическое признание, публикации, подкаст, выступления. Если нужна карта для сравнения всех программ&nbsp;&mdash; она на&nbsp;отдельной странице.</p>
            <Link to="/all-formats" className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline">
              Открыть карту всех программ <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function NavBackSection() {
  return (
    <section className="py-24 px-6 md:px-12 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">Доказательства проверены. Какой следующий шаг?</h2>
        <p className="text-gray-500 mb-8">Эта страница&nbsp;&mdash; не&nbsp;тупик. Выберите, куда вернуться, чтобы продолжить выбор программы.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {navCards.map((c, idx) => (
            <Link key={idx} to={c.to} className="bg-white rounded-xl p-5 border border-gray-100 transition-all duration-500 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1 group">
              <span className="text-sm font-medium text-gray-900 group-hover:text-brand transition-colors flex items-center gap-2">
                {c.label} <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
        <p className="text-gray-400 text-sm mt-8">Если вы уже участник программы и вам нужен доступ&nbsp;&mdash; <Link to="#" className="text-gray-400 hover:text-gray-600 underline">войдите в личный кабинет</Link>.</p>
      </div>
    </section>
  )
}

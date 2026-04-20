import { ArrowRight, Award, Newspaper, Mic2, Calendar, Layout, GraduationCap, Users, Zap } from "lucide-react"
import { Link } from "react-router-dom"
import { LogoCloud } from "@/components/ui/logo-cloud"
import { clients } from "@/data/clients"
import { V2Hero } from "@/components/ui/V2Hero"
import { useScrollVisible } from "@/hooks/useScrollVisible"
import { MainCta } from "@/components/MainCta"

const publications = [
  "Forbes Russia", "РБК", "РБК Trends", "РБК PRO",
  "Коммерсантъ", "Российская газета", "CNews",
  "Sber AI", "Intelligent Enterprise", "Rusbase", "VC.ru"
]

const events2025 = [
  "CIPR — Главная сцена, доклад по ИИ-трансформации",
  "INNOPROM — Панельная дискуссия «Промышленный ИИ»",
  "AI CON 2025, Сингапур — Экспертный совет",
  "AIE 2025, Макао — Доклад о внедрении агентов",
  "Skolkovo — панель «AI Partnership»",
  "Moscow 2030, Merge — Секция будущего",
]

const events2026 = [
  "Skolkovo — MBA, AI Shift (Курс для CEO)",
  "Skolkovo — Tandemocracy (Управление в эпоху ИИ)",
  "VK Roundtable — Лидеры AI-рынка",
  "Центральный банк Армении — Стратегическая сессия для руководства",
]

const podcastGuests = [
  { name: "Александр Машрабов", desc: "Основатель Higgsfield AI, $8M инвестиций", role: "Видеогенерация и инвестиции" },
  { name: "Алексей Поперлюков", desc: "Head of AI, Газпром Нефть", role: "ИИ в корпоративном секторе" },
  { name: "Владимир Алипов", desc: "Нейроучёный, исследователь мозга", role: "Мозг vs Искусственный Интеллект" },
  { name: "Влад Завадский", desc: "Методолог ИИ-трансформации", role: "Архитектура изменений" },
]

export function Proof() {
  const statusTags = [
    <div key="t1" className="group relative bg-gray-900/60 dark:bg-black/40 backdrop-blur-xl border border-gray-800/50 dark:border-white/5 rounded-[2rem] p-6 md:p-8 transition-all duration-500 hover:border-brand/40 h-full flex flex-col justify-center items-start text-left shadow-md overflow-hidden min-h-[140px]">
      <div className="flex items-center gap-3 mb-2">
        <Users className="w-5 h-5 text-brand" />
        <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Масштаб</span>
      </div>
      <h3 className="text-white font-medium text-[15px] md:text-xl relative z-10 leading-[1.3]">
        Глобальная команда <b>400+ сотрудников</b> и реальный бизнес-опыт.
      </h3>
    </div>,
    <div key="t2" className="group relative bg-gray-900/60 dark:bg-black/40 backdrop-blur-xl border border-gray-800/50 dark:border-white/5 rounded-[2rem] p-6 md:p-8 transition-all duration-500 hover:border-brand/40 h-full flex flex-col justify-center items-start text-left shadow-md overflow-hidden min-h-[140px]">
      <div className="flex items-center gap-3 mb-2">
        <Award className="w-5 h-5 text-brand" />
        <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Признание</span>
      </div>
      <h3 className="text-white font-medium text-[15px] md:text-xl relative z-10 leading-[1.3]">
        Методология, подтверждённая <b>Global Academic Standards</b>.
      </h3>
    </div>,
    <div key="t3" className="group relative bg-gray-900/60 dark:bg-black/40 backdrop-blur-xl border border-gray-800/50 dark:border-white/5 rounded-[2rem] p-6 md:p-8 transition-all duration-500 hover:border-brand/40 h-full flex flex-col justify-center items-start text-left shadow-md overflow-hidden min-h-[140px]">
      <div className="flex items-center gap-3 mb-2">
        <Newspaper className="w-5 h-5 text-brand" />
        <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Публичность</span>
      </div>
      <h3 className="text-white font-medium text-[15px] md:text-xl relative z-10 leading-[1.3]">
        <b>20+ материалов</b> в Forbes, РБК и главных деловых СМИ.
      </h3>
    </div>
  ]

  return (
    <div className="bg-white dark:bg-black transition-colors duration-300">
      {/* ── HERO ── */}
      <V2Hero 
        layout="mosaic"
        label="Доказательства и Факты"
        title={<>За программами WMT AI стоит <em className="not-italic text-brand font-bold">реальный масштаб</em> и опыт</>}
        description="Мы не анонимный онлайн-курс. За методологией WMT AI стоит конкретный человек, признанная мировыми экспертами база и десятки реальных внедрений в крупнейшие компании."
        tags={statusTags}
        tagsTitle="Главные аргументы доверия:"
        buttons={
          <>
            <a href="#founder" className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 rounded-full px-8 md:px-10 py-3.5 md:py-4 font-bold hover:bg-gray-100 transition-all duration-300 shadow-[0_8px_32px_rgba(255,255,255,0.2)] hover:-translate-y-1 transform-gpu text-sm md:text-base">
              Основатель и команда <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-1" />
            </a>
            <a href="#media" className="inline-flex items-center justify-center gap-2 bg-transparent text-white border border-white/20 rounded-full px-8 md:px-10 py-3.5 md:py-4 font-bold hover:bg-white/5 transition-all duration-300 text-sm md:text-base">
              Публикации и СМИ
            </a>
          </>
        }
      />

      {/* ── FOUNDER SECTION ── */}
      <FounderSection />

      {/* ── ACADEMIC RECOGNITION SECTION ── */}
      <AcademicRecognitionSection />

      {/* ── MEDIA & PUBLICATIONS ── */}
      <PublicationsSection />

      {/* ── IICHNICA SHOW ── */}
      <IichnicaSection />

      {/* ── PODCAST & EVENTS ── */}
      <PodcastAndEventsSection />

      {/* ── TRUST MARQUEE ── */}
      <div className="py-20 border-t border-gray-100 dark:border-white/[0.06] bg-gray-50/50 dark:bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-white/40">Нам доверяют лидеры рынка</h3>
          </div>
          <LogoCloud logos={clients} />
        </div>
      </div>

      {/* ── NAV BACK ── */}
      <NavBackSection />

      {/* ── FINAL CTA ── */}
      <MainCta />
    </div>
  )
}

function FounderSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section id="founder" ref={ref} className="py-20 md:py-32 px-4 sm:px-6 md:px-12 bg-white dark:bg-black overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          {/* Photo Column */}
          <div className="lg:col-span-5 relative group h-full">
            <div className="absolute inset-0 bg-brand/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-1000 pointer-events-none" />
            <div className="relative rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-white/10 shadow-2xl h-full min-h-[400px]">
              <img 
                src="/experts/nikitin-large.webp" 
                alt="Игорь Никитин" 
                className="w-full h-full object-cover object-top filter brightness-105 group-hover:scale-105 transition-transform duration-1000" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-8 left-8 right-8">
                <span className="text-[10px] font-bold text-brand uppercase tracking-[0.2em] mb-1 block">Основатель WMT AI</span>
                <h3 className="text-white text-2xl font-bold">Игорь Никитин</h3>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              От ИИ-теории к <em className="not-italic text-brand font-bold uppercase transition-colors group-hover:text-white">реальной трансформации</em>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-white/60 leading-relaxed mb-8 font-medium">
              Игорь Никитин — основатель WMT AI. Компания ИИвизирует бизнес клиентов: перестраивает процессы и мышление так, чтобы ИИ стал частью оргструктуры, а не временным трендом.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {[
                { title: "50+ проектов", desc: "Внедрение ИИ в 2024–2026 годах", icon: Layout },
                { title: "Патент в ИИ", desc: "Собственные разработки в области архитектур", icon: Zap },
                { title: "Глобальная команда", desc: "400+ сотрудников в WMT Group", icon: Users },
                { title: "Исследование Ipsos", desc: "Международная валидация подходов", icon: Newspaper }
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/10 p-5 rounded-[2rem] transition-all hover:border-brand/30 group">
                  <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center mb-3 text-brand transition-transform group-hover:scale-110">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-brand transition-colors text-base">{item.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-white/40 leading-snug">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AcademicRecognitionSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-20 md:py-32 px-4 sm:px-6 md:px-12 bg-gray-50 dark:bg-[hsl(220,20%,4%)] border-t border-gray-100 dark:border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className={`relative bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-[3rem] p-8 md:p-16 overflow-hidden transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 blur-[100px] pointer-events-none rounded-full -translate-y-1/2 translate-x-1/4" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-brand/10 border border-brand/20 rounded-xl mb-6">
                <GraduationCap className="w-4 h-4 text-brand" />
                <span className="text-brand text-[10px] font-bold uppercase tracking-widest leading-none">Академическое признание</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Методология подтверждена <br />
                <span className="text-gray-400 dark:text-white/40">Global Academic Standards</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-white/60 leading-relaxed mb-8 font-medium">
                В марте 2026 года методология AI Transformation Methodology, на которой построены все программы WMT AI, получила официальное признание как Established Executive Education Program.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <span className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 px-4 py-2 rounded-full text-xs font-bold text-gray-500 dark:text-white/40">Март 2026</span>
                <span className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 px-4 py-2 rounded-full text-xs font-bold text-gray-500 dark:text-white/40">Practical Framework</span>
                <span className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 px-4 py-2 rounded-full text-xs font-bold text-gray-500 dark:text-white/40">Global Academic Standards</span>
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-brand/20 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
              <img
                src="/brand/academic-recognition.png"
                alt="Global Academic Standards"
                className="relative w-full max-w-md mx-auto transform-gpu group-hover:-translate-y-1 transition-transform duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-white/90 dark:bg-black/80 backdrop-blur-md px-6 py-3 rounded-full text-sm font-bold shadow-xl border border-gray-200 dark:border-white/10">Увеличить</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PublicationsSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section id="media" ref={ref} className="py-20 md:py-32 px-4 sm:px-6 md:px-12 bg-white dark:bg-black scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-16 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">Публичность и СМИ</h2>
          <p className="text-lg md:text-xl text-gray-500 dark:text-white/40 max-w-3xl font-medium">Почему нам доверяют главные деловые издания страны. Проверьте материалы до принятия решения.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-12 flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
              <Newspaper className="w-6 h-6 text-brand" /> 20+ публикаций в деловых СМИ
            </h3>
            <div className="flex flex-wrap gap-3">
              {publications.map((p, i) => (
                <div 
                  key={i} 
                  className="bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/10 px-6 py-4 rounded-3xl font-bold text-gray-700 dark:text-white/70 hover:border-brand/40 hover:text-brand transition-all cursor-default shadow-sm hover:shadow-brand/5"
                >
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function IichnicaSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-20 md:py-32 px-4 sm:px-6 md:px-12 bg-gray-50 dark:bg-black border-y border-gray-100 dark:border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="relative group bg-white dark:bg-black/40 backdrop-blur-3xl border border-gray-100 dark:border-white/10 rounded-[3rem] p-8 md:p-16 overflow-hidden shadow-2xl">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand/5 blur-[120px] rounded-full" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
              <div>
                <img src="/logos/wmtaichnica.svg" alt="ИИЧНИЦА SHOW" className="h-16 md:h-20 w-auto mb-10 dark:invert-[0.1]" />
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight leading-[1.1]">
                  Итоги: от ИИ-игрушек к <br />
                  <span className="text-brand">AI-трансформации</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-600 dark:text-white/60 mb-10 leading-relaxed font-medium">
                  Собственное масштабное шоу WMT AI, которое мы проводим дважды в год. Живые подкасты, честные разборы кейсов и закрытый нетворкинг для C-level.
                </p>
                <a href="https://wmtaichnica.ru/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-brand text-white rounded-full px-10 py-5 font-bold hover:bg-[#fb4119] transition-all duration-300 shadow-xl shadow-brand/20">
                  Посмотреть как это было <ArrowRight className="w-5 h-5" />
                </a>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/10 p-8 rounded-[2rem] shadow-sm">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Прошедшее событие</span>
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">31 марта</span>
                    <span className="text-brand font-bold text-sm">Москва</span>
                  </div>
                  <div className="h-px w-full bg-gray-200 dark:bg-white/10 mb-4" />
                  <p className="text-sm text-gray-500 dark:text-white/40 italic">
                    «Здесь ИИ-методологии WMT AI встречаются с реальным бизнесом в прямом эфире.»
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

function PodcastAndEventsSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-20 md:py-32 px-4 sm:px-6 md:px-12 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          {/* Podcast Column */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center text-brand">
                <Mic2 className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Подкаст WMT AI</h2>
            </div>
            <p className="text-lg text-gray-600 dark:text-white/60 mb-10 font-medium">
              Авторский подкаст Игоря Никитина о том, как ИИ перестраивает отрасли. Разговоры с теми, кто создает будущее сегодня.
            </p>
            <div className="space-y-4">
              {podcastGuests.map((guest, i) => (
                <div key={i} className="flex gap-4 p-5 bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/10 rounded-[2rem] hover:border-brand/40 transition-all group">
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg group-hover:text-brand transition-colors">{guest.name}</h4>
                      <span className="text-[10px] font-bold text-brand uppercase tracking-widest">{guest.role}</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-white/40 font-medium">{guest.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Events Column */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center text-brand">
                <Calendar className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Выступления</h2>
            </div>
            <p className="text-lg text-gray-600 dark:text-white/60 mb-10 font-medium">
              Регулярные выступления на ключевых технологических и бизнес-площадках России и мира.
            </p>
            
            <div className="space-y-8">
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">2026 — Актуально</h4>
                <div className="space-y-3">
                  {events2026.map((e, i) => (
                    <div key={i} className="flex gap-3 text-gray-900 dark:text-white font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0 mt-2" />
                      <span className="text-base">{e}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">2025 — История</h4>
                <div className="space-y-2">
                  {events2025.map((e, i) => (
                    <div key={i} className="flex gap-3 text-gray-500 dark:text-white/40 font-medium">
                      <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-white/10 shrink-0 mt-2.5" />
                      <span className="text-sm">{e}</span>
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

function NavBackSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-20 md:py-32 px-4 sm:px-6 md:px-12 bg-gray-50 dark:bg-black border-t border-gray-100 dark:border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight text-center">Готовы к следующему шагу?</h2>
          <p className="text-lg md:text-xl text-gray-500 dark:text-white/40 mb-12 max-w-2xl mx-auto font-medium text-center">Выберите формат обучения или трансформации, который подходит под ваши задачи сегодня.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: "Для руководителей", to: "/executive", desc: "Стратегия и архитектура" },
              { title: "Для команд", to: "/teams", desc: "Практика и внедрение" },
              { title: "Личный ИИ", to: "/personal-ai", desc: "Глубокая работа 1-на-1" }
            ].map((link, i) => (
              <Link 
                key={i} 
                to={link.to} 
                className="group bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 p-8 rounded-[2rem] hover:border-brand/40 transition-all shadow-sm hover:shadow-xl hover:shadow-brand/5"
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-brand transition-colors">{link.title}</h4>
                  <ArrowRight className="w-6 h-6 text-brand transform group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-gray-500 dark:text-white/40 font-medium">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

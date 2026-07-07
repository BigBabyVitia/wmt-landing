import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { NavbarV2 } from "@/components/NavbarV2"
import { MainCta } from "@/components/MainCta"
import { LogoCloud } from "@/components/ui/logo-cloud"
import { clients } from "@/data/clients"
import { trainingCases, caseStats, type CaseItem } from "@/data/cases"
import { CaseModal, PdfModal } from "@/components/CaseModal"
import { ArrowRight, ArrowDown, TickCircle, ShieldTick } from "@/components/ui/icons"

/**
 * /cases — все кейсы обучения на одной странице.
 * Структура: hero со счётчиками → sticky-чипы шагов → флагман WB →
 * шаги 1–3 маршрута (сплиты с фото, ИБ-полоса, сетка карточек) → мостик шага 4 →
 * честная концовка → лид-магнит PDF → MainCta.
 * Хэш-якоря (#wildberries, #fora-bank, …) обрабатывает ScrollToTop в App.tsx.
 */

const byId = (id: string) => trainingCases.find((c) => c.id === id)!

const STEP_CHIPS = [
  { href: "#flagship", label: "Флагман" },
  { href: "#step-1", label: "Шаг 1 · Руководители" },
  { href: "#step-2", label: "Шаг 2 · Команда" },
  { href: "#step-3", label: "Шаг 3 · Агенты" },
  { href: "#step-4", label: "Шаг 4 · Процессы" },
]

export function Cases() {
  const [active, setActive] = useState<CaseItem | null>(null)
  const [pdfOpen, setPdfOpen] = useState(false)
  const [showUp, setShowUp] = useState(false)
  const revealRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prev = document.title
    document.title = "Кейсы обучения WMT AI — 60+ компаний, от стратсессий до трансформаций"
    return () => { document.title = prev }
  }, [])

  useEffect(() => {
    const onScroll = () => setShowUp(window.scrollY > window.innerHeight * 1.5)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = active || pdfOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [active, pdfOpen])

  return (
    <div className="bg-white dark:bg-[hsl(220,20%,7%)] transition-colors duration-300">
      <NavbarV2 variant="inner" solid />

      {/* ── HERO ── */}
      <section className="pt-28 md:pt-32 pb-12 md:pb-16 px-4 sm:px-6 md:px-12 bg-gray-50 dark:bg-[hsl(220,18%,5%)] border-b border-gray-100 dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-white/50 hover:text-brand transition-colors mb-8">
            <ArrowRight className="w-3.5 h-3.5 rotate-180" /> На главную
          </Link>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand mb-4">Кейсы обучения</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 dark:text-white text-balance max-w-3xl">
            С каким запросом приходят компании — и что у них{" "}
            <span className="bg-gradient-to-r from-gray-400 via-gray-900 to-gray-400 dark:from-white/40 dark:via-white dark:to-white/40 bg-clip-text text-transparent inline-block animate-text-glow">
              остаётся
            </span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
            35+ программ за год: стратегические сессии, обучение команд, мастерские ИИ-агентов и одна трансформация на 3&nbsp;420 человек. Ниже — запросы и результаты, без «прошло отлично».
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 max-w-3xl">
            {caseStats.map(({ value, label }) => (
              <div key={label} className="rounded-[1.25rem] border border-gray-200/70 dark:border-white/[0.06] bg-white dark:bg-white/[0.03] p-5">
                <div className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 max-w-5xl">
            <LogoCloud logos={clients} />
          </div>
        </div>
      </section>

      {/* ── STICKY-ЧИПЫ ШАГОВ ── */}
      <div className="sticky top-16 z-30 bg-white/90 dark:bg-[hsl(220,20%,7%)]/90 backdrop-blur-md border-b border-gray-100 dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-3 flex items-center gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {STEP_CHIPS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="shrink-0 text-[13px] font-semibold text-gray-500 dark:text-white/60 border border-gray-200 dark:border-white/10 rounded-full px-4 pt-[5px] pb-[10px] hover:text-brand hover:border-[#ff5331]/50 transition-colors whitespace-nowrap"
            >
              {label}
            </a>
          ))}
          <button
            onClick={() => setPdfOpen(true)}
            className="shrink-0 ml-auto text-[13px] font-semibold text-brand hover:text-[#e64627] transition-colors whitespace-nowrap"
          >
            Кейсбук PDF ↓
          </button>
        </div>
      </div>

      <div ref={revealRef} className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">

        {/* ── ФЛАГМАН: Wildberries ── */}
        <section id="flagship" className="pt-14 md:pt-20 scroll-mt-28">
          <FlagshipBand c={byId("wildberries")} />
        </section>

        {/* ── ШАГ 1 ── */}
        <StepHeader
          id="step-1"
          n={1}
          title="Стартовые форматы для руководителей"
          sub="С этого начинается маршрут: управляющая команда получает общую картину и личный навык — до того, как учить всю компанию."
        />
        <CaseSplit c={byId("strategy-sessions")} photoSide="right" />
        <CaseSplit c={byId("gov-armenia")} photoSide="left" />
        <CaseSplit c={byId("personal-ai")} photoSide="right" mosaic={["/cases/personal-ai-1.jpg", "/cases/personal-ai-2.jpg", "/cases/personal-ai-3.jpg", "/cases/personal-ai-4.jpg"]} />

        {/* ── ШАГ 2 ── */}
        <StepHeader
          id="step-2"
          n={2}
          title="Базовые программы для команды"
          sub="Команда осваивает ИИ на своих задачах: не «курс с полки», а программа под процессы, роли и отрасль."
        />
        <CaseSplit c={byId("corp-industry")} photoSide="left" />
        <SecurityBand c={byId("fora-bank")} />

        {/* ── ШАГ 3 ── */}
        <StepHeader
          id="step-3"
          n={3}
          title="ИИ-агенты и автоматизация"
          sub="Идеи доводятся до работающих агентов: команда собирает прототипы под свои процессы своими руками."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          {(["gronolux", "r1", "liga"] as const).map((id) => (
            <GridCard key={id} c={byId(id)} onOpen={() => setActive(byId(id))} />
          ))}
        </div>

        {/* ── ШАГ 4: мостик к флагману ── */}
        <section id="step-4" className="mt-16 md:mt-20 scroll-mt-28">
          <div className="rounded-[1.5rem] border border-gray-200/70 dark:border-white/[0.06] bg-gray-50 dark:bg-white/[0.03] p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <span className="inline-flex items-center rounded-full px-3 pt-[4px] pb-[9px] text-xs font-semibold text-brand border border-[#ff5331]/30 bg-[#ff5331]/[0.07] mb-4">
                Шаг 4 из 4 · Под процессы и проекты
              </span>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Финал маршрута — трансформация
              </h2>
              <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
                Когда обучение перерастает в перестройку процессов, получается флагманский кейс — как у Wildberries выше. Это и есть цель маршрута из 4 направлений.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a href="#flagship" className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-gray-700 dark:text-white/80 border border-gray-300 dark:border-white/15 rounded-full px-6 pt-[11px] pb-[13px] hover:border-[#ff5331]/50 hover:text-brand transition-colors">
                Кейс Wildberries ↑
              </a>
            </div>
          </div>
        </section>

        {/* ── Лид-магнит PDF ── */}
        <section className="mt-14 mb-16 md:mb-24">
          <div className="relative rounded-[1.5rem] overflow-hidden bg-[hsl(220,20%,8%)] border border-[#ff5331]/30 p-8 md:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_15%_0%,rgba(255,83,49,0.22),transparent_60%)]" />
            <div className="relative flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-semibold text-white">Полный кейсбук — в PDF</h2>
                <p className="mt-2 text-white/60 leading-relaxed max-w-xl">
                  Все программы с запросами, результатами и фото одним документом — удобно показать коллегам и совету директоров.
                </p>
              </div>
              <button
                onClick={() => setPdfOpen(true)}
                className="shrink-0 inline-flex items-center justify-center gap-2 bg-brand text-white hover:bg-[#e64627] shadow-lg shadow-[#ff5331]/25 transition-all rounded-full px-8 pt-[13px] pb-[15px] font-bold hover:-translate-y-0.5"
              >
                Получить кейсбук <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* ── Финальная конверсия ── */}
      <MainCta />

      {/* ── Наверх ── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Наверх"
        className={`fixed bottom-6 right-6 z-30 w-11 h-11 rounded-full bg-white dark:bg-white/10 border border-gray-200 dark:border-white/15 shadow-lg flex items-center justify-center text-gray-600 dark:text-white/70 hover:text-brand hover:border-[#ff5331]/50 transition-all duration-300 backdrop-blur ${showUp ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
      >
        <ArrowDown className="w-4 h-4 rotate-180" />
      </button>

      {active && <CaseModal c={active} onClose={() => setActive(null)} />}
      {pdfOpen && <PdfModal onClose={() => setPdfOpen(false)} />}
    </div>
  )
}

/* ── Заголовок шага маршрута ── */
function StepHeader({ id, n, title, sub }: { id: string; n: number; title: string; sub: string }) {
  return (
    <section id={id} className="mt-16 md:mt-24 scroll-mt-28">
      <div>
        <span className="inline-flex items-center rounded-full px-3.5 pt-[4px] pb-[9px] text-xs font-bold text-brand border-[1.5px] border-[#ff5331]/60 bg-[#ff5331]/[0.06] mb-4">
          Шаг {n} из 4
        </span>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h2>
        <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">{sub}</p>
      </div>
    </section>
  )
}

/* ── Флагманская полоса Wildberries ── */
function FlagshipBand({ c }: { c: CaseItem }) {
  return (
    <div id={c.id} className="relative rounded-[1.5rem] overflow-hidden bg-[hsl(220,20%,8%)] border border-[#ff5331]/40 scroll-mt-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_85%_10%,rgba(255,83,49,0.3),transparent_55%),radial-gradient(ellipse_50%_50%_at_5%_95%,rgba(255,83,49,0.14),transparent_60%)]" />
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 md:p-12">
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full px-3 pt-[4px] pb-[6px] text-[10px] font-bold uppercase tracking-[0.14em] text-brand border border-[#ff5331]/40 bg-[#ff5331]/10">
              {c.format}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Флагманский кейс · весь маршрут целиком</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-5">{c.client}</h2>
          <p className="text-sm text-white/55 mt-2">{c.meta}</p>

          <div className="mt-7 space-y-5">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/45 mb-2">Запрос</p>
              <p className="text-[15px] text-white/80 leading-relaxed">{c.request}</p>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand mb-2">Результат</p>
              <ul className="space-y-2">
                {c.result.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-[15px] text-white/80 leading-relaxed">
                    <TickCircle className="w-[18px] h-[18px] text-brand shrink-0 mt-0.5" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex items-center">
          <div className="w-full grid grid-cols-2 gap-4">
            {c.metrics!.map((m) => (
              <div key={m.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <div className="text-2xl md:text-3xl font-bold text-brand leading-none tracking-tight">{m.value}</div>
                <div className="text-[11px] md:text-xs text-white/50 mt-2 leading-snug">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Широкий сплит: текст + фото (чередуем сторону) ── */
function CaseSplit({ c, photoSide, mosaic }: { c: CaseItem; photoSide: "left" | "right"; mosaic?: string[] }) {
  const photoBlock = mosaic ? (
    <div className="grid grid-cols-2 gap-2 p-2 h-full min-h-[320px]">
      {mosaic.map((src) => (
        <div key={src} className="relative rounded-xl overflow-hidden">
          <img src={src} alt={c.client} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      ))}
    </div>
  ) : (
    <div className="relative h-64 lg:h-full min-h-[320px]">
      <img
        src={c.photo}
        alt={c.client}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        style={c.photoPos ? { objectPosition: c.photoPos } : undefined}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent lg:bg-none" />
    </div>
  )

  return (
    <div id={c.id} className="mt-8 rounded-[1.5rem] overflow-hidden border border-gray-200/70 dark:border-white/[0.06] bg-gray-50 dark:bg-white/[0.03] scroll-mt-28">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className={`lg:col-span-7 p-7 md:p-10 ${photoSide === "left" ? "lg:order-2" : ""}`}>
          <span className="inline-flex items-center rounded-full px-3 pt-[4px] pb-[9px] text-xs font-semibold text-brand border border-[#ff5331]/30 bg-[#ff5331]/[0.07]">
            {c.format}
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-4">{c.client}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{c.meta}</p>

          <div className="mt-6 space-y-5">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500 mb-2">Запрос</p>
              <p className="text-[15px] text-gray-700 dark:text-gray-300 leading-relaxed">{c.request}</p>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand mb-2">Результат</p>
              <ul className="space-y-2">
                {c.result.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-[15px] text-gray-700 dark:text-gray-300 leading-relaxed">
                    <TickCircle className="w-[18px] h-[18px] text-brand shrink-0 mt-0.5" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            {c.clients && (
              <div className="flex flex-wrap gap-1.5">
                {c.clients.map((n) => (
                  <span key={n} className="text-xs font-medium text-gray-500 dark:text-white/50 bg-gray-100 dark:bg-white/[0.06] rounded-full px-2.5 pt-[3px] pb-[7px]">
                    {n}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className={`lg:col-span-5 ${photoSide === "left" ? "lg:order-1" : ""}`}>{photoBlock}</div>
      </div>
    </div>
  )
}

/* ── «Чёрный разлом»: ИБ-кейс Фора-Банка ── */
function SecurityBand({ c }: { c: CaseItem }) {
  return (
    <div id={c.id} className="relative mt-8 rounded-[1.5rem] overflow-hidden bg-[hsl(220,20%,5%)] border border-white/10 scroll-mt-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_90%_15%,rgba(255,83,49,0.2),transparent_55%)]" />
      <div className="absolute inset-0 opacity-30 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_65%)]" />
      <ShieldTick className="absolute top-8 right-8 w-24 h-24 text-white/[0.06]" />

      <div className="relative p-7 md:p-12 max-w-3xl">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center rounded-full px-3 pt-[4px] pb-[9px] text-xs font-semibold text-brand border border-[#ff5331]/40 bg-[#ff5331]/10">
            {c.format}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 pt-[4px] pb-[9px] text-xs font-semibold text-white/80 border border-white/15 bg-white/[0.06]">
            <ShieldTick className="w-3.5 h-3.5" /> Защищённый контур
          </span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white mt-4">{c.client}</h3>
        <p className="text-sm text-white/50 mt-1">{c.meta}</p>

        <div className="mt-6 space-y-5">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/45 mb-2">Запрос</p>
            <p className="text-[15px] text-white/80 leading-relaxed">{c.request}</p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand mb-2">Результат</p>
            <ul className="space-y-2">
              {c.result.map((r) => (
                <li key={r} className="flex items-start gap-2 text-[15px] text-white/80 leading-relaxed">
                  <TickCircle className="w-[18px] h-[18px] text-brand shrink-0 mt-0.5" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Карточка сетки шага 3 (стиль живого сайта: фото + скрим + текст поверх) ── */
function GridCard({ c, onOpen }: { c: CaseItem; onOpen: () => void }) {
  return (
    <button
      id={c.id}
      onClick={onOpen}
      className="group relative aspect-[3/4] rounded-[1.5rem] overflow-hidden text-left bg-[hsl(220,20%,10%)] border border-black/5 dark:border-white/10 hover:border-[#ff5331]/45 transition-all duration-500 hover:shadow-xl hover:shadow-[#ff5331]/10 scroll-mt-28"
    >
      <img
        src={c.photo}
        alt={c.client}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover brightness-[0.97] group-hover:scale-[1.04] transition-transform duration-1000"
        style={c.photoPos ? { objectPosition: c.photoPos } : undefined}
      />
      <div className="absolute inset-0 bg-black/15" />
      <div className="absolute inset-x-0 bottom-0 h-[68%] bg-gradient-to-t from-black/90 from-0% via-black/45 via-40% to-transparent" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/45 to-transparent" />

      <span className="absolute top-4 left-4 max-w-[calc(100%-2rem)] truncate inline-flex items-center rounded-full px-3 pt-[4px] pb-[6px] text-[10px] font-bold uppercase tracking-[0.14em] text-white/95 bg-black/35 backdrop-blur-md border border-white/15">
        {c.format}
      </span>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <h4 className="text-xl font-bold text-white leading-snug [text-shadow:0_1px_16px_rgba(0,0,0,0.5)]">{c.client}</h4>
        <p className="mt-1.5 text-[13px] text-white/75 leading-relaxed line-clamp-2">{c.teaser}</p>
        <span className="mt-3.5 inline-flex items-center gap-1.5 rounded-full bg-brand text-white px-4 pt-[5px] pb-[10px] text-[13px] font-semibold shadow-lg shadow-[#ff5331]/25 transition-all group-hover:bg-[#e64627] group-hover:-translate-y-0.5">
          Запрос и результат <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </button>
  )
}

import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { NavbarV2 } from "@/components/NavbarV2"
import { MainCta } from "@/components/MainCta"
import { LogoCloud } from "@/components/ui/logo-cloud"
import { clients } from "@/data/clients"
import { trainingCases, caseStats, CASEBOOK_PDF, CASEBOOK_FILENAME, type CaseItem } from "@/data/cases"
import { CaseModal } from "@/components/CaseModal"
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
  const [showUp, setShowUp] = useState(false)
  const revealRef = useRef<HTMLDivElement>(null)
  const { hash } = useLocation()

  // Пришли с главной по клику на кейс (/cases#<id>) — на секунду подсвечиваем именно
  // ту карточку, на которую нажали, чтобы был явный сигнал «провалился внутрь этого кейса»
  // (а не «страница зачем-то прыгнула»). Скролл к якорю делает ScrollToTop в App.tsx.
  useEffect(() => {
    if (!hash) return
    const id = hash.slice(1)
    let el: HTMLElement | null = null
    // Ждём, пока ScrollToTop доскроллит и layout устаканится, потом подсвечиваем.
    const t = window.setTimeout(() => {
      el = document.getElementById(id)
      if (!el) return
      el.classList.add("case-flash")
    }, 650)
    return () => {
      window.clearTimeout(t)
      el?.classList.remove("case-flash")
    }
  }, [hash])

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
    document.body.style.overflow = active ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [active])

  return (
    <div className="bg-white dark:bg-[hsl(220,20%,7%)] transition-colors duration-300">
      <NavbarV2 variant="inner" solid />

      {/* ── HERO — минимал + фирменный цветок-трилистник в фоне ── */}
      <CasesHero />

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
          <a
            href={CASEBOOK_PDF}
            download={CASEBOOK_FILENAME}
            className="shrink-0 ml-auto text-[13px] font-semibold text-brand hover:text-[#e64627] transition-colors whitespace-nowrap"
          >
            Кейсбук PDF ↓
          </a>
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
              <span className="inline-flex items-center rounded-full px-3 pt-[5px] pb-[7px] text-xs font-semibold text-brand border border-[#ff5331]/30 bg-[#ff5331]/[0.07] mb-4">
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
              <a
                href={CASEBOOK_PDF}
                download={CASEBOOK_FILENAME}
                className="shrink-0 inline-flex items-center justify-center gap-2 bg-brand text-white hover:bg-[#e64627] shadow-lg shadow-[#ff5331]/25 transition-all rounded-full px-8 pt-[13px] pb-[15px] font-bold hover:-translate-y-0.5"
              >
                Скачать кейсбук <ArrowDown className="w-4 h-4" />
              </a>
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
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   HERO — фирменный фон hero-bg.webp (тёплый оранжевый + лепестки логотипа справа),
   приём со старого build wmt-landing (/executive). Тема-зависимо:
   • светлая — поверх БЕЛЫЙ градиент слева → слева бело для тёмного текста, справа оранжевый с лого;
   • тёмная — тёмный градиент #050b14 слева, как на оригинале.
   ══════════════════════════════════════════════════════════════════════════ */
function CasesHero() {
  return (
    <section className="relative pt-28 md:pt-32 pb-12 md:pb-16 px-4 sm:px-6 md:px-12 bg-white dark:bg-[hsl(220,20%,7%)] overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-white/55 hover:text-brand dark:hover:text-white transition-colors mb-10">
          <ArrowRight className="w-3.5 h-3.5 rotate-180" /> На главную
        </Link>

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand mb-5">Кейсы обучения</p>
        <h1 className="text-[2.6rem] leading-[1.03] md:text-6xl lg:text-[4.25rem] lg:leading-[1.02] font-semibold tracking-tight text-gray-900 dark:text-white text-balance max-w-6xl">
          С каким запросом приходят компании — и что у них{" "}
          <span className="bg-gradient-to-r from-gray-400 via-gray-900 to-gray-400 dark:from-white/50 dark:via-white dark:to-white/50 bg-clip-text text-transparent inline-block animate-text-glow">
            остаётся
          </span>
        </h1>
        <p className="mt-7 text-base md:text-lg text-gray-600 dark:text-white/65 max-w-2xl leading-relaxed">
          35+ программ за год: стратегические сессии, обучение команд, мастерские ИИ-агентов и одна трансформация на 3&nbsp;420 человек. Ниже — запросы и результаты, без «прошло отлично».
        </p>

        <div className="mt-10 grid grid-cols-3 gap-3 md:gap-4 max-w-2xl">
          {caseStats.map(({ value, label }) => (
            <div key={label} className="rounded-2xl border border-gray-200/70 bg-white/80 backdrop-blur-sm dark:border-white/12 dark:bg-white/[0.05] p-4 md:p-5">
              <div className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{value}</div>
              <div className="text-[12px] md:text-sm text-gray-500 dark:text-white/60 mt-1 leading-snug">{label}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-14">
          <LogoCloud logos={clients} />
        </div>
      </div>
    </section>
  )
}

/* ── Заголовок шага маршрута ── */
function StepHeader({ id, n, title, sub }: { id: string; n: number; title: string; sub: string }) {
  return (
    <section id={id} className="mt-16 md:mt-24 scroll-mt-28">
      <div>
        <span className="inline-flex items-center rounded-full px-3.5 pt-[5px] pb-[7px] text-xs font-bold text-brand border-[1.5px] border-[#ff5331]/60 bg-[#ff5331]/[0.06] mb-4">
          Шаг {n} из 4
        </span>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h2>
        <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">{sub}</p>
      </div>
    </section>
  )
}

/* ── Орбитальный декор тёмных полос (флагман WB, ИБ-кейс) ──
   ОДНА большая орбита (центр (817,430), r=503) прижата к правому краю: дуга идёт
   ЗА контентом (~16px от правого края на середине высоты), макушка и низ спрятаны
   за края карточки; еле различимая целиком, яркая — только на правой стороне
   (conic), выше и ниже уходит в тень. Вторая окружность — линия из правого нижнего
   угла, пересекает основную ровно в нижней точке. Контейнер фиксированного размера
   1332×734, прибит к правому верхнему углу — геометрия не деформируется; для более
   низких карточек уменьшается целиком через transform scale. */
function OrbitDecor({ scale = 1 }: { scale?: number }) {
  return (
    <div
      className="absolute top-0 right-0 w-[1332px] h-[734px] origin-top-right pointer-events-none hidden md:block"
      style={scale !== 1 ? { transform: `scale(${scale})` } : undefined}
      aria-hidden
    >
      <div className="absolute right-[12px] top-[-73px] w-[1006px] h-[1006px] rounded-full border border-[#ff5331]/[0.09]" />
      <div
        className="absolute right-[12px] top-[-73px] w-[1006px] h-[1006px] rounded-full border border-[#ff5331]/45"
        style={{
          maskImage: "conic-gradient(from 0deg at 50% 50%, transparent 32deg, black 58deg, black 105deg, transparent 150deg, transparent 360deg)",
          WebkitMaskImage: "conic-gradient(from 0deg at 50% 50%, transparent 32deg, black 58deg, black 105deg, transparent 150deg, transparent 360deg)",
        }}
      />
      <div className="absolute right-[-489px] top-[518px] w-[600px] h-[600px] rounded-full border border-[#ff5331]/25" />
      {/* точка на орбите, верх-право */}
      <span className="absolute right-[66px] top-[204px] translate-x-1/2 -translate-y-1/2 w-[9px] h-[9px] rounded-full bg-[#ffcaa6] shadow-[0_0_10px_2px_rgba(255,130,80,0.9),0_0_32px_12px_rgba(255,83,49,0.4)]" />
      {/* точка на орбите, низ — в месте пересечения со второй окружностью */}
      <span className="absolute right-[75px] top-[675px] translate-x-1/2 -translate-y-1/2 w-[9px] h-[9px] rounded-full bg-[#ffcaa6] shadow-[0_0_10px_2px_rgba(255,130,80,0.9),0_0_32px_12px_rgba(255,83,49,0.4)]" />
    </div>
  )
}

/* Тёплое свечение тёмных полос: заметное сверху-справа за дугой, поменьше у правого
   нижнего угла и у левого края — как в референсе */
const BAND_GLOW =
  "absolute inset-0 bg-[radial-gradient(ellipse_42%_50%_at_86%_12%,rgba(255,105,55,0.14),transparent_62%),radial-gradient(ellipse_30%_38%_at_86%_90%,rgba(255,95,50,0.10),transparent_62%),radial-gradient(ellipse_28%_60%_at_0%_48%,rgba(255,83,49,0.11),transparent_62%)]"

/* ── Флагманская полоса Wildberries ──
   Дизайн по референсу: почти чёрный тёплый фон, eyebrow-строка вместо плашек,
   крупный заголовок с оранжевым штрихом, Запрос/Результат на вертикальных линиях
   со светящимися точками, метрики на тонких разделителях (без карточек),
   справа — орбитальные дуги со светящимися точками. */
function FlagshipBand({ c }: { c: CaseItem }) {
  return (
    <div id={c.id} className="relative rounded-[1.5rem] overflow-hidden bg-[#0b0a09] border border-white/[0.07] scroll-mt-28">
      <div className={BAND_GLOW} />
      <OrbitDecor />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 p-8 md:p-12 lg:p-14">
        {/* ── Левая колонка ── */}
        <div className="lg:col-span-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="text-[11px] md:text-xs font-bold uppercase tracking-[0.18em] text-brand">
              {c.format.replace(" · ", " · ")}
            </span>
            <span className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
              Флагманский кейс
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-[4.25rem] font-semibold tracking-tight text-white mt-8 lg:mt-10">{c.client}</h2>
          <div className="mt-6 h-[2px] w-10 bg-[#ff5331]" />
          <p className="mt-6 text-lg md:text-xl text-white/75 leading-relaxed max-w-md">{c.meta}</p>

          <div className="mt-10 relative pl-7 border-l border-white/[0.13]">
            {/* светящаяся точка на линии — на уровне лейбла, как у «Результата» */}
            <span className="absolute -left-[4px] top-[2px] w-[7px] h-[7px] rounded-full bg-[#ffb38f] shadow-[0_0_14px_4px_rgba(255,110,60,0.65)]" />
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/90 mb-3">Запрос</p>
            <p className="text-[15px] text-white/70 leading-relaxed max-w-xl">{c.request}</p>
          </div>

          <div className="mt-9 relative pl-7 border-l border-white/[0.13]">
            <span className="absolute -left-[4px] top-[2px] w-[7px] h-[7px] rounded-full bg-[#ffb38f] shadow-[0_0_14px_4px_rgba(255,110,60,0.65)]" />
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/90 mb-4">Результат</p>
            <ul className="space-y-3">
              {c.result.map((r) => (
                <li key={r} className="flex items-start gap-3 text-[15px] text-white/80 leading-relaxed max-w-xl">
                  <TickCircle className="w-[19px] h-[19px] text-brand shrink-0 mt-0.5" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Правая колонка: метрики на тонких разделителях ── */}
        <div className="lg:col-span-6 flex items-center lg:pl-8 xl:pl-12">
          <div className="w-full relative grid grid-cols-2">
            {/* разделители-«прицел»: горизонталь сплошная, вертикаль с разрывом у пересечения */}
            <div className="absolute inset-x-0 top-1/2 h-px bg-white/[0.09]" />
            <div className="absolute left-1/2 top-0 h-[calc(50%-44px)] w-px bg-white/[0.09]" />
            <div className="absolute left-1/2 bottom-0 h-[calc(50%-44px)] w-px bg-white/[0.09]" />
            {c.metrics!.map((m, i) => (
              <div
                key={m.label}
                className={`py-8 md:py-10 ${i % 2 === 1 ? "pl-6 md:pl-9" : "pr-6 md:pr-9"}`}
              >
                <div className="text-3xl md:text-4xl xl:text-[2.6rem] font-semibold text-brand leading-none tracking-tight whitespace-nowrap">
                  {m.value}
                </div>
                <div className="text-[13px] text-white/60 mt-3.5 leading-snug xl:whitespace-nowrap">{m.label}</div>
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
          <span className="inline-flex items-center rounded-full px-3 pt-[5px] pb-[7px] text-xs font-semibold text-brand border border-[#ff5331]/30 bg-[#ff5331]/[0.07]">
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

/* ── ИБ-кейс Фора-Банка — в той же форме, что флагман WB:
   тёмная полоса с орбитами (декор уменьшен под меньшую высоту карточки),
   eyebrow-строка, крупный заголовок со штрихом, Запрос/Результат на линиях
   со светящимися точками; справа вместо метрик — логотип и защищённый контур. */
function SecurityBand({ c }: { c: CaseItem }) {
  return (
    <div id={c.id} className="relative mt-8 rounded-[1.5rem] overflow-hidden bg-[#0b0a09] border border-white/[0.07] scroll-mt-28">
      <div className={BAND_GLOW} />
      <OrbitDecor scale={0.91} />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 p-8 md:p-12 lg:p-14">
        {/* ── Левая колонка ── */}
        <div className="lg:col-span-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="text-[11px] md:text-xs font-bold uppercase tracking-[0.18em] text-brand">
              {c.format}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] md:text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
              <ShieldTick className="w-4 h-4 -mt-px" /> Защищённый контур
            </span>
          </div>

          <h3 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white mt-8 lg:mt-10">{c.client}</h3>
          <div className="mt-6 h-[2px] w-10 bg-[#ff5331]" />
          <p className="mt-6 text-lg md:text-xl text-white/75 leading-relaxed max-w-md">{c.meta}</p>

          <div className="mt-10 relative pl-7 border-l border-white/[0.13]">
            <span className="absolute -left-[4px] top-[2px] w-[7px] h-[7px] rounded-full bg-[#ffb38f] shadow-[0_0_14px_4px_rgba(255,110,60,0.65)]" />
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/90 mb-3">Запрос</p>
            <p className="text-[15px] text-white/70 leading-relaxed max-w-xl">{c.request}</p>
          </div>

          <div className="mt-9 relative pl-7 border-l border-white/[0.13]">
            <span className="absolute -left-[4px] top-[2px] w-[7px] h-[7px] rounded-full bg-[#ffb38f] shadow-[0_0_14px_4px_rgba(255,110,60,0.65)]" />
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/90 mb-4">Результат</p>
            <ul className="space-y-3">
              {c.result.map((r) => (
                <li key={r} className="flex items-start gap-3 text-[15px] text-white/80 leading-relaxed max-w-xl">
                  <TickCircle className="w-[19px] h-[19px] text-brand shrink-0 mt-0.5" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Правая колонка: логотип + контур (вместо метрик) ── */}
        <div className="lg:col-span-6 flex items-center justify-center lg:pl-8 xl:pl-12">
          <div className="w-full max-w-sm flex flex-col items-center text-center">
            {c.logo && <img src={c.logo} alt={c.client} className="h-10 md:h-12 xl:h-14 w-auto opacity-95" />}
            <div className="mt-8 h-px w-full bg-white/[0.09]" />
            <p className="mt-8 text-[15px] text-white/70 leading-relaxed">{c.teaser}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {["ПДн", "Банковская тайна", "Нормативка ЦБ"].map((t) => (
                <span key={t} className="inline-flex items-center rounded-full px-3 pt-[5px] pb-[7px] text-xs font-semibold text-white/70 border border-white/10 bg-white/[0.04]">
                  {t}
                </span>
              ))}
            </div>
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

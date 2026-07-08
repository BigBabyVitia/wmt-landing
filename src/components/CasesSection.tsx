import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, ShieldTick } from "@/components/ui/icons"
import { LogoCloud } from "@/components/ui/logo-cloud"
import { clients } from "@/data/clients"
import { trainingCases, caseStats, type CaseItem } from "@/data/cases"
import { PdfModal } from "@/components/CaseModal"

/**
 * Блок кейсов на главной — ДВЕ КОНЦЕПЦИИ с дев-переключателем (для выбора с маркетологами):
 *  A «Лента» — «Нам доверяют лидеры рынка» + карточки цифр + маркиза + лента кейсов
 *    (карточки в стиле живого wmt-ai.ru: фото на всю карточку, текст поверх скрима);
 *  B «Тизер» — компактный блок: заголовок/описание/цифры + флагман WB с метриками +
 *    честный фото-стрип → всё ведёт на отдельную страницу /cases.
 * После выбора концепции — удалить переключатель и проигравшую ветку.
 */
export function CasesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [pdfOpen, setPdfOpen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = pdfOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [pdfOpen])

  return (
    <>
      <section
        ref={ref}
        id="cases"
        className="py-16 md:py-24 bg-white dark:bg-[hsl(220,20%,7%)] border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-300 overflow-hidden"
      >
        {/* Вариант B «Тизер» временно скрыт — оставлен только A «Лента».
            Дормантная ветка живёт ниже в `VariantTeaser` (export, чтобы TS не считал
            её мёртвым кодом) — вернуть = снова отрисовать переключатель концепций. */}
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <VariantFull onOpenPdf={() => setPdfOpen(true)} />
        </div>
      </section>

      {pdfOpen && <PdfModal onClose={() => setPdfOpen(false)} />}
    </>
  )
}

/* ════════════════════════════════════════════════════════════════════
   ВАРИАНТ A — полный блок: доверие + лента кейсов
   ════════════════════════════════════════════════════════════════════ */
function VariantFull({ onOpenPdf }: { onOpenPdf: () => void }) {
  const railRef = useRef<HTMLDivElement>(null)
  const scrollRail = (dir: 1 | -1) => {
    railRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" })
  }
  const scrollToReviews = () =>
    document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth", block: "start" })

  return (
    <>
      {/* ── Заголовок блока ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white text-center text-balance">
          Нам доверяют лидеры рынка
        </h2>

        {/* Карточки с цифрами */}
        <div className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 max-w-4xl mx-auto">
          {caseStats.map(({ value, label }) => (
            <div
              key={label}
              className="rounded-[1.25rem] border border-gray-200/70 dark:border-white/[0.06] bg-gray-50 dark:bg-white/[0.03] p-6 transition-colors hover:border-[#ff5331]/35"
            >
              <div className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1.5">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Бегущая строка логотипов ── */}
      <div className="mx-auto max-w-6xl px-4 mt-10 md:mt-12">
        <div className="my-5 h-px bg-gray-200 dark:bg-white/10 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
        <LogoCloud logos={clients} />
        <div className="mt-5 h-px bg-gray-200 dark:bg-white/10 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
      </div>

      {/* ── Подзаголовок кейсов + стрелки ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mt-16 md:mt-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 md:mb-10">
          <div>
            <h3 className="text-2xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white text-balance">
              Как обучение от WMT&nbsp;AI выглядит{" "}
              <span className="bg-gradient-to-r from-gray-400 via-gray-900 to-gray-400 dark:from-white/40 dark:via-white dark:to-white/40 bg-clip-text text-transparent inline-block animate-text-glow">
                вживую
              </span>
            </h3>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed">
              С каким запросом приходили команды — и&nbsp;что у&nbsp;них осталось после обучения. То, что не&nbsp;под&nbsp;NDA.
            </p>
            <Link to="/cases" className="md:hidden inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-brand hover:text-[#e64627] transition-colors">
              Смотреть все кейсы <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3 shrink-0">
            <Link to="/cases" className="text-sm font-semibold text-gray-500 dark:text-white/60 hover:text-brand transition-colors mr-2">
              Все кейсы →
            </Link>
            <button
              onClick={() => scrollRail(-1)}
              aria-label="Назад"
              className="w-11 h-11 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-white/60 hover:border-[#ff5331]/50 hover:text-brand transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
            <button
              onClick={() => scrollRail(1)}
              aria-label="Вперёд"
              className="w-11 h-11 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-white/60 hover:border-[#ff5331]/50 hover:text-brand transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Лента кейсов ── */}
      <div
        ref={railRef}
        className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory pb-4 px-4 sm:px-6 md:px-12 xl:px-[max(3rem,calc((100vw-80rem)/2+3rem))] [scroll-padding-left:1rem] sm:[scroll-padding-left:1.5rem] md:[scroll-padding-left:3rem] xl:[scroll-padding-left:max(3rem,calc((100vw-80rem)/2+3rem))] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {trainingCases.map((c) => (
          c.featured
            ? <FlagshipCard key={c.id} c={c} />
            : <PhotoCard key={c.id} c={c} />
        ))}
        <PdfCard onOpen={onOpenPdf} />
      </div>

      {/* ── CTA: на страницу всех кейсов + отзывы ──
          Кейсбук намеренно НЕ здесь: он остаётся точечным (последняя плитка слайдера +
          блок внизу /cases) — на главной приоритет «рассмотреть сами кейсы». */}
      <div className="mt-10 md:mt-12 px-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/cases"
          className="inline-flex items-center justify-center gap-2 bg-brand text-white hover:bg-[#e64627] shadow-lg shadow-[#ff5331]/20 transition-all rounded-full px-8 pt-[14px] pb-[16px] font-medium hover:-translate-y-0.5"
        >
          Смотреть все кейсы <ArrowRight className="w-4 h-4 ml-1 mt-0.5" />
        </Link>
        <button
          onClick={scrollToReviews}
          className="inline-flex items-center justify-center rounded-full border border-gray-300 dark:border-white/20 text-gray-700 dark:text-white/80 hover:border-[#ff5331]/50 hover:text-brand dark:hover:text-brand transition-all px-8 pt-[13px] pb-[15px] font-medium"
        >
          Читать отзывы клиентов
        </button>
      </div>
    </>
  )
}

/* ── Карточка кейса: фото на всю карточку, текст поверх скрима (стиль живого сайта) ── */
function PhotoCard({ c }: { c: CaseItem }) {
  return (
    <Link
      to={`/cases#${c.id}`}
      className="group relative block snap-start shrink-0 w-[280px] md:w-[320px] h-[400px] md:h-[420px] rounded-[1.5rem] overflow-hidden text-left bg-[hsl(220,20%,10%)] border border-black/5 dark:border-white/10 hover:border-[#ff5331]/45 transition-all duration-500 hover:shadow-xl hover:shadow-[#ff5331]/10"
    >
      {c.photo ? (
        <img
          src={c.photo}
          alt={c.client}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.97] group-hover:scale-[1.04] transition-transform duration-1000"
          style={c.photoPos ? { objectPosition: c.photoPos } : undefined}
        />
      ) : (
        /* Фото нет (ждём из Drive) — брендовая подложка «защищённый контур» */
        <div className="absolute inset-0 bg-[hsl(220,20%,10%)]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_75%_15%,rgba(255,83,49,0.35),transparent_60%),radial-gradient(ellipse_70%_50%_at_15%_95%,rgba(255,83,49,0.15),transparent_60%)]" />
          <div className="absolute inset-0 opacity-40 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
          {c.security && <ShieldTick className="absolute top-16 right-5 w-20 h-20 text-white/10 group-hover:text-white/[0.15] transition-colors duration-500" />}
        </div>
      )}

      {/* Скримы: вуаль + нижний под контент + верхний под тег + ховер-подстраховка */}
      <div className="absolute inset-0 bg-black/15" />
      <div className={`absolute inset-x-0 bottom-0 h-[68%] bg-gradient-to-t ${c.photo ? "from-black/90" : "from-black/60"} from-0% via-black/45 via-40% to-transparent`} />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/45 to-transparent" />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

      <span className="absolute top-4 left-4 max-w-[calc(100%-2rem)] truncate inline-flex items-center rounded-full px-3 pt-[4px] pb-[6px] text-[10px] font-bold uppercase tracking-[0.14em] text-white/95 bg-black/35 backdrop-blur-md border border-white/15">
        {c.format}
      </span>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <h4 className="text-xl md:text-[22px] font-bold text-white leading-snug line-clamp-2 [text-shadow:0_1px_16px_rgba(0,0,0,0.5)]">{c.client}</h4>
        <p className="mt-1.5 text-[13px] text-white/75 leading-relaxed line-clamp-2">{c.teaser}</p>
        <span className="mt-3.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-white/85 group-hover:text-white transition-colors">
          <span className="underline underline-offset-4 decoration-white/40 group-hover:decoration-white transition-colors">Подробнее</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}

/* ── Флагман Wildberries: «героем» служит цифра, а не фото ── */
function FlagshipCard({ c }: { c: CaseItem }) {
  return (
    <Link
      to={`/cases#${c.id}`}
      className="group relative block snap-start shrink-0 w-[300px] md:w-[360px] h-[400px] md:h-[420px] rounded-[1.5rem] overflow-hidden text-left bg-[hsl(220,20%,8%)] border border-[#ff5331]/40 hover:border-[#ff5331]/70 transition-all duration-500 hover:shadow-xl hover:shadow-[#ff5331]/15"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_0%,rgba(255,83,49,0.28),transparent_60%),radial-gradient(ellipse_60%_45%_at_10%_100%,rgba(255,83,49,0.12),transparent_60%)]" />
      <div className="relative h-full flex flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="inline-flex items-center rounded-full px-3 pt-[4px] pb-[6px] text-[10px] font-bold uppercase tracking-[0.14em] text-brand border border-[#ff5331]/40 bg-[#ff5331]/10">
            {c.format}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 pt-1.5">Флагман</span>
        </div>
        <h4 className="text-[26px] font-bold text-white mt-4 leading-tight">{c.client}</h4>
        <p className="mt-1.5 text-[13px] text-white/60 leading-relaxed line-clamp-2">{c.teaser}</p>
        <div className="mt-auto">
          <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">{c.metrics![0].label}</div>
          <div className="mt-2 text-[44px] md:text-[52px] font-bold text-brand leading-none tracking-tight">{c.metrics![0].value}</div>
          <div className="mt-2 text-xs text-white/55">за 6 месяцев · 3 420 сотрудников</div>
        </div>
        <span className="mt-5 inline-flex items-center gap-1.5 self-start text-[13px] font-semibold text-white/85 group-hover:text-white transition-colors">
          <span className="underline underline-offset-4 decoration-white/40 group-hover:decoration-white transition-colors">Подробнее</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}

/* ── Финальная карточка: кейсбук в PDF (веер мини-фото как превью) ── */
function PdfCard({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="group relative snap-start shrink-0 w-[280px] md:w-[320px] h-[400px] md:h-[420px] rounded-[1.5rem] overflow-hidden text-left bg-[hsl(220,20%,10%)] border border-black/5 dark:border-white/10 hover:border-[#ff5331]/50 transition-all duration-500 hover:shadow-xl hover:shadow-[#ff5331]/10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_110%,rgba(255,83,49,0.2),transparent_65%)]" />
      <div className="relative h-full flex flex-col p-6">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Все кейсы · один документ</span>
        <h4 className="text-2xl font-bold text-white leading-tight mt-4">Полный кейсбук — в&nbsp;PDF</h4>
        <p className="mt-2 text-[13px] text-white/60 leading-relaxed">
          Запросы, результаты и фото всех программ — удобно показать коллегам и совету директоров.
        </p>
        <div className="mt-6 flex items-center">
          <div className="flex -space-x-3">
            {["/cases/personal-ai-2.jpg", "/cases/cba.jpg", "/cases/r1.jpg"].map((src) => (
              <img
                key={src}
                src={src}
                alt=""
                loading="lazy"
                className="w-12 h-12 rounded-xl object-cover border-2 border-[hsl(220,20%,10%)] group-hover:first:-rotate-3 group-hover:last:rotate-3 transition-transform duration-500"
              />
            ))}
          </div>
          <span className="ml-3 text-[11px] text-white/45 leading-snug">9 кейсов<br />метрики и фото</span>
        </div>
        <div className="mt-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand text-white px-4 pt-[5px] pb-[10px] text-[13px] font-semibold shadow-lg shadow-[#ff5331]/25 transition-all group-hover:bg-[#e64627] group-hover:-translate-y-0.5">
            Получить кейсбук <ArrowRight className="w-3.5 h-3.5" />
          </span>
          <p className="text-[11px] text-white/35 mt-3.5">Пришлём на почту или в Telegram</p>
        </div>
      </div>
    </button>
  )
}

/* ════════════════════════════════════════════════════════════════════
   ВАРИАНТ B — компактный тизер: цифры + флагман + фото-стрип → /cases
   ════════════════════════════════════════════════════════════════════ */
const teaserTiles = [
  { photo: "/cases/cba.jpg", photoPos: "center 35%", label: "Стратсессия · ЦБ Армении", anchor: "strategy-sessions" },
  { photo: "/cases/personal-ai-1.jpg", label: "Практикум «Личный ИИ»", anchor: "personal-ai" },
  { photo: "/cases/gronolux.jpg", label: "ИИ-агенты · Гранолюкс", anchor: "gronolux" },
]

export function VariantTeaser({ onOpenPdf }: { onOpenPdf: () => void }) {
  const wb = trainingCases.find((c) => c.id === "wildberries")!

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

        {/* ── ЛЕВАЯ колонка: текст + цифры + CTA ── */}
        <div className="lg:col-span-5">
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-semibold tracking-tight text-gray-900 dark:text-white text-balance leading-[1.1]">
            С каким запросом приходят — и{" "}
            <span className="bg-gradient-to-r from-gray-400 via-gray-900 to-gray-400 dark:from-white/40 dark:via-white dark:to-white/40 bg-clip-text text-transparent inline-block animate-text-glow">
              что получают
            </span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            35+ программ за год — от стратсессий с управляющими командами до трансформации на 3&nbsp;420 человек. В&nbsp;каждом кейсе: запрос, формат, результат.
          </p>

          {/* Ряд цифр */}
          <div className="mt-8 flex divide-x divide-gray-200 dark:divide-white/10">
            {caseStats.map(({ value, label }) => (
              <div key={label} className="px-5 first:pl-0">
                <div className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{value}</div>
                <div className="text-[12px] text-gray-500 dark:text-gray-400 mt-1 leading-snug">{label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-4">
            <Link
              to="/cases"
              className="inline-flex items-center justify-center gap-2 bg-brand text-white hover:bg-[#e64627] shadow-lg shadow-[#ff5331]/20 transition-all rounded-full px-7 pt-[13px] pb-[15px] text-sm font-bold hover:-translate-y-0.5"
            >
              Смотреть все кейсы <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={onOpenPdf}
              className="text-sm font-semibold text-gray-500 dark:text-white/60 hover:text-brand transition-colors text-left"
            >
              Кейсбук в PDF — пришлём на почту
            </button>
          </div>

          <p className="mt-6 text-[12px] text-gray-400 dark:text-gray-500 leading-relaxed">
            Ещё несколько треков прошли под NDA. Результаты зависят от специфики бизнеса и процессов.
          </p>
        </div>

        {/* ── ПРАВАЯ колонка: флагман WB + фото-стрип ── */}
        <div className="lg:col-span-7">
          {/* Featured Wildberries */}
          <Link
            to="/cases#wildberries"
            className="group relative block rounded-[1.5rem] overflow-hidden bg-[hsl(220,20%,8%)] border border-[#ff5331]/40 hover:border-[#ff5331]/70 transition-all duration-500 hover:shadow-xl hover:shadow-[#ff5331]/15"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_0%,rgba(255,83,49,0.28),transparent_60%),radial-gradient(ellipse_60%_45%_at_10%_100%,rgba(255,83,49,0.12),transparent_60%)]" />
            <div className="relative p-7 md:p-8">
              <div className="flex items-start justify-between gap-3">
                <span className="inline-flex items-center rounded-full px-3 pt-[4px] pb-[6px] text-[10px] font-bold uppercase tracking-[0.14em] text-brand border border-[#ff5331]/40 bg-[#ff5331]/10">
                  {wb.format}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 pt-1.5">Флагманский кейс</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mt-4">{wb.client}</h3>
              <p className="mt-2 text-sm text-white/60 leading-relaxed max-w-md">
                3&nbsp;420 сотрудников: от эпизодических нейросетей — к&nbsp;ИИ в&nbsp;ежедневной работе всей компании.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-5">
                {wb.metrics!.map((m) => (
                  <div key={m.label}>
                    <div className="text-2xl md:text-[28px] font-bold text-brand leading-none tracking-tight">{m.value}</div>
                    <div className="text-[11px] md:text-xs text-white/50 mt-1.5 leading-snug">{m.label}</div>
                  </div>
                ))}
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-white/90 group-hover:text-brand transition-colors">
                Читать кейс полностью <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>

          {/* Фото-стрип: живые кадры других программ (честные подписи) */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {teaserTiles.map((t) => (
              <Link
                key={t.anchor}
                to={`/cases#${t.anchor}`}
                className="group relative block aspect-[16/10] rounded-xl overflow-hidden border border-black/5 dark:border-white/10 hover:border-[#ff5331]/45 transition-colors"
              >
                <img
                  src={t.photo}
                  alt={t.label}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700"
                  style={t.photoPos ? { objectPosition: t.photoPos } : undefined}
                />
                <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <span className="absolute bottom-2 left-2.5 right-2 text-[11px] font-semibold text-white leading-snug [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
                  {t.label}
                </span>
              </Link>
            ))}
            <Link
              to="/cases"
              className="group relative flex flex-col items-start justify-end aspect-[16/10] rounded-xl overflow-hidden border border-gray-200/70 dark:border-white/10 bg-gray-50 dark:bg-white/[0.04] hover:border-[#ff5331]/45 transition-colors p-2.5"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_80%_20%,rgba(255,83,49,0.14),transparent_60%)]" />
              <span className="relative text-lg font-bold text-gray-900 dark:text-white leading-none">
                +5 кейсов <ArrowRight className="inline w-4 h-4 text-brand -mt-0.5 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="relative text-[11px] text-gray-500 dark:text-white/50 mt-1 leading-snug">банки, девелопмент, госсектор</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

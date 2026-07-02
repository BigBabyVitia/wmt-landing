import { useEffect, useRef, useState } from "react"
import { ArrowRight, CloseCircle as X, TickCircle as CheckCircle2, TickCircle, Cpu, Microphone, People, Buildings, ShieldTick } from "@/components/ui/icons"
import { Link } from "react-router-dom"
import { LogoCloud } from "@/components/ui/logo-cloud"
import { clients } from "@/data/clients"
import { V2Card } from "@/components/ui/V2Card"

export function TrustStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [isCertModalOpen, setIsCertModalOpen] = useState(false)
  // Variant toggle archived — currently using "banner" only.
  // To restore: uncomment the toggle and the useState below, then remove false && guards from archived variants.
  // const [iichnicaVariant, setIichnicaVariant] = useState<"text" | "bg" | "banner">("banner")

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <section ref={ref} id="trust" className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-white dark:bg-[hsl(220,20%,7%)] border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {/* Eyebrow */}
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand mb-4 text-center md:text-left">
              Почему WMT
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 dark:text-white mb-14 text-center md:text-left text-balance">
              Почему нам доверяют{" "}
              <span className="bg-gradient-to-r from-gray-400 via-gray-900 to-gray-400 dark:from-white/40 dark:via-white dark:to-white/40 bg-clip-text text-transparent inline-block animate-text-glow">
                трансформацию
              </span>
            </h2>

            {/* ── Content-weighted bento: wide glowing products hero · 500+ teaser · divide-y fact panel ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-fr gap-5 md:gap-8 mb-16">

              {/* FEATURED — Own AI products: wide glowing V2Card (spans both rows on lg) */}
              <V2Card
                visible={visible}
                index={0}
                delayBase={150}
                delayMult={120}
                className="sm:col-span-2 lg:col-span-7 lg:row-span-2"
                contentClassName="justify-between gap-8"
              >
                <div>
                  <div className="mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
                      Глубоко в архитектуре ИИ
                    </span>
                  </div>
                  <h3 className="text-xl md:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white mb-3 leading-[1.15] text-balance max-w-md">
                    Свои ИИ-продукты в проде
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg">
                    Не пересказываем чужое — строим. Эти продукты работают в&nbsp;реальных компаниях.
                  </p>
                </div>

                <div>
                  {/* Product-name chips with tiny icons + role notes — the anchor */}
                  <div className="flex flex-wrap gap-2.5">
                    {[
                      { Icon: People, label: "Релевантер", note: "найм" },
                      { Icon: Buildings, label: "Нейроключ", note: "для корпораций" },
                      { Icon: ShieldTick, label: "НейроМаск", note: "152-ФЗ" },
                      { Icon: Microphone, label: "Ясно.ИИ", note: "встречи" },
                      { Icon: Cpu, label: "своя LLM", note: null },
                    ].map(({ Icon, label, note }) => (
                      <span
                        key={label}
                        className="inline-flex items-center gap-2 rounded-full pl-2.5 pr-3.5 py-2 text-sm font-medium text-gray-800 dark:text-white/85 bg-gray-100/80 dark:bg-white/[0.05] border border-gray-200/70 dark:border-white/[0.08] backdrop-blur-sm transition-colors hover:border-[#ff5331]/40 hover:bg-[#ff5331]/[0.06]"
                      >
                        <span className="w-6 h-6 rounded-md flex items-center justify-center text-gray-500 dark:text-white/55 bg-gray-100 dark:bg-white/[0.06] shrink-0">
                          <Icon className="w-3.5 h-3.5" />
                        </span>
                        {label}
                        {note && (
                          <span className="text-[11px] font-normal text-gray-400 dark:text-white/40">· {note}</span>
                        )}
                      </span>
                    ))}
                  </div>
                  {/* Gradient hairline accent */}
                  <div className="mt-5 flex items-center gap-2 text-xs font-medium text-gray-400 dark:text-white/40">
                    <span className="h-px w-8 bg-gradient-to-r from-[#ff5331]/60 to-transparent" />
                    собственная LLM и другие разработки
                  </div>
                </div>
              </V2Card>

              {/* Two compact proofs inside ONE hairline-divided panel — spans both rows to fill the right column */}
              <div
                className={`sm:col-span-2 lg:col-span-5 lg:row-span-2 group relative overflow-hidden rounded-[1.25rem] md:rounded-[1.5rem] border border-gray-200/70 dark:border-white/[0.06] bg-gray-50 dark:bg-white/[0.03] divide-y divide-gray-200/70 dark:divide-white/[0.06] flex flex-col transition-all duration-700 hover:border-[#ff5331]/35 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: visible ? "270ms" : "0ms" }}
              >
                {/* Practitioners — «делаем сами» stamp */}
                <div className="relative p-7 sm:p-8 flex-1 flex flex-col justify-center">
                  <div className="relative z-10 min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white leading-snug text-balance mb-1.5">
                      Практики, а не «продавцы курсов»
                    </h3>
                    <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                      Ведём ИИ-консалтинг и внедряем решения в&nbsp;средних и крупных компаниях.
                    </p>
                    <span className="inline-flex items-center gap-1.5 rounded-full px-3 pt-[4px] pb-[9px] text-xs font-semibold text-brand border border-[#ff5331]/30 bg-[#ff5331]/[0.07]">
                      <TickCircle className="w-3.5 h-3.5" />
                      Учим тому, что делаем сами
                    </span>
                  </div>
                </div>

                {/* Mission — WMT Kids + бесплатно */}
                <div className="relative p-7 sm:p-8 flex-1 flex flex-col justify-center">
                  <div className="relative z-10 min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white leading-snug text-balance mb-1.5">
                      Миссия, а не только коммерция
                    </h3>
                    <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                      Помогаем детям с&nbsp;ранних лет осваивать ИИ и&nbsp;воплощать свои идеи.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-full px-3 pt-[4px] pb-[9px] text-xs font-semibold text-brand border border-[#ff5331]/30 bg-[#ff5331]/[0.07]">
                        WMT Kids
                      </span>
                      <span className="inline-flex items-center rounded-full px-3 pt-[4px] pb-[9px] text-xs font-semibold text-white bg-brand">
                        бесплатно
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-10">
              {/* Founder Card */}
              <div className="lg:col-span-8 bg-gray-50 dark:bg-white/[0.03] rounded-[1.5rem] p-8 md:p-12 border border-gray-100 dark:border-white/[0.06] relative overflow-hidden flex flex-col md:flex-row gap-8 lg:gap-12 items-center md:items-start group transition-all duration-300 hover:border-brand/30">
                <div className="w-48 h-48 md:w-56 md:h-56 shrink-0 rounded-[1.5rem] overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-black/30">
                  <img src="/experts/nikitin-large.webp" alt="Игорь Никитин" className="w-full h-full object-cover object-top filter brightness-105 group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Игорь Никитин</h3>
                  <p className="text-brand font-medium mb-4 text-sm uppercase tracking-wider">Основатель & CEO WMT AI</p>
                  <p className="text-gray-600 dark:text-gray-300 text-[17px] leading-relaxed mb-8 italic">
                    «Моя цель — бизнес, в котором собственник по-настоящему получает удовольствие от управления AI-Native компанией.»
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm text-gray-700 dark:text-gray-300 text-left">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                      <span><b>400+ сотрудников</b> в глобальной команде</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                      <span><b>50+ ИИ-внедрений</b> за 2024–2026 годы</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                      <span><b>~$1M грант</b> от топ-40 университета мира</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                      <span><b>Патент</b> и платформа IIGOR</span>
                    </div>
                    <div className="flex items-start gap-2 sm:col-span-2">
                      <CheckCircle2 className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                      <span>Эксклюзивное право на <b>обучение 100+ специалистов</b> напрямую у создателей нейросети Claude.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Academic Recognition Card */}
              <div className="lg:col-span-4 bg-white dark:bg-white/[0.03] rounded-[1.5rem] p-8 md:p-10 border border-gray-100 dark:border-white/[0.06] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none flex flex-col group relative transition-all duration-300 hover:border-brand/30">
                <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-6 text-center lg:text-left">Академическое признание</span>
                <div className="flex-1 flex flex-col justify-center items-center text-center">
                  <div className="relative group/cert cursor-pointer" onClick={() => setIsCertModalOpen(true)}>
                    <img src="/brand/academic-recognition.png" alt="Global Academic Standards" className="w-full max-w-[280px] mb-6 transition-all duration-300 group-hover/cert:-translate-y-1" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/cert:opacity-100 transition-opacity duration-300">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-medium px-4 py-2 rounded-full shadow-lg absolute -bottom-2 -translate-y-[20px]">Увеличить</span>
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight">Global Academic Standards</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                    Наш фреймворк официально получил академическое признание и статус Executive программы.
                  </p>
                  <div className="mt-auto flex flex-wrap justify-center items-center gap-2 text-xs font-semibold">
                    <span className="bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-400 px-3 pt-[4px] pb-[9px] rounded-full">Ученая валидация</span>
                    <span className="bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-400 px-3 pt-[4px] pb-[9px] rounded-full">Март 2026</span>
                  </div>
                </div>
              </div>

              {/* ── Variant toggle (ARCHIVED — uncomment to restore) ──
              <div className="lg:col-span-12 flex justify-center mt-2 -mb-2">
                <div className="inline-flex bg-gray-100 dark:bg-white/[0.06] rounded-full p-1 border border-gray-200 dark:border-white/10 flex-wrap justify-center gap-0.5">
                  {(["text", "bg", "banner"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setIichnicaVariant(v)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 whitespace-nowrap ${
                        iichnicaVariant === v
                          ? "bg-white dark:bg-white/15 text-gray-900 dark:text-white shadow-sm"
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      }`}
                    >
                      {{ text: "Текст", bg: "A: Фон", banner: "B: Баннер" }[v]}
                    </button>
                  ))}
                </div>
              </div>
              */}

              {/* ═══ Iichnica Card ═══ */}
              <div className="lg:col-span-12 relative">

                {/* ══ ARCHIVED: Variant TEXT (original) ══
                   To restore: remove the `false &&` guard and re-enable the toggle above. */}
                {false && (
                <div className="opacity-100 relative"
                >
                  <div className="bg-white dark:bg-white/[0.03] rounded-[1.5rem] p-8 md:p-12 border border-gray-100 dark:border-white/[0.06] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none overflow-hidden relative group transition-all duration-500 hover:border-brand/35">
                    <div className="absolute -top-12 -right-12 w-64 h-64 bg-brand/5 blur-[80px] rounded-full group-hover:bg-brand/10 transition-colors duration-700" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center relative z-10">
                      <div className="lg:col-span-1 text-center md:text-left">
                        <img src="/logos/wmtaichnica.svg" alt="ИИЧНИЦА SHOW" className="h-14 md:h-18 lg:h-20 w-auto mb-6 mx-auto md:mx-0 dark:invert-[0.1] active:scale-95 transition-transform" />
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                          Собственное мероприятие WMT&nbsp;AI для лидеров бизнеса. Проводится дважды в&nbsp;год в&nbsp;Москве.
                        </p>
                      </div>
                      <div className="lg:col-span-1 text-center md:text-left border-y md:border-y-0 md:border-x border-gray-100 dark:border-white/10 py-6 md:py-0 md:px-8">
                        <h4 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 leading-tight tracking-tight">Итоги: от ИИ-игрушек к&nbsp;ИИ-трансформации</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          Живые подкасты, разборы реальных кейсов внедрения, закрытый нетворкинг и&nbsp;инсайты для C-level.
                        </p>
                      </div>
                      <div className="lg:col-span-1 flex flex-col items-center lg:items-end gap-5">
                        <div className="text-center lg:text-right">
                          <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-1 block">Прошедшее событие</span>
                          <span className="text-lg font-bold text-gray-900 dark:text-white">31 марта 2026, Москва</span>
                        </div>
                        <a href="https://ost-iichnica.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-brand text-white hover:bg-[#e64627] shadow-lg shadow-brand/20 rounded-full px-6 pt-[12px] pb-[14px] text-sm font-bold transition-all hover:-translate-y-0.5">
                          Посмотреть как это было <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                )}

                {/* ══ ARCHIVED: Variant A — BACKGROUND photo with overlay ══
                   To restore: remove the `false &&` guard and re-enable the toggle above. */}
                {false && (
                <div className="opacity-100 relative"
                >
                  <div className="rounded-[1.5rem] overflow-hidden relative group transition-all duration-500 hover:shadow-xl hover:shadow-brand/10">
                    {/* Background photo */}
                    <img
                      src="/events/iichnica-1.jpg"
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000"
                    />
                    {/* Dark overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/65 to-black/45" />
                    {/* Content — same 3-column structure as text variant */}
                    <div className="relative z-10 p-8 md:p-12">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
                        <div className="lg:col-span-1 text-center md:text-left">
                          <img src="/logos/wmtaichnica.svg" alt="ИИЧНИЦА SHOW" className="h-14 md:h-18 lg:h-20 w-auto mb-6 mx-auto md:mx-0 dark:invert-[0.1] active:scale-95 transition-transform" />
                          <p className="text-sm text-white/70 leading-relaxed font-medium">
                            Собственное мероприятие WMT&nbsp;AI для лидеров бизнеса. Проводится дважды в&nbsp;год в&nbsp;Москве.
                          </p>
                        </div>
                        <div className="lg:col-span-1 text-center md:text-left border-y md:border-y-0 md:border-x border-white/15 py-6 md:py-0 md:px-8">
                          <h4 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight tracking-tight">Итоги: от ИИ-игрушек к&nbsp;ИИ-трансформации</h4>
                          <p className="text-sm text-white/60 leading-relaxed">
                            Живые подкасты, разборы реальных кейсов внедрения, закрытый нетворкинг и&nbsp;инсайты для C-level.
                          </p>
                        </div>
                        <div className="lg:col-span-1 flex flex-col items-center lg:items-end gap-5">
                          <div className="text-center lg:text-right">
                            <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] mb-1 block">Прошедшее событие</span>
                            <span className="text-lg font-bold text-white">31 марта 2026, Москва</span>
                          </div>
                          <a href="https://ost-iichnica.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-brand text-white hover:bg-[#e64627] shadow-lg shadow-brand/20 rounded-full px-6 pt-[12px] pb-[14px] text-sm font-bold transition-all hover:-translate-y-0.5">
                            Посмотреть как это было <ArrowRight className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                )}

                {/* ── Active Variant: B — Banner ── */}
                <div className="opacity-100 relative"
                >
                  <div className="rounded-[1.5rem] overflow-hidden relative group transition-all duration-500 hover:shadow-xl hover:shadow-brand/10 bg-black">
                    {/* Background photo. On mobile — banner at top. On desktop — full background. */}
                    <div className="relative md:absolute md:inset-0">
                      <img
                        src="/events/iichnica-1.jpg"
                        alt="ИИчница — конференция WMT AI"
                        className="block w-full h-[220px] md:h-full md:absolute md:inset-0 object-cover object-[center_30%] group-hover:scale-[1.03] transition-transform duration-1000"
                      />
                      {/* Gradient overlay — solid black for bottom 35% (mobile flush with content), softer fade on desktop */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black from-15% via-black/30 to-transparent md:from-black md:from-0% md:via-black/60 md:via-50% md:to-black/10" />
                    </div>
                    {/* Content. Mobile: flows below image. Desktop: in-flow so it sets the card height; image fills behind via absolute inset-0. */}
                    <div className="relative z-10 p-6 md:p-12 md:min-h-[400px] md:flex md:items-end">
                      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start md:items-end">
                        <div className="lg:col-span-1 text-center md:text-left">
                          <img src="/logos/wmtaichnica.svg" alt="ИИЧНИЦА SHOW" className="h-14 md:h-18 lg:h-20 w-auto mb-4 mx-auto md:mx-0 dark:invert-[0.1] active:scale-95 transition-transform" />
                          <p className="text-sm text-white/70 leading-relaxed font-medium">
                            Собственное мероприятие WMT&nbsp;AI для лидеров бизнеса. Проводится дважды в&nbsp;год в&nbsp;Москве.
                          </p>
                        </div>
                        <div className="lg:col-span-1 text-center md:text-left border-y md:border-y-0 md:border-x border-white/15 py-6 md:py-0 md:px-8">
                          <h4 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight tracking-tight">Итоги: от ИИ-игрушек к&nbsp;ИИ-трансформации</h4>
                          <p className="text-sm text-white/60 leading-relaxed">
                            Живые подкасты, разборы реальных кейсов внедрения, закрытый нетворкинг и&nbsp;инсайты для C-level.
                          </p>
                        </div>
                        <div className="lg:col-span-1 flex flex-col items-center lg:items-end gap-5">
                          <div className="text-center lg:text-right">
                            <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] mb-1 block">Прошедшее событие</span>
                            <span className="text-lg font-bold text-white">31 марта 2026, Москва</span>
                            <span className="text-sm font-semibold text-brand mt-1 block">500+ участников</span>
                          </div>
                          <a href="https://ost-iichnica.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-brand text-white hover:bg-[#e64627] shadow-lg shadow-brand/20 rounded-full px-6 pt-[12px] pb-[14px] text-sm font-bold transition-all hover:-translate-y-0.5">
                            Посмотреть как это было <ArrowRight className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Clients Marquee */}
          <div className={`mt-24 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: visible ? "300ms" : "0ms" }}>
            <div className="text-center mb-8">
              <h3 className="text-[13px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-500">Нам доверяют лидеры рынка</h3>
            </div>
            <div className="mx-auto max-w-6xl">
              <div className="my-5 h-px bg-gray-200 dark:bg-white/10 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
              <LogoCloud logos={clients} />
              <div className="mt-5 h-px bg-gray-200 dark:bg-white/10 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
            </div>
          </div>

          <div className={`mt-12 flex justify-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: visible ? "500ms" : "0ms" }}>
            <Link
              to="/proof"
              className="inline-flex items-center gap-2 bg-brand text-white hover:bg-[#e64627] shadow-lg shadow-brand/20 transition-all rounded-full px-8 pt-[14px] pb-[16px] font-medium hover:-translate-y-0.5"
            >
              Больше фактов и публикаций в СМИ <ArrowRight className="w-4 h-4 ml-1 mt-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Certificate Modal */}
      {isCertModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black dark:bg-[hsl(220,20%,4%)]/80 backdrop-blur-sm p-4 animate-in fade-in duration-300"
          onClick={() => setIsCertModalOpen(false)}
        >
          <div className="relative max-w-4xl w-full flex justify-center items-center" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setIsCertModalOpen(false)}
              className="absolute -top-12 right-0 md:-right-12 p-2 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src="/brand/academic-recognition.png"
              alt="Global Academic Standards"
              className="max-h-[85vh] w-auto max-w-full"
            />
          </div>
        </div>
      )}
    </>
  )
}

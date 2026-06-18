import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "framer-motion"
import { Clock, Users, Sparkles, FlaskConical, Target, Package, ArrowRight, X } from "lucide-react"
import type { Program, DeepSlot } from "@/data/directions"
import { CardDecor, HighlightDecor } from "@/components/ui/CardDecor"

interface ProgramCardProps {
  program: Program
}

/** Shorten verbose meta values, as on the original site. */
const shorten = (text: string) =>
  text.replace("занятий", "зан.").replace("человек", "чел.").replace("участников", "уч.")

const tagClass =
  "inline-flex items-center gap-2 whitespace-nowrap text-[12px] font-medium rounded-full px-3.5 py-2 bg-gray-100/80 dark:bg-white/[0.06] border border-gray-200/60 dark:border-white/[0.06] text-gray-700 dark:text-white/70"

const deepIcons = [Sparkles, FlaskConical, Target, Package]

/* ── Shared pieces ─────────────────────────────────────────── */

function FormatEyebrow({ program }: { program: Program }) {
  return (
    <span className="block text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-brand mb-2">
      {program.f.replace(" / ", " • ")}
    </span>
  )
}

function MetaBadges({ program }: { program: Program }) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <span className={tagClass}>
        <Clock className="w-3.5 h-3.5 shrink-0" />
        <span className="leading-none -translate-y-px">{shorten(program.t)}</span>
      </span>
      <span className={tagClass}>
        <Users className="w-3.5 h-3.5 shrink-0" />
        <span className="leading-none -translate-y-px">{shorten(program.p)}</span>
      </span>
    </div>
  )
}

/** The detailed program content (что это / теория→практика / главный эффект / что заберёте).
 *  Strict vertical list with a brand accent. «Что заберёте» is intentionally
 *  dropped here — it's covered by the dedicated outcomes block on the page.
 *  `compact` packs it down to fit inside the narrow flip-card back without scrolling. */
function DeepContent({ deep, compact = false }: { deep: DeepSlot[]; compact?: boolean }) {
  const slots = deep.filter((s) => !/заберёте/i.test(s.h))
  return (
    <div className={`flex flex-col ${compact ? "gap-1.5" : "gap-2.5"}`}>
      {slots.map((slot, i) => {
        const Icon = deepIcons[i] ?? Sparkles
        return (
          <div
            key={slot.h}
            className={`relative flex rounded-2xl bg-gray-50/60 dark:bg-white/[0.02] ${compact ? "gap-2.5 p-2.5" : "gap-3.5 p-3.5 sm:p-4"}`}
          >
            <span aria-hidden className="mt-0.5 w-[3px] shrink-0 self-stretch rounded-full bg-[#ff5331]/25" />
            <span
              aria-hidden
              className={`mt-px flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-brand dark:border-white/[0.06] dark:bg-white/[0.04] ${
                compact ? "h-6 w-6" : "h-8 w-8 rounded-xl"
              }`}
            >
              <Icon className={compact ? "h-3 w-3" : "h-4 w-4"} />
            </span>
            <div className="min-w-0 flex-1">
              <span
                className={`font-bold uppercase text-gray-400 dark:text-gray-500 ${compact ? "text-[10px] tracking-[0.12em]" : "text-[11px] tracking-[0.14em]"}`}
              >
                {slot.h}
              </span>
              <p
                className={`text-gray-600 dark:text-gray-300 ${compact ? "mt-0.5 text-[12px] leading-snug" : "mt-1 text-[13px] sm:text-sm leading-relaxed"}`}
              >
                {slot.t}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/** Visible front-face content shared by both modes. */
function CardFront({ program, hint }: { program: Program; hint: React.ReactNode }) {
  return (
    <div className="relative z-10 flex flex-col h-full">
      <FormatEyebrow program={program} />
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{program.n}</h3>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{program.d}</p>
      <div className="mt-5">
        <MetaBadges program={program} />
      </div>
      <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand">
        {hint}
      </span>
    </div>
  )
}

function shellClass(highlighted: boolean) {
  return highlighted
    ? "border-[#ff5331]/30 dark:bg-[#0f0e0d] bg-white hover:shadow-lg hover:shadow-[#ff5331]/10"
    : "bg-white dark:bg-white/[0.02] border-gray-200 dark:border-white/[0.06] hover:border-[#ff5331]/30 hover:shadow-md"
}

/* ── Mode 1: modal ─────────────────────────────────────────── */

function ProgramCardModal({ program, highlighted }: { program: Program; highlighted: boolean }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group relative overflow-hidden rounded-[1.75rem] border h-full w-full text-left p-6 sm:p-7 transition-all duration-300 ${shellClass(highlighted)}`}
      >
        {highlighted ? <HighlightDecor /> : <CardDecor />}
        <CardFront
          program={program}
          hint={<>Подробнее о программе <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" /></>}
        />
      </button>

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />

              <motion.div
                className="relative z-10 flex w-full flex-col sm:max-w-2xl max-h-[90vh] sm:max-h-[85vh] overflow-hidden rounded-t-[1.75rem] sm:rounded-[1.75rem] border border-gray-200 dark:border-white/10 bg-white dark:bg-[hsl(220,18%,8%)] shadow-2xl"
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.98 }}
                transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
              >
                {/* Header — pinned */}
                <div className="relative shrink-0 px-6 sm:px-8 pt-6 sm:pt-7 pb-5">
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-32"
                    style={{ background: "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(255,83,49,0.12) 0%, transparent 70%)" }}
                  />
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-gray-100 dark:bg-white/[0.06] text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors"
                    aria-label="Закрыть"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="relative">
                    <FormatEyebrow program={program} />
                    <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white tracking-tight pr-10">
                      {program.n}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed pr-6">{program.d}</p>
                    <div className="mt-4">
                      <MetaBadges program={program} />
                    </div>
                  </div>
                </div>

                {/* Body — scrolls only if needed */}
                <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-5">
                  <DeepContent deep={program.deep} />
                </div>

                {/* Footer — pinned, CTA always visible */}
                <div className="shrink-0 px-6 sm:px-8 py-4 bg-white dark:bg-[hsl(220,18%,8%)]">
                  <a
                    href="#contact"
                    onClick={() => setOpen(false)}
                    className="w-full bg-brand text-white rounded-full px-8 py-3.5 font-medium text-base hover:bg-[#e64627] transition-colors inline-flex items-center justify-center gap-2"
                  >
                    Обсудить эту программу <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}

/* ── Entry ─────────────────────────────────────────────────── */

/**
 * "Что входит" program card. Detail content opens in a modal.
 * Individual ("1 человек") formats get the highlighted black + side-glow treatment.
 */
export function ProgramCard({ program }: ProgramCardProps) {
  const highlighted = /1 человек|индивидуальн/i.test(program.p)
  return <ProgramCardModal program={program} highlighted={highlighted} />
}

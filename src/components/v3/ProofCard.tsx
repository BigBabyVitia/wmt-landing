import { Link } from "react-router-dom"
import { ArrowUpRight, Quote } from "lucide-react"
import { CardDecor } from "@/components/ui/CardDecor"

/**
 * Per-direction proof card — editorial pull-quote in the live-site design family.
 * `quote` = the headline claim, `sub` = the supporting line. No content-type
 * branching, no metric parsing — robust across client names, founder quotes,
 * positioning statements and tech-stack lines.
 */

/**
 * Split `sub` on " · " and emphasize the lead segment (founder name / client /
 * metric), keep the rest muted — so attribution reads with hierarchy for free.
 *   "Игорь Никитин · 400+ обучено…" → bold "Игорь Никитин", muted tail.
 *   "Стек: n8n · Claude · RAG. …"   → bold "Стек: n8n", muted tail (chain intact).
 *   no " · "                         → whole line reads as the bolded lead.
 */
function renderSub(sub: string) {
  const [lead, ...rest] = sub.split(" · ")
  return (
    <>
      <span className="font-semibold text-gray-900 dark:text-white">{lead}</span>
      {rest.length > 0 && (
        <span className="text-gray-500 dark:text-gray-400"> · {rest.join(" · ")}</span>
      )}
    </>
  )
}

export function ProofCard({ quote, sub }: { quote: string; sub: string }) {
  return (
    <div
      className="group relative flex h-full flex-col overflow-hidden rounded-[2rem]
                 border border-gray-200 dark:border-white/[0.06]
                 bg-white dark:bg-white/[0.03]
                 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none
                 p-7 sm:p-9 md:p-11
                 transition-all duration-300
                 transform-gpu will-change-transform
                 hover:-translate-y-1 hover:border-[#ff5331]/30
                 hover:shadow-lg hover:shadow-[#ff5331]/10"
    >
      <CardDecor />

      <div className="relative z-10 flex h-full flex-col">
        {/* eyebrow — titles the card in the page voice */}
        <div className="mb-5 flex items-center gap-2 text-brand">
          <Quote className="h-4 w-4" strokeWidth={1.8} />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
            Точечный результат
          </span>
        </div>

        {/* pull-quote — the band's hero type. mt clearance keeps it off the glyph. */}
        <p className="mt-1 text-balance text-2xl font-medium leading-snug tracking-tight
                      text-gray-900 dark:text-white md:text-3xl">
          {quote}
        </p>

        {/* gradient hairline + attribution + quiet link, pinned to the bottom */}
        <div className="mt-auto pt-7">
          <div className="mb-5 h-px w-full bg-gradient-to-r
                          from-[#ff5331]/30 via-gray-200/60 to-transparent dark:via-white/10" />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <p className="flex items-start gap-2.5 text-sm leading-relaxed md:text-[15px]">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              <span>{renderSub(sub)}</span>
            </p>
            <Link
              to="/proof"
              className="group/link inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold
                         text-brand transition-colors hover:text-[#e64627]"
            >
              Пакет доказательств
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300
                           group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                strokeWidth={2}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

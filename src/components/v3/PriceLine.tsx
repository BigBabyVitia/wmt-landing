import { Wallet, Clock } from "lucide-react"

/**
 * Per-direction budget orientation — one confident figure on a warm, self-sufficient
 * surface (warm tint + brand border + corner glows) so the card reads on ANY section
 * background, not only on a lighter container.
 * The ENTIRE `price` string is the figure: no numeral parsing, no currency glyph.
 * Works for numeric AND qualitative prices.
 */
export function PriceLine({ price }: { price: string }) {
  // Qualitative (no digit) → step the figure down one notch so a long phrase
  // ("индивидуально под состав и задачи") reads as a deliberate statement,
  // not an oversized fragment. One boolean, no parsing.
  const isQualitative = !/\d/.test(price)

  return (
    <div
      className="group relative flex h-full flex-col overflow-hidden rounded-[2rem]
                 border border-[#ff5331]/30
                 bg-[#fff3ee] dark:bg-[#1b120e]
                 p-7 sm:p-9 md:p-10
                 transition-all duration-300
                 transform-gpu will-change-transform
                 hover:-translate-y-1 hover:border-[#ff5331]/50 hover:shadow-lg hover:shadow-[#ff5331]/10"
    >
      {/* Warm corner glows — premium highlighted feel, readable on white or black sections. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-90 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 100% 0%, rgba(255,83,49,0.16) 0%, transparent 55%), radial-gradient(circle at 0% 100%, rgba(255,83,49,0.08) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 flex h-full flex-col">
        {/* eyebrow — rhymes with ProofCard's eyebrow */}
        <div className="mb-6 flex items-center gap-2 text-brand">
          <Wallet className="h-4 w-4" strokeWidth={1.8} />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
            Ориентир по бюджету
          </span>
        </div>

        {/* The figure — whole string, balanced; step down only for the qualitative case. */}
        <p
          className={`text-balance font-semibold tracking-tight text-gray-900 dark:text-white ${
            isQualitative
              ? "text-2xl leading-tight md:text-[28px]"
              : "text-3xl leading-[1.1] md:text-4xl"
          }`}
        >
          {price}
        </p>

        {/* gradient hairline + reassurance microline, pinned to the bottom */}
        <div className="mt-auto pt-7">
          <div className="mb-4 h-px w-full bg-gradient-to-r from-[#ff5331]/40 to-transparent" />
          <p className="flex items-start gap-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#ff5331]" strokeWidth={1.8} />
            <span>
              Точную смету и формат дадим{" "}
              <span className="font-semibold text-gray-800 dark:text-white/80">за 24 часа</span>{" "}
              после брифа.
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

import { useState } from "react"
import { ArrowDown as ChevronDown } from "@/components/ui/icons"
import { testimonials } from "@/data/testimonials"

export function Testimonials() {
  const [expanded, setExpanded] = useState(false)

  return (
    <section
      id="testimonials"
      className="scroll-mt-20 py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-gray-50 dark:bg-[hsl(220,18%,5%)] border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
            Что говорят руководители после обучения
          </h2>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-3xl leading-relaxed">
            Собственники и топ-менеджеры компаний — о том, что изменилось в их работе после интенсивов.
          </p>
        </div>

        {/* Collapsible shell: clamps height + fades out until expanded */}
        <div className={`relative ${expanded ? "" : "max-h-[760px] md:max-h-[820px] overflow-hidden"}`}>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-5 md:gap-6 [column-fill:_balance]">
            {testimonials.map((t, i) => (
              <div
                key={t.name + t.role + i}
                className="break-inside-avoid mb-5 md:mb-6 bg-white dark:bg-white/[0.03] rounded-3xl p-6 sm:p-7 border border-gray-200 dark:border-white/10"
              >
                <p className="text-[15px] sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t.text}
                </p>
                {t.text2 && (
                  <p className="text-[15px] sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
                    {t.text2}
                  </p>
                )}
                <div className="flex items-center gap-3 mt-6">
                  <div className="flex items-center justify-center w-11 h-11 shrink-0 rounded-full bg-gray-100 dark:bg-white/[0.06] text-gray-600 dark:text-gray-300 text-sm font-bold tracking-wide">
                    {t.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">{t.name}</div>
                    <div className="text-[13px] text-gray-500 dark:text-gray-400 leading-snug">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom fade — only while collapsed */}
          {!expanded && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-gray-50 dark:to-[hsl(220,18%,5%)]" />
          )}
        </div>

        <div className={`flex justify-center ${expanded ? "mt-10" : "-mt-4 relative z-10"}`}>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls="testimonials"
            className="inline-flex items-center gap-2 rounded-full border border-gray-300 dark:border-white/15 bg-white dark:bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-gray-800 dark:text-gray-100 hover:border-brand hover:text-brand transition-all duration-300 hover:-translate-y-0.5 shadow-sm"
          >
            {expanded ? "Свернуть" : "Показать ещё"}
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>
    </section>
  )
}

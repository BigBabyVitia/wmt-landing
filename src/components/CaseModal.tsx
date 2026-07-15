import { ArrowRight, CloseCircle, TickCircle } from "@/components/ui/icons"
import type { CaseItem } from "@/data/cases"

/**
 * Модалка кейса. Общая для главной (CasesSection) и страницы /cases.
 * Кейсбук отдаётся прямым скачиванием PDF (см. CASEBOOK_PDF), без формы-заявки.
 */

export function CaseModal({ c, onClose }: { c: CaseItem; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl my-auto rounded-[1.5rem] overflow-hidden bg-white dark:bg-[hsl(220,20%,9%)] border border-gray-100 dark:border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {c.photo && (
          <div className="relative h-52 md:h-64">
            <img
              src={c.photo}
              alt={c.client}
              className="absolute inset-0 w-full h-full object-cover"
              style={c.photoPos ? { objectPosition: c.photoPos } : undefined}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className={`absolute top-4 right-4 p-1.5 rounded-full transition-colors ${c.photo ? "text-white/80 hover:text-white bg-black/30" : "text-gray-400 hover:text-gray-600 dark:text-white/50 dark:hover:text-white"}`}
        >
          <CloseCircle className="w-7 h-7" />
        </button>

        <div className="p-7 md:p-9">
          <span className="inline-flex items-center rounded-full px-3 pt-[5px] pb-[7px] text-xs font-semibold text-brand border border-[#ff5331]/30 bg-[#ff5331]/[0.07] mb-4">
            {c.format}
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{c.client}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-6">{c.meta}</p>

          <div className="space-y-5">
            {c.metrics && (
              <div className="grid grid-cols-2 gap-x-6 gap-y-4 rounded-2xl border border-[#ff5331]/20 bg-[#ff5331]/[0.04] p-5">
                {c.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="text-xl md:text-2xl font-bold text-brand leading-none tracking-tight">{m.value}</div>
                    <div className="text-[11px] md:text-xs text-gray-500 dark:text-gray-400 mt-1.5 leading-snug">{m.label}</div>
                  </div>
                ))}
              </div>
            )}
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
              <div className="flex flex-wrap gap-1.5 pt-1">
                {c.clients.map((n) => (
                  <span key={n} className="text-xs font-medium text-gray-500 dark:text-white/50 bg-gray-100 dark:bg-white/[0.06] rounded-full px-2.5 pt-[3px] pb-[7px]">
                    {n}
                  </span>
                ))}
              </div>
            )}
          </div>

          <a
            href="#contact"
            onClick={onClose}
            className="mt-8 inline-flex items-center gap-2 bg-brand text-white hover:bg-[#e64627] shadow-lg shadow-[#ff5331]/20 rounded-full px-6 pt-[12px] pb-[14px] text-sm font-bold transition-all hover:-translate-y-0.5"
          >
            Обсудить похожую задачу <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}

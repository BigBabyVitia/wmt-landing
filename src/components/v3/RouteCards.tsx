import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { directions } from "@/data/directions"

/** The route: 4 numbered direction cards. Core of the new IA. */
export function RouteCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
      {directions.map((d) => (
        <Link
          key={d.slug}
          to={`/${d.slug}`}
          className="group relative flex flex-col rounded-[2rem] border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-7 sm:p-8 transition-all duration-300 hover:border-brand/30 hover:shadow-xl hover:shadow-brand/5 hover:-translate-y-1"
        >
          <div className="w-10 h-10 rounded-full bg-gray-900 dark:bg-white/10 text-white flex items-center justify-center font-bold mb-5">
            {d.num}
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{d.cardTitle}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">{d.card.teaser}</p>

          <div className="flex flex-wrap gap-2 mb-5">
            {d.card.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.06] rounded-full px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-5 border-t border-gray-100 dark:border-white/[0.06] text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold text-gray-900 dark:text-white">На выходе:</span> {d.card.out}
          </div>

          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
            Подробнее
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </Link>
      ))}
    </div>
  )
}

import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import type { Direction } from "@/data/directions"

/** "Следующий шаг маршрута" band — links to the next direction, or final CTA on direction 4. */
export function NextBar({ direction }: { direction: Direction }) {
  const isFinal = !direction.next

  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-[1.75rem] border border-gray-200 dark:border-white/[0.06] bg-gray-50 dark:bg-white/[0.02] p-7 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="min-w-0">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {isFinal ? "Финал маршрута" : "Следующий шаг маршрута"}
            </div>
            <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
              {isFinal ? "Дальше — пилоты и внедрение (AI-трансформация)" : direction.nextName}
            </div>
            {isFinal && direction.nextNote && (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed">
                {direction.nextNote}
              </p>
            )}
          </div>

          {isFinal ? (
            <a
              href="#contact"
              className="flex-shrink-0 bg-brand text-white rounded-full px-7 py-3 font-medium hover:bg-[#e64627] transition-colors inline-flex items-center justify-center btn-optical-sm"
            >
              Обсудить задачу
            </a>
          ) : (
            <Link
              to={`/${direction.next}`}
              className="flex-shrink-0 inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 font-medium border border-gray-300 dark:border-white/15 text-gray-900 dark:text-white hover:border-brand hover:text-brand transition-colors btn-optical-sm"
            >
              Открыть
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

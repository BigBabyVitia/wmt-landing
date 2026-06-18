import { Check } from "lucide-react"

/** "Что получите" — outcome checklist for a direction. */
export function OutcomeChecklist({ title = "Что получите", outs }: { title?: string; outs: string[] }) {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-10">
          {title}
        </h2>
        <ul className="grid gap-4 max-w-3xl">
          {outs.map((out) => (
            <li key={out} className="flex items-start gap-3">
              <span className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-brand/10 text-brand flex items-center justify-center">
                <Check className="w-4 h-4" />
              </span>
              <span className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed">{out}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

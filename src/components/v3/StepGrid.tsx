interface Step {
  n: string
  t: string
}

interface StepGridProps {
  title: string
  subtitle?: string
  steps: Step[]
  band?: boolean
}

/** 3-step grid — reused by "Как начать" and "Куда это ведёт дальше". */
export function StepGrid({ title, subtitle, steps, band }: StepGridProps) {
  return (
    <section
      className={`py-16 md:py-24 px-4 sm:px-6 md:px-12 ${
        band ? "bg-gray-50 dark:bg-[hsl(220,18%,5%)] border-y border-gray-100 dark:border-white/[0.06]" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 max-w-3xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          {subtitle && <p className="text-lg text-gray-500 dark:text-gray-400">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {steps.map((step) => (
            <div
              key={step.n}
              className="rounded-[1.75rem] border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-7"
            >
              <div className="text-sm font-bold text-brand mb-3">{step.n}</div>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{step.t}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

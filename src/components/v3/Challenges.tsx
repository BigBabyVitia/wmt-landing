import { useScrollVisible } from "@/hooks/useScrollVisible"
import { hub } from "@/data/directions"

function ChallengeAppIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="challenge-icon w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 group-hover:bg-brand/10 group-hover:border-brand/20 group-hover:shadow-sm group-hover:shadow-brand/20">
      {children}
    </div>
  )
}

// Stroke icons, one per challenge card (order matches hub.challenges.items)
const challengeSvgs = [
  // Порог входа — молния
  () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-300 text-gray-500 dark:text-gray-400 group-hover:text-brand">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  // Большой бизнес — здание
  () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-300 text-gray-500 dark:text-gray-400 group-hover:text-brand">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="9" y1="6" x2="9" y2="6.01" />
      <line x1="15" y1="6" x2="15" y2="6.01" />
      <line x1="9" y1="10" x2="9" y2="10.01" />
      <line x1="15" y1="10" x2="15" y2="10.01" />
      <line x1="9" y1="14" x2="9" y2="14.01" />
      <line x1="15" y1="14" x2="15" y2="14.01" />
      <path d="M9 22v-4h6v4" />
    </svg>
  ),
  // Локальная польза — разъединённые точки
  () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-300 text-gray-500 dark:text-gray-400 group-hover:text-brand">
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
      <line x1="8" y1="6" x2="16" y2="6" strokeDasharray="2 3" opacity="0.4" />
      <line x1="6" y1="8" x2="6" y2="16" strokeDasharray="2 3" opacity="0.4" />
      <line x1="18" y1="8" x2="18" y2="16" strokeDasharray="2 3" opacity="0.4" />
      <line x1="8" y1="18" x2="16" y2="18" strokeDasharray="2 3" opacity="0.4" />
    </svg>
  ),
  // Ошибка в выборе пути — график вниз
  () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-300 text-gray-500 dark:text-gray-400 group-hover:text-brand">
      <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
      <polyline points="16 17 22 17 22 11" />
    </svg>
  ),
]

/** "ИИ меняет рынок" — market-pressure cards (original HomeV2 design: icons + gradient heading + glow cards). */
export function Challenges() {
  const { ref, visible } = useScrollVisible()

  return (
    <section ref={ref} className="py-20 md:py-32 px-4 sm:px-6 md:px-12 bg-white dark:bg-black transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-16 md:mb-24 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl md:text-6xl font-semibold tracking-tight text-gray-900 dark:text-white mb-8 leading-[1.15]">
            {hub.challenges.title1}<br />
            <span className="bg-gradient-to-r from-gray-400 via-gray-900 to-gray-400 dark:from-white/40 dark:via-white dark:to-white/40 bg-clip-text text-transparent inline-block py-2 -my-2 animate-text-glow">
              {hub.challenges.title2}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-3xl leading-relaxed">
            {hub.challenges.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hub.challenges.items.map((item, idx) => (
            <div
              key={item.b}
              className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: visible ? `${idx * 120}ms` : "0ms" }}
            >
              <div className="group relative bg-gray-50 dark:bg-white/[0.03] rounded-2xl p-6 sm:p-8 border border-gray-100 dark:border-white/[0.06] transition-all duration-300 cursor-default overflow-hidden hover:border-brand/30 hover:shadow-md hover:shadow-brand/10 hover:-translate-y-1 h-full transform-gpu [backface-visibility:hidden] antialiased will-change-transform">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand/[0.03] to-transparent transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                <div className="relative z-10 flex gap-4 sm:gap-5 items-start">
                  <div className="flex-shrink-0 mt-1">
                    <ChallengeAppIcon>{challengeSvgs[idx]?.()}</ChallengeAppIcon>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">{item.b}</h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">{item.t}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

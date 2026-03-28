import { useEffect, useRef, useState } from "react"
import { XCircle, CheckCircle2 } from "lucide-react"

interface FitItem {
  text: string
  fit: boolean
}

interface FitAssessmentProps {
  items: FitItem[]
  title?: string
}

export function FitAssessment({ items, title = "Подходит / Не подходит" }: FitAssessmentProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const fits = items.filter((i) => i.fit)
  const notFits = items.filter((i) => !i.fit)

  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <h2 className="text-4xl font-semibold mb-12">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
          <h3 className="text-xl font-semibold text-green-800 mb-6">Подходит, если</h3>
          <div className="space-y-4">
            {fits.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <p className="text-gray-700 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
          <h3 className="text-xl font-semibold text-red-800 mb-6">Не подходит, если</h3>
          <div className="space-y-4">
            {notFits.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-gray-700 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

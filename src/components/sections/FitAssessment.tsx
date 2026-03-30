import { useEffect, useRef, useState } from "react"
import { XCircle, CheckCircle2 } from "lucide-react"
import { V2Card } from "@/components/ui/V2Card"

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
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const fits = items.filter((i) => i.fit)
  const notFits = items.filter((i) => !i.fit)

  return (
    <div ref={ref} className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-10 md:mb-16 leading-tight max-w-4xl">
        {title}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {/* Suitable */}
        <V2Card 
          visible={visible} 
          index={0} 
          className="hover:border-brand/30" 
          contentClassName="p-8 md:p-12"
        >
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-8 flex items-center gap-3 relative z-10">
            Подходит, если
          </h3>
          
          <div className="space-y-6 relative z-10">
            {fits.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                <p className="text-white/80 text-base md:text-lg leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </V2Card>

        {/* Not Suitable */}
        <V2Card 
          visible={visible} 
          index={1} 
          className="hover:border-white/10" 
          contentClassName="p-8 md:p-12 opacity-80"
        >
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-8 flex items-center gap-3 relative z-10">
            Не подходит, если
          </h3>
          
          <div className="space-y-6 relative z-10">
            {notFits.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 opacity-50">
                <XCircle className="w-5 h-5 text-white/40 shrink-0 mt-0.5" />
                <p className="text-white/60 text-base md:text-lg leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </V2Card>
      </div>
    </div>
  )
}

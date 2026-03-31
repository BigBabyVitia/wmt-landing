import { useEffect, useRef, useState } from "react"
import { XCircle, CheckCircle2 } from "lucide-react"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"

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
        <AssessmentCard fits={true} items={fits}  />
        <AssessmentCard fits={false} items={notFits}  />
      </div>
    </div>
  )
}

function AssessmentCard({ fits, items }: { fits: boolean, items: any[] }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const baseClasses = fits 
    ? "bg-black border-white/10 hover:border-brand/30" 
    : "bg-black border-white/5 opacity-80 hover:opacity-100 hover:border-white/20"

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative rounded-[2rem] p-8 md:p-12 border transition-all duration-500 overflow-hidden ${baseClasses}`}
    >
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.7] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_40%,transparent_100%)]" 
        style={{
          backgroundImage: `linear-gradient(to right, rgba(160,160,160,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(160,160,160,0.15) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          backgroundPosition: 'center center'
        }}
      />

      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${fits ? 'rgba(255, 83, 49, 0.15)' : 'rgba(255, 255, 255, 0.05)'}, transparent 80%)`,
        }}
      />

      <h3 className="text-xl md:text-2xl font-semibold text-white mb-8 flex items-center gap-3 relative z-10">
        {fits ? "Подходит, если" : "Не подходит, если"}
      </h3>
      
      <div className="space-y-6 relative z-10">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-start gap-4">
            {fits ? (
              <CheckCircle2 className="w-5 h-5 text-brand shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-white/40 shrink-0 mt-0.5" />
            )}
            <p className={`${fits ? 'text-white/80' : 'text-white/60'} text-base md:text-lg leading-relaxed`}>
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

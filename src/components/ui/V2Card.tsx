import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import type { ReactNode, MouseEvent } from "react"

export interface V2CardProps {
  children: ReactNode
  className?: string
  contentClassName?: string
  visible?: boolean
  index?: number
  delayBase?: number
  delayMult?: number
  onClick?: () => void
}

export function V2Card({ 
  children, 
  className = "", 
  contentClassName = "",
  visible = true, 
  index = 0,
  delayBase = 200,
  delayMult = 150,
  onClick
}: V2CardProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    if (!currentTarget) return
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const visibilityClass = visible 
    ? "opacity-100 translate-y-0" 
    : "opacity-0 translate-y-8 md:translate-y-16"

  const delayStr = visible ? `${delayBase + index * delayMult}ms` : "0ms"

  return (
    <div
      className={`relative group w-full rounded-[2rem] md:rounded-[2.5rem] border border-gray-200/60 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] transition-all duration-700 overflow-hidden text-left ${visibilityClass} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      style={{ transitionDelay: delayStr }}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      {/* Background Glow Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.3] md:opacity-50"
        style={{
          background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255, 83, 49, 0.08) 0%, rgba(255, 83, 49, 0.03) 40%, transparent 100%)"
        }}
      />

      {/* Background Grid Pattern with fade-out mask - balanced visibility */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.6] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)]" 
        style={{
          backgroundImage: `linear-gradient(to right, rgba(128,128,128,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(128,128,128,0.18) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          backgroundPosition: 'center center'
        }}
      />

      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] md:rounded-[2.5rem] opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(255, 83, 49, 0.18), transparent 80%)`,
        }}
      />
      
      <div className={`p-6 sm:p-8 md:p-10 relative z-10 flex flex-col h-full ${contentClassName}`}>
        {children}
      </div>
    </div>
  )
}

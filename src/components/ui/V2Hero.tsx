import type { ReactNode } from "react"
import { NavbarV2 } from "@/components/NavbarV2"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface V2HeroProps {
  label: string
  title: ReactNode
  description: ReactNode
  buttons?: ReactNode
  tags?: ReactNode[]
}

export function V2Hero({ label, title, description, buttons, tags }: V2HeroProps) {
  return (
    <section 
      className="relative w-full min-h-screen flex flex-col justify-center bg-[#050b14] overflow-hidden"
    >
      <div 
        className="absolute inset-0 z-0 opacity-80 bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: "url('/brand/hero-bg.webp')" }} 
      />
      {/* Soft gradient overlay to ensure text readability without killing the background color */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#050b14]/90 via-[#050b14]/40 to-transparent" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-[#050b14]" />

      <NavbarV2 variant="inner" />
      
      <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto w-full pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="flex flex-col items-start">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block text-sm font-bold text-white/50 tracking-[0.2em] uppercase mb-6"
            >
              {label}
            </motion.span>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl leading-[1.1] font-bold text-white tracking-tight animate-fade-rise">
              {title}
            </h1>
            
            <div className="text-white/70 text-lg md:text-xl max-w-xl mt-10 leading-relaxed font-medium animate-fade-rise-delay">
              {description}
            </div>
            
            {buttons && (
              <div className="mt-12 flex flex-wrap gap-5 animate-fade-rise-delay-2">
                {buttons}
              </div>
            )}
          </div>
          
          {tags && tags.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 animate-fade-rise-delay">
              {tags.map((tag, i) => (
                <div 
                  key={i} 
                  className="group relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20"
                >
                  {/* Internal highlight glow without drop shadow */}
                  <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="text-white/90 text-sm md:text-base leading-relaxed font-medium">
                    {tag}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator for UX */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 z-20"
      >
        <span className="text-[10px] uppercase tracking-widest font-bold">Листайте</span>
        <motion.div
           animate={{ y: [0, 5, 0] }}
           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}

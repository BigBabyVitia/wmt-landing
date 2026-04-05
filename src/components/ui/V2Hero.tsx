import type { ReactNode } from "react"
import { NavbarV2 } from "@/components/NavbarV2"
import { motion } from "framer-motion"

interface V2HeroProps {
  label: ReactNode
  title: ReactNode
  description: ReactNode
  buttons?: ReactNode
  tags?: ReactNode[]
  tagsTitle?: string
  layout?: "split" | "centered" | "mosaic"
}

export function V2Hero({ label, title, description, buttons, tags, tagsTitle, layout = "mosaic" }: V2HeroProps) {
  const isCentered = layout === "centered"
  const isMosaic = layout === "mosaic"

  return (
    <section 
      className={`relative w-full min-h-[85vh] sm:min-h-screen flex flex-col justify-center bg-[#050b14] overflow-hidden pt-24 pb-12 sm:pt-0 sm:pb-0 ${isCentered ? "items-center text-center" : ""}`}
    >
      <div 
        className="absolute inset-0 z-0 opacity-80 bg-cover bg-[75%_center] sm:bg-center bg-no-repeat transition-all duration-700" 
        style={{ backgroundImage: "url('/brand/hero-bg.webp')" }} 
      />
      
      {/* ORIGINAL GRADIENTS - DO NOT TOUCH */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#050b14]/90 via-[#050b14]/40 to-transparent" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-[#050b14]" />

      <NavbarV2 variant="inner" />
      
      <div className={`relative z-10 px-6 md:px-12 max-w-7xl mx-auto w-full pt-8 sm:pt-20 ${isCentered ? "flex flex-col items-center" : ""}`}>
        <div className={`grid grid-cols-1 ${isCentered ? "lg:grid-cols-1 max-w-4xl" : isMosaic ? "lg:grid-cols-1" : "lg:grid-cols-12"} gap-10 lg:gap-16 items-center`}>
          
          {/* Text Content */}
          <div className={`flex flex-col ${isCentered ? "items-center" : "lg:col-span-8 text-left"}`}>
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block text-[10px] sm:text-sm font-bold text-white/40 tracking-[0.2em] uppercase mb-2 sm:mb-4"
            >
              {label}
            </motion.span>
            
            {/* Remove orange highlight on mobile via CSS override */}
            <div className={`[&_em]:not-italic [&_em]:text-white sm:[&_em]:text-brand [&_em]:font-bold ${isCentered ? "text-center" : "text-left"}`}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] font-bold text-white tracking-tight animate-fade-rise">
                {title}
              </h1>
            </div>
            
            <div className={`text-white/70 text-sm sm:text-base md:text-lg mt-4 sm:mt-6 leading-relaxed font-medium animate-fade-rise-delay ${isCentered ? "mx-auto text-center" : "max-w-7xl text-left"}`}>
              <div className="hidden sm:block">{description}</div>
              <div className="block sm:hidden text-white/60 leading-snug italic">
                {description}
              </div>
            </div>
            
            {buttons && (
              <div className={`mt-6 sm:mt-8 flex flex-wrap gap-4 sm:gap-5 animate-fade-rise-delay-2 ${isCentered ? "justify-center" : ""}`}>
                {buttons}
              </div>
            )}
          </div>
          
          {/* Tags Content (Standard for Split/Centered) */}
          {tags && tags.length > 0 && !isMosaic && (
            <div className={`animate-fade-rise-delay ${isCentered ? "mt-12 w-full" : "lg:col-span-4"}`}>
              <div className={`grid gap-3 sm:gap-4 ${isCentered ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"}`}>
                {tags.map((tag, i) => {
                  const isNode = typeof tag !== "string" && typeof tag !== "number"
                  
                  if (isNode) return <div key={i}>{tag}</div>

                  return (
                    <div 
                      key={i} 
                      className="group relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20 text-left"
                    >
                      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="text-white/90 text-xs sm:text-sm leading-relaxed font-medium">
                        {tag}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Mosaic layout tags (bottom row) */}
        {tags && tags.length > 0 && isMosaic && (
          <div className="mt-10 sm:mt-12">
            {tagsTitle && (
              <div className="mb-4 block animate-fade-rise-delay-2">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                  {tagsTitle}
                </span>
                <div className="h-px w-8 bg-brand/30 mt-3 rounded-full" />
              </div>
            )}
            <div 
              className={`flex overflow-x-auto sm:grid gap-4 animate-fade-rise-delay-2 -mx-6 px-6 sm:mx-0 sm:px-0 items-stretch ${
                tags.length === 3 ? "sm:grid-cols-3 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4"
              }`}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
            <style dangerouslySetInnerHTML={{ __html: `
              .overflow-x-auto::-webkit-scrollbar { display: none; }
            `}} />
            {tags.map((tag, i) => {
              const isNode = typeof tag !== "string" && typeof tag !== "number"
              
              if (isNode) return (
                <div key={i} className="flex-shrink-0 w-[280px] sm:w-auto flex flex-col">
                  {tag}
                </div>
              )

              return (
                <div 
                  key={i} 
                  className="flex-shrink-0 w-[280px] sm:w-auto group relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20 text-left flex flex-col"
                >
                  <div className="text-white/90 text-sm leading-relaxed font-medium">
                    {tag}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  </section>
  )
}

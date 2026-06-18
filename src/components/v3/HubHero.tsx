import { lazy, Suspense } from "react"
import { NavbarV2 } from "@/components/NavbarV2"
import { LogoCloud } from "@/components/ui/logo-cloud"
import { clients } from "@/data/clients"
import { hub } from "@/data/directions"

const UnicornScene = lazy(() => import("unicornstudio-react"))

// Keep the short tail ("с ИИ") from wrapping to its own line.
const heroTitle = hub.hero.h1.replace(/ (\S+)$/, " $1")

/**
 * Home hub hero — reuses the original HomeV2 hero shell (full-screen WebGL
 * background, centered content, running client-logo strip) with the new
 * single-service framing copy.
 */
export function HubHero() {
  return (
    <section
      id="home"
      className="relative w-full h-[100svh] overflow-hidden bg-background flex flex-col pt-12 pb-24 sm:pt-24 sm:pb-40"
    >
      {/* Overscroll fillers */}
      <div className="absolute -top-[100vh] -inset-x-[20vw] h-[100vh] bg-background z-0" />
      <div className="absolute -bottom-[100vh] -inset-x-[20vw] h-[100vh] bg-background z-0" />

      <NavbarV2 variant="home" />

      {/* Unicorn Studio WebGL background */}
      <div className="absolute -inset-[2px] z-0">
        <Suspense fallback={<div className="w-full h-full bg-black dark:bg-[hsl(220,20%,4%)]" />}>
          <UnicornScene
            projectId="jJjGTV0vcy9VIfmO9Wr8"
            sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.5/dist/unicornStudio.umd.js"
            width="100%"
            height="100%"
          />
        </Suspense>
      </div>

      {/* Subtle dark overlay for text contrast */}
      <div className="absolute inset-0 z-[2] bg-black/20" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 pt-20 pb-20 sm:pb-24 md:pb-28">
        <span className="text-[11px] sm:text-sm font-bold uppercase tracking-[0.2em] text-white/60 mb-4 sm:mb-6 animate-fade-rise">
          {hub.hero.eyebrow}
        </span>

        <h1 className="text-3xl sm:text-5xl md:text-[52px] lg:text-[60px] leading-[1.1] tracking-tight max-w-[1200px] text-balance font-semibold text-white animate-fade-rise">
          {heroTitle}
        </h1>

        <p
          className="text-gray-200 text-base sm:text-lg md:text-xl max-w-3xl mt-4 sm:mt-6 md:mt-10 leading-relaxed animate-fade-rise-delay"
          style={{ textShadow: "0 1px 12px rgba(0,0,0,0.4)" }}
        >
          {hub.hero.lead}
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-12 animate-fade-rise-delay-2 w-full max-w-xs sm:max-w-none mx-auto">
          <a
            href="#routes"
            className="bg-black text-white border border-white/10 rounded-full text-center px-6 py-3.5 sm:px-12 sm:py-4 text-sm sm:text-base font-semibold hover:bg-zinc-900 transition-all duration-300 shadow-xl hover:-translate-y-0.5 inline-block btn-optical-hero"
          >
            Посмотреть направления
          </a>
          <a
            href="#contact"
            className="bg-white text-black rounded-full text-center px-6 py-3.5 sm:px-10 sm:py-4 text-sm sm:text-base font-semibold hover:bg-gray-100 transition-all duration-300 shadow-[0_4px_24px_rgba(255,255,255,0.2)] hover:shadow-[0_4px_32px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 inline-block btn-optical-hero"
          >
            Обсудить задачу
          </a>
        </div>
      </div>

      {/* Running client-logo strip */}
      <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 left-0 right-0 w-full z-20 animate-fade-rise-delay-2 pointer-events-none pb-[env(safe-area-inset-bottom)]">
        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="text-center mb-2 sm:mb-4">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
              {hub.hero.trustLabel}
            </span>
          </div>
          <div className="relative [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] pointer-events-auto">
            <div className="opacity-90">
              <LogoCloud logos={clients} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

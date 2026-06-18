import { Link } from "react-router-dom"

interface DirectionHeroProps {
  name: string
  lead: string
}

/** Direction-page hero — frames the page as one of 4 steps of a single service. */
export function DirectionHero({ name, lead }: DirectionHeroProps) {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-[#050b14] pt-28 pb-16 sm:pt-0 sm:pb-0">
      {/* hero image — dimmed over a dark base, as on the original direction pages */}
      <div
        className="absolute inset-0 z-0 opacity-80 bg-cover bg-[75%_center] sm:bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/brand/hero-bg.webp')" }}
      />
      {/* ORIGINAL GRADIENTS — soft left + bottom shadows that frame the orange glow.
          Spread over the full-screen height they stay gentle, as on the original. */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#050b14]/90 via-[#050b14]/40 to-transparent" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-[#050b14]" />

      <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <Link
          to="/#routes"
          className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-6"
        >
          ← Все направления
        </Link>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.12] font-bold text-white tracking-tight max-w-4xl animate-fade-rise">
          {name}
        </h1>
        <p className="text-white/75 text-base md:text-xl max-w-3xl mt-6 leading-relaxed animate-fade-rise-delay font-medium">
          {lead}
        </p>

        <a
          href="#contact"
          className="mt-9 bg-brand text-white rounded-full px-8 py-3.5 sm:py-4 font-medium text-base sm:text-lg hover:bg-[#e64627] hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center justify-center btn-optical-hero animate-fade-rise-delay-2"
        >
          Обсудить задачу
        </a>
      </div>
    </section>
  )
}

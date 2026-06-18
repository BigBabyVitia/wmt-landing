import { Navigate } from "react-router-dom"
import { NavbarV2 } from "@/components/NavbarV2"
import { DirectionHero } from "@/components/v3/DirectionHero"
import { ProgramCard } from "@/components/v3/ProgramCard"
import { WhoFor } from "@/components/v3/WhoFor"
import { OutcomeChecklist } from "@/components/v3/OutcomeChecklist"
import { ProofCard } from "@/components/v3/ProofCard"
import { PriceLine } from "@/components/v3/PriceLine"
import { NextBar } from "@/components/v3/NextBar"
import { TrustStrip } from "@/components/TrustStrip"
import { MainCta } from "@/components/MainCta"
import { getDirection } from "@/data/directions"

/** Unified template for all 4 direction pages — driven by the directions data module. */
export function DirectionPage({ slug }: { slug: string }) {
  const direction = getDirection(slug)
  if (!direction) return <Navigate to="/" replace />

  return (
    <div className="bg-background">
        <NavbarV2 variant="inner" />

        <DirectionHero name={direction.name} lead={direction.lead} />

        {/* Для кого + Что входит — единый блок под одним фоном */}
        <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-gray-50 dark:bg-[hsl(220,18%,5%)] border-y border-gray-100 dark:border-white/[0.06]">
          <div className="max-w-7xl mx-auto">
            <WhoFor personas={direction.whoPersonas} when={direction.whoWhen} />

            <div className="mt-14 md:mt-20">
              <div className="mb-12 max-w-3xl">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
                  Что входит
                </h2>
                <p className="text-lg text-gray-500 dark:text-gray-400">Из этих программ соберём нужный блок.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-start">
                {direction.progs.map((program) => (
                  <ProgramCard key={program.n} program={program} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <OutcomeChecklist outs={direction.outs} />

        {/* Решающая полоса: доказательство (главная история) + бюджет (уверенный сайдбар).
            Фон как у соседних секций (bg-background) — карточки видны за счёт собственных поверхностей. */}
        <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 md:mb-12 flex items-center gap-3">
              <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-brand">
                Доказательство и бюджет
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-[#ff5331]/30 to-transparent" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 lg:gap-6 items-stretch">
              <div className="h-full lg:col-span-3">
                <ProofCard quote={direction.proof.quote} sub={direction.proof.sub} />
              </div>
              <div className="h-full lg:col-span-2">
                <PriceLine price={direction.price} />
              </div>
            </div>
          </div>
        </section>

        <NextBar direction={direction} />

        <TrustStrip />

        <MainCta />
      </div>
  )
}

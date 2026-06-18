import { HubHero } from "@/components/v3/HubHero"
import { Challenges } from "@/components/v3/Challenges"
import { RouteCards } from "@/components/v3/RouteCards"
import { TrustStrip } from "@/components/TrustStrip"
import { StepGrid } from "@/components/v3/StepGrid"
import { FreePlatform } from "@/components/FreePlatform"
import { MainCta } from "@/components/MainCta"
import { hub } from "@/data/directions"

/** New home hub — единая услуга + маршрут из 4 направлений. Sections per wireframe-v2. */
export function HomeHub() {
  return (
    <div className="bg-background">
      <HubHero />

      <Challenges />

      {/* Маршрут из 4 направлений — ядро */}
      <section id="routes" className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-gray-50 dark:bg-[hsl(220,18%,5%)] border-y border-gray-100 dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 max-w-3xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
              {hub.routes.title}
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400">{hub.routes.subtitle}</p>
          </div>
          <RouteCards />
        </div>
      </section>

      <TrustStrip />

      <StepGrid title={hub.start.title} subtitle={hub.start.subtitle} steps={hub.start.steps} />

      <FreePlatform />

      <StepGrid title={hub.transformation.title} subtitle={hub.transformation.subtitle} steps={hub.transformation.steps} band />

      <MainCta />
    </div>
  )
}

import {
  Crown,
  UserRound,
  Users,
  Building2,
  Sparkles,
  Settings2,
  Boxes,
  Target,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react"
import type { WhoPersona } from "@/data/directions"

/** Persona icon keys → lucide icons (icons in the live-site style). */
const ICONS: Record<string, LucideIcon> = {
  owner: Crown,
  lead: UserRound,
  tops: Users,
  team: Users,
  dept: Building2,
  core: Sparkles,
  specialist: Settings2,
  architect: Boxes,
  company: Target,
  ready: CheckCircle2,
}

function PersonaIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? Users
  return <Icon className={className} strokeWidth={1.8} />
}

/**
 * «Для кого» block — large heading + audience as an airy, scannable list.
 */
export function WhoFor({ personas, when }: { personas: WhoPersona[]; when: string }) {
  const cols =
    personas.length === 2
      ? "sm:grid-cols-2"
      : personas.length >= 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3"

  return (
    <div>
      <div className="mb-10 md:mb-12 max-w-4xl">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Для кого
        </h2>
        {when && (
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 leading-relaxed text-balance">{when}</p>
        )}
      </div>

      <ul className={`grid grid-cols-1 ${cols} gap-x-10 gap-y-8`}>
        {personas.map((p) => (
          <li key={p.role}>
            <div className="flex items-center gap-2.5">
              <PersonaIcon name={p.icon} className="w-5 h-5 flex-shrink-0 text-brand" />
              <span className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white leading-snug">
                {p.role}
              </span>
            </div>
            <p className="mt-2 text-sm sm:text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed">
              {p.note}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

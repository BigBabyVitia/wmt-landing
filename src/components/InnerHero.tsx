import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useVersion } from "@/context/VersionContext"

interface NavLink {
  label: string
  href: string
}

interface NavbarInnerProps {
  links?: NavLink[]
}

const defaultLinks: NavLink[] = [
  { label: "Программа", href: "#program" },
  { label: "Бюджет", href: "#budget" },
  { label: "Контакт", href: "#contact" },
]

export function NavbarInner({ links = defaultLinks }: NavbarInnerProps) {
  const [scrolled, setScrolled] = useState(false)
  const { version, toggleVersion } = useVersion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight - 80)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/70 backdrop-blur-xl py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="flex flex-row items-center justify-between px-8 max-w-7xl mx-auto w-full">
        <Link to="/" className={`text-3xl tracking-tight font-semibold transition-colors duration-300 ${
          scrolled ? "text-gray-900 dark:text-white" : "text-white"
        }`}>
          WMT
        </Link>
        <div className={`hidden md:flex items-center space-x-8 text-sm transition-colors duration-300 ${
          scrolled ? "text-gray-500 dark:text-gray-400 dark:text-gray-500" : "text-gray-300"
        }`}>
          {links.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className={`transition-colors ${scrolled ? "hover:text-gray-900 dark:hover:text-white" : "hover:text-white"}`}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleVersion}
            className={`hidden md:flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
              scrolled
                ? "border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 dark:text-gray-500 hover:border-brand hover:text-brand"
                : "border-white/20 text-white/60 hover:border-white/40 hover:text-white"
            }`}
          >
            <span className={version === "new" ? "opacity-100" : "opacity-50"}>v2</span>
            <span className={`w-6 h-3.5 rounded-full relative transition-colors ${
              version === "new" ? "bg-brand" : scrolled ? "bg-gray-300" : "bg-white/30"
            }`}>
              <span className={`absolute top-0.5 w-2.5 h-2.5 rounded-full bg-white dark:bg-[hsl(220,20%,7%)] transition-transform ${
                version === "new" ? "left-3" : "left-0.5"
              }`} />
            </span>
            <span className={version === "classic" ? "opacity-100" : "opacity-50"}>classic</span>
          </button>

          <a href="#contact" className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 hover:scale-[1.03] inline-block ${
            scrolled
              ? "bg-brand text-white hover:bg-[#e64627]"
              : "liquid-glass text-white"
          }`}>
            Начать
          </a>
        </div>
      </div>
    </nav>
  )
}

interface InnerHeroProps {
  formatName?: string
  headline: string
  subheadline: string
  pills?: string[]
  navLinks?: NavLink[]
}

export function InnerHero({ formatName, headline, subheadline, pills, navLinks }: InnerHeroProps) {
  return (
    <section
      className="relative w-full overflow-hidden flex flex-col pt-32 pb-24 md:pb-32 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/brand/hero-bg.webp')" }}
    >
      <NavbarInner links={navLinks} />

      <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-12 max-w-7xl mx-auto w-full">
        {formatName && (
          <span className="inline-block text-sm md:text-base font-medium text-white/70 tracking-wider uppercase mb-4 animate-fade-rise">
            {formatName}
          </span>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.15] font-semibold text-white animate-fade-rise whitespace-pre-line">
          {headline}
        </h1>

        <p className="text-white/80 text-lg md:text-xl lg:text-2xl max-w-3xl mt-8 leading-relaxed animate-fade-rise-delay">
          {subheadline}
        </p>

        {pills && pills.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-10 animate-fade-rise-delay-2">
            {pills.map((pill, idx) => (
              <div key={idx} className="flex items-center text-white bg-white/20 px-4 py-2 rounded-full border border-white/30 backdrop-blur-sm text-sm font-medium">
                {pill}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

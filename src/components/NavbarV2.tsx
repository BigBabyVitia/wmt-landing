import { useEffect, useState } from "react"
import { X, Menu } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { useVersion } from "@/context/VersionContext"

interface NavbarV2Props {
  variant?: "home" | "inner"
}

const newLinks = [
  { label: "Главная", to: "/" },
  { label: "Для руководителей", to: "/executive" },
  { label: "Для команд", to: "/teams" },
  { label: "Личный ИИ", to: "/personal-ai" },
  { label: "Все форматы", to: "/all-formats" },
]

const classicLinks = [
  { label: "Главная", to: "/" },
  { label: "Задачи", to: "/#problems" },
  { label: "Форматы", to: "/#formats" },
  { label: "Команда", to: "/#trust" },
]

export function NavbarV2({ variant = "inner" }: NavbarV2Props) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { version, toggleVersion, heroStyle, toggleHeroStyle } = useVersion()
  const location = useLocation()

  const links = version === "new" ? newLinks : classicLinks

  const isDark = scrolled

  useEffect(() => {
    const threshold = variant === "home" ? window.innerHeight - 80 : 80
    const onScroll = () => setScrolled(window.scrollY > threshold)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [variant])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const isActive = (to: string) => {
    if (to === "/") return location.pathname === "/"
    return location.pathname.startsWith(to)
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isDark
            ? "bg-white/70 backdrop-blur-xl py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="flex flex-row items-center justify-between px-6 md:px-8 max-w-7xl mx-auto w-full">
          <Link
            to="/"
            className={`text-2xl md:text-3xl tracking-tight font-semibold transition-colors duration-300 ${
              isDark ? "text-gray-900" : "text-white"
            }`}
          >
            WMT
          </Link>

          {/* Desktop nav */}
          <div
            className={`hidden lg:flex items-center space-x-6 text-sm transition-colors duration-300 ${
              isDark ? "text-gray-500" : "text-gray-300"
            }`}
          >
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`transition-colors whitespace-nowrap ${
                  isActive(link.to)
                    ? isDark
                      ? "text-gray-900 font-medium"
                      : "text-white font-medium"
                    : isDark
                    ? "hover:text-gray-900"
                    : "hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}

          </div>

          <div className="flex items-center gap-3">
            {/* Version toggle */}
            <button
              onClick={toggleVersion}
              className={`hidden md:flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
                isDark
                  ? "border-gray-200 text-gray-500 hover:border-brand hover:text-brand"
                  : "border-white/20 text-white/60 hover:border-white/40 hover:text-white"
              }`}
            >
              <span className={version === "new" ? "opacity-100" : "opacity-50"}>v2</span>
              <span className={`w-6 h-3.5 rounded-full relative transition-colors ${
                version === "new" ? "bg-brand" : isDark ? "bg-gray-300" : "bg-white/30"
              }`}>
                <span className={`absolute top-0.5 w-2.5 h-2.5 rounded-full bg-white transition-transform ${
                  version === "new" ? "left-3" : "left-0.5"
                }`} />
              </span>
              <span className={version === "classic" ? "opacity-100" : "opacity-50"}>classic</span>
            </button>

            {/* Hero style toggle — only for v2 */}
            {version === "new" && (
              <button
                onClick={toggleHeroStyle}
                className={`hidden md:flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
                  isDark
                    ? "border-gray-200 text-gray-500 hover:border-brand hover:text-brand"
                    : "border-white/20 text-white/60 hover:border-white/40 hover:text-white"
                }`}
              >
                <span className={heroStyle === "video" ? "opacity-100" : "opacity-50"}>🎬</span>
                <span className={`w-6 h-3.5 rounded-full relative transition-colors ${
                  heroStyle === "webgl" ? "bg-brand" : isDark ? "bg-gray-300" : "bg-white/30"
                }`}>
                  <span className={`absolute top-0.5 w-2.5 h-2.5 rounded-full bg-white transition-transform ${
                    heroStyle === "webgl" ? "left-3" : "left-0.5"
                  }`} />
                </span>
                <span className={heroStyle === "webgl" ? "opacity-100" : "opacity-50"}>✨</span>
              </button>
            )}

            {/* Login button */}
            <a
              href="https://transformation.wmtunnel.ru"
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 hover:scale-[1.03] hidden md:inline-block ${
                isDark
                  ? "bg-brand text-white hover:bg-[#e64627]"
                  : "liquid-glass text-white"
              }`}
            >
              Войти
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 transition-colors ${
                isDark ? "text-gray-900" : "text-white"
              }`}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-20 px-6 lg:hidden overflow-y-auto">
          <div className="flex flex-col space-y-6 py-8">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-2xl font-medium transition-colors ${
                  isActive(link.to) ? "text-white" : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-6 border-t border-white/10 space-y-4">
              <button
                onClick={toggleVersion}
                className="flex items-center gap-3 text-sm text-gray-400"
              >
                <span>Версия сайта:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  version === "new" ? "bg-brand text-white" : "bg-white/10 text-white"
                }`}>
                  {version === "new" ? "v2" : "classic"}
                </span>
              </button>

              {version === "new" && (
                <button
                  onClick={toggleHeroStyle}
                  className="flex items-center gap-3 text-sm text-gray-400"
                >
                  <span>Стиль hero:</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    heroStyle === "webgl" ? "bg-brand text-white" : "bg-white/10 text-white"
                  }`}>
                    {heroStyle === "video" ? "🎬 Видео" : "✨ WebGL"}
                  </span>
                </button>
              )}
            </div>

            <a
              href="https://transformation.wmtunnel.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand text-white rounded-full px-8 py-4 font-medium text-center text-lg mt-4"
              onClick={() => setMobileOpen(false)}
            >
              Войти
            </a>
          </div>
        </div>
      )}
    </>
  )
}

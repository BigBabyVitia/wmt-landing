import { useEffect, useState } from "react"
import { useVersion } from "@/context/VersionContext"

export function Navbar() {
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
          ? "bg-white/70 backdrop-blur-xl pt-[calc(env(safe-area-inset-top)+16px)] pb-4"
          : "bg-transparent pt-[calc(env(safe-area-inset-top)+24px)] pb-6"
      }`}
    >
      <div className="flex flex-row items-center justify-between px-8 max-w-7xl mx-auto w-full">
        <div className={`text-3xl tracking-tight font-semibold transition-colors duration-300 ${
          scrolled ? "text-gray-900 dark:text-white" : "text-white"
        }`}>
          WMT
        </div>
        <div className={`hidden md:flex items-center space-x-8 text-sm transition-colors duration-300 ${
          scrolled ? "text-gray-500 dark:text-gray-400 dark:text-gray-500" : "text-gray-300"
        }`}>
          <a href="#home" className={`hover:text-brand transition-colors ${scrolled ? "text-gray-900 dark:text-white" : "text-white"}`}>Главная</a>
          <a href="#problems" className={`transition-colors ${scrolled ? "hover:text-gray-900 dark:hover:text-white" : "hover:text-white"}`}>Задачи</a>
          <a href="#formats" className={`transition-colors ${scrolled ? "hover:text-gray-900 dark:hover:text-white" : "hover:text-white"}`}>Форматы</a>
          <a href="#trust" className={`transition-colors ${scrolled ? "hover:text-gray-900 dark:hover:text-white" : "hover:text-white"}`}>Команда</a>
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

          <a href="#apply" className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 hover:scale-[1.03] inline-block ${
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

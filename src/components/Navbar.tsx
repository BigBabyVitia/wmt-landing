import { useEffect, useState } from "react"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

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
        <div className={`text-3xl tracking-tight font-semibold transition-colors duration-300 ${
          scrolled ? "text-gray-900" : "text-white"
        }`}>
          WMT
        </div>
        <div className={`hidden md:flex items-center space-x-8 text-sm transition-colors duration-300 ${
          scrolled ? "text-gray-500" : "text-gray-300"
        }`}>
          <a href="#home" className={`hover:text-brand transition-colors ${scrolled ? "text-gray-900" : "text-white"}`}>Главная</a>
          <a href="#problems" className={`transition-colors ${scrolled ? "hover:text-gray-900" : "hover:text-white"}`}>Задачи</a>
          <a href="#formats" className={`transition-colors ${scrolled ? "hover:text-gray-900" : "hover:text-white"}`}>Форматы</a>
          <a href="#trust" className={`transition-colors ${scrolled ? "hover:text-gray-900" : "hover:text-white"}`}>Команда</a>
        </div>
        <a href="#apply" className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 hover:scale-[1.03] inline-block ${
          scrolled
            ? "bg-brand text-white hover:bg-[#e64627]"
            : "liquid-glass text-white"
        }`}>
          Начать
        </a>
      </div>
    </nav>
  )
}

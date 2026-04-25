import { useEffect, useState } from "react"
import { X, Menu, Sun, Moon } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { useVersion } from "@/context/VersionContext"
import { useTheme } from "@/context/ThemeContext"

interface NavbarV2Props {
  variant?: "home" | "inner"
}

const newLinks = [
  { label: "Главная", to: "/" },
  { label: "Для руководителей", to: "/executive" },
  { label: "Для команд", to: "/teams" },
  { label: "Лидер ИИ", to: "/personal-ai" },
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
  const { version } = useVersion()
  const { isDark: isDarkTheme, toggleTheme } = useTheme()
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
            ? isDarkTheme
              ? "bg-[hsl(220,20%,7%)]/70 backdrop-blur-xl pt-[calc(env(safe-area-inset-top)+12px)] pb-3"
              : "bg-white/70 backdrop-blur-xl pt-[calc(env(safe-area-inset-top)+12px)] pb-3"
            : "pt-[calc(env(safe-area-inset-top)+20px)] pb-5"
        }`}
      >
        <div className="flex flex-row items-center justify-between px-6 md:px-8 max-w-7xl mx-auto w-full">
          <Link
            to="/"
            className={`flex items-center transition-colors duration-300 ${
              isDark ? (isDarkTheme ? "text-white" : "text-gray-900 dark:text-white") : "text-white"
            }`}
            aria-label="WMT AI"
          >
            <svg viewBox="0 0 209 43" className="h-6 md:h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M94.4548 6.45423H100.6L93.2515 36.5543H85.172L79.4132 14.5812L74.2131 36.5543H66.1336L58.2689 6.45423H64.3715L70.3882 29.8462L76.3189 6.45423H82.5505L88.8679 29.8462L94.4548 6.45423Z" fill="#FF5331"/>
              <path d="M103.823 36.5543V6.45423H110.313L119.767 24.4712L129.222 6.45423H135.712V36.5543H130.168V15.5272L121.615 31.9532H117.962L109.367 15.5272V36.5543H103.823Z" fill="#FF5331"/>
              <path d="M162.741 6.45423V11.9582H153.587V36.5543H148V11.9582H138.803V6.45423H162.741Z" fill="#FF5331"/>
              <path d="M176.769 24.9442H194.261V28.7712H176.769V24.9442ZM174.964 36.5543H170.28L182.872 6.45423H188.201L200.793 36.5543H196.152L190.865 23.6327L185.579 10.7112L174.964 36.5543Z" fill="currentColor"/>
              <path d="M208.122 36.5543H204.039V6.45423H208.122V36.5543Z" fill="currentColor"/>
              <path d="M27.2912 24.8827C26.8954 23.4019 27.772 21.8799 29.2493 21.4831L33.7072 20.2858C39.6162 18.6987 45.6898 22.2137 47.2731 28.1367L49.6621 37.0738C50.058 38.5546 49.1813 40.0766 47.7041 40.4734L43.2461 41.6707C37.3372 43.2578 31.2635 39.7428 29.6802 33.8198L27.2912 24.8827Z" fill="#FF5331"/>
              <path d="M1.38503 36.8845C0.0605731 36.118 -0.393218 34.4204 0.371455 33.0928L2.67906 29.0864C5.73775 23.7759 12.512 21.9564 17.8099 25.0224L25.8036 29.6486C27.1281 30.4151 27.5819 32.1127 26.8172 33.4403L24.5096 37.4467C21.4509 42.7572 14.6766 44.5767 9.37881 41.5107L1.38503 36.8845Z" fill="#FF5331"/>
              <path d="M18.792 22.5195C17.3148 22.9163 15.7964 22.0375 15.4006 20.5568L14.2061 16.0882C12.6228 10.1652 16.1294 4.07705 22.0383 2.48998L30.9542 0.0952789C32.4315 -0.301488 33.9499 0.577257 34.3457 2.05801L35.5402 6.52658C37.1235 12.4496 33.6169 18.5377 27.7079 20.1248L18.792 22.5195Z" fill="#FF5331"/>
            </svg>
          </Link>

          {/* Desktop nav */}
          <div
            className={`hidden lg:flex items-center space-x-6 text-sm transition-colors duration-300 ${
              isDark ? (isDarkTheme ? "text-gray-400 dark:text-gray-500" : "text-gray-500 dark:text-gray-400 dark:text-gray-500") : "text-gray-300"
            }`}
          >
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`transition-colors whitespace-nowrap ${
                  isActive(link.to)
                    ? isDark
                      ? isDarkTheme
                        ? "text-white font-medium"
                        : "text-gray-900 dark:text-white font-medium"
                      : "text-white font-medium"
                    : isDark
                    ? isDarkTheme
                      ? "hover:text-white"
                      : "hover:text-gray-900 dark:hover:text-white"
                    : "hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}

          </div>

          <div className="flex items-center gap-3">

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className={`hidden md:flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 ${
                isDark
                  ? isDarkTheme
                    ? "border-white/10 text-gray-400 dark:text-gray-500 hover:border-brand hover:text-brand"
                    : "border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 dark:text-gray-500 hover:border-brand hover:text-brand"
                  : "border-white/20 text-white/60 hover:border-white/40 hover:text-white"
              }`}
              title={isDarkTheme ? "Светлая тема" : "Тёмная тема"}
            >
              {isDarkTheme ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Login button */}
            <a
              href="https://transformation.wmtunnel.ru"
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 hover:scale-[1.03] hidden md:inline-block ${
                isDark
                  ? isDarkTheme
                    ? "bg-brand text-white hover:bg-[#e64627]"
                    : "bg-brand text-white hover:bg-[#e64627]"
                  : "liquid-glass text-white"
              }`}
            >
              Начать бесплатно
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 transition-colors ${
                isDark ? (isDarkTheme ? "text-white" : "text-gray-900 dark:text-white") : "text-white"
              }`}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black dark:bg-[hsl(220,20%,4%)]/95 backdrop-blur-xl pt-20 px-6 lg:hidden overflow-y-auto">
          <div className="flex flex-col space-y-6 py-8">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-2xl font-medium transition-colors ${
                  isActive(link.to) ? "text-white" : "text-gray-400 dark:text-gray-500 hover:text-white"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-6 border-t border-white/10 space-y-4">

              {/* Theme toggle mobile */}
              <button
                onClick={toggleTheme}
                className="flex items-center gap-3 text-sm text-gray-400 dark:text-gray-500"
              >
                <span>Тема:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  isDarkTheme ? "bg-brand text-white" : "bg-white/10 text-white"
                }`}>
                  {isDarkTheme ? "🌙 Тёмная" : "☀️ Светлая"}
                </span>
              </button>
            </div>

            <a
              href="https://transformation.wmtunnel.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand text-white rounded-full px-8 py-4 font-medium text-center text-lg mt-4"
              onClick={() => setMobileOpen(false)}
            >
              Начать бесплатно
            </a>
          </div>
        </div>
      )}
    </>
  )
}

import { useEffect } from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { VersionProvider, useVersion } from "@/context/VersionContext"

/* Classic pages */
import { Home } from "./pages/Home"
import { ForManagers } from "./pages/ForManagers"
import { FirstPilots } from "./pages/FirstPilots"
import { PracticalTeam } from "./pages/PracticalTeam"
import { ImplementationWave } from "./pages/ImplementationWave"

/* V2 pages */
import { HomeV2 } from "./pages/HomeV2"
import { Executive } from "./pages/Executive"
import { Teams } from "./pages/Teams"
import { PersonalAI } from "./pages/PersonalAI"
import { AllFormats } from "./pages/AllFormats"
import { BuilderDay } from "./pages/BuilderDay"
import { Proof } from "./pages/Proof"

/* V3 — new 4-directions structure */
import { Cases } from "./pages/Cases"

/* Shared pages */
import { Privacy } from "./pages/Privacy"
import { Cookies } from "./pages/Cookies"

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      // На длинных страницах (например /cases) картинки выше цели грузятся лениво и
      // сдвигают layout уже ПОСЛЕ первого скролла — из-за этого раньше «кидало наверх».
      // Скроллим мгновенно к якорю и переalign'имся ещё пару раз, пока layout не устаканится.
      const id = hash.slice(1)
      const jump = () => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: "auto", block: "start" })
        return !!el
      }
      if (jump()) {
        const timers = [80, 250, 600].map((ms) => window.setTimeout(jump, ms))
        return () => timers.forEach(clearTimeout)
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function HomePage() {
  const { version } = useVersion()
  return version === "new" ? <HomeV2 /> : <Home />
}

function App() {
  return (
    <BrowserRouter>
      <VersionProvider>
        <ScrollToTop />
        <main className="min-h-screen text-gray-900 dark:text-gray-100 bg-background selection:bg-brand selection:text-white flex flex-col transition-colors duration-300">
          <div className="flex-1">
            <Routes>
              {/* Home — version switch (new = 4-directions hub) */}
              <Route path="/" element={<HomePage />} />

              {/* Кейсы обучения — все на одной странице */}
              <Route path="/cases" element={<Cases />} />

              {/* V2 pages — kept reachable for reference during the rebuild */}
              <Route path="/executive" element={<Executive />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/personal-ai" element={<PersonalAI />} />
              <Route path="/all-formats" element={<AllFormats />} />
              <Route path="/builder-day" element={<BuilderDay />} />
              <Route path="/proof" element={<Proof />} />

              {/* Classic format pages */}
              <Route path="/managers" element={<ForManagers />} />
              <Route path="/pilots" element={<FirstPilots />} />
              <Route path="/team" element={<PracticalTeam />} />
              <Route path="/wave" element={<ImplementationWave />} />

              {/* Shared */}
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cookies" element={<Cookies />} />
            </Routes>
          </div>
          <footer className="bg-black dark:bg-black text-gray-400 dark:text-gray-500 py-12 px-6 text-center text-sm mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-between md:flex-row border-t border-white/10 pt-8">
              <p>© {new Date().getFullYear()} WMT. Все права защищены.</p>
              <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 items-center">
                <a href="/privacy" className="hover:text-white transition-colors">Политика конфиденциальности</a>
                <a href="/cookies" className="hover:text-white transition-colors">Политика использования cookie</a>
              </div>
            </div>
          </footer>
        </main>
      </VersionProvider>
    </BrowserRouter>
  )
}

export default App

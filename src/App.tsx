import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { ForManagers } from "./pages/ForManagers"
import { FirstPilots } from "./pages/FirstPilots"
import { PracticalTeam } from "./pages/PracticalTeam"
import { ImplementationWave } from "./pages/ImplementationWave"
import { Privacy } from "./pages/Privacy"
import { Cookies } from "./pages/Cookies"

function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen text-gray-900 bg-white selection:bg-brand selection:text-white flex flex-col">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/managers" element={<ForManagers />} />
            <Route path="/pilots" element={<FirstPilots />} />
            <Route path="/team" element={<PracticalTeam />} />
            <Route path="/wave" element={<ImplementationWave />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cookies" element={<Cookies />} />
          </Routes>
        </div>
        <footer className="bg-black text-gray-400 py-12 px-6 text-center text-sm mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col items-center justify-between md:flex-row border-t border-white/10 pt-8">
            <p>© {new Date().getFullYear()} WMT. Все права защищены.</p>
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 items-center">
              <a href="/privacy" className="hover:text-white transition-colors">Политика конфиденциальности</a>
              <a href="/cookies" className="hover:text-white transition-colors">Политика использования cookie</a>
            </div>
          </div>
        </footer>
      </main>
    </BrowserRouter>
  )
}

export default App

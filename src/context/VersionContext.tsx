import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Version = "new" | "classic"
// HeroStyle/HERO_CYCLE/toggleHeroStyle остались от периода A/B-подбора фона hero — теперь
// дормантные: HomeV2() больше не читает heroStyle и всегда рендерит HeroSplit напрямую
// (см. комментарий в HomeV2.tsx). Инфраструктура НЕ удалена, чтобы можно было быстро
// вернуть переключатель `HeroBgToggle`, если понадобится снова сравнивать варианты.
export type HeroStyle = "video" | "webgl" | "glow" | "split" | "splitbrand" | "beams" | "splitvideo" | "splitpixel"

interface VersionContextValue {
  version: Version
  toggleVersion: () => void
  heroStyle: HeroStyle
  toggleHeroStyle: () => void
  setHeroStyle: (s: HeroStyle) => void
}

const HERO_CYCLE: HeroStyle[] = ["glow", "webgl", "video", "split", "splitbrand", "beams", "splitvideo", "splitpixel"]

const VersionContext = createContext<VersionContextValue>({
  version: "new",
  toggleVersion: () => {},
  heroStyle: "split",
  toggleHeroStyle: () => {},
  setHeroStyle: () => {},
})

export function useVersion() {
  return useContext(VersionContext)
}

export function VersionProvider({ children }: { children: ReactNode }) {
  const [version, setVersion] = useState<Version>("new")

  const [heroStyle, setHeroStyle] = useState<HeroStyle>("split")

  useEffect(() => {
    localStorage.setItem("wmt-site-version", version)
  }, [version])

  useEffect(() => {
    localStorage.setItem("wmt-hero-style", heroStyle)
  }, [heroStyle])

  const toggleVersion = () => {
    setVersion((v) => (v === "new" ? "classic" : "new"))
  }

  const toggleHeroStyle = () => {
    setHeroStyle((s) => HERO_CYCLE[(HERO_CYCLE.indexOf(s) + 1) % HERO_CYCLE.length])
  }

  return (
    <VersionContext.Provider value={{ version, toggleVersion, heroStyle, toggleHeroStyle, setHeroStyle }}>
      {children}
    </VersionContext.Provider>
  )
}

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Version = "new" | "classic"
type HeroStyle = "video" | "webgl"

interface VersionContextValue {
  version: Version
  toggleVersion: () => void
  heroStyle: HeroStyle
  toggleHeroStyle: () => void
}

const VersionContext = createContext<VersionContextValue>({
  version: "new",
  toggleVersion: () => {},
  heroStyle: "video",
  toggleHeroStyle: () => {},
})

export function useVersion() {
  return useContext(VersionContext)
}

export function VersionProvider({ children }: { children: ReactNode }) {
  const [version, setVersion] = useState<Version>("new")

  const [heroStyle, setHeroStyle] = useState<HeroStyle>("webgl")

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
    setHeroStyle((s) => (s === "video" ? "webgl" : "video"))
  }

  return (
    <VersionContext.Provider value={{ version, toggleVersion, heroStyle, toggleHeroStyle }}>
      {children}
    </VersionContext.Provider>
  )
}

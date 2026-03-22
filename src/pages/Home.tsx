import { Hero } from "../components/Hero"
import { Problems } from "../components/Problems"
import { Formats } from "../components/Formats"
import { Trust } from "../components/Trust"
import { Experts } from "../components/Experts"
import { Budget } from "../components/Budget"
import { MainCta } from "../components/MainCta"

export function Home() {
  return (
    <>
      <Hero />
      <Problems />
      <Formats />
      <Trust />
      <Experts />
      <Budget />
      <MainCta />
    </>
  )
}

import { Navbar } from "./Navbar"

export function Hero() {
  return (
    <section id="home" className="relative w-full h-screen overflow-hidden bg-black flex flex-col pt-20 pb-32 sm:pt-24 sm:pb-40">
      {/* Overscroll-up filler to match black background */}
      <div className="absolute -top-[100vh] inset-x-0 h-[100vh] bg-black z-0" />
      <Navbar />
      
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-70"
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" type="video/mp4" />
      </video>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 mt-4 sm:mt-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.05] tracking-tight max-w-[1000px] font-semibold text-white animate-fade-rise">
          <em className="not-italic text-brand font-bold">AI-трансформация</em> бизнеса.<br /> От стратегии до результата
        </h1>
        
        <p className="text-gray-200 text-lg sm:text-lg md:text-lg lg:text-xl max-w-3xl mt-8 leading-relaxed animate-fade-rise-delay">
          Перестраиваем процессы компании вокруг ИИ — от первых пилотов до масштаба.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-12 animate-fade-rise-delay-2">
          <a href="#contact" className="liquid-glass rounded-full px-12 py-4 text-base font-medium text-white hover:scale-[1.03] transition-transform cursor-pointer inline-block">
            Обсудить задачу
          </a>
          <a href="#formats" className="liquid-glass rounded-full px-12 py-4 text-base font-medium text-white hover:scale-[1.03] transition-transform cursor-pointer inline-block">
            Смотреть форматы
          </a>
        </div>
      </div>
    </section>
  )
}

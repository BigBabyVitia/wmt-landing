import UnicornScene from "unicornstudio-react"

export function MainCta() {

  return (
    <section id="apply" className="relative bg-black text-white w-full overflow-hidden">

      {/* Ambient purple glow — covers entire section background */}
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 70% at 30% 50%, rgba(120,40,180,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Animation Layer — original left-half positioning (renders correctly) */}
      <div className="absolute left-0 w-full lg:w-1/2 h-full top-[18%] z-0 pointer-events-none"
        style={{
          contain: "layout size",
          willChange: "transform",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 60%, transparent 80%), linear-gradient(to right, black 60%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 60%, transparent 80%), linear-gradient(to right, black 60%, transparent 100%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "destination-in",
        }}
      >
        <div style={{ width: "100%", height: "100%", contain: "strict", isolation: "isolate", transform: "translateZ(0)" }}>
          <UnicornScene
            projectId="qifdf1KG8tNGYcslUm9y"
            width="100%"
            height="100%"
            scale={1}
            dpi={1}
            sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@2.1.4/dist/unicornStudio.umd.js"
          />
        </div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start pointer-events-auto px-6 md:px-12 py-24 lg:py-[150px]">

          {/* Left Column: Text */}
          <div className="w-full max-w-xl mt-0">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
              Готовы обсудить<br /> вашу задачу?
            </h2>
            <p className="text-gray-300 text-lg lg:text-xl leading-relaxed">
              Оставьте заявку — мы свяжемся в течение дня и подготовим расчёт для вашей команды.
            </p>
          </div>

          {/* Right Column: Form */}
          <div className="bg-white/5 backdrop-blur-xl p-8 lg:p-12 rounded-2xl w-full lg:max-w-[550px] ml-auto ">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-200">ФИО</label>
                <input type="text" placeholder="Ваши имя и фамилия" className="w-full bg-black/50 border border-white/10 rounded-lg p-5 text-white placeholder-gray-600 focus:outline-none focus:border-brand transition-colors" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-200">Email</label>
                  <input type="email" placeholder="work@company.ru" className="w-full bg-black/50 border border-white/10 rounded-lg p-5 text-white placeholder-gray-600 focus:outline-none focus:border-brand transition-colors" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-200">Телефон</label>
                  <input type="tel" placeholder="+7 (999) 000-00-00" className="w-full bg-black/50 border border-white/10 rounded-lg p-5 text-white placeholder-gray-600 focus:outline-none focus:border-brand transition-colors" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-200">Компания</label>
                <input type="text" placeholder="Название организации" className="w-full bg-black/50 border border-white/10 rounded-lg p-5 text-white placeholder-gray-600 focus:outline-none focus:border-brand transition-colors" required />
              </div>
              <button className="w-full bg-brand text-white font-semibold py-5 mt-8 rounded-xl hover:bg-[#e64627] transition-all text-xl tracking-wide">
                Отправить заявку
              </button>
              <p className="text-xs text-gray-500 text-center mt-6">
                Нажимая кнопку, вы подтверждаете согласие на обработку персональных данных.
              </p>
            </form>
          </div>

      </div>
    </section>
  )
}

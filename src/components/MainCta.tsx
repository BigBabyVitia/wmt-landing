import LightRays from "./ui/LightRays"
import { Phone, Send, Mail } from "lucide-react"

export function MainCta() {

  return (
    <section id="apply" className="relative bg-black text-white w-full overflow-hidden">

      {/* Ambient purple glow — covers entire section background */}
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 70% at 30% 50%, rgba(120,40,180,0.15) 0%, transparent 70%)",
        }}
      />

      {/* LightRays Animation Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ee4f2f"
          raysSpeed={0.6}
          lightSpread={1.2}
          rayLength={1.5}
          fadeDistance={0.9}
          saturation={0.8}
          followMouse={true}
          mouseInfluence={0.08}
          noiseAmount={0.05}
          distortion={0.0}
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start pointer-events-auto px-6 md:px-12 py-24 lg:py-[150px]">

          {/* Left Column: Text + Manager contacts */}
          <div className="w-full max-w-xl mt-0">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
              Готовы обсудить<br /> вашу задачу?
            </h2>
            <p className="text-gray-300 text-lg lg:text-xl leading-relaxed mb-12">
              Оставьте заявку — мы свяжемся в течение дня и подготовим расчёт для вашей команды.
            </p>

            {/* Manager block */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <img
                  src="/experts/danilchik.jpg"
                  alt="Данильчик Анастасия"
                  className="w-16 h-16 rounded-full object-cover object-top"
                />
                <div>
                  <p className="text-xl font-semibold">Данильчик Анастасия</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Координатор программ обучения WMT</p>
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <a href="tel:+79911369196" className="flex items-center gap-3 text-brand font-semibold text-base hover:text-white transition-colors group">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 group-hover:bg-brand/20 transition-colors">
                    <Phone className="w-5 h-5" />
                  </span>
                  +7 991 136 91 96
                </a>
                <a href="https://t.me/DanilchikWMT" className="flex items-center gap-3 text-brand font-semibold text-base hover:text-white transition-colors group">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 group-hover:bg-brand/20 transition-colors">
                    <Send className="w-5 h-5" />
                  </span>
                  @DanilchikWMT
                </a>
                <a href="mailto:adanilchik@wmtgroup.ru" className="flex items-center gap-3 text-brand font-semibold text-base hover:text-white transition-colors group">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 group-hover:bg-brand/20 transition-colors">
                    <Mail className="w-5 h-5" />
                  </span>
                  adanilchik@wmtgroup.ru
                </a>
              </div>
              <p className="text-gray-500 dark:text-gray-400 dark:text-gray-500 italic text-sm">Отвечаем за 2 часа в рабочее время.<br />Предложение с бюджетом отправим за 24 часа.</p>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-white/5 backdrop-blur-xl p-8 lg:p-12 rounded-3xl w-full lg:max-w-[550px] ml-auto ">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-200">ФИО</label>
                <input type="text" placeholder="Ваши имя и фамилия" className="w-full bg-black dark:bg-[hsl(220,20%,4%)]/50 border border-white/10 rounded-xl p-5 text-white placeholder-gray-600 focus:outline-none focus:border-brand transition-colors" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-200">Email</label>
                  <input type="email" placeholder="work@company.ru" className="w-full bg-black dark:bg-[hsl(220,20%,4%)]/50 border border-white/10 rounded-xl p-5 text-white placeholder-gray-600 focus:outline-none focus:border-brand transition-colors" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-200">Телефон</label>
                  <input type="tel" placeholder="+7 (999) 000-00-00" className="w-full bg-black dark:bg-[hsl(220,20%,4%)]/50 border border-white/10 rounded-xl p-5 text-white placeholder-gray-600 focus:outline-none focus:border-brand transition-colors" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-200">Компания</label>
                <input type="text" placeholder="Название организации" className="w-full bg-black dark:bg-[hsl(220,20%,4%)]/50 border border-white/10 rounded-xl p-5 text-white placeholder-gray-600 focus:outline-none focus:border-brand transition-colors" required />
              </div>
              <button className="w-full bg-brand text-white font-semibold py-5 mt-8 rounded-full hover:bg-[#e64627] hover:scale-[1.02] transition-all text-xl tracking-wide">
                Отправить заявку
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 text-center mt-6">
                Нажимая кнопку, вы подтверждаете согласие на обработку персональных данных.
              </p>
            </form>
          </div>

      </div>
    </section>
  )
}

import { useState, type ReactNode } from "react"
import { Phone, Send, Mail, Loader2, CheckCircle2 } from "lucide-react"
import { sendTelegramMessage } from "@/lib/telegram"

interface ContactFormProps {
  quoteSlot?: ReactNode
}

export function ContactForm({ quoteSlot }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("loading")

    const formData = new FormData(e.currentTarget)
    const data: Record<string, string> = {}
    formData.forEach((value, key) => {
      data[key] = value.toString()
    })

    try {
      await sendTelegramMessage(data)
      setStatus("success")
      setTimeout(() => setStatus("idle"), 5000)
    } catch (error) {
      console.error(error)
      setStatus("error")
      setTimeout(() => setStatus("idle"), 5000)
    }
  }

  return (
    <section id="contact" className="bg-black text-white">
      {quoteSlot}

      <div className="py-16 md:py-24 px-4 sm:px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-20">
              Обсудим задачу — подберём формат и бюджет за 24 часа
            </h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <img
                  src="/experts/danilchik.jpg"
                  alt="Данильчик Анастасия"
                  className="w-16 h-16 rounded-full object-cover object-top"
                />
                <div>
                  <p className="text-2xl font-semibold">Данильчик Анастасия</p>
                  <p className="text-sm text-gray-400 mt-1">Координатор программ обучения WMT</p>
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                <a href="tel:+79911369196" className="flex items-center gap-3 text-brand font-semibold text-lg hover:text-white transition-colors group">
                  <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 group-hover:bg-brand/20 transition-colors">
                    <Phone className="w-5 h-5" />
                  </span>
                  +7 991 136 91 96
                </a>
                <a href="https://t.me/DanilchikWMT" className="flex items-center gap-3 text-brand font-semibold text-lg hover:text-white transition-colors group">
                  <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 group-hover:bg-brand/20 transition-colors">
                    <Send className="w-5 h-5" />
                  </span>
                  @DanilchikWMT
                </a>
                <a href="mailto:adanilchik@wmtgroup.ru" className="flex items-center gap-3 text-brand font-semibold text-lg hover:text-white transition-colors group">
                  <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 group-hover:bg-brand/20 transition-colors">
                    <Mail className="w-5 h-5" />
                  </span>
                  adanilchik@wmtgroup.ru
                </a>
              </div>
              <p className="text-gray-400 italic text-sm mt-8">Отвечаем за 2 часа в рабочее время. Предложение с бюджетом отправим за 24 часа.</p>
            </div>
          </div>

          <div className="p-8 md:p-10 relative">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500 bg-gray-900/50 rounded-2xl border border-brand/20">
                <CheckCircle2 className="w-20 h-20 text-green-500 mb-6" />
                <h3 className="text-2xl font-bold mb-4">Заявка отправлена!</h3>
                <p className="text-gray-400">Спасибо за обращение. Мы скоро с вами свяжемся.</p>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-semibold mb-2">Имя</label>
                  <input name="name" type="text" placeholder="Как к вам обращаться" className="w-full bg-transparent border border-gray-600 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-brand" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Компания</label>
                  <input name="company" type="text" placeholder="Название компании" className="w-full bg-transparent border border-gray-600 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-brand" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Роль</label>
                  <select name="role" className="w-full bg-black border border-gray-600 rounded-lg p-4 pr-10 text-white focus:outline-none focus:border-brand appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%239ca3af%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_16px_center] bg-no-repeat">
                    <option>CEO / собственник</option>
                    <option>Совет директоров</option>
                    <option>CDO / директор по стратегии</option>
                    <option>Другое</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Опишите задачу</label>
                  <textarea name="task" placeholder="Какая ситуация, сколько участников, какой результат нужен?" className="w-full bg-transparent border border-gray-600 rounded-lg p-4 text-white placeholder-gray-500 h-32 resize-none focus:outline-none focus:border-brand" required></textarea>
                </div>
                <button
                  disabled={status === "loading"}
                  className="w-full bg-brand text-white font-semibold py-4 rounded-xl hover:bg-[#e64627] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Отправляем...
                    </>
                  ) : (
                    "Запросить звонок"
                  )}
                </button>
                {status === "error" && (
                  <p className="text-red-500 text-sm text-center mt-4">Произошла ошибка. Пожалуйста, попробуйте еще раз.</p>
                )}
                <p className="text-xs text-gray-500 text-center mt-4">Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

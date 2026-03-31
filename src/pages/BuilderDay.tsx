import { ArrowRight, CheckCircle2 } from "lucide-react"
import { TrustStrip } from "@/components/TrustStrip"
import { MainCta } from "@/components/MainCta"
import { FitAssessment } from "@/components/sections/FitAssessment"
import { useScrollVisible } from "@/hooks/useScrollVisible"
import { V2Hero } from "@/components/ui/V2Hero"
import { V2Card } from "@/components/ui/V2Card"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"

const fitItems = [
  { text: "Есть собранная команда или группа 30–40 человек", fit: true },
  { text: "Есть конкретная рабочая задача или 2–3 понятных сценария", fit: true },
  { text: "Тема признана руководством, согласование не нужно", fit: true },
  { text: "Нужен быстрый практический результат, а не ещё один общий разговор", fit: true },
  { text: "Руководство ещё только решает, стоит ли идти в тему ИИ", fit: false },
  { text: "Нет конкретной задачи, вокруг которой собирать агента", fit: false },
  { text: "Компании нужен не один день, а полноценная программа от пилота к масштабу", fit: false },
  { text: "Человек ищет личную программу, а не формат для команды", fit: false },
]

const preparation = [
  { title: "Названная задача", desc: "Одна реальная рабочая задача или 2–3 типовых сценария, вокруг которых команда будет собирать агента. Если задача ещё формируется, WMT поможет уточнить на этапе подготовки." },
  { title: "Понятный состав", desc: "Кто участвует и зачем именно эти люди должны пройти день вместе. Оптимально 30–40 человек." },
  { title: "2–3 рабочих документа", desc: "Регламенты, инструкции, отчёты или примеры, на которых команда будет тренировать память агента. Если данные чувствительные, WMT дает обезличенные примеры." },
  { title: "Владелец следующего шага", desc: "Кто внутри компании заберёт результат дня и переведёт его в пилоты, команду-чемпиона или следующую программу." },
  { title: "Рабочая готовность", desc: "Помещение, техника, интернет и готовность участников реально работать руками. Режим лекции здесь не работает." },
]

const blocks = [
  { num: "01", time: "30 мин", title: "Мозг", desc: "Как выбрать модель под задачу. Участники берут реальную задачу, сравнивают GPT-4o и DeepSeek-R1 на своих данных. Не по слухам, а по результату." },
  { num: "02", time: "45 мин", title: "Память", desc: "Как дать агенту рабочий контекст. Загружают документы компании, строят базу знаний через NotebookLM и Kimi, извлекают правила принятия решений." },
  { num: "03", time: "45 мин", title: "Руки", desc: "Как собрать цепочку действий. Работают в n8n: получают готовый шаблон, адаптируют под свою задачу, запускают и видят, как агент проходит по шагам. Никакого кода." },
  { num: "04", time: "105 мин", title: "Логика", desc: "Как сделать агента устойчивым. Переносят агента в экосистему Claude: подключают RAG-контекст через OpenClaw, ломают агента в Claude Cowork (группы атакуют агентов друг друга), добавляют финальную логику в Claude Code." },
  { num: "05", time: "60 мин", title: "Голос", desc: "Как показать результат. Собирают мини-интерфейс в Lovable, готовят 3-минутный питч. Живое демо, голосование участников." },
]

const outputs = [
  { title: "Собранный агент", desc: "Не идея «когда-нибудь собрать», а агент, который работает на реальной задаче компании." },
  { title: "Настроенный workflow в n8n", desc: "Рабочая автоматизация, которую можно запустить, проверить и доработать самостоятельно." },
  { title: "RAG-контекст на документах компании", desc: "Агент отвечает по вашим регламентам, отчётам и правилам — а не по общим данным." },
  { title: "Агент, проверенный стресс-тестом", desc: "Группы ломали агентов друг друга в Claude Cowork. Тот, который выстоял, — рабочий." },
  { title: "Мини-интерфейс для демонстрации", desc: "Результат можно не только обсуждать, но и показать коллегам: кнопка запуска, интерфейс." },
  { title: "Алгоритм повторной сборки", desc: "Участники понимают, как собрать похожего агента ещё раз. Это навык, а не разовый опыт." },
  { title: "Кандидаты в команду", desc: "После дня видно, кто реально тянет тему. Сигнал для следующих программ." },
]

const nextSteps = [
  { title: "Первый пилот", program: "Цифровой каркас", desc: "Когда нужно взять один сценарий из дня и перевести его из демонстрации в защищаемую рабочую задачу.", to: "/teams" },
  { title: "Команда-чемпион", program: "Мышление 2.0", desc: "Когда видны люди, которые могут стать внутренним ядром практиков. Им нужен плотный формат.", to: "/teams" },
  { title: "Глубокая сборка агентов", program: "n8n + Claude", desc: "Когда сильнейшие участники хотят пойти дальше в RAG, multi-agent, error handling в n8n.", to: "/teams" },
]

function BlockCard({ b, idx, visible }: { b: any, idx: number, visible: boolean }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative flex flex-col md:flex-row border border-gray-100 dark:border-white/10 rounded-2xl p-8 gap-8 transition-all duration-500 hover:border-brand/30 bg-white dark:bg-black overflow-hidden ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: visible ? `${200 + idx * 100}ms` : "0ms" }}
    >
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.6] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_40%,transparent_100%)]" 
        style={{
          backgroundImage: `linear-gradient(to right, rgba(160,160,160,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(160,160,160,0.15) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
          backgroundPosition: 'center center'
        }}
      />
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(255, 83, 49, 0.15), transparent 80%)`,
        }}
      />

      <div className="md:w-1/4 flex flex-col pt-1 relative z-10">
        <span className="text-5xl font-bold text-gray-100 dark:text-white/10 group-hover:text-brand/20 transition-colors">{b.num}</span>
        <span className="text-brand font-bold mt-2 uppercase tracking-wider text-sm">{b.time}</span>
      </div>
      <div className="md:w-3/4 relative z-10">
        <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white leading-tight">{b.title}</h3>
        <p className="text-gray-600 dark:text-white/60 leading-relaxed text-base md:text-lg">{b.desc}</p>
      </div>
    </div>
  )
}

export function BuilderDay() {
  return (
    <div className="bg-white dark:bg-black text-gray-900 dark:text-white min-h-screen transition-colors duration-300">
      <V2Hero 
        label="Agent Builder Day"
        title={<>Рабочий агент у каждого в команде. <em className="not-italic text-brand font-bold">За один день.</em></>}
        description={
          <>
            Практический интенсив для собранной команды с конкретной задачей. 5 часов работы, свой агент и алгоритм повторной сборки на выходе.
            <span className="block mt-4 text-gray-600 dark:text-white/50 text-base max-w-3xl leading-relaxed">
              Формат рассчитан на 30–40 человек. Каждый участник проходит через 5 блоков сборки: от выбора мозга модели до финального интерфейса.
            </span>
          </>
        }
        buttons={
          <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-brand text-white rounded-full px-10 py-4 font-bold hover:bg-[#e64627] transition-all duration-300 shadow-[0_8px_32px_rgba(255,83,49,0.25)] hover:-translate-y-1 transform-gpu">
            Обсудить программу <ArrowRight className="w-5 h-5 ml-1" />
          </a>
        }
      />

      <section className="py-16 md:py-32 px-4 sm:px-6 md:px-12 bg-white dark:bg-black transition-colors duration-300 border-t border-gray-100 dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <FitAssessment items={fitItems} title="Этот день даёт результат, когда команда и задача уже собраны" />
        </div>
      </section>

      <PreparationSection />
      <BlocksSection />
      <OutputsSection />
      <NextStepsSection />

      <TrustStrip />
      <MainCta />
    </div>
  )
}

function PreparationSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-16 md:py-32 px-4 sm:px-6 md:px-12 bg-white dark:bg-black border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-2xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 leading-tight">Чем конкретнее подготовка, тем сильнее результат</h2>
          <p className="text-base md:text-xl text-gray-500 dark:text-white/60 mb-12 max-w-3xl leading-relaxed">День сборки агентов не требует бюрократии. Нужен понятный контекст.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {preparation.map((p, idx) => (
              <V2Card
                key={idx}
                visible={visible}
                index={idx}
                className="h-full"
                contentClassName="p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <span className="text-brand font-bold text-2xl/none opacity-80">{String(idx + 1).padStart(2, '0')}</span>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight">{p.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-white/50 text-sm leading-relaxed relative z-10">{p.desc}</p>
              </V2Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function BlocksSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-16 md:py-32 px-4 sm:px-6 md:px-12 bg-white dark:bg-black border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-12 md:mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-2xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">Пять блоков — пять компонентов агента</h2>
          <p className="text-base md:text-xl text-gray-500 dark:text-white/60 max-w-3xl leading-relaxed">Каждая мини-группа собирает своего агента от первого компонента до финального питча.</p>
        </div>
        <div className="space-y-4 md:space-y-6">
          {blocks.map((b, idx) => (
            <BlockCard key={idx} b={b} idx={idx} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function OutputsSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-16 md:py-32 px-4 sm:px-6 md:px-12 bg-white dark:bg-black border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-2xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">После дня остаётся то, что можно использовать завтра</h2>
          <p className="text-base md:text-xl text-gray-500 dark:text-white/60 mb-12 max-w-3xl leading-relaxed">Каждый участник уходит с рабочими артефактами, а не с общими впечатлениями.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {outputs.map((o, idx) => (
              <V2Card key={idx} visible={visible} index={idx} className="h-full" contentClassName="p-6 md:p-8">
                <CheckCircle2 className="w-8 h-8 text-brand shrink-0 mb-4 relative z-10 opacity-80" />
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg relative z-10 leading-tight">{o.title}</h3>
                <p className="text-gray-600 dark:text-white/50 text-sm leading-relaxed relative z-10">{o.desc}</p>
              </V2Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function NextStepsSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-16 md:py-32 px-4 sm:px-6 md:px-12 bg-white dark:bg-black border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-12 md:mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-2xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 leading-tight">Результат должен иметь продолжение</h2>
          <p className="text-base md:text-xl text-gray-500 dark:text-white/60 max-w-3xl leading-relaxed">День сборки агентов работает сильнее, когда за ним идёт конкретный следующий шаг.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {nextSteps.map((s, idx) => (
            <V2Card key={idx} visible={visible} index={idx} className="h-full cursor-pointer" onClick={() => window.location.href = s.to} contentClassName="p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-brand transition-colors mb-3 relative z-10 leading-tight">{s.title}</h3>
              <p className="text-gray-600 dark:text-white/50 text-sm mb-8 leading-relaxed flex-1 relative z-10">{s.desc}</p>
              <div className="mt-auto relative z-10">
                <span className="inline-block text-brand text-[10px] uppercase tracking-[0.2em] font-bold mb-4 bg-brand/5 px-3 py-1 rounded-full border border-brand/10">Формат: {s.program}</span>
                <span className="flex items-center gap-2 text-gray-900 dark:text-white text-sm font-bold group-hover:gap-3 transition-all">
                  Подробнее <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </V2Card>
          ))}
        </div>
      </div>
    </section>
  )
}

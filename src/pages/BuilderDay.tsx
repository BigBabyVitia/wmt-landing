import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Link } from "react-router-dom"
import { TrustStrip } from "@/components/TrustStrip"
import { MainCta } from "@/components/MainCta"
import { FitAssessment } from "@/components/sections/FitAssessment"
import { useScrollVisible } from "@/hooks/useScrollVisible"
import { V2Hero } from "@/components/ui/V2Hero"
import { V2Card } from "@/components/ui/V2Card"

const fitItems = [
  { text: "Есть собранная команда или группа 30\u201340 человек", fit: true },
  { text: "Есть конкретная рабочая задача или 2\u20133 понятных сценария", fit: true },
  { text: "Тема признана руководством, согласование не нужно", fit: true },
  { text: "Нужен быстрый практический результат, а не ещё один общий разговор", fit: true },
  { text: "Руководство ещё только решает, стоит ли идти в тему ИИ", fit: false },
  { text: "Нет конкретной задачи, вокруг которой собирать агента", fit: false },
  { text: "Компании нужен не один день, а полноценная программа от пилота к масштабу", fit: false },
  { text: "Человек ищет личную программу, а не формат для команды", fit: false },
]

const preparation = [
  { title: "Названная задача", desc: "Одна реальная рабочая задача или 2\u20133 типовых сценария, вокруг которых команда будет собирать агента. Если задача ещё формируется, WMT поможет уточнить на этапе подготовки." },
  { title: "Понятный состав", desc: "Кто участвует и зачем именно эти люди должны пройти день вместе. Оптимально 30\u201340 человек." },
  { title: "2\u20133 рабочих документа", desc: "Регламенты, инструкции, отчёты или примеры, на которых команда будет тренировать память агента. Если данные чувствительные, WMT даёт обезличенные примеры." },
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
  { title: "Собранный агент", desc: "Не идея \u00ABкогда-нибудь собрать\u00BB, а агент, который работает на реальной задаче компании." },
  { title: "Настроенный workflow в n8n", desc: "Рабочая автоматизация, которую можно запустить, проверить и доработать самостоятельно." },
  { title: "RAG-контекст на документах компании", desc: "Агент отвечает по вашим регламентам, отчётам и правилам \u2014 а не по общим данным." },
  { title: "Агент, проверенный стресс-тестом", desc: "Группы ломали агентов друг друга в Claude Cowork. Тот, который выстоял, \u2014 рабочий." },
  { title: "Мини-интерфейс для демонстрации", desc: "Результат можно не только обсуждать, но и показать коллегам: кнопка запуска, интерфейс." },
  { title: "Алгоритм повторной сборки", desc: "Участники понимают, как собрать похожего агента ещё раз. Это навык, а не разовый опыт." },
  { title: "Кандидаты в команду", desc: "После дня видно, кто реально тянет тему. Сигнал для следующих программ." },
]

const nextSteps = [
  { title: "Первый пилот", program: "Цифровой каркас", desc: "Когда нужно взять один сценарий из дня и перевести его из демонстрации в защищаемую рабочую задачу.", to: "/teams" },
  { title: "Команда-чемпион", program: "Мышление 2.0", desc: "Когда видны люди, которые могут стать внутренним ядром практиков. Им нужен плотный формат.", to: "/teams" },
  { title: "Глубокая сборка агентов", program: "n8n + Claude", desc: "Когда сильнейшие участники хотят пойти дальше в RAG, multi-agent, error handling в n8n.", to: "/teams" },
]

export function BuilderDay() {
  return (
    <>
      <V2Hero 
        label="Agent Builder Day"
        title={<>Рабочий агент у каждого в команде. <em className="not-italic text-brand font-bold">За один день.</em></>}
        description={
          <>
            Agent Builder Day — практический день для собранной команды с конкретной задачей. 5 часов работы, мини-группы по 3–4 человека, свой агент и алгоритм повторной сборки на выходе.
            <span className="block mt-4 text-white/60 text-base max-w-3xl leading-relaxed">
              Формат рассчитан на 30–40 человек. Каждый участник проходит через 5 блоков сборки: от выбора модели до финального питча. На выходе — агент под реальную задачу компании.
            </span>
          </>
        }
        tags={["5 блоков, 5 часов", "80–85% практики", "Свой агент у каждого", "Алгоритм повторной сборки"]}
        buttons={
          <a href="#contact" className="inline-flex items-center gap-2 bg-white text-gray-900 rounded-full px-8 py-4 font-semibold hover:bg-gray-100 transition-all duration-300 shadow-[0_4px_24px_rgba(255,255,255,0.2)] hover:shadow-[0_4px_32px_rgba(255,255,255,0.4)] hover:-translate-y-0.5">
            Обсудить программу <ArrowRight className="w-5 h-5" />
          </a>
        }
      />

      <section className="py-24 px-6 md:px-12 bg-white dark:bg-[hsl(220,20%,7%)] transition-colors duration-300">
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
    </>
  )
}

function PreparationSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-gray-50/50 dark:bg-[hsl(220,18%,5%)] border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">Чем конкретнее подготовка, тем сильнее результат</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-12">Agent Builder Day не требует бюрократии. Нужен понятный контекст.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {preparation.map((p, idx) => (
              <V2Card
                key={idx}
                visible={visible}
                index={idx}
                className="!p-6 !rounded-2xl hover:border-brand/30 hover:shadow-brand/10 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <span className="text-brand font-bold text-2xl/none opacity-80">{String(idx + 1).padStart(2, '0')}</span>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{p.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed relative z-10">{p.desc}</p>
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
    <section ref={ref} className="py-24 px-6 md:px-12 bg-white dark:bg-[hsl(220,20%,7%)] border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-7xl mx-auto bg-[linear-gradient(to_right,rgba(128,128,128,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.05)_1px,transparent_1px)] bg-[size:32px_32px]">
        <div className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6">Пять блоков — пять компонентов агента</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">Каждая мини-группа собирает своего агента от первого компонента до финального питча.</p>
        </div>
        <div className="space-y-6">
          {blocks.map((b, idx) => (
            <div
              key={idx}
              className={`group flex flex-col md:flex-row border border-gray-100 dark:border-white/[0.06] rounded-2xl p-8 gap-8 transition-all duration-500 hover:border-brand/30 dark:hover:border-brand/20 hover:shadow-lg hover:shadow-brand/5 hover:-translate-y-1 bg-white/80 dark:bg-white/[0.02] backdrop-blur-sm ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: visible ? `${200 + idx * 100}ms` : "0ms" }}
            >
              <div className="md:w-1/4 flex flex-col pt-1">
                <span className="text-5xl font-semibold text-gray-200 dark:text-white/10 group-hover:text-brand/20 transition-colors">{b.num}</span>
                <span className="text-brand font-medium mt-2">{b.time}</span>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">{b.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function OutputsSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-gray-50/50 dark:bg-[hsl(220,18%,5%)] border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl font-semibold mb-4 text-gray-900 dark:text-white">После дня остаётся то, что можно использовать завтра</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-12">Каждый участник уходит с рабочими артефактами, а не с общими впечатлениями.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {outputs.map((o, idx) => (
              <V2Card key={idx} visible={visible} index={idx} delayMult={50} className="!p-6 !rounded-2xl hover:border-brand/30">
                <CheckCircle2 className="w-8 h-8 text-brand shrink-0 mb-4 relative z-10 opacity-80" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg relative z-10">{o.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed relative z-10">{o.desc}</p>
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
    <section ref={ref} className="py-24 px-6 md:px-12 bg-white dark:bg-[hsl(220,20%,7%)] border-t border-gray-100 dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">После дня у результата должен быть владелец и продолжение</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">Agent Builder Day работает сильнее, когда за ним идёт конкретный следующий шаг.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {nextSteps.map((s, idx) => (
            <Link key={idx} to={s.to} className={`group relative bg-gray-50/80 dark:bg-white/[0.03] rounded-2xl p-8 border border-gray-100 dark:border-white/[0.06] transition-all duration-500 hover:border-brand/30 dark:hover:border-brand/20 hover:shadow-lg hover:shadow-brand/10 hover:-translate-y-1 overflow-hidden ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: visible ? `${200 + idx * 120}ms` : "0ms" }}>
              <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-brand transition-colors mb-2 relative z-10">{s.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed flex-1 relative z-10">{s.desc}</p>
              <div className="mt-auto relative z-10">
                <span className="inline-block text-brand text-xs uppercase tracking-wider font-semibold mb-2 bg-brand/10 px-3 py-1 rounded-full">Формат: {s.program}</span>
                <span className="flex items-center gap-1 text-gray-900 dark:text-white text-sm font-medium mt-2 group-hover:gap-2 transition-all">
                  Подробнее <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

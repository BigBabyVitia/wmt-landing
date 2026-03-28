import { useEffect, useRef, useState } from "react"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Link } from "react-router-dom"
import { NavbarV2 } from "@/components/NavbarV2"
import { TrustStrip } from "@/components/TrustStrip"
import { MainCta } from "@/components/MainCta"
import { FitAssessment } from "@/components/sections/FitAssessment"

function useScrollVisible(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, visible }
}

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
  { title: "Владелец следующего шага", desc: "Кто внутри компании заберёт результат дня и переведёт его в пилоты, команду-чемпиона или следующую программу. Без владельца результат остаётся красивым, но бесхозным." },
  { title: "Рабочая готовность", desc: "Помещение, техника, интернет и готовность участников реально работать руками. Режим лекции здесь не работает." },
]

const blocks = [
  { num: "01", time: "30 мин", title: "Мозг", desc: "Как выбрать модель под задачу. Участники берут реальную задачу, сравнивают GPT-4o и DeepSeek-R1 на своих данных. Не по слухам, а по результату." },
  { num: "02", time: "45 мин", title: "Память", desc: "Как дать агенту рабочий контекст. Загружают документы компании, строят базу знаний через NotebookLM и Kimi, извлекают правила принятия решений. Агент отвечает по вашим документам, а не \u00ABв общем\u00BB." },
  { num: "03", time: "45 мин", title: "Руки", desc: "Как собрать цепочку действий. Работают в n8n: получают готовый шаблон, адаптируют под свою задачу, запускают и видят, как агент проходит по шагам. Никакого кода." },
  { num: "04", time: "105 мин", title: "Логика", desc: "Как сделать агента устойчивым. Переносят агента в экосистему Claude: подключают RAG-контекст через OpenClaw, ломают агента в Claude Cowork (группы атакуют агентов друг друга), добавляют финальную логику в Claude Code. После этого блока агент рабочий, а не учебный." },
  { num: "05", time: "60 мин", title: "Голос", desc: "Как показать результат. Собирают мини-интерфейс в Lovable, готовят 3-минутный питч. Живое демо, голосование участников по трём критериям: полезность, устойчивость, ясность." },
]

const outputs = [
  { title: "Собранный агент", desc: "Не идея \u00ABкогда-нибудь собрать\u00BB, а агент, который работает на реальной задаче компании. С подключённым контекстом, цепочкой действий и проверенной логикой." },
  { title: "Настроенный workflow в n8n", desc: "Рабочая автоматизация, которую можно запустить, проверить и доработать самостоятельно." },
  { title: "RAG-контекст на документах компании", desc: "Агент отвечает по вашим регламентам, отчётам и правилам \u2014 а не по общим данным из интернета." },
  { title: "Агент, проверенный стресс-тестом", desc: "Группы ломали агентов друг друга в Claude Cowork. Тот, который выстоял, \u2014 рабочий." },
  { title: "Мини-интерфейс для демонстрации", desc: "Результат можно не только обсуждать, но и показать коллегам: кнопка запуска, поле ввода, вывод ответа." },
  { title: "Алгоритм повторной сборки", desc: "Участники понимают, как собрать похожего агента ещё раз за 30\u201360 минут. Это навык, а не разовый опыт." },
  { title: "Кандидаты в команду-чемпиона", desc: "После дня видно, кто реально тянет тему. Это сигнал для следующих программ." },
]

const nextSteps = [
  { title: "Первый пилот", program: "Цифровой каркас", desc: "Когда нужно взять один сценарий из дня и перевести его из демонстрации в защищаемую рабочую задачу с владельцем и метриками.", to: "/teams" },
  { title: "Команда-чемпион", program: "Мышление 2.0", desc: "Когда после дня видны 10\u201330 человек, которые могут стать внутренним ядром практиков. Им нужен плотный формат, чтобы закрепить навык и потянуть тему дальше.", to: "/teams" },
  { title: "Глубокая сборка агентов", program: "n8n + Claude", desc: "Когда сильнейшие участники дня хотят пойти дальше: освоить n8n, Claude, RAG, multi-agent, error handling в малой группе до 6 человек за 4 занятия.", to: "/teams" },
]

export function BuilderDay() {
  return (
    <>
      {/* HERO */}
      <section className="relative w-full overflow-hidden flex flex-col pt-32 pb-24 md:pb-32 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/brand/hero-bg.webp')" }}>
        <NavbarV2 variant="inner" />
        <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto w-full">
          <span className="inline-block text-sm font-medium text-white/70 tracking-wider uppercase mb-4 animate-fade-rise">Agent Builder Day</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.15] font-semibold text-white animate-fade-rise max-w-4xl">
            Рабочий агент у каждого в команде. За один день.
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-3xl mt-8 leading-relaxed animate-fade-rise-delay">
            Agent Builder Day — практический день для собранной команды с конкретной задачей. 5 часов работы, мини-группы по 3–4 человека, свой агент и алгоритм повторной сборки на выходе.
          </p>
          <p className="text-white/60 text-base md:text-lg max-w-3xl mt-4 leading-relaxed animate-fade-rise-delay">
            Формат рассчитан на 30–40 человек. Каждый участник проходит через 5 блоков сборки агента: от выбора модели до финального питча. На выходе — не общее впечатление, а собранный агент под реальную задачу компании, настроенная цепочка действий и понятный способ повторить это самостоятельно.
          </p>
          <div className="flex flex-wrap gap-4 mt-10 animate-fade-rise-delay-2">
            {["5 блоков, 5 часов", "80\u201385% практики", "Свой агент у каждого участника", "Алгоритм повторной сборки за 30\u201360 минут"].map((t) => (
              <span key={t} className="text-white bg-white/20 px-4 py-2 rounded-full border border-white/30 backdrop-blur-sm text-sm font-medium">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FIT */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <FitAssessment items={fitItems} title="Этот день даёт результат, когда команда и задача уже собраны" />
        </div>
      </section>

      {/* ПОДГОТОВКА */}
      <PreparationSection />

      {/* 5 БЛОКОВ */}
      <BlocksSection />

      {/* РЕЗУЛЬТАТЫ */}
      <OutputsSection />

      {/* СЛЕДУЮЩИЕ ШАГИ */}
      <NextStepsSection />

      {/* TRUST */}
      <TrustStrip />

      {/* ФОРМА */}
      <MainCta />
    </>
  )
}

function PreparationSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 mb-4">Чем конкретнее подготовка, тем сильнее результат</h2>
          <p className="text-lg text-gray-500 mb-12">Agent Builder Day не требует бюрократии. Нужен понятный контекст.</p>
          <div className="space-y-6">
            {preparation.map((p, idx) => (
              <div key={idx} className="flex items-start gap-4 bg-white rounded-xl p-5 border border-gray-100 transition-all duration-500 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1">
                <span className="text-brand font-bold text-lg shrink-0 w-8">{idx + 1}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{p.title}</h3>
                  <p className="text-gray-600 text-sm">{p.desc}</p>
                </div>
              </div>
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
    <section ref={ref} className="py-24 px-6 md:px-12 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px]">
        <div className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 mb-6">Пять блоков — пять компонентов агента</h2>
          <p className="text-lg text-gray-500">Команда не «слушает про агентов». Каждая мини-группа по 3–4 человека собирает своего агента от первого компонента до финального питча.</p>
          <p className="text-base text-gray-400 mt-4 max-w-3xl">Блок за блоком участники выбирают модель, подключают память на документах компании, настраивают цепочку действий в n8n, проверяют агента на сбоях и нестандартных случаях, упаковывают результат в интерфейс и защищают его перед коллегами.</p>
        </div>
        <div className="space-y-8">
          {blocks.map((b, idx) => (
            <div
              key={idx}
              className={`flex flex-col md:flex-row border border-gray-100 rounded-xl p-6 gap-6 transition-all duration-500 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1 bg-white ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: visible ? `${200 + idx * 120}ms` : "0ms" }}
            >
              <div className="md:w-1/4 flex flex-col">
                <span className="text-5xl font-semibold text-gray-300">{b.num}</span>
                <span className="text-brand font-medium mt-2">{b.time}</span>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-2xl font-semibold mb-3">{b.title}</h3>
                <p className="text-gray-700 leading-relaxed text-lg">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 mt-12">
          {["Мини-группы по 3\u20134 человека", "Игровая механика с карточками компонентов", "Интерактивный учебный гайд для каждого участника"].map((t) => (
            <span key={t} className="text-brand bg-brand/5 px-4 py-2 rounded-full border border-brand/20 text-sm font-medium">{t}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

function OutputsSection() {
  const { ref, visible } = useScrollVisible()
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl font-semibold mb-4">После дня остаётся то, что можно использовать завтра</h2>
          <p className="text-lg text-gray-500 mb-12">Каждый участник уходит с рабочими артефактами, а не с общими впечатлениями.</p>
          <div className="space-y-5">
            {outputs.map((o, idx) => (
              <div key={idx} className="flex items-start gap-4 bg-white rounded-xl p-5 border border-gray-100 transition-all duration-500 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1">
                <CheckCircle2 className="w-6 h-6 text-brand shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{o.title}</h3>
                  <p className="text-gray-600 text-sm">{o.desc}</p>
                </div>
              </div>
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
    <section ref={ref} className="py-24 px-6 md:px-12 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 mb-4">После дня у результата должен быть владелец и продолжение</h2>
          <p className="text-lg text-gray-500">Agent Builder Day работает сильнее, когда за ним идёт конкретный следующий шаг. Вот три типичных продолжения.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {nextSteps.map((s, idx) => (
            <Link key={idx} to={s.to} className={`bg-gray-50 rounded-2xl p-8 border border-gray-100 transition-all duration-500 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1 group ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: visible ? `${200 + idx * 120}ms` : "0ms" }}>
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-brand transition-colors mb-2">{s.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{s.desc}</p>
              <span className="inline-block text-brand text-sm font-semibold mb-2">Программа: {s.program}</span>
              <span className="inline-flex items-center gap-1 text-brand text-sm font-medium mt-2">
                Подробнее <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

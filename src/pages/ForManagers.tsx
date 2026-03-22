import { InnerHero } from "../components/InnerHero"
import { ContactForm } from "../components/ContactForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export function ForManagers() {
  const problems = [
    { title: "Совет ждёт план по ИИ, но его некому собрать", desc: "Каждая функция тянет в свою сторону: маркетинг хочет генерацию, ИТ — автоматизацию, финансы — аналитику. Собственник ждёт конкретику: что запускать, когда, за какие деньги." },
    { title: "Вы слышите про ИИ каждый день, но не видели его в работе", desc: "Презентации есть. Статьи прочитаны. Живых агентов в реальном бизнес-процессе так и не видели ни разу. Решения принимать не на чем." },
    { title: "Нужно объяснить совету, что реально, а что хайп", desc: "Без живой демонстрации и конкретных цифр ROI любая стратегия выглядит как предположение. На совет нужно прийти с фактами, а не с верой." },
    { title: "Подрядчик предложил ИИ-проект на миллионы, но вы не можете оценить стоимость", desc: "Вам принесли proposal на 10-50 млн рублей. Звучит убедительно, но вы не можете отличить разумный проект от переплаты." }
  ]

  const program = [
    { num: "01", time: "20 минут", title: "ИИ как инфраструктура + live-демо", text: "Как ИИ меняет бизнес-логику целых отраслей. Live-демо: агент, который за 3 минуты делает работу, на которую аналитик тратит день." },
    { num: "02", time: "30 минут", title: "15 кейсов с ROI", text: "Примеры из HR, финансов, маркетинга, операций и ИТ с цифрами ROI. Видео-разбор: как агент обрабатывает входящие заявки." },
    { num: "03", time: "25 минут", title: "Road-map на 90 дней", text: "Конкретный road-map: неделя 1-4 аудит процессов, неделя 5-8 пилот с агентом, неделя 9-12 масштабирование." },
    { num: "04", time: "25 минут", title: "Агентские системы — ИИ, который действует", text: "Разница между чат-ботом и агентом. Три типа агентов: исполнитель, аналитик, координатор." },
    { num: "05", time: "20 минут", title: "Экспресс-аудит — где ИИ даст вам максимум", text: "Интерактивное голосование: вы выбираете процессы своей компании. Спикер в реальном времени показывает, как агент решает эту задачу." }
  ]

  return (
    <>
      <InnerHero
        formatName="Стратегическая сессия"
        headline="За 2 часа — ясность по ИИ: что запускать и почему"
        subheadline="Стратегическая сессия с Игорем Никитиным. Три live-демо агентов. 15 бизнес-кейсов с цифрами ROI. Готовый road-map на 90 дней. Для CEO, собственника и совета директоров."
        pills={["3 live-демо агентов", "15 кейсов с ROI", "road-map 90 дней — ваш"]}
      />

      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-semibold mb-12">Эта сессия для вас, если</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {problems.map((p, i) => (
              <Card key={i} className="border border-gray-100 bg-white rounded-2xl p-4">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">{p.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{p.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="program" className="py-24 px-6 md:px-12 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-semibold mb-6">Что происходит за 1.5-2 часа</h2>
          <p className="text-xl text-gray-600 mb-16">Пять блоков. Каждый заканчивается конкретным результатом. Три live-демо агентов.</p>
          
          <div className="space-y-12">
            {program.map((b, i) => (
              <div key={i} className="flex flex-col md:flex-row border-b border-gray-200 pb-12 gap-8">
                <div className="md:w-1/4 flex flex-col">
                  <span className="text-5xl font-semibold text-gray-300">{b.num}</span>
                  <span className="text-brand font-medium mt-2">{b.time}</span>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-2xl font-semibold mb-4">{b.title}</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">{b.text}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <a href="#contact" className="inline-block bg-brand text-white rounded-full px-10 py-4 font-medium hover:bg-[#e64627] transition-colors text-lg">
              Обсудить задачу и адаптацию кейсов
            </a>
          </div>
        </div>
      </section>
      
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-semibold mb-16">Что вы уносите после сессии</h2>
          <div className="space-y-8">
            <div className="flex items-start">
              <CheckCircle2 className="w-8 h-8 text-brand shrink-0 mr-6 mt-1" />
              <div>
                <h3 className="text-2xl font-semibold mb-3">Видели своими глазами, как работают ИИ-агенты</h3>
                <p className="text-gray-600 text-lg leading-relaxed">Не слайды, а живые демонстрации. Три агента: аналитик, координатор, исполнитель.</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="w-8 h-8 text-brand shrink-0 mr-6 mt-1" />
              <div>
                <h3 className="text-2xl font-semibold mb-3">Road-map запуска ИИ за 90 дней</h3>
                <p className="text-gray-600 text-lg leading-relaxed">Конкретный шаблон: неделя 1-4, неделя 5-8, неделя 9-12. Заполняемый. С этапами, ответственными и метриками.</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="w-8 h-8 text-brand shrink-0 mr-6 mt-1" />
              <div>
                <h3 className="text-2xl font-semibold mb-3">Понимание разницы между «чат-бот» и «агентская система»</h3>
                <p className="text-gray-600 text-lg leading-relaxed">И почему второе в 10x ценнее. Рамка, которую вы используете для оценки любого ИИ-предложения.</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="w-8 h-8 text-brand shrink-0 mr-6 mt-1" />
              <div>
                <h3 className="text-2xl font-semibold mb-3">1 конкретная идея для вашего бизнеса</h3>
                <p className="text-gray-600 text-lg leading-relaxed">Не абстрактный совет, а конкретный процесс вашей компании, который агент может взять на себя.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="budget" className="py-24 px-6 md:px-12 bg-gray-50 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
            {/* Бюджет */}
            <div className="mb-12">
                <h2 className="text-4xl font-semibold mb-6">Бюджет: от 350 тыс. руб.</h2>
                <p className="text-xl text-gray-600 mb-8">Стратегическая сессия + live-демо (1.5-2 часа)</p>
                <p className="text-gray-700 text-lg leading-relaxed mb-10 max-w-3xl">Финальный бюджет зависит от числа участников, адаптации под вашу отрасль, подбора кейсов и логистики. Мы рассчитаем точную стоимость после обсуждения задачи.</p>
                <a href="#contact" className="inline-block bg-brand text-white rounded-full px-10 py-4 font-medium hover:bg-[#e64627] transition-colors text-lg">
                    Обсудить бюджет
                </a>
            </div>

            {/* Спикер — горизонтальная карточка */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col sm:flex-row gap-6 max-w-2xl">
                <img
                  src="/experts/nikitin-large.webp"
                  alt="Игорь Никитин"
                  className="w-36 sm:w-40 self-stretch object-cover object-top rounded-xl flex-shrink-0"
                />
                <div className="flex flex-col justify-between flex-1 gap-4">
                    <div>
                        <h3 className="text-xl font-semibold">Игорь Никитин</h3>
                        <p className="text-brand font-medium text-sm mt-1">Фаундер WMT AI</p>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start gap-2.5 bg-gray-100 rounded-xl px-4 py-3">
                        <span className="text-lg mt-0.5">🏆</span>
                        <p className="text-sm text-gray-700 font-medium">Победитель глобального конкурса Anthropic — единственный в мире</p>
                      </div>
                      <div className="flex items-start gap-2.5 bg-gray-100 rounded-xl px-4 py-3">
                        <span className="text-lg mt-0.5">🎓</span>
                        <p className="text-sm text-gray-700 font-medium">Эксклюзивное право обучения 100 специалистов от создателей Claude</p>
                      </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <ContactForm />
    </>
  )
}

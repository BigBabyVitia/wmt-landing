import { InnerHero } from "../components/InnerHero"
import { ContactForm } from "../components/ContactForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ImplementationWave() {
  const modules = [
    { num: "01", title: "Пилот", desc: "Учимся базовому промптингу по форматам: роль, контекст, задача. Метапромптинг." },
    { num: "02", title: "Архитектор", desc: "Безопасность ИБ. Превращение текстов в структуры данных, JSON, CSV и таблицы." },
    { num: "03", title: "Автоматизатор", desc: "Строим агентов. Решаем самую ненавистную задачу 80% вашей рутины." },
    { num: "04", title: "Творец", desc: "Создание видео в Kling, презентаций в Gamma, музыки в Suno и лендингов в Lovable." },
    { num: "05", title: "Стратег", desc: "ИИ как коуч. Репетиции сложных переговоров. Авторское право и защита." }
  ]

  return (
    <>
      <InnerHero
        formatName="Волна"
        headline="50–500 сотрудников начнут работать с ИИ за 10 недель"
        subheadline="Онлайн-марафон, 30 занятий, 5 модулей. Каждое занятие — практика, никаких записей. Геймификация, рейтинги, соревнования держат вовлечение на уровне 90%."
        pills={["30 занятий", "10 недель", "Вовлечение 90%"]}
      />

      <section className="py-24 px-6 md:px-12 bg-white dark:bg-[hsl(220,20%,7%)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-semibold mb-12">Результат на трёх уровнях</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border border-gray-100 dark:border-white/[0.06] rounded-2xl bg-white dark:bg-[hsl(220,20%,7%)] ">
              <CardHeader><CardTitle className="text-xl text-brand">Уровень: Сотрудник</CardTitle></CardHeader>
              <CardContent><p className="text-gray-600 dark:text-gray-400 dark:text-gray-500">Осваивает промптинг, агентов и контент. Работает с ИИ не из-под палки, а из-за кратного роста скорости своей работы.</p></CardContent>
            </Card>
            <Card className="border border-gray-100 dark:border-white/[0.06] rounded-2xl bg-white dark:bg-[hsl(220,20%,7%)] ">
              <CardHeader><CardTitle className="text-xl text-brand">Уровень: Руководитель</CardTitle></CardHeader>
              <CardContent><p className="text-gray-600 dark:text-gray-400 dark:text-gray-500">Видит прозрачные борды: прогресс, доходимость, рейтинги. Знает внутренних амбассадоров ИИ поименно.</p></CardContent>
            </Card>
            <Card className="border border-gray-100 dark:border-white/[0.06] rounded-2xl bg-white dark:bg-[hsl(220,20%,7%)] ">
              <CardHeader><CardTitle className="text-xl text-brand">Уровень: Компания</CardTitle></CardHeader>
              <CardContent><p className="text-gray-600 dark:text-gray-400 dark:text-gray-500">Растет корпоративная база знаний: лучшие промпты и агенты пополняют копилку. Бизнес говорит на едином цифровом языке.</p></CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="program" className="py-24 px-6 md:px-12 bg-gray-50 dark:bg-[hsl(220,18%,10%)] border-t border-gray-100 dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-semibold mb-16">5 модулей на 10 недель</h2>
          <div className="space-y-12">
            {modules.map((b, i) => (
              <div key={i} className="flex flex-col md:flex-row border-b border-gray-200 dark:border-white/10 pb-12 gap-8">
                <div className="md:w-1/4 flex flex-col">
                  <span className="text-5xl font-semibold text-gray-300">{b.num}</span>
                  <span className="text-brand font-medium mt-2">Модуль {b.num}</span>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-2xl font-semibold mb-4">{b.title}</h3>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-lg">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="budget" className="py-24 px-6 md:px-12 bg-white dark:bg-[hsl(220,20%,7%)]">
        <div className="max-w-7xl mx-auto flex gap-12 flex-col lg:flex-row items-center">
            <div className="lg:w-2/3">
                <h2 className="text-4xl font-semibold mb-6">Бюджет: от 800 тыс. руб. за волну</h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 dark:text-gray-500 mb-8">Запуск на 50+ человек. Масштабируется до 500+.</p>
                <div className="prose prose-lg text-gray-700 dark:text-gray-200 mb-10">
                    <p>Включены 10 недель сопровождения, рейтинги геймификации, проверки заданий, а также адаптация под корпоративные политики безопасности.</p>
                </div>
                <a href="#contact" className="inline-block bg-brand text-white rounded-full px-10 py-4 font-medium hover:bg-[#e64627] transition-colors">
                    Обсудить запуск марафона
                </a>
            </div>
        </div>
      </section>

      <ContactForm />
    </>
  )
}

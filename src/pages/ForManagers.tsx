import { InnerHero } from "../components/InnerHero"
import { ContactForm } from "../components/ContactForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, ArrowRight, Zap, Target, Shield, Box, Layers } from "lucide-react"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { useScrollVisible } from "@/hooks/useScrollVisible"
import { AnimatedCard, CardVisual, Visual2 } from "@/components/ui/animated-card-chart"

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

      <DigitalSkeletonSection />

      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-white dark:bg-[hsl(220,20%,7%)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-semibold mb-12 tracking-tight">Эта сессия для вас, если</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {problems.map((p, i) => (
              <Card key={i} className="border border-gray-100 dark:border-white/[0.06] bg-white dark:bg-[hsl(220,20%,7%)] rounded-2xl p-4 transition-all hover:border-brand/20">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">{p.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 dark:text-gray-500 leading-relaxed">{p.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="program" className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-gray-50 dark:bg-[hsl(220,18%,10%)] border-t border-gray-100 dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-semibold mb-6 tracking-tight">Что происходит за 1.5-2 часа</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 dark:text-gray-500 mb-16">Пять блоков. Каждый заканчивается конкретным результатом. Три live-демо агентов.</p>
          
          <div className="space-y-12">
            {program.map((b, i) => (
              <div key={i} className="flex flex-col md:flex-row border-b border-gray-200 dark:border-white/10 pb-12 gap-8">
                <div className="md:w-1/4 flex flex-col">
                  <span className="text-5xl font-semibold text-gray-300">0{i+1}</span>
                  <span className="text-brand font-medium mt-2">{b.time}</span>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-2xl font-semibold mb-4">{b.title}</h3>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-lg">{b.text}</p>
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
      
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-white dark:bg-[hsl(220,20%,7%)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-semibold mb-16 tracking-tight">Что вы уносите после сессии</h2>
          <div className="space-y-8">
            <div className="flex items-start group">
              <CheckCircle2 className="w-8 h-8 text-brand shrink-0 mr-6 mt-1 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="text-2xl font-semibold mb-3">Видели своими глазами, как работают ИИ-агенты</h3>
                <p className="text-gray-600 dark:text-gray-400 dark:text-gray-500 text-lg leading-relaxed">Не слайды, а живые демонстрации. Три агента: аналитик, координатор, исполнитель.</p>
              </div>
            </div>
            <div className="flex items-start group">
              <CheckCircle2 className="w-8 h-8 text-brand shrink-0 mr-6 mt-1 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="text-2xl font-semibold mb-3">Road-map запуска ИИ за 90 дней</h3>
                <p className="text-gray-600 dark:text-gray-400 dark:text-gray-500 text-lg leading-relaxed">Конкретный шаблон: неделя 1-4, неделя 5-8, неделя 9-12. Заполняемый. С этапами, ответственными и метриками.</p>
              </div>
            </div>
            <div className="flex items-start group">
              <CheckCircle2 className="w-8 h-8 text-brand shrink-0 mr-6 mt-1 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="text-2xl font-semibold mb-3">Понимание разницы между «чат-бот» и «агентская система»</h3>
                <p className="text-gray-600 dark:text-gray-400 dark:text-gray-500 text-lg leading-relaxed">И почему второе в 10x ценнее. Рамка, которую вы используете для оценки любого ИИ-предложения.</p>
              </div>
            </div>
            <div className="flex items-start group">
              <CheckCircle2 className="w-8 h-8 text-brand shrink-0 mr-6 mt-1 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="text-2xl font-semibold mb-3">1 конкретная идея для вашего бизнеса</h3>
                <p className="text-gray-600 dark:text-gray-400 dark:text-gray-500 text-lg leading-relaxed">Не абстрактный совет, а конкретный процесс вашей компании, который агент может взять на себя.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="budget" className="py-16 md:py-32 px-4 sm:px-6 md:px-12 bg-gray-50 dark:bg-[hsl(220,18%,10%)] border-t border-b border-gray-100 dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">Варианты взаимодействия</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
              {/* Option 1 */}
              <div className="bg-white dark:bg-[hsl(220,20%,7%)] rounded-[2.5rem] border border-gray-200 dark:border-white/10 p-8 md:p-12 transition-all hover:border-brand/30">
                <div className="flex justify-between items-start mb-10">
                   <div className="p-3 bg-brand/10 border border-brand/20 rounded-2xl">
                    <Target className="w-8 h-8 text-brand" />
                   </div>
                   <span className="text-gray-400 dark:text-white/40 text-[10px] font-bold uppercase tracking-widest leading-none">Формат 01</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Стратегическая сессия</h3>
                <p className="text-gray-500 mb-8 leading-relaxed">Быстрое погружение, live-демо и формирование road-map на 90 дней.</p>
                <div className="space-y-4 mb-10">
                  <div className="flex justify-between border-b border-gray-200 dark:border-white/5 pb-2">
                    <span className="text-sm text-gray-400">Длительность</span>
                    <span className="text-sm font-semibold">1.5–2 часа</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 dark:border-white/5 pb-2">
                    <span className="text-sm text-gray-400">Участники</span>
                    <span className="text-sm font-semibold">до 15 человек</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="text-sm text-gray-400">Бюджет</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">от 350 тыс. руб.</span>
                  </div>
                </div>
                <a href="#contact" className="inline-flex w-full items-center justify-center bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl px-8 py-4 font-bold hover:bg-gray-200 dark:hover:bg-white/10 transition-all">
                  Забронировать дату
                </a>
              </div>

              {/* Option 2 */}
              <div className="bg-white dark:bg-[hsl(220,20%,7%)] rounded-[2.5rem] border border-brand/30 bg-brand/[0.02] p-8 md:p-12 transition-all hover:border-brand/50 relative overflow-hidden shadow-2xl shadow-brand/10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 blur-3xl pointer-events-none" />
                <div className="flex justify-between items-start mb-10 relative z-10">
                   <div className="p-3 bg-brand text-white rounded-2xl">
                    <Layers className="w-8 h-8" />
                   </div>
                   <span className="text-brand text-[10px] font-bold uppercase tracking-widest leading-none">Формат 02</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Цифровой каркас</h3>
                <p className="text-gray-500 mb-8 leading-relaxed">Построение архитектуры, аудит процессов и запуск первого работающего пилота.</p>
                <div className="space-y-4 mb-10 relative z-10">
                  <div className="flex justify-between border-b border-gray-200 dark:border-white/10 pb-2">
                    <span className="text-sm text-gray-400">Длительность</span>
                    <span className="text-sm font-semibold">1–2 дня</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 dark:border-white/10 pb-2">
                    <span className="text-sm text-gray-400">Участники</span>
                    <span className="text-sm font-semibold">до 30 человек</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="text-sm text-gray-400">Бюджет</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">от 900 тыс. руб.</span>
                  </div>
                </div>
                <a href="#contact" className="inline-flex w-full items-center justify-center bg-brand text-white rounded-2xl px-8 py-4 font-bold hover:bg-[#fb4119] transition-all shadow-xl shadow-brand/20">
                  Обсудить архитектуру
                </a>
              </div>
            </div>

            {/* Спикер — горизонтальная карточка */}
            <div className="bg-white dark:bg-[hsl(220,20%,7%)] rounded-[2.5rem] border border-gray-200 dark:border-white/10 p-8 md:p-10 flex flex-col lg:flex-row gap-10 items-center lg:items-start max-w-4xl mx-auto">
                <div className="relative shrink-0">
                  <img
                    src="/experts/nikitin-large.webp"
                    alt="Игорь Никитин"
                    className="w-44 h-44 lg:w-56 lg:h-56 object-cover object-top rounded-3xl"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-gray-200 dark:ring-white/10 rounded-3xl" />
                </div>
                <div className="flex flex-col justify-between flex-1 gap-6 text-center lg:text-left">
                    <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">Игорь Никитин</h3>
                        <p className="text-brand font-bold uppercase tracking-widest text-xs mt-2">Фаундер WMT AI</p>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-start gap-4 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-6 py-4 transition-all hover:bg-gray-200 dark:hover:bg-white/[0.08]">
                        <span className="text-xl shrink-0 mt-0.5">🏆</span>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">Победитель глобального конкурса Anthropic — единственный в мире</p>
                      </div>
                      <div className="flex items-start gap-4 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-6 py-4 transition-all hover:bg-gray-200 dark:hover:bg-white/[0.08]">
                        <span className="text-xl shrink-0 mt-0.5">🎓</span>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">Эксклюзивное право обучения 100 специалистов от создателей Claude</p>
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

function DigitalSkeletonSection() {
  const { ref, visible } = useScrollVisible(0.15)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const features = [
    { 
      title: "Анализ ИИ-потенциала", 
      desc: "Находим процессы, где внедрение агента даст максимальный ROI и разгрузит команду уже в первый месяц.",
      icon: <Target className="w-6 h-6" />
    },
    { 
      title: "Архитектура интеграции", 
      desc: "Проектируем безопасную систему: как ИИ будет работать с вашими данными без риска утечки конфиденциальной информации.",
      icon: <Shield className="w-6 h-6" />
    },
    { 
      title: "Запуск первого пилота", 
      desc: "Итогом сессии становится живой, работающий агент, который решает вашу реальную бизнес-задачу.",
      icon: <Zap className="w-6 h-6" />
    }
  ]

  return (
    <section ref={ref} className="py-20 md:py-40 px-4 sm:px-6 md:px-12 bg-white dark:bg-black transition-colors duration-500 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="max-w-3xl mb-16 md:mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/10 border border-brand/20 rounded-full mb-6">
              <Box className="w-4 h-4 text-brand" />
              <span className="text-brand text-[10px] font-bold uppercase tracking-widest italic">ИНТЕНСИВ 2 ДНЯ</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-8 leading-tight">
              «Цифровой каркас»: <br />
              <span className="text-gray-400 dark:text-white/40 italic">Архитектура и первый пилот</span>
            </h2>
            <p className="text-gray-500 dark:text-white/50 text-xl md:text-2xl leading-relaxed max-w-2xl italic">
              Переход от стратегии к реальности. Построение фундамента ИИ-трансформации вашей компании за 2 дня.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Visual Part */}
            <div className="lg:col-span-5 h-full">
              <AnimatedCard className="h-full group/card relative">
                <CardVisual className="h-[300px] lg:h-full w-full">
                   <Visual2 mainColor="#ff5331" />
                </CardVisual>
                
                {/* Meta Tags for the card */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2 z-20">
                   {["Офлайн", "1–2 дня", "до 30 человек"].map((tag, i) => (
                     <span key={i} className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold text-white tracking-widest whitespace-nowrap">
                       {tag}
                     </span>
                   ))}
                </div>
              </AnimatedCard>
            </div>

            {/* Features Part */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div 
                className="relative group bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.08] rounded-[3rem] p-8 md:p-12 transition-all duration-700 hover:border-brand/40 overflow-hidden flex-1 h-full"
                onMouseMove={handleMouseMove}
              >
                 {/* Grid Pattern */}
                 <div 
                    className="absolute inset-0 pointer-events-none opacity-[0.6] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)]" 
                    style={{
                      backgroundImage: `linear-gradient(to right, rgba(128,128,128,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(128,128,128,0.18) 1px, transparent 1px)`,
                      backgroundSize: '80px 80px',
                      backgroundPosition: 'center center'
                    }}
                  />

                  {/* Mouse Glow */}
                  <motion.div
                    className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition duration-500 group-hover:opacity-100"
                    style={{
                      background: useMotionTemplate`radial-gradient(700px circle at ${mouseX}px ${mouseY}px, rgba(255, 83, 49, 0.18), transparent 80%)`,
                    }}
                  />

                  <div className="relative z-10 space-y-10 h-full flex flex-col justify-center">
                    {features.map((f, i) => (
                      <div key={i} className="flex gap-6 group/item">
                         <div className="p-4 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl shrink-0 group-hover/item:border-brand/40 transition-colors">
                            <div className="text-brand">{f.icon}</div>
                         </div>
                         <div className="space-y-2">
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover/item:text-brand transition-colors">{f.title}</h4>
                            <p className="text-gray-500 dark:text-white/50 leading-relaxed text-base">{f.desc}</p>
                         </div>
                      </div>
                    ))}
                  </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <a href="#contact" className="inline-flex items-center gap-4 text-brand font-bold tracking-[0.15em] uppercase text-xs group hover:gap-6 transition-all">
                  Получить план интенсива <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


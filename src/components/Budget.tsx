export function Budget() {
  return (
    <section id="budget" className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-50 rounded-3xl p-10 md:p-16 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 mb-4">
            Не знаете, с чего начать?
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Пришлите задачу — мы подскажем формат, дадим ориентир по бюджету и срокам.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#apply" className="bg-brand text-white hover:bg-[#e64627] transition-colors rounded-full px-8 py-4 font-medium text-lg hover:scale-[1.03] transition-transform">
              Обсудить задачу
            </a>
            <a href="#apply" className="bg-white text-gray-900 hover:bg-gray-100 transition-colors rounded-full px-8 py-4 font-medium text-lg">
              Узнать бюджет
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

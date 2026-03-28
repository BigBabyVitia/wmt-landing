interface ProgramBlockProps {
  num: string
  time: string
  title: string
  text: string
}

export function ProgramBlock({ num, time, title, text }: ProgramBlockProps) {
  return (
    <div className="flex flex-col md:flex-row border-b border-gray-200 pb-12 gap-8">
      <div className="md:w-1/4 flex flex-col">
        <span className="text-5xl font-semibold text-gray-300">{num}</span>
        <span className="text-brand font-medium mt-2">{time}</span>
      </div>
      <div className="md:w-3/4">
        <h3 className="text-2xl font-semibold mb-4">{title}</h3>
        <p className="text-gray-700 leading-relaxed text-lg">{text}</p>
      </div>
    </div>
  )
}

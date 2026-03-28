interface SectionHeaderProps {
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export function SectionHeader({ title, subtitle, centered, className = "" }: SectionHeaderProps) {
  return (
    <div className={`mb-16 ${centered ? "text-center" : ""} ${className}`}>
      <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-6 max-w-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg md:text-xl text-gray-500 ${centered ? "mx-auto" : ""} max-w-3xl`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

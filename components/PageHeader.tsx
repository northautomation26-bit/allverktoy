import { type LucideIcon } from 'lucide-react'

type Props = {
  title: string
  subtitle?: string
  icon?: LucideIcon
  badge?: string
}

export default function PageHeader({ title, subtitle, icon: Icon, badge }: Props) {
  return (
    <div className="mb-8">
      {badge && (
        <span className="inline-block mb-3 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
          {badge}
        </span>
      )}
      <div className="flex items-start gap-4">
        {Icon && (
          <div className="hidden sm:flex shrink-0 w-14 h-14 rounded-2xl bg-primary/10 items-center justify-center text-primary">
            <Icon size={28} />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h1 className="mb-2 break-words">{title}</h1>
          {subtitle && <p className="text-muted text-lg">{subtitle}</p>}
        </div>
      </div>
    </div>
  )
}

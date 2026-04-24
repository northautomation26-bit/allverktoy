import { Info, Lightbulb, AlertTriangle, CheckCircle2 } from 'lucide-react'
import type { ReactNode } from 'react'

type Type = 'tip' | 'warning' | 'info' | 'success'

const config: Record<Type, { icon: typeof Info; bg: string; border: string; text: string }> = {
  tip: {
    icon: Lightbulb,
    bg: 'bg-accent/10',
    border: 'border-accent/30',
    text: 'text-accent',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-danger/10',
    border: 'border-danger/30',
    text: 'text-danger',
  },
  info: {
    icon: Info,
    bg: 'bg-primary/10',
    border: 'border-primary/30',
    text: 'text-primary',
  },
  success: {
    icon: CheckCircle2,
    bg: 'bg-success/10',
    border: 'border-success/30',
    text: 'text-success',
  },
}

type Props = {
  type?: Type
  title?: string
  children: ReactNode
}

export default function InfoBox({ type = 'info', title, children }: Props) {
  const c = config[type]
  const Icon = c.icon
  return (
    <div className={`rounded-2xl border ${c.bg} ${c.border} p-4 sm:p-5`}>
      <div className="flex items-start gap-3">
        <Icon size={20} className={`shrink-0 mt-0.5 ${c.text}`} />
        <div className="flex-1 min-w-0">
          {title && <div className={`font-semibold mb-1 ${c.text}`}>{title}</div>}
          <div className="text-sm text-text leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  )
}

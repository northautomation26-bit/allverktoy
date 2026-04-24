type Props = {
  label: string
  value: string
  unit?: string
  highlight?: boolean
  trend?: 'up' | 'down' | 'neutral'
  sublabel?: string
}

export default function ResultCard({
  label,
  value,
  unit,
  highlight = false,
  trend,
  sublabel,
}: Props) {
  const trendColor =
    trend === 'up' ? 'text-success' : trend === 'down' ? 'text-danger' : 'text-text'

  return (
    <div
      className={
        highlight
          ? 'result-box'
          : 'bg-white rounded-2xl p-5 border border-border'
      }
    >
      <div className="text-sm font-medium text-muted">{label}</div>
      <div className="mt-1 flex items-baseline gap-2 flex-wrap">
        <div className={`font-heading font-bold text-2xl sm:text-3xl ${trendColor}`}>
          {value}
        </div>
        {unit && <div className="text-muted text-sm">{unit}</div>}
      </div>
      {sublabel && <div className="mt-1 text-xs text-muted">{sublabel}</div>}
    </div>
  )
}

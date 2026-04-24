'use client'

type Series = {
  name: string
  color: string
  data: number[]
}

type Props = {
  series: Series[]
  labels?: string[]
  xLabel?: string
  yLabel?: string
  height?: number
  formatY?: (n: number) => string
}

/**
 * Enkel, avhengighetsfri SVG-linjegraf.
 * Brukes for investering, nedbetaling og andre tidsserier.
 */
export default function SVGChart({
  series,
  labels,
  xLabel,
  yLabel,
  height = 320,
  formatY = (n) => n.toLocaleString('nb-NO'),
}: Props) {
  if (series.length === 0 || series[0].data.length === 0) return null
  const width = 800
  const padding = { top: 20, right: 20, bottom: 40, left: 80 }
  const innerW = width - padding.left - padding.right
  const innerH = height - padding.top - padding.bottom

  const allValues = series.flatMap((s) => s.data)
  const maxY = Math.max(...allValues, 1)
  const minY = Math.min(0, ...allValues)
  const yRange = maxY - minY || 1
  const n = series[0].data.length

  const xAt = (i: number) => padding.left + (i / Math.max(1, n - 1)) * innerW
  const yAt = (v: number) =>
    padding.top + innerH - ((v - minY) / yRange) * innerH

  const ticks = 5
  const tickValues = Array.from({ length: ticks + 1 }, (_, i) => minY + (i / ticks) * yRange)

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Graf"
      >
        {/* Gridlines */}
        {tickValues.map((t, i) => {
          const y = yAt(t)
          return (
            <g key={i}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="#E8E3DC"
                strokeDasharray={i === 0 ? '0' : '4,4'}
              />
              <text
                x={padding.left - 10}
                y={y + 4}
                textAnchor="end"
                fontSize="11"
                fill="#64748B"
              >
                {formatY(t)}
              </text>
            </g>
          )
        })}

        {/* X-axis labels */}
        {labels &&
          labels.map((label, i) => {
            if (i % Math.max(1, Math.floor(labels.length / 6)) !== 0 && i !== labels.length - 1)
              return null
            return (
              <text
                key={i}
                x={xAt(i)}
                y={height - padding.bottom + 18}
                textAnchor="middle"
                fontSize="11"
                fill="#64748B"
              >
                {label}
              </text>
            )
          })}

        {/* Series lines with area fill on first */}
        {series.map((s, si) => {
          const points = s.data
            .map((v, i) => `${xAt(i)},${yAt(v)}`)
            .join(' ')
          const areaPath =
            `M ${xAt(0)},${yAt(0)} ` +
            s.data.map((v, i) => `L ${xAt(i)},${yAt(v)}`).join(' ') +
            ` L ${xAt(n - 1)},${yAt(0)} Z`
          return (
            <g key={si}>
              {si === 0 && (
                <path d={areaPath} fill={s.color} opacity={0.1} />
              )}
              <polyline
                points={points}
                fill="none"
                stroke={s.color}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          )
        })}

        {/* Axis titles */}
        {yLabel && (
          <text
            x={16}
            y={height / 2}
            textAnchor="middle"
            transform={`rotate(-90, 16, ${height / 2})`}
            fontSize="12"
            fill="#64748B"
            fontWeight="500"
          >
            {yLabel}
          </text>
        )}
        {xLabel && (
          <text
            x={width / 2}
            y={height - 6}
            textAnchor="middle"
            fontSize="12"
            fill="#64748B"
            fontWeight="500"
          >
            {xLabel}
          </text>
        )}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-2 px-2">
        {series.map((s, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-muted">
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ background: s.color }}
            />
            {s.name}
          </div>
        ))}
      </div>
    </div>
  )
}

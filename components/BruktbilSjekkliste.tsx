'use client'
import { useMemo } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import {
  bruktbilKategorier,
  totalAntallPunkter,
  type Severity,
} from '@/lib/bruktbilData'
import {
  Check,
  AlertTriangle,
  X,
  RotateCcw,
  Printer,
  StickyNote,
} from 'lucide-react'

type Status = 'ok' | 'unsure' | 'problem' | null

type Data = {
  states: Record<string, Status>
  notes: Record<string, string>
}

const severityBadge: Record<Severity, { label: string; classes: string }> = {
  normal: { label: 'Normal', classes: 'bg-muted/10 text-muted' },
  warning: { label: 'Viktig', classes: 'bg-accent/15 text-accent' },
  critical: { label: 'Kritisk', classes: 'bg-danger/15 text-danger' },
}

export default function BruktbilSjekkliste() {
  const [data, setData] = useLocalStorage<Data>('allverktoy:bruktbil:v1', {
    states: {},
    notes: {},
  })

  const setStatus = (id: string, status: Status) => {
    setData((d) => ({
      ...d,
      states: { ...d.states, [id]: d.states[id] === status ? null : status },
    }))
  }

  const setNote = (catId: string, text: string) => {
    setData((d) => ({ ...d, notes: { ...d.notes, [catId]: text } }))
  }

  const stats = useMemo(() => {
    let ok = 0
    let unsure = 0
    let problem = 0
    let done = 0
    Object.values(data.states).forEach((s) => {
      if (s === 'ok') ok++
      if (s === 'unsure') unsure++
      if (s === 'problem') problem++
      if (s) done++
    })
    return { ok, unsure, problem, done }
  }, [data.states])

  const pct = Math.round((stats.done / totalAntallPunkter) * 100)

  const tilbakestill = () => {
    if (confirm('Er du sikker på at du vil tilbakestille hele sjekklisten?')) {
      setData({ states: {}, notes: {} })
    }
  }

  return (
    <div className="space-y-6">
      {/* Fremgangsbanner */}
      <div className="card sticky top-2 z-20 no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-baseline gap-2 mb-2">
              <div className="font-heading font-bold text-2xl">
                {stats.done} <span className="text-muted text-base font-normal">av {totalAntallPunkter}</span>
              </div>
              <div className="text-sm text-muted">punkter sjekket</div>
            </div>
            <div className="h-2 bg-bg rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-success transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="flex gap-3 mt-3 text-sm flex-wrap">
              <span className="inline-flex items-center gap-1.5 text-success">
                <Check size={14} /> {stats.ok} OK
              </span>
              <span className="inline-flex items-center gap-1.5 text-accent">
                <AlertTriangle size={14} /> {stats.unsure} usikker
              </span>
              <span className="inline-flex items-center gap-1.5 text-danger">
                <X size={14} /> {stats.problem} problem
              </span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => window.print()}
              className="btn-secondary text-sm px-4 py-2"
              title="Skriv ut eller lagre som PDF"
            >
              <Printer size={16} /> Eksporter PDF
            </button>
            <button
              onClick={tilbakestill}
              className="btn-secondary text-sm px-4 py-2"
            >
              <RotateCcw size={16} /> Nullstill
            </button>
          </div>
        </div>
      </div>

      {/* Kategorier */}
      {bruktbilKategorier.map((kat) => {
        const katItems = kat.items
        const katDone = katItems.filter((i) => data.states[i.id]).length
        return (
          <section key={kat.id} className="card">
            <header className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{kat.icon}</span>
                <h2 className="!text-xl">{kat.title}</h2>
              </div>
              <span className="text-sm text-muted">
                {katDone} / {katItems.length}
              </span>
            </header>

            <ul className="divide-y divide-border">
              {katItems.map((item) => {
                const s = data.states[item.id] ?? null
                return (
                  <li key={item.id} className="py-3 flex flex-col sm:flex-row gap-3 sm:items-center">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2">
                        <span className="text-sm leading-relaxed">{item.label}</span>
                        <span
                          className={`shrink-0 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${severityBadge[item.severity].classes}`}
                        >
                          {severityBadge[item.severity].label}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0 no-print">
                      <button
                        onClick={() => setStatus(item.id, 'ok')}
                        className={`w-11 h-11 rounded-xl border-2 flex items-center justify-center transition-colors ${
                          s === 'ok'
                            ? 'bg-success text-white border-success'
                            : 'border-border text-muted hover:border-success hover:text-success'
                        }`}
                        aria-label="OK"
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={() => setStatus(item.id, 'unsure')}
                        className={`w-11 h-11 rounded-xl border-2 flex items-center justify-center transition-colors ${
                          s === 'unsure'
                            ? 'bg-accent text-white border-accent'
                            : 'border-border text-muted hover:border-accent hover:text-accent'
                        }`}
                        aria-label="Usikker"
                      >
                        <AlertTriangle size={18} />
                      </button>
                      <button
                        onClick={() => setStatus(item.id, 'problem')}
                        className={`w-11 h-11 rounded-xl border-2 flex items-center justify-center transition-colors ${
                          s === 'problem'
                            ? 'bg-danger text-white border-danger'
                            : 'border-border text-muted hover:border-danger hover:text-danger'
                        }`}
                        aria-label="Problem"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    {/* Print view: show status text */}
                    <div className="hidden print:block text-sm">
                      {s === 'ok' && <span className="text-success">✓ OK</span>}
                      {s === 'unsure' && <span className="text-accent">⚠ Usikker</span>}
                      {s === 'problem' && <span className="text-danger">✗ Problem</span>}
                      {!s && <span className="text-muted">Ikke sjekket</span>}
                    </div>
                  </li>
                )
              })}
            </ul>

            {/* Notater */}
            <div className="mt-4">
              <label className="flex items-center gap-2 label-text">
                <StickyNote size={14} />
                Notater for {kat.title.toLowerCase()}
              </label>
              <textarea
                value={data.notes[kat.id] || ''}
                onChange={(e) => setNote(kat.id, e.target.value)}
                placeholder="Skriv observasjoner her..."
                className="input-field min-h-[60px] resize-y text-sm"
              />
            </div>
          </section>
        )
      })}

      {/* Sammendrag */}
      <div className="card result-box">
        <h3 className="mb-3">Sammendrag</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <div className="text-3xl font-heading font-bold text-success">{stats.ok}</div>
            <div className="text-xs text-muted mt-1">OK</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-heading font-bold text-accent">{stats.unsure}</div>
            <div className="text-xs text-muted mt-1">Usikker</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-heading font-bold text-danger">{stats.problem}</div>
            <div className="text-xs text-muted mt-1">Problem</div>
          </div>
        </div>
        {stats.problem > 0 && (
          <p className="mt-4 text-sm text-danger">
            ⚠ Du har {stats.problem} problem-markering(er). Vurder nøye om disse er avtalebrytere,
            eller om de gir grunnlag for prisforhandling.
          </p>
        )}
      </div>
    </div>
  )
}

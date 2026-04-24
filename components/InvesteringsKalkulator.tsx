'use client'
import { useMemo, useState } from 'react'
import { sammensattVekst, nettoEtterSkatt } from '@/lib/finansFormler'
import { formatKr } from '@/lib/formattering'
import ResultCard from '@/components/ResultCard'
import SVGChart from '@/components/SVGChart'

const SCENARIOS = [
  { navn: 'Konservativ', rente: 4, color: '#64748B' },
  { navn: 'Forventet', rente: 7, color: '#2563EB' },
  { navn: 'Optimistisk', rente: 10, color: '#10B981' },
]

export default function InvesteringsKalkulator() {
  const [startbeløp, setStartbeløp] = useState<number>(50000)
  const [månedlig, setMånedlig] = useState<number>(3000)
  const [rente, setRente] = useState<number>(7)
  const [år, setÅr] = useState<number>(20)
  const [skatt, setSkatt] = useState<number>(37.84)

  const vekst = useMemo(
    () => sammensattVekst(startbeløp, månedlig, rente, år),
    [startbeløp, månedlig, rente, år],
  )

  const sluttverdi = vekst[vekst.length - 1]?.verdi ?? 0
  const totalInnskudd = vekst[vekst.length - 1]?.innskudd ?? 0
  const avkastning = sluttverdi - totalInnskudd

  const netto = useMemo(
    () => nettoEtterSkatt(sluttverdi, totalInnskudd, skatt),
    [sluttverdi, totalInnskudd, skatt],
  )

  // Aggreger til årsvis for grafen
  const årligData = useMemo(() => {
    const punkter: number[] = []
    const innskuddPunkter: number[] = []
    const labels: string[] = []
    for (let y = 0; y <= år; y++) {
      const p = vekst[y * 12]
      if (!p) continue
      punkter.push(Math.round(p.verdi))
      innskuddPunkter.push(Math.round(p.innskudd))
      labels.push(`${y}`)
    }
    return { punkter, innskuddPunkter, labels }
  }, [vekst, år])

  // Scenarioer for sammenligning
  const scenarios = useMemo(
    () =>
      SCENARIOS.map((s) => {
        const v = sammensattVekst(startbeløp, månedlig, s.rente, år)
        return { ...s, slutt: v[v.length - 1]?.verdi ?? 0 }
      }),
    [startbeløp, månedlig, år],
  )

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="card space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="label-text" htmlFor="start">
              Startbeløp (NOK)
            </label>
            <input
              id="start"
              type="number"
              step={1000}
              min={0}
              value={startbeløp}
              onChange={(e) => setStartbeløp(Number(e.target.value) || 0)}
              className="input-field"
            />
          </div>
          <div>
            <label className="label-text" htmlFor="mnd">
              Månedlig innskudd (NOK)
            </label>
            <input
              id="mnd"
              type="number"
              step={500}
              min={0}
              value={månedlig}
              onChange={(e) => setMånedlig(Number(e.target.value) || 0)}
              className="input-field"
            />
          </div>
          <div>
            <label className="label-text" htmlFor="avk">
              Forventet årlig avkastning (%)
            </label>
            <input
              id="avk"
              type="number"
              step={0.5}
              min={0}
              value={rente}
              onChange={(e) => setRente(Number(e.target.value) || 0)}
              className="input-field"
            />
            <p className="mt-1 text-xs text-muted">
              Global indeksfond har historisk gitt ca. 7 % etter inflasjon.
            </p>
          </div>
          <div>
            <label className="label-text" htmlFor="ar">
              Spareperiode (år)
            </label>
            <input
              id="ar"
              type="number"
              step={1}
              min={1}
              max={60}
              value={år}
              onChange={(e) => setÅr(Math.max(1, Number(e.target.value) || 1))}
              className="input-field"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="label-text" htmlFor="skatt">
              Kapitalgevinstskatt (%)
            </label>
            <input
              id="skatt"
              type="number"
              step={0.01}
              min={0}
              value={skatt}
              onChange={(e) => setSkatt(Number(e.target.value) || 0)}
              className="input-field"
            />
            <p className="mt-1 text-xs text-muted">
              Norge 2025: 37,84 % ved realisasjon (inkludert oppjusteringsfaktor).
            </p>
          </div>
        </div>
      </div>

      {/* Hovedresultater */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ResultCard
          label="Sluttverdi (brutto)"
          value={formatKr(sluttverdi)}
          highlight
          sublabel={`Etter ${år} år med ${rente} % avkastning`}
        />
        <ResultCard
          label="Sluttverdi etter skatt"
          value={formatKr(netto.nettoVerdi)}
          trend="up"
          sublabel={`Skatt: ${formatKr(netto.skatt)}`}
        />
        <ResultCard
          label="Totalt innskudd"
          value={formatKr(totalInnskudd)}
          sublabel={`Start + ${formatKr(månedlig)} × ${år * 12} mnd`}
        />
        <ResultCard
          label="Avkastning (brutto)"
          value={formatKr(avkastning)}
          trend="up"
          sublabel={`${((avkastning / Math.max(1, totalInnskudd)) * 100).toFixed(0)} % av innskudd`}
        />
      </div>

      {/* Vekstgraf */}
      <div className="card">
        <h3 className="mb-4">Verdiutvikling over tid</h3>
        <SVGChart
          series={[
            { name: 'Total verdi', color: '#2563EB', data: årligData.punkter },
            { name: 'Innskutt kapital', color: '#F59E0B', data: årligData.innskuddPunkter },
          ]}
          labels={årligData.labels}
          xLabel="År"
          yLabel="NOK"
          formatY={(n) =>
            n >= 1000000
              ? `${(n / 1000000).toFixed(1)}M`
              : n >= 1000
              ? `${Math.round(n / 1000)}k`
              : `${Math.round(n)}`
          }
        />
      </div>

      {/* Scenarioer */}
      <div className="card">
        <h3 className="mb-1">Sammenligning av avkastningsscenarier</h3>
        <p className="text-sm text-muted mb-4">
          Hvordan ender samme innskudd ut ved ulike avkastningsrater?
        </p>
        <div className="space-y-3">
          {scenarios.map((s) => {
            const max = Math.max(...scenarios.map((x) => x.slutt))
            const pct = (s.slutt / max) * 100
            return (
              <div key={s.navn}>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-semibold">
                    {s.navn}{' '}
                    <span className="text-muted text-xs font-normal">({s.rente} %)</span>
                  </span>
                  <span className="font-heading font-bold">{formatKr(s.slutt)}</span>
                </div>
                <div className="h-3 rounded-full bg-bg overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, background: s.color }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Breakdown */}
      <div className="card bg-gradient-to-br from-purple-500/5 to-purple-600/10 border-purple-500/20">
        <h3 className="mb-4">Fordeling sluttverdi</h3>
        <div className="flex h-8 rounded-xl overflow-hidden">
          <div
            className="bg-accent flex items-center justify-center text-white text-xs font-bold"
            style={{
              width: `${(totalInnskudd / Math.max(1, sluttverdi)) * 100}%`,
            }}
          >
            Innskudd
          </div>
          <div
            className="bg-primary flex items-center justify-center text-white text-xs font-bold"
            style={{
              width: `${(avkastning / Math.max(1, sluttverdi)) * 100}%`,
            }}
          >
            Avkastning
          </div>
        </div>
        <div className="flex justify-between mt-3 text-sm">
          <span className="text-muted">
            Innskudd:{' '}
            <strong className="text-text">
              {((totalInnskudd / Math.max(1, sluttverdi)) * 100).toFixed(0)} %
            </strong>
          </span>
          <span className="text-muted">
            Avkastning:{' '}
            <strong className="text-text">
              {((avkastning / Math.max(1, sluttverdi)) * 100).toFixed(0)} %
            </strong>
          </span>
        </div>
      </div>
    </div>
  )
}

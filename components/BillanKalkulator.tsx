'use client'
import { useMemo, useState } from 'react'
import { lånOppsummering } from '@/lib/finansFormler'
import { formatKr, formatProsent } from '@/lib/formattering'
import ResultCard from '@/components/ResultCard'
import { ChevronDown } from 'lucide-react'

export default function BillanKalkulator() {
  const [bilpris, setBilpris] = useState<number>(350000)
  const [egenkapital, setEgenkapital] = useState<number>(70000)
  const [rente, setRente] = useState<number>(6.5)
  const [år, setÅr] = useState<number>(5)
  const [termingebyr, setTermingebyr] = useState<number>(65)
  const [visPlan, setVisPlan] = useState(false)

  const lånebeløp = Math.max(0, bilpris - egenkapital)

  const opps = useMemo(
    () => lånOppsummering(lånebeløp, rente, år, termingebyr),
    [lånebeløp, rente, år, termingebyr],
  )

  const månedligBet = opps.månedligBetaling
  const belåningsgrad = bilpris > 0 ? (lånebeløp / bilpris) * 100 : 0

  // Data for årsvis oppsummering (for barer)
  const årligOppsummering = useMemo(() => {
    const result: { år: number; avdrag: number; renter: number; restGjeld: number }[] = []
    for (let y = 1; y <= år; y++) {
      const rader = opps.plan.slice((y - 1) * 12, y * 12)
      if (rader.length === 0) continue
      const avdrag = rader.reduce((s, r) => s + r.avdrag, 0)
      const renter = rader.reduce((s, r) => s + r.renter, 0)
      const restGjeld = rader[rader.length - 1].restGjeld
      result.push({ år: y, avdrag, renter, restGjeld })
    }
    return result
  }, [opps.plan, år])

  const maxÅrSum = Math.max(...årligOppsummering.map((y) => y.avdrag + y.renter), 1)

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="card space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="label-text" htmlFor="bilpris">
              Bilpris (NOK)
            </label>
            <input
              id="bilpris"
              type="number"
              step={1000}
              min={0}
              value={bilpris}
              onChange={(e) => setBilpris(Number(e.target.value) || 0)}
              className="input-field"
            />
          </div>
          <div>
            <label className="label-text" htmlFor="egenkapital">
              Egenkapital (NOK)
            </label>
            <input
              id="egenkapital"
              type="number"
              step={1000}
              min={0}
              value={egenkapital}
              onChange={(e) => setEgenkapital(Number(e.target.value) || 0)}
              className="input-field"
            />
            <p className="mt-1 text-xs text-muted">
              Finanstilsynet anbefaler minimum 20 % egenkapital.
            </p>
          </div>
          <div>
            <label className="label-text" htmlFor="rente">
              Nominell rente (% p.a.)
            </label>
            <input
              id="rente"
              type="number"
              step={0.1}
              min={0}
              value={rente}
              onChange={(e) => setRente(Number(e.target.value) || 0)}
              className="input-field"
            />
          </div>
          <div>
            <label className="label-text" htmlFor="aar">
              Nedbetalingstid (år)
            </label>
            <input
              id="aar"
              type="number"
              step={1}
              min={1}
              max={10}
              value={år}
              onChange={(e) => setÅr(Math.max(1, Number(e.target.value) || 1))}
              className="input-field"
            />
            <p className="mt-1 text-xs text-muted">
              Maksimalt 8 år for brukt bil, 10 år for ny bil.
            </p>
          </div>
          <div className="sm:col-span-2">
            <label className="label-text" htmlFor="gebyr">
              Termingebyr per måned (NOK)
            </label>
            <input
              id="gebyr"
              type="number"
              step={5}
              min={0}
              value={termingebyr}
              onChange={(e) => setTermingebyr(Number(e.target.value) || 0)}
              className="input-field"
            />
          </div>
        </div>
      </div>

      {/* Resultater */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ResultCard
          label="Månedlig betaling"
          value={formatKr(månedligBet)}
          highlight
          sublabel={`Inkludert termingebyr (${formatKr(termingebyr)}/mnd)`}
        />
        <ResultCard
          label="Totalt å betale"
          value={formatKr(opps.totalBetaling)}
          sublabel={`Over ${år * 12} måneder`}
        />
        <ResultCard
          label="Totale rentekostnader"
          value={formatKr(opps.totalRenter)}
          trend="down"
          sublabel={`Gebyrer: ${formatKr(opps.totalGebyrer)}`}
        />
        <ResultCard
          label="Effektiv rente"
          value={formatProsent(opps.effektivRente)}
          sublabel="Inkludert gebyrer"
        />
        <ResultCard
          label="Lånebeløp"
          value={formatKr(lånebeløp)}
          sublabel={`${belåningsgrad.toFixed(1)} % av bilpris`}
        />
        <ResultCard
          label="Egenkapital"
          value={formatKr(egenkapital)}
          sublabel={
            egenkapital / bilpris < 0.2
              ? '⚠ Under 20 % — vurder høyere egenkapital'
              : '✓ Over anbefalt 20 %'
          }
        />
      </div>

      {/* Årsvis oversikt — visualisering */}
      <div className="card">
        <h3 className="mb-4">Fordeling per år: avdrag vs renter</h3>
        <div className="space-y-2">
          {årligOppsummering.map((y) => {
            const sum = y.avdrag + y.renter
            const avdragPct = (y.avdrag / sum) * 100
            const totalPct = (sum / maxÅrSum) * 100
            return (
              <div key={y.år}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-semibold">År {y.år}</span>
                  <span className="text-muted">
                    Rest: <span className="text-text font-medium">{formatKr(y.restGjeld)}</span>
                  </span>
                </div>
                <div
                  className="relative h-7 rounded-lg overflow-hidden bg-bg"
                  style={{ width: `${totalPct}%`, minWidth: '40%' }}
                >
                  <div
                    className="absolute inset-y-0 left-0 bg-primary flex items-center justify-center"
                    style={{ width: `${avdragPct}%` }}
                  >
                    <span className="text-[10px] font-bold text-white px-2 whitespace-nowrap">
                      Avdrag {formatKr(y.avdrag)}
                    </span>
                  </div>
                  <div
                    className="absolute inset-y-0 right-0 bg-accent flex items-center justify-center"
                    style={{ width: `${100 - avdragPct}%` }}
                  >
                    <span className="text-[10px] font-bold text-white px-2 whitespace-nowrap">
                      Renter {formatKr(y.renter)}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="flex gap-4 mt-4 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-primary" /> Avdrag (reduserer gjeld)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-accent" /> Renter (kostnad)
          </span>
        </div>
      </div>

      {/* Nedbetalingsplan (togglet) */}
      <div className="card !p-0 overflow-hidden">
        <button
          onClick={() => setVisPlan((v) => !v)}
          className="w-full flex items-center justify-between p-5 hover:bg-bg transition-colors"
        >
          <span className="font-heading font-semibold text-lg">
            Fullstendig nedbetalingsplan ({opps.plan.length} måneder)
          </span>
          <ChevronDown
            size={20}
            className={`transition-transform ${visPlan ? 'rotate-180' : ''} text-muted`}
          />
        </button>
        {visPlan && (
          <div className="overflow-x-auto border-t border-border">
            <table className="w-full text-sm">
              <thead className="bg-bg sticky top-0">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Måned</th>
                  <th className="text-right px-4 py-3 font-semibold">Avdrag</th>
                  <th className="text-right px-4 py-3 font-semibold">Renter</th>
                  <th className="text-right px-4 py-3 font-semibold">Total</th>
                  <th className="text-right px-4 py-3 font-semibold">Rest</th>
                </tr>
              </thead>
              <tbody>
                {opps.plan.map((r) => (
                  <tr key={r.måned} className="border-t border-border">
                    <td className="px-4 py-2 text-muted">{r.måned}</td>
                    <td className="px-4 py-2 text-right">{formatKr(r.avdrag)}</td>
                    <td className="px-4 py-2 text-right text-accent">{formatKr(r.renter)}</td>
                    <td className="px-4 py-2 text-right font-semibold">
                      {formatKr(r.totalBetaling)}
                    </td>
                    <td className="px-4 py-2 text-right text-muted">{formatKr(r.restGjeld)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

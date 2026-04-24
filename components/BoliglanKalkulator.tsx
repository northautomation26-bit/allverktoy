'use client'
import { useMemo, useState } from 'react'
import {
  lånOppsummering,
  månedligAnnuitet,
  årSpartMedEkstra,
} from '@/lib/finansFormler'
import { formatKr, formatProsent } from '@/lib/formattering'
import ResultCard from '@/components/ResultCard'
import InfoBox from '@/components/InfoBox'
import { Check, X, ChevronDown, AlertTriangle } from 'lucide-react'

export default function BoliglanKalkulator() {
  const [boligpris, setBoligpris] = useState<number>(5000000)
  const [egenkapital, setEgenkapital] = useState<number>(750000)
  const [rente, setRente] = useState<number>(5.5)
  const [år, setÅr] = useState<number>(25)
  const [termingebyr, setTermingebyr] = useState<number>(50)
  const [årsinntekt, setÅrsinntekt] = useState<number>(750000)
  const [ekstraPerMnd, setEkstraPerMnd] = useState<number>(2000)
  const [visPlan, setVisPlan] = useState(false)

  const lånebeløp = Math.max(0, boligpris - egenkapital)
  const belåningsgrad = boligpris > 0 ? (lånebeløp / boligpris) * 100 : 0
  const gjeldsgrad = årsinntekt > 0 ? lånebeløp / årsinntekt : 0

  const opps = useMemo(
    () => lånOppsummering(lånebeløp, rente, år, termingebyr),
    [lånebeløp, rente, år, termingebyr],
  )

  const stresstest = useMemo(
    () => månedligAnnuitet(lånebeløp, rente + 3, år) + termingebyr,
    [lånebeløp, rente, år, termingebyr],
  )

  const ekstra = useMemo(
    () => årSpartMedEkstra(lånebeløp, rente, år, ekstraPerMnd),
    [lånebeløp, rente, år, ekstraPerMnd],
  )

  // Regelsjekker
  const belåningOK = belåningsgrad <= 85
  const gjeldsgradOK = gjeldsgrad <= 5
  const stresstestBetaling = stresstest
  const maxBetalingAndel = (stresstestBetaling * 12) / (årsinntekt || 1)
  const stresstestOK = maxBetalingAndel <= 0.4

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="card space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="label-text" htmlFor="boligpris">
              Boligpris (NOK)
            </label>
            <input
              id="boligpris"
              type="number"
              step={50000}
              min={0}
              value={boligpris}
              onChange={(e) => setBoligpris(Number(e.target.value) || 0)}
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
              step={10000}
              min={0}
              value={egenkapital}
              onChange={(e) => setEgenkapital(Number(e.target.value) || 0)}
              className="input-field"
            />
            <p className="mt-1 text-xs text-muted">Krav: minimum 15 % (2025).</p>
          </div>
          <div>
            <label className="label-text" htmlFor="rente">
              Nominell rente (% p.a.)
            </label>
            <input
              id="rente"
              type="number"
              step={0.05}
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
              max={30}
              value={år}
              onChange={(e) => setÅr(Math.max(1, Number(e.target.value) || 1))}
              className="input-field"
            />
            <p className="mt-1 text-xs text-muted">Maksimalt 30 år.</p>
          </div>
          <div>
            <label className="label-text" htmlFor="inntekt">
              Brutto årsinntekt (NOK)
            </label>
            <input
              id="inntekt"
              type="number"
              step={10000}
              min={0}
              value={årsinntekt}
              onChange={(e) => setÅrsinntekt(Number(e.target.value) || 0)}
              className="input-field"
            />
          </div>
          <div>
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

      {/* Hovedresultater */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ResultCard
          label="Månedlig betaling"
          value={formatKr(opps.månedligBetaling)}
          highlight
          sublabel={`Over ${år} år`}
        />
        <ResultCard
          label="Stresstest (+3 %)"
          value={formatKr(stresstestBetaling)}
          trend={stresstestOK ? 'neutral' : 'down'}
          sublabel={`${((stresstestBetaling / opps.månedligBetaling - 1) * 100).toFixed(0)} % høyere enn i dag`}
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
          sublabel={`Belåningsgrad: ${belåningsgrad.toFixed(1)} %`}
        />
        <ResultCard
          label="Gjeldsgrad"
          value={`${gjeldsgrad.toFixed(2)}x`}
          sublabel="Lån delt på brutto årsinntekt"
        />
      </div>

      {/* Regelsjekk */}
      <div className="card">
        <h3 className="mb-4">Oppfyller du lånekravene (Utlånsforskriften 2025)?</h3>
        <ul className="space-y-3">
          <RegelRad
            ok={belåningOK}
            label="Belåningsgrad maks 85 %"
            detalj={`Din: ${belåningsgrad.toFixed(1)} % — ${
              belåningOK
                ? 'innenfor kravet'
                : `du mangler ${formatKr((lånebeløp - boligpris * 0.85) || 0)} i egenkapital`
            }`}
          />
          <RegelRad
            ok={gjeldsgradOK}
            label="Gjeldsgrad maks 5x brutto årsinntekt"
            detalj={`Din: ${gjeldsgrad.toFixed(2)}x — ${
              gjeldsgradOK
                ? 'innenfor kravet'
                : 'over grensen; krever særskilt fleksibilitetskvote'
            }`}
          />
          <RegelRad
            ok={stresstestOK}
            label="Stresstest: tåler +3 prosentpoeng renteøkning"
            detalj={`Stresstestet månedsbetaling: ${formatKr(stresstestBetaling)} — ${(maxBetalingAndel * 100).toFixed(0)} % av brutto månedsinntekt`}
          />
        </ul>
        {(!belåningOK || !gjeldsgradOK || !stresstestOK) && (
          <div className="mt-4">
            <InfoBox type="warning" title="Ett eller flere krav er ikke oppfylt">
              Bankene kan gi unntak innenfor fleksibilitetskvoten (maks 10 % av utlån i Oslo, 8 %
              ellers), men det er ikke garantert. Vurder høyere egenkapital, lavere kjøpsbeløp
              eller medlåntaker.
            </InfoBox>
          </div>
        )}
      </div>

      {/* Ekstra innbetaling */}
      <div className="card bg-gradient-to-br from-success/5 to-success/10 border-success/20">
        <h3 className="mb-2">Ekstra innbetaling — simulering</h3>
        <p className="text-sm text-muted mb-4">
          Hva skjer hvis du betaler litt ekstra hver måned?
        </p>
        <label className="label-text" htmlFor="ekstra">
          Ekstra per måned (NOK)
        </label>
        <input
          id="ekstra"
          type="number"
          step={500}
          min={0}
          value={ekstraPerMnd}
          onChange={(e) => setEkstraPerMnd(Number(e.target.value) || 0)}
          className="input-field"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <ResultCard
            label="Måneder spart"
            value={`${ekstra.månedSpart} mnd`}
            trend="up"
            sublabel={`≈ ${(ekstra.månedSpart / 12).toFixed(1)} år raskere nedbetalt`}
          />
          <ResultCard
            label="Renter spart"
            value={formatKr(ekstra.renterSpart)}
            trend="up"
            sublabel={`Ved ${formatKr(ekstraPerMnd)}/mnd ekstra`}
          />
        </div>
      </div>

      {/* Nedbetalingsplan */}
      <div className="card !p-0 overflow-hidden">
        <button
          onClick={() => setVisPlan((v) => !v)}
          className="w-full flex items-center justify-between p-5 hover:bg-bg transition-colors"
        >
          <span className="font-heading font-semibold text-lg">
            Årsvis nedbetalingsplan
          </span>
          <ChevronDown
            size={20}
            className={`transition-transform ${visPlan ? 'rotate-180' : ''} text-muted`}
          />
        </button>
        {visPlan && (
          <div className="overflow-x-auto border-t border-border">
            <table className="w-full text-sm">
              <thead className="bg-bg">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">År</th>
                  <th className="text-right px-4 py-3 font-semibold">Avdrag</th>
                  <th className="text-right px-4 py-3 font-semibold">Renter</th>
                  <th className="text-right px-4 py-3 font-semibold">Total</th>
                  <th className="text-right px-4 py-3 font-semibold">Rest</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: år }).map((_, i) => {
                  const rader = opps.plan.slice(i * 12, (i + 1) * 12)
                  if (rader.length === 0) return null
                  const avdrag = rader.reduce((s, r) => s + r.avdrag, 0)
                  const renter = rader.reduce((s, r) => s + r.renter, 0)
                  const total = rader.reduce((s, r) => s + r.totalBetaling, 0)
                  const restGjeld = rader[rader.length - 1].restGjeld
                  return (
                    <tr key={i} className="border-t border-border">
                      <td className="px-4 py-2 font-semibold">{i + 1}</td>
                      <td className="px-4 py-2 text-right">{formatKr(avdrag)}</td>
                      <td className="px-4 py-2 text-right text-accent">{formatKr(renter)}</td>
                      <td className="px-4 py-2 text-right font-semibold">{formatKr(total)}</td>
                      <td className="px-4 py-2 text-right text-muted">{formatKr(restGjeld)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

function RegelRad({
  ok,
  label,
  detalj,
}: {
  ok: boolean
  label: string
  detalj: string
}) {
  return (
    <li className="flex gap-3 items-start">
      <span
        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          ok ? 'bg-success/15 text-success' : 'bg-danger/15 text-danger'
        }`}
      >
        {ok ? <Check size={18} /> : <X size={18} />}
      </span>
      <div className="flex-1 min-w-0">
        <div className="font-semibold">{label}</div>
        <div className="text-sm text-muted mt-0.5">{detalj}</div>
      </div>
      {!ok && <AlertTriangle size={18} className="text-danger shrink-0 mt-1" />}
    </li>
  )
}

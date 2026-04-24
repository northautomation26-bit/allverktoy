'use client'
import { useMemo, useState } from 'react'
import { karatData } from '@/lib/gullData'
import { gullverdi } from '@/lib/finansFormler'
import { formatKr } from '@/lib/formattering'
import ResultCard from '@/components/ResultCard'
import { ExternalLink } from 'lucide-react'

const TROY_UNSE = 31.1035

export default function GullKalkulator() {
  const [spotpris, setSpotpris] = useState<number>(43000)
  const [valgtKarat, setValgtKarat] = useState<string>('585')
  const [gram, setGram] = useState<number>(5)

  const karat = karatData.find((k) => k.stempel === valgtKarat) ?? karatData[3]

  const resultat = useMemo(() => {
    const markedsverdi = gullverdi(spotpris, karat.renhet, gram)
    const kjøperLav = markedsverdi * 0.7
    const kjøperHøy = markedsverdi * 0.9
    const prisPerGram = gram > 0 ? markedsverdi / gram : 0
    return { markedsverdi, kjøperLav, kjøperHøy, prisPerGram }
  }, [spotpris, karat, gram])

  return (
    <div className="space-y-6">
      <div className="card space-y-5">
        {/* Spotpris */}
        <div>
          <label className="label-text" htmlFor="spotpris">
            Spotpris NOK per troy unse (31,1 g rent gull)
          </label>
          <input
            id="spotpris"
            type="number"
            step={100}
            value={spotpris}
            onChange={(e) => setSpotpris(Number(e.target.value) || 0)}
            className="input-field"
          />
          <p className="mt-2 text-xs text-muted">
            Hent oppdatert pris:{' '}
            <a
              href="https://tavex.no/gullpris/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              tavex.no/gullpris <ExternalLink size={12} />
            </a>
          </p>
        </div>

        {/* Karat */}
        <div>
          <label className="label-text">Velg karat</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {karatData.map((k) => {
              const active = k.stempel === valgtKarat
              return (
                <button
                  key={k.stempel}
                  onClick={() => setValgtKarat(k.stempel)}
                  className={`text-left p-3 rounded-xl border-2 transition-all ${
                    active
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-muted'
                  }`}
                >
                  <div className="font-heading font-bold text-lg">{k.karat}</div>
                  <div className="text-xs text-muted">stempel {k.stempel}</div>
                </button>
              )
            })}
          </div>
          <p className="mt-2 text-xs text-muted">{karat.beskrivelse}</p>
        </div>

        {/* Vekt */}
        <div>
          <label className="label-text" htmlFor="gram">
            Vekt i gram
          </label>
          <input
            id="gram"
            type="number"
            step={0.1}
            min={0}
            value={gram}
            onChange={(e) => setGram(Number(e.target.value) || 0)}
            className="input-field"
          />
        </div>
      </div>

      {/* Resultater */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ResultCard
          label="Markedsverdi (spotbasert)"
          value={formatKr(resultat.markedsverdi)}
          highlight
          sublabel={`Ren gullmengde: ${(karat.renhet * gram).toFixed(2)} g`}
        />
        <ResultCard
          label="Hva kjøpere typisk betaler"
          value={`${formatKr(resultat.kjøperLav)} – ${formatKr(resultat.kjøperHøy)}`}
          sublabel="70–90 % av spotpris avhengig av form og kjøper"
        />
        <ResultCard
          label="Pris per gram (dette karatet)"
          value={formatKr(resultat.prisPerGram)}
        />
        <ResultCard
          label="Rent gull per unse"
          value={formatKr(spotpris)}
          sublabel="Input-spotpris"
        />
      </div>

      {/* Pristabell */}
      <div className="card">
        <h3 className="mb-3">Pris per gram — alle karater</h3>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-bg">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Karat</th>
                <th className="text-left px-4 py-3 font-semibold">Stempel</th>
                <th className="text-right px-4 py-3 font-semibold">Renhet</th>
                <th className="text-right px-4 py-3 font-semibold">Pris/gram</th>
              </tr>
            </thead>
            <tbody>
              {karatData.map((k) => {
                const pris = (spotpris / TROY_UNSE) * k.renhet
                return (
                  <tr key={k.stempel} className="border-t border-border">
                    <td className="px-4 py-3 font-semibold">{k.karat}</td>
                    <td className="px-4 py-3 text-muted">{k.stempel}</td>
                    <td className="px-4 py-3 text-right text-muted">
                      {(k.renhet * 100).toFixed(1)} %
                    </td>
                    <td className="px-4 py-3 text-right font-semibold">
                      {formatKr(pris)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

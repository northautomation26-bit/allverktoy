import { TrendingUp } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import InvesteringsKalkulator from '@/components/InvesteringsKalkulator'
import InfoBox from '@/components/InfoBox'

export default function InvesteringPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        badge="Sammensatt rente"
        title="Investeringskalkulator"
        subtitle="Se hvordan månedlige innskudd og rentesrente vokser over tid — med scenariosammenligning og norsk kapitalgevinstskatt."
        icon={TrendingUp}
      />

      <InfoBox type="info" title="Hva regner kalkulatoren?">
        Modellen antar månedlig innskudd ved starten av hver måned og årlig avkastning fordelt
        månedlig (rentesrente). Dette passer for indeksfond og aksjefond. Skatten 37,84 % beregnes
        kun på gevinsten og betales først når du realiserer (selger). På Aksjesparekonto (ASK)
        utsettes skatten inntil du tar ut gevinst.
      </InfoBox>

      <InvesteringsKalkulator />

      {/* Guide */}
      <section className="card">
        <h2 className="mb-4">Slik fungerer sammensatt rente</h2>
        <div className="space-y-4 text-muted leading-relaxed">
          <p>
            <strong className="text-text">Rentesrente</strong> er prinsippet om at avkastningen du
            får i år 1, selv vokser i år 2 og fremover. Over lange tidsperioder er dette
            forskjellen mellom å doble pengene og å femtidoble dem.
          </p>
          <p>
            <strong className="text-text">Tidsverdien</strong> av penger gjør at tidlig sparing er
            langt mer verdt enn sen sparing. 1 000 kr/mnd i 30 år (360 000 kr innskudd) gir ved 7 %
            ca. 1,2 millioner. Samme totalbeløp spart de siste 10 årene gir under 200 000.
          </p>
          <p>
            <strong className="text-text">Forventet avkastning</strong> — for et globalt indeksfond
            er historisk realavkastning (etter inflasjon) ca. 5–7 %. Nominell avkastning (før
            inflasjonsjustering) er høyere men kronen blir også mindre verdt. Kalkulatoren her er
            nominell.
          </p>
          <p>
            <strong className="text-text">Kapitalgevinstskatt (37,84 % i 2025)</strong> betales
            ved realisasjon. På Aksjesparekonto kan du bytte mellom fond uten å utløse skatt — det
            forsinker skatten og øker effektiv avkastning.
          </p>
        </div>
      </section>

      {/* Kontotyper */}
      <section className="card">
        <h2 className="mb-4">Norske kontotyper for fond og aksjer</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-bg">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Konto</th>
                <th className="text-left px-4 py-3 font-semibold">Egnet for</th>
                <th className="text-left px-4 py-3 font-semibold">Skatt</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="px-4 py-3 font-semibold">ASK</td>
                <td className="px-4 py-3 text-muted">Aksjer og aksjefond</td>
                <td className="px-4 py-3 text-muted">Utsatt til uttak</td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 font-semibold">IPS</td>
                <td className="px-4 py-3 text-muted">Pensjonssparing</td>
                <td className="px-4 py-3 text-muted">Utsatt til utbetaling</td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 font-semibold">Fondskonto</td>
                <td className="px-4 py-3 text-muted">Rentefond, kombinasjoner</td>
                <td className="px-4 py-3 text-muted">Ved realisasjon</td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 font-semibold">VPS/egen depot</td>
                <td className="px-4 py-3 text-muted">Enkeltaksjer</td>
                <td className="px-4 py-3 text-muted">Ved salg</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Tips */}
      <section className="card bg-gradient-to-br from-purple-500/5 to-purple-600/10 border-purple-500/20">
        <h2 className="mb-4">Grunnregler for sparing</h2>
        <ul className="space-y-3 text-sm">
          <li className="flex gap-3">
            <span className="text-primary font-bold shrink-0">1.</span>
            <span>
              <strong>Start så tidlig som mulig</strong> — tid slår beløp på grunn av
              rentesrente.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold shrink-0">2.</span>
            <span>
              <strong>Automatiser månedlig innskudd</strong> — fast trekk reduserer risikoen for
              å glemme eller la følelser styre (dollar-cost averaging).
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold shrink-0">3.</span>
            <span>
              <strong>Velg indeksfond med lav kostnad</strong> — årlig kostnad på 0,2 % istedenfor
              1,5 % gir hundretusener mer over 30 år.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold shrink-0">4.</span>
            <span>
              <strong>Diversifiser globalt</strong> — et globalt indeksfond fanger opp hele
              verdens aksjemarked.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold shrink-0">5.</span>
            <span>
              <strong>Ikke selg i panikk</strong> — historisk har markedet hentet seg inn etter alle
              kriser. De som selger på bunnen, taper mest.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold shrink-0">6.</span>
            <span>
              <strong>Bruk ASK</strong> hvis du investerer i aksjefond — skattefrie fondsbytter.
            </span>
          </li>
        </ul>
      </section>
    </div>
  )
}

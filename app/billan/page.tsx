import { CarFront } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import BillanKalkulator from '@/components/BillanKalkulator'
import InfoBox from '@/components/InfoBox'

export default function BillanPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        badge="Annuitetslån"
        title="Billånkalkulator"
        subtitle="Beregn månedlig avdrag, total rentekostnad og effektiv rente for et annuitetslån."
        icon={CarFront}
      />

      <InfoBox type="tip" title="Før du signerer">
        Finanstilsynet anbefaler minimum 20 % egenkapital og maksimalt 8 års nedbetaling for brukt
        bil (10 år for ny bil). Billån er panterett i bilen — ved mislighold kan banken ta
        pantet. Bytt alltid til best effektiv rente når tilbudet er innhentet.
      </InfoBox>

      <BillanKalkulator />

      {/* Guide */}
      <section className="card">
        <h2 className="mb-4">Slik fungerer et annuitetslån</h2>
        <div className="space-y-4 text-muted leading-relaxed">
          <p>
            <strong className="text-text">Annuitetslån</strong> har lik totalbetaling hver måned
            gjennom hele lånets løpetid. I starten er rentedelen høy og avdragsdelen lav — etter
            hvert som gjelden synker, snur forholdet. Mange opplever dette som at lånet &quot;beveger
            seg lite&quot; de første årene.
          </p>
          <p>
            <strong className="text-text">Nominell vs effektiv rente</strong> — nominell rente er
            den rene prisen på pengene. Effektiv rente inkluderer gebyrer, termingebyr og
            rentes rente, og er det korrekte sammenligningsgrunnlaget mellom banker. Finansavtaleloven
            krever at begge oppgis.
          </p>
          <p>
            <strong className="text-text">Serielån som alternativ</strong> — fast avdrag og synkende
            rente per måned. Totalkostnaden blir litt lavere enn annuitet, men månedsbetalingen er
            høyest i starten. De fleste bruktbilfinansieringer er annuitet.
          </p>
          <p>
            <strong className="text-text">Ekstra innbetaling</strong> — annuitetslån uten bindingstid
            kan innfris helt eller delvis uten gebyr. Hvis du har likviditet kan én ekstra
            månedsbetaling i året kutte mange år av tilbakebetalingen, fordi rentegrunnlaget
            reduseres.
          </p>
        </div>
      </section>

      {/* Tips-liste */}
      <section className="card bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <h2 className="mb-4">Tips for å få lavere rente</h2>
        <ul className="space-y-3 text-sm">
          <li className="flex gap-3">
            <span className="text-primary font-bold shrink-0">1.</span>
            <span>
              <strong>Hent inn minst 3 tilbud</strong> — fra banken din, fra en bilforhandlers
              samarbeidsbank, og fra en spesialbank (Santander, Bank Norwegian, Nordea). Forskjellene
              kan være 2–3 prosentpoeng.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold shrink-0">2.</span>
            <span>
              <strong>Øk egenkapitalen over 35 %</strong> — mange banker gir da &quot;best rente&quot;-sats
              fordi belåningsgraden er lav.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold shrink-0">3.</span>
            <span>
              <strong>Velg kort nedbetalingstid</strong> hvis du kan — kortere løpetid gir lavere
              total rente og i mange tilfeller også lavere nominell rente.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold shrink-0">4.</span>
            <span>
              <strong>Sjekk termingebyret</strong> — 65 kr/mnd i 8 år utgjør 6 240 kr. Noen banker
              har lavere eller ingen termingebyr.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold shrink-0">5.</span>
            <span>
              <strong>Unngå tilleggsprodukter</strong> du ikke trenger (låneforsikring, GAP-forsikring)
              — prisen går inn i effektiv rente.
            </span>
          </li>
        </ul>
      </section>
    </div>
  )
}

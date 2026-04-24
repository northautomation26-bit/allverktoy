import { Building2 } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import BoliglanKalkulator from '@/components/BoliglanKalkulator'
import InfoBox from '@/components/InfoBox'

export default function BoliglanPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        badge="Utlånsforskriften 2025"
        title="Boliglånkalkulator"
        subtitle="Beregn månedsbetaling, stresstest renteøkning og sjekk at du oppfyller kravene for å få lån."
        icon={Building2}
      />

      <InfoBox type="info" title="Utlånsforskriften kort oppsummert">
        Norske banker må følge Finanstilsynets utlånsforskrift: belåningsgrad maks 85 %, gjeldsgrad
        maks 5x brutto årsinntekt, og du må tåle en renteøkning på 3 prosentpoeng i stresstesten.
        Bankene har en fleksibilitetskvote (10 % Oslo, 8 % ellers) der de kan gi unntak.
      </InfoBox>

      <BoliglanKalkulator />

      {/* Guide */}
      <section className="card">
        <h2 className="mb-4">Viktige begreper</h2>
        <div className="space-y-4 text-muted leading-relaxed">
          <p>
            <strong className="text-text">Belåningsgrad</strong> er hvor stor andel av boligen som
            finansieres med lån. Eksempel: bolig 4 millioner, lån 3,4 millioner = 85 %. Lavere
            belåning gir bedre rente — mange banker har hopp ved 60 %, 75 % og 85 %.
          </p>
          <p>
            <strong className="text-text">Gjeldsgrad</strong> er totalt lån delt på brutto
            årsinntekt. Alle eksisterende lån (studiegjeld, billån, kredittkortgjeld) teller med.
            Grensen er 5x årsinntekt.
          </p>
          <p>
            <strong className="text-text">Stresstest</strong> er bankens krav om at økonomien din
            skal tåle 3 prosentpoeng høyere rente. Hvis dagens rente er 5,5 %, må du tåle 8,5 %.
            Dette er en buffer mot fremtidige renteøkninger.
          </p>
          <p>
            <strong className="text-text">Fast vs flytende rente</strong> — flytende rente
            (nominell rente + bankens margin) er det vanligste i Norge. Fastrenter bindes vanligvis
            3, 5 eller 10 år og ligger ofte høyere enn flytende, men gir forutsigbarhet.
          </p>
          <p>
            <strong className="text-text">Avdragsfrihet</strong> kan gis i inntil 5 år, men er
            ikke gratis — rentene løper på fullt lån hele tiden. Samlet kostnad øker betydelig.
          </p>
        </div>
      </section>

      {/* Tips */}
      <section className="card bg-gradient-to-br from-emerald-500/5 to-emerald-600/10 border-emerald-500/20">
        <h2 className="mb-4">Tips for best boliglån</h2>
        <ul className="space-y-3 text-sm">
          <li className="flex gap-3">
            <span className="text-success font-bold shrink-0">1.</span>
            <span>
              <strong>Konkurranseutsett banken din</strong> — et konkret tilbud fra en
              konkurrerende bank gir ofte 0,2–0,4 prosentpoeng lavere rente på fem minutter.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-success font-bold shrink-0">2.</span>
            <span>
              <strong>Under 35 år? Spør etter BSU-rabatt</strong> — mange banker gir rabatt til
              unge med BSU-sparing.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-success font-bold shrink-0">3.</span>
            <span>
              <strong>Bytt lånet hvert 2.–3. år</strong> — bankene gir &quot;fersk kunde&quot;-rabatt som
              trappes ned. Å bytte er gratis.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-success font-bold shrink-0">4.</span>
            <span>
              <strong>Kombiner med medlem av forbund</strong> (LO, Akademikerne, UNIO) — flere
              banker har fagforbundssatser.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-success font-bold shrink-0">5.</span>
            <span>
              <strong>Ekstra innbetaling</strong> når du har mulighet — selv små ekstrainnbetalinger
              kutter betydelig i totalrenten fordi lånet reduseres på rentesatsen.
            </span>
          </li>
        </ul>
      </section>
    </div>
  )
}

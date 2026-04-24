export type Severity = 'normal' | 'warning' | 'critical'

export type ChecklistItem = {
  id: string
  label: string
  severity: Severity
}

export type ChecklistCategory = {
  id: string
  title: string
  icon: string
  items: ChecklistItem[]
}

export const bruktbilKategorier: ChecklistCategory[] = [
  {
    id: 'eksterior',
    title: 'Eksteriør',
    icon: '🔍',
    items: [
      { id: 'ex-1', label: 'Ingen rust under dører, tersler og hjulbuer', severity: 'critical' },
      { id: 'ex-2', label: 'Lakk har lik farge og finish på alle paneler', severity: 'warning' },
      { id: 'ex-3', label: 'Ingen sprekker, bulker eller dype riper', severity: 'normal' },
      { id: 'ex-4', label: 'Alle dører, panser og bagasjerom åpner/lukker jevnt', severity: 'normal' },
      { id: 'ex-5', label: 'Vinduer og ruter uten sprekker', severity: 'normal' },
      { id: 'ex-6', label: 'Undersiden: ingen rust, lekkasjer eller skader', severity: 'critical' },
      { id: 'ex-7', label: 'Under matter og gulv: ingen fuktskader', severity: 'warning' },
      { id: 'ex-8', label: 'Reservehjul og verktøy til stede', severity: 'normal' },
    ],
  },
  {
    id: 'motor',
    title: 'Motor og motorrom',
    icon: '⚙️',
    items: [
      { id: 'mo-1', label: 'Bilen starter normalt fra kald motor (ingen rare lyder)', severity: 'critical' },
      { id: 'mo-2', label: 'Motoroljenivå OK og olje er ikke svart eller slimet', severity: 'warning' },
      { id: 'mo-3', label: 'Kjølevæskenivå OK, ingen hvit film under lokk', severity: 'critical' },
      { id: 'mo-4', label: 'Ingen oljeflekker under bilen etter parkering', severity: 'warning' },
      { id: 'mo-5', label: 'Ingen hvit eller blå røyk fra eksosen', severity: 'critical' },
      { id: 'mo-6', label: 'Servostyringsvæske og bremsevæske på riktig nivå', severity: 'warning' },
    ],
  },
  {
    id: 'interior',
    title: 'Interiør og elektronikk',
    icon: '🪑',
    items: [
      { id: 'in-1', label: 'Alle knapper, spaker og brytere fungerer', severity: 'normal' },
      { id: 'in-2', label: 'Klimaanlegg kjøler og uten unormal lukt', severity: 'warning' },
      { id: 'in-3', label: 'Infotainment-skjerm og radio fungerer', severity: 'normal' },
      { id: 'in-4', label: 'Alle elektriske vinduer åpner og lukker', severity: 'normal' },
      { id: 'in-5', label: 'Seter og setebeltelåser fungerer', severity: 'critical' },
      { id: 'in-6', label: 'Ingen varsellamper lyser på dashbordet', severity: 'critical' },
      { id: 'in-7', label: 'Ingen muggen eller fuktig lukt (indikerer vannskade)', severity: 'warning' },
    ],
  },
  {
    id: 'dekk',
    title: 'Dekk og hjul',
    icon: '🛞',
    items: [
      { id: 'de-1', label: 'Mønsterdybde: min. 4 mm sommer / 5 mm vinter', severity: 'critical' },
      { id: 'de-2', label: 'Dekkenes produksjonsdato er under 6 år gammel (DOT-kode)', severity: 'warning' },
      { id: 'de-3', label: 'Jevn slitasje på alle dekk (ujevn = feil hjulstilling)', severity: 'warning' },
      { id: 'de-4', label: 'Ingen synlige felgskader eller sprekker', severity: 'normal' },
    ],
  },
  {
    id: 'dokumentasjon',
    title: 'Dokumentasjon',
    icon: '📋',
    items: [
      { id: 'do-1', label: 'Servicebok til stede med stempel som matcher km-stand', severity: 'critical' },
      { id: 'do-2', label: 'Gyldig EU-kontroll uten anmerkninger', severity: 'critical' },
      { id: 'do-3', label: 'Kjøretøyhistorikk sjekket på vegvesen.no (heftelser, eierhistorikk)', severity: 'critical' },
      { id: 'do-4', label: 'Heftelser (pant i bilen) er slettet', severity: 'critical' },
      { id: 'do-5', label: 'Importert bil: VIN-opprinnelse er bekreftet', severity: 'warning' },
    ],
  },
  {
    id: 'prøvekjøring',
    title: 'Prøvekjøring',
    icon: '🚦',
    items: [
      { id: 'pr-1', label: 'Gir glir inn jevnt (manuelt) / girkasse er myk (automat)', severity: 'warning' },
      { id: 'pr-2', label: 'Bremser gir jevn, rett stopp uten banking', severity: 'critical' },
      { id: 'pr-3', label: 'Ratt vibrerer ikke ved høyere hastighet', severity: 'warning' },
      { id: 'pr-4', label: 'Ingen unormale lyder over ujevnt underlag', severity: 'normal' },
      { id: 'pr-5', label: 'ESP/ABS-lamper lyser ikke med feil', severity: 'warning' },
      { id: 'pr-6', label: 'Klimaanlegg, varme og defroster fungerer under kjøring', severity: 'normal' },
    ],
  },
]

export const totalAntallPunkter = bruktbilKategorier.reduce(
  (s, k) => s + k.items.length,
  0
)

export type GuideSeksjon = {
  id: string
  tittel: string
  innhold: string
}

export const kjøpsguide: GuideSeksjon[] = [
  {
    id: 'behov',
    tittel: '1. Definer behov og budsjett',
    innhold:
      'Tenk gjennom hvor du skal kjøre bilen, hvor ofte, og hvor mange passasjerer du vanligvis har. ' +
      'Regn inn forsikring (typisk 5 000–15 000 kr/år), årsavgift, drivstoff, service og ev. vinterdekk. ' +
      'Totalkostnad = pris + årlige utgifter × antall år du tenker å eie bilen.',
  },
  {
    id: 'finn',
    tittel: '2. Finn riktig bil (FINN.no-tips)',
    innhold:
      'Bruk FINN.no eller bilbasen.no. Filtrer på årsmodell, km-stand og pris. ' +
      'Les annonsen nøye — mangler det bilder av motorrom, understell eller km-teller, be om flere. ' +
      'Sammenlign alltid minst 5 lignende biler for å kalibrere markedspris.',
  },
  {
    id: 'historikk',
    tittel: '3. Sjekk historikk og heftelser',
    innhold:
      'Gå til vegvesen.no → Kjøretøysøk. Tast inn registreringsnummer og sjekk: eierskifter, heftelser (pant), ' +
      'EU-kontroll, og eventuelle merknader. carVertical (betalt tjeneste) gir også europeisk historikk, kilometerstand over tid, ' +
      'og tidligere skader.',
  },
  {
    id: 'besiktigelse',
    tittel: '4. Besiktigelse — bruk sjekklisten',
    innhold:
      'Møt opp i dagslys og i tørt vær. Ta med lommelykt, magnet (for å sjekke sparklede rustområder) og ' +
      'bruk den interaktive sjekklisten på denne siden. Spør alltid om å se bilen kald — en nettopp startet motor skjuler startproblemer.',
  },
  {
    id: 'proff',
    tittel: '5. Profesjonell test (NAF vs. EU-kontroll)',
    innhold:
      'EU-kontroll er lovpålagt og tester sikkerhet, men er overfladisk. NAF-test (ca. 1 800–3 500 kr) er mye grundigere: ' +
      'motor, girkasse, elektronikk, bremseprøve, rust under bilen. For biler over 100 000 kr er NAF-test nesten alltid verdt pengene.',
  },
  {
    id: 'pris',
    tittel: '6. Prisforhandling',
    innhold:
      'Rimelige tommelfingerregler: be om 5–10 % avslag hvis bilen er i normal stand, mer hvis du finner konkrete mangler. ' +
      'Baser argumentene på faktiske tall: "Denne bilen bør ha 8 mm mønster, du har 4 mm = 1 500 kr i nye dekk." ' +
      'Vær alltid høflig. Ha en walk-away-pris før du starter samtalen.',
  },
  {
    id: 'kontrakt',
    tittel: '7. Kjøpekontrakt',
    innhold:
      'Bruk NAFs standardkontrakt (gratis nedlasting på naf.no). Den skal inneholde: begge parters fulle navn og personnummer, ' +
      'registreringsnummer, chassisnummer (VIN), km-stand, avtalt pris, betalingsmåte, eventuelle mangler som er kjente, ' +
      'og signaturer med dato. Ta bilde av bilens km-teller ved overlevering.',
  },
  {
    id: 'eierskifte',
    tittel: '8. Eierskifte og forsikring',
    innhold:
      'Selger melder eierskifte digitalt på vegvesen.no eller med omregistreringsblankett. Du som kjøper må ha gyldig forsikring ' +
      'før du kjører bilen hjem. Sammenlign forsikring på finansportalen.no — prisforskjellene er store.',
  },
]

export const nyttigeLenker = [
  { navn: 'Statens vegvesen — Kjøretøysøk', url: 'https://www.vegvesen.no/kjoretoy/kjop-og-salg/kjoretoyopplysninger/' },
  { navn: 'NAF Kjøpekontrakt', url: 'https://www.naf.no/bil-og-trafikk/kjop-og-salg/kjopekontrakt/' },
  { navn: 'carVertical — Historikksjekk', url: 'https://www.carvertical.com/no' },
  { navn: 'Forbrukerrådet — Klage på bilkjøp', url: 'https://www.forbrukerradet.no/' },
  { navn: 'Finansportalen — Bilforsikring', url: 'https://www.finansportalen.no/forsikring/bilforsikring/' },
]

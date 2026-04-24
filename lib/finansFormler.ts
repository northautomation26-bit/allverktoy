/**
 * Rene finansfunksjoner — kan testes uten UI.
 * Alle rentesatser angis som prosent (f.eks. 5 = 5%).
 */

/**
 * Månedlig avdrag på annuitetslån.
 */
export const månedligAnnuitet = (
  lånebeløp: number,
  årligRentePst: number,
  antallÅr: number
): number => {
  if (lånebeløp <= 0 || antallÅr <= 0) return 0
  const r = årligRentePst / 100 / 12
  const n = antallÅr * 12
  if (r === 0) return lånebeløp / n
  return (lånebeløp * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1)
}

export type LånRad = {
  måned: number
  restGjeld: number
  avdrag: number
  renter: number
  totalBetaling: number
}

/**
 * Full nedbetalingsplan for annuitetslån.
 */
export const nedbetalingsplan = (
  lånebeløp: number,
  årligRentePst: number,
  antallÅr: number,
  termingebyr = 0,
  avdragsfriÅr = 0
): LånRad[] => {
  const r = årligRentePst / 100 / 12
  const n = antallÅr * 12
  const plan: LånRad[] = []
  let rest = lånebeløp

  // Avdragsfri periode
  const avdragsfriMnd = Math.min(avdragsfriÅr * 12, n)
  for (let m = 1; m <= avdragsfriMnd; m++) {
    const renter = rest * r
    plan.push({
      måned: m,
      restGjeld: rest,
      avdrag: 0,
      renter,
      totalBetaling: renter + termingebyr,
    })
  }

  // Avdragsperiode
  const avdragsMnd = n - avdragsfriMnd
  const månedBet = månedligAnnuitet(rest, årligRentePst, avdragsMnd / 12)

  for (let m = avdragsfriMnd + 1; m <= n; m++) {
    const renter = rest * r
    const avdrag = Math.min(månedBet - renter, rest)
    rest = Math.max(0, rest - avdrag)
    plan.push({
      måned: m,
      restGjeld: rest,
      avdrag,
      renter,
      totalBetaling: avdrag + renter + termingebyr,
    })
  }

  return plan
}

/**
 * Total kostnad og effektiv rente.
 */
export const lånOppsummering = (
  lånebeløp: number,
  årligRentePst: number,
  antallÅr: number,
  termingebyr = 0,
  avdragsfriÅr = 0
) => {
  const plan = nedbetalingsplan(lånebeløp, årligRentePst, antallÅr, termingebyr, avdragsfriÅr)
  const totalBetaling = plan.reduce((s, r) => s + r.totalBetaling, 0)
  const totalRenter = plan.reduce((s, r) => s + r.renter, 0)
  const totalGebyrer = termingebyr * plan.length
  const månedligBet = plan.length > 0 ? plan[plan.length - 1].totalBetaling : 0

  // Effektiv rente (iterativ Newton-Raphson)
  const eff = effektivRente(lånebeløp, totalBetaling, antallÅr, antallÅr * 12)

  return {
    plan,
    månedligBetaling: månedligBet,
    totalBetaling,
    totalRenter,
    totalGebyrer,
    totalKostnad: totalBetaling - lånebeløp,
    effektivRente: eff,
  }
}

/**
 * Beregn effektiv rente approximativt basert på total kostnad.
 * Bruker Newton-Raphson.
 */
export const effektivRente = (
  lånebeløp: number,
  totalBetaling: number,
  antallÅr: number,
  antallTerminer: number
): number => {
  if (lånebeløp <= 0 || totalBetaling <= 0) return 0
  const månedBet = totalBetaling / antallTerminer
  // Binærsøk på månedlig rente
  let lo = 0
  let hi = 1 // 100% månedlig rente
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2
    const pv =
      mid === 0
        ? månedBet * antallTerminer
        : (månedBet * (1 - Math.pow(1 + mid, -antallTerminer))) / mid
    if (pv > lånebeløp) lo = mid
    else hi = mid
  }
  return ((lo + hi) / 2) * 12 * 100
}

/**
 * Sammensatt rente med månedlige innskudd.
 * Returnerer array med månedlige verdier.
 */
export type VekstPunkt = {
  måned: number
  innskudd: number
  verdi: number
  avkastning: number
}

export const sammensattVekst = (
  startbeløp: number,
  månedligInnskudd: number,
  årligAvkastningPst: number,
  antallÅr: number
): VekstPunkt[] => {
  const r = årligAvkastningPst / 100 / 12
  const n = antallÅr * 12
  const result: VekstPunkt[] = []
  let verdi = startbeløp
  let totalInnskudd = startbeløp

  result.push({ måned: 0, innskudd: totalInnskudd, verdi, avkastning: 0 })

  for (let m = 1; m <= n; m++) {
    verdi = verdi * (1 + r) + månedligInnskudd
    totalInnskudd += månedligInnskudd
    result.push({
      måned: m,
      innskudd: totalInnskudd,
      verdi,
      avkastning: verdi - totalInnskudd,
    })
  }

  return result
}

/**
 * Netto verdi etter skatt på kapitalgevinst.
 */
export const nettoEtterSkatt = (
  sluttverdi: number,
  totalInnskudd: number,
  skattesatsPst: number
) => {
  const gevinst = Math.max(0, sluttverdi - totalInnskudd)
  const skatt = gevinst * (skattesatsPst / 100)
  return {
    bruttoGevinst: gevinst,
    skatt,
    nettoVerdi: sluttverdi - skatt,
  }
}

/**
 * Beregn antall år spart ved ekstra månedlig innbetaling på lån.
 */
export const årSpartMedEkstra = (
  lånebeløp: number,
  årligRentePst: number,
  antallÅr: number,
  ekstraPerMåned: number
): { månedSpart: number; renterSpart: number } => {
  const baseplan = nedbetalingsplan(lånebeløp, årligRentePst, antallÅr)
  const r = årligRentePst / 100 / 12
  const månedBet = månedligAnnuitet(lånebeløp, årligRentePst, antallÅr)

  let rest = lånebeløp
  let måned = 0
  let totalRenter = 0
  const maxMnd = antallÅr * 12

  while (rest > 0.01 && måned < maxMnd) {
    måned++
    const renter = rest * r
    const avdrag = Math.min(månedBet + ekstraPerMåned - renter, rest)
    rest = Math.max(0, rest - avdrag)
    totalRenter += renter
  }

  const baseRenter = baseplan.reduce((s, rad) => s + rad.renter, 0)
  return {
    månedSpart: maxMnd - måned,
    renterSpart: baseRenter - totalRenter,
  }
}

/**
 * Gullverdi basert på spotpris, karat og vekt.
 */
export const gullverdi = (
  spotprisPerUnse: number,
  renhet: number,
  gram: number
): number => {
  const TROY_UNSE_GRAM = 31.1035
  return (spotprisPerUnse / TROY_UNSE_GRAM) * renhet * gram
}

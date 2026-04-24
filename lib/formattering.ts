/**
 * Norsk tallformatering.
 * Konsistent formattering gjennom hele Allverktøy.no.
 */

export const formatKr = (n: number): string =>
  new Intl.NumberFormat('nb-NO', {
    style: 'currency',
    currency: 'NOK',
    maximumFractionDigits: 0,
  }).format(Math.round(n))

export const formatKrDesimal = (n: number, desimaler = 2): string =>
  new Intl.NumberFormat('nb-NO', {
    style: 'currency',
    currency: 'NOK',
    minimumFractionDigits: desimaler,
    maximumFractionDigits: desimaler,
  }).format(n)

export const formatTall = (n: number, desimaler = 0): string =>
  new Intl.NumberFormat('nb-NO', {
    minimumFractionDigits: desimaler,
    maximumFractionDigits: desimaler,
  }).format(n)

export const formatProsent = (n: number, desimaler = 2): string =>
  new Intl.NumberFormat('nb-NO', {
    minimumFractionDigits: desimaler,
    maximumFractionDigits: desimaler,
  }).format(n) + ' %'

export const formatGram = (n: number): string =>
  new Intl.NumberFormat('nb-NO', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(n) + ' g'

/**
 * Parse norsk tallstreng (f.eks. "10 000,50") til number.
 */
export const parseNorskTall = (s: string): number => {
  if (!s) return 0
  const cleaned = s.replace(/\s/g, '').replace(',', '.').replace(/[^\d.-]/g, '')
  const n = parseFloat(cleaned)
  return isNaN(n) ? 0 : n
}

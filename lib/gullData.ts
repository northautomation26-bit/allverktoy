export type Karat = {
  karat: string
  stempel: string
  renhet: number
  label: string
  beskrivelse: string
}

export const karatData: Karat[] = [
  {
    karat: '24K',
    stempel: '999',
    renhet: 0.999,
    label: '24 karat (999)',
    beskrivelse: 'Rent investeringsgull — barrer og mynter',
  },
  {
    karat: '22K',
    stempel: '916',
    renhet: 0.916,
    label: '22 karat (916)',
    beskrivelse: 'Gullmynter som Krugerrand og Sovereign',
  },
  {
    karat: '18K',
    stempel: '750',
    renhet: 0.75,
    label: '18 karat (750)',
    beskrivelse: 'Smykker, vanligst i Europa',
  },
  {
    karat: '14K',
    stempel: '585',
    renhet: 0.585,
    label: '14 karat (585)',
    beskrivelse: 'Norske smykker, mest utbredt',
  },
  {
    karat: '10K',
    stempel: '417',
    renhet: 0.417,
    label: '10 karat (417)',
    beskrivelse: 'Laveste karat som juridisk er "gull"',
  },
  {
    karat: '8K',
    stempel: '333',
    renhet: 0.333,
    label: '8 karat (333)',
    beskrivelse: 'Slitesterkt, lavest gullverdi',
  },
]

export const gullSjekkliste = [
  { id: 'stempel', label: 'Stempel er synlig og leselig' },
  { id: 'veid', label: 'Veid på presisjons- eller badevekt' },
  { id: 'pris', label: 'Pris samsvarer med karatgrad og vekt' },
  { id: 'kvittering', label: 'Fått kvittering eller skriftlig bekreftelse' },
  { id: 'magnet', label: 'Testet med magnet (ekte gull reagerer ikke)' },
  { id: 'hastverk', label: 'Ingen hastverk eller press fra selger' },
]

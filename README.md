# Allverktøy.no

Gratis norske kalkulatorer og kjøpsguider — bygget for å gi trygghet ved store økonomiske beslutninger. Ingen registrering, ingen tracking, ingen skjulte kostnader.

## Verktøy

| Side | Formål |
| --- | --- |
| `/bruktbil` | Interaktiv 36-punkts sjekkliste + 8-stegs kjøpsguide for bruktbil |
| `/gull` | Gullverdikalkulator for 6 karatgrader + guide mot svindel |
| `/billan` | Annuitetslån: månedsbetaling, total rente, effektiv rente, nedbetalingsplan |
| `/boliglan` | Utlånsforskriften-sjekk, stresstest +3 %, ekstra innbetaling, årsplan |
| `/investering` | Sammensatt rente, vekstgraf, scenariosammenligning, skatt etter realisasjon |

## Tech stack

- **Next.js 14** (App Router, TypeScript strict mode)
- **Tailwind CSS 3.4** med egendefinerte designtokens
- **Lucide React** for ikoner
- **Framer Motion** for animasjoner (klar til bruk)
- **Outfit + Inter** (Google Fonts via `next/font`)
- **localStorage** for persistens av sjekklister — SSR-safe via egen hook

Ingen eksterne API-kall. Fungerer helt offline etter første last.

## Prosjektstruktur

```
allverktoy/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout med SideNav + fonts
│   ├── page.tsx                  # Hjemside med hero + verktøygrid
│   ├── globals.css               # Tailwind + design-komponenter
│   ├── bruktbil/page.tsx         # Tabbed: sjekkliste + guide
│   ├── gull/page.tsx             # Kalkulator + guide
│   ├── billan/page.tsx           # Kalkulator + guide
│   ├── boliglan/page.tsx         # Kalkulator + regler + tips
│   └── investering/page.tsx      # Kalkulator + kontotyper + tips
├── components/
│   ├── SideNav.tsx               # Desktop sidebar + mobil overlay/bunnnav
│   ├── PageHeader.tsx            # Tittel + badge + ikon
│   ├── ResultCard.tsx            # Standard resultatkort
│   ├── InfoBox.tsx               # Tip/warning/info/success-bokser
│   ├── Tooltip.tsx               # Hjelpetekst
│   ├── SVGChart.tsx              # Dependency-free linjegraf
│   ├── BruktbilSjekkliste.tsx    # 36-punkts liste med localStorage
│   ├── GullKalkulator.tsx        # Spot/karat/gram → verdi
│   ├── BillanKalkulator.tsx      # Annuitet + årsfordeling
│   ├── BoliglanKalkulator.tsx    # Regelsjekk + stresstest
│   └── InvesteringsKalkulator.tsx # Sammensatt rente + scenarier
├── lib/
│   ├── formattering.ts           # Intl.NumberFormat-helpere (nb-NO)
│   ├── finansFormler.ts          # Annuitet, effektiv rente, sammensatt rente
│   ├── bruktbilData.ts           # 36 sjekkpunkter + 8-stegs guide
│   └── gullData.ts               # Karatdata + mini-sjekkliste
├── hooks/
│   ├── useLocalStorage.ts        # SSR-safe state-sync til localStorage
│   └── useDebounce.ts            # Debounce for tunge beregninger
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## Kom i gang lokalt

```bash
npm install
npm run dev
```

Åpne http://localhost:3000.

## Bygg for produksjon

```bash
npm run build
npm start
```

## Deploy til Vercel

```bash
npx vercel --prod
```

Prosjektet er et rent Next.js 14 App Router-prosjekt uten spesielle byggeinnstillinger. `vercel.json` er inkludert med defaults.

## Designprinsipper

- **Norsk bokmål** gjennom hele — ingen engelske tekster i UI
- **Lesbar typografi**: Outfit for overskrifter, Inter for brødtekst
- **Lys, rolig palett**: varm offwhite bakgrunn (#F8F6F2), blå primær (#2563EB), gul aksent (#F59E0B)
- **Mobil først**: alle sider fungerer på 320 px og oppover, med dedikert mobilnav
- **Ingen tracking**: ingen analytics, ingen cookies, ingen tredjepartsskript
- **Transparent matematikk**: alle formler ligger i `lib/finansFormler.ts` og kan inspiseres

## Finansielle formler

| Funksjon | Kilde |
| --- | --- |
| `månedligAnnuitet` | `P × (r × (1+r)ⁿ) / ((1+r)ⁿ − 1)` — standard annuitet |
| `effektivRente` | Binærsøk for IRR som gir riktig nåverdi |
| `sammensattVekst` | Månedlig renter + innskudd: `V_{t+1} = V_t × (1+r) + m` |
| `gullverdi` | `(spot / 31,1035) × renhet × vekt` |
| `nettoEtterSkatt` | Gevinst × skattesats, 37,84 % ved realisasjon (Norge 2025) |

## Kilder for regelverk

- **Utlånsforskriften 2025**: belåningsgrad 85 %, gjeldsgrad 5x, stresstest +3 %
- **Billån**: Finanstilsynets anbefaling om 20 % egenkapital og maks 8 år (brukt) / 10 år (ny)
- **Kapitalgevinstskatt 2025**: 22 % × oppjusteringsfaktor 1,72 = 37,84 %
- **Troy unse**: 31,1035 gram

## Lisens

MIT — fri bruk, modifikasjon og videreformidling.

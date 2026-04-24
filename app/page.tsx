import Link from 'next/link'
import {
  Car,
  Coins,
  CarFront,
  Building2,
  TrendingUp,
  ArrowRight,
  Shield,
  Check,
} from 'lucide-react'

const verktoy = [
  {
    href: '/bruktbil',
    navn: 'Kjøp bruktbil',
    beskrivelse: 'Interaktiv 36-punkts sjekkliste og komplett kjøpsguide for norsk bruktbilmarked.',
    icon: Car,
    farge: 'from-blue-500/10 to-blue-600/5 text-blue-600',
  },
  {
    href: '/gull',
    navn: 'Kjøp gull',
    beskrivelse: 'Gullverdikalkulator for alle karater og trygg guide for privat gullkjøp.',
    icon: Coins,
    farge: 'from-amber-500/10 to-amber-600/5 text-amber-600',
  },
  {
    href: '/billan',
    navn: 'Billånkalkulator',
    beskrivelse: 'Beregn månedsbetaling, total kostnad og full nedbetalingsplan.',
    icon: CarFront,
    farge: 'from-sky-500/10 to-sky-600/5 text-sky-600',
  },
  {
    href: '/boliglan',
    navn: 'Boliglånkalkulator',
    beskrivelse: 'Stresstest, belåningsgrad, ekstra innbetaling og norsk regelverk.',
    icon: Building2,
    farge: 'from-emerald-500/10 to-emerald-600/5 text-emerald-600',
  },
  {
    href: '/investering',
    navn: 'Investeringskalkulator',
    beskrivelse: 'Sammensatt rente, månedlig sparing, skatt og scenariosammenligning.',
    icon: TrendingUp,
    farge: 'from-purple-500/10 to-purple-600/5 text-purple-600',
  },
]

export default function Home() {
  return (
    <div className="space-y-14">
      {/* Hero */}
      <section className="relative">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-5">
          <Shield size={14} />
          Helt gratis · Ingen registrering
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-tight mb-5">
          Alle verktøyene du trenger for <span className="text-primary">smarte kjøp</span>
        </h1>
        <p className="text-lg text-muted max-w-2xl mb-7">
          Gratis kalkulatorer og kjøpsguider på norsk — bygget for å gi deg tryggheten til å
          ta store økonomiske beslutninger. Ingen skjulte kostnader, ingen påmelding.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/bruktbil" className="btn-primary">
            Kom i gang <ArrowRight size={16} />
          </Link>
          <a href="#verktoy" className="btn-secondary">
            Se alle verktøy
          </a>
        </div>
      </section>

      {/* Verktøykort */}
      <section id="verktoy">
        <h2 className="mb-6">Velg verktøy</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {verktoy.map((v) => {
            const Icon = v.icon
            return (
              <Link
                key={v.href}
                href={v.href}
                className="card hover:shadow-md hover:-translate-y-0.5 transition-all group"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${v.farge} flex items-center justify-center mb-4`}
                >
                  <Icon size={22} />
                </div>
                <h3 className="mb-2">{v.navn}</h3>
                <p className="text-sm text-muted mb-4 leading-relaxed">{v.beskrivelse}</p>
                <div className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm group-hover:gap-2.5 transition-all">
                  Åpne <ArrowRight size={14} />
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Trustbar */}
      <section className="card bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
          <div>
            <h3 className="mb-1">Bygget for deg som vil kjøpe trygt</h3>
            <p className="text-sm text-muted">
              Basert på norsk lov, markedsdata og åpne beregninger.
            </p>
          </div>
          <ul className="space-y-1.5 text-sm">
            <li className="flex items-center gap-2">
              <Check size={16} className="text-success" />
              Basert på norsk regelverk
            </li>
            <li className="flex items-center gap-2">
              <Check size={16} className="text-success" />
              Oppdatert for 2025
            </li>
            <li className="flex items-center gap-2">
              <Check size={16} className="text-success" />
              Fungerer uten nettilkobling
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}

import type { Metadata } from 'next'
import { Outfit, Inter } from 'next/font/google'
import './globals.css'
import SideNav from '@/components/SideNav'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Allverktøy.no — Gratis verktøy for smarte kjøp og investeringer',
  description:
    'Gratis norske kalkulatorer og kjøpsguider: bruktbil, gull, billån, boliglån og investering. Ingen registrering, ingen skjulte kostnader.',
  keywords: [
    'billånkalkulator',
    'boliglånkalkulator',
    'investeringskalkulator',
    'gullpris',
    'bruktbil sjekkliste',
    'norske kalkulatorer',
  ],
  openGraph: {
    title: 'Allverktøy.no — Gratis verktøy for smarte kjøp',
    description:
      'Gratis kalkulatorer og kjøpsguider på norsk. Ingen registrering.',
    type: 'website',
    locale: 'nb_NO',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nb" className={`${outfit.variable} ${inter.variable}`}>
      <body>
        <div className="flex min-h-screen">
          <SideNav />
          <main className="flex-1 min-w-0 pb-20 lg:pb-0">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-12 pt-16 lg:pt-12">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}

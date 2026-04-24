'use client'
import { useState } from 'react'
import { Coins, Search, AlertTriangle, TrendingUp, ClipboardCheck, Check } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import InfoBox from '@/components/InfoBox'
import GullKalkulator from '@/components/GullKalkulator'
import { gullSjekkliste } from '@/lib/gullData'
import { useLocalStorage } from '@/hooks/useLocalStorage'

export default function GullPage() {
  const [checked, setChecked] = useLocalStorage<Record<string, boolean>>(
    'allverktoy:gull-sjekk:v1',
    {},
  )

  const toggle = (id: string) =>
    setChecked((c) => ({ ...c, [id]: !c[id] }))

  const sjekketAntall = Object.values(checked).filter(Boolean).length

  return (
    <div className="space-y-10">
      <PageHeader
        badge="Kalkulator + kjøpsguide"
        title="Kjøp gull trygt"
        subtitle="Beregn verdien på gullet ditt og lær å unngå de vanligste fallgruvene ved privatkjøp."
        icon={Coins}
      />

      <InfoBox type="info" title="Hvordan fungerer kalkulatoren?">
        Oppgi dagens spotpris for gull (kroner per troy unse ≈ 31,1 gram rent gull), velg karatgrad
        og vekt i gram. Kalkulatoren gir deg markedsverdien og et realistisk prisspenn for hva
        kjøpere typisk betaler. Kursen varierer gjennom dagen — hent oppdatert spot før viktige
        handler.
      </InfoBox>

      <GullKalkulator />

      {/* Seksjon: Identifiser ekte gull */}
      <section className="card">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Search size={20} />
          </div>
          <h2 className="!mb-0">Slik identifiserer du ekte gull</h2>
        </div>
        <div className="space-y-4 text-muted leading-relaxed">
          <p>
            <strong className="text-text">Stempel (finhetsmerking)</strong> er førstelinjeforsvaret.
            Norske og europeiske gullsmykker stemples normalt med et tresifret tall som angir
            tusendeler rent gull: 999 (24K), 916 (22K), 750 (18K), 585 (14K), 417 (10K) eller 333
            (8K). Mangel på stempel er ikke automatisk svindel — eldre arvestykker kan være ustemplet —
            men det flytter bevisbyrden over på selger.
          </p>
          <p>
            <strong className="text-text">Magnettest</strong> er en enkel førstesjekk. Ekte gull er
            ikke magnetisk. Bruk en sterk neodym-magnet og test smykket. Hvis det trekkes mot magneten,
            inneholder det jern eller nikkel og er ikke rent gull. Vær obs: en negativ magnettest
            utelukker ikke forfalskninger av ikke-magnetiske metaller som messing eller wolfram.
          </p>
          <p>
            <strong className="text-text">Tetthetstest (Arkimedes)</strong> er en mer presis
            hjemmetest. Rent gull har tetthet 19,3 g/cm³. Vei smykket tørt, deretter nedsenket i
            vann. Forskjellen gir volumet, og vekt dividert på volum gir tettheten. 14K bør ligge
            rundt 12,9–14,6 g/cm³, 18K rundt 15,2–16,5 g/cm³.
          </p>
          <p>
            <strong className="text-text">Profesjonell analyse</strong> (XRF-skanning) hos
            gullsmed eller gullkjøper gir sikker karatgrad på minutter og koster ofte lite eller
            ingenting hvis du vurderer salg.
          </p>
        </div>
      </section>

      {/* Seksjon: Vanlige svindeltegn */}
      <section className="card border-danger/30 bg-danger/5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-danger/10 text-danger flex items-center justify-center">
            <AlertTriangle size={20} />
          </div>
          <h2 className="!mb-0">Vanlige svindeltegn</h2>
        </div>
        <ul className="space-y-3 text-sm">
          <li className="flex gap-3">
            <span className="text-danger font-bold shrink-0">•</span>
            <span>
              <strong>Pris under 60 % av spot</strong> — hvis det høres for godt ut til å være sant,
              er det som regel det. Legitime private selgere aksepterer ikke 50 % av markedsverdi.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-danger font-bold shrink-0">•</span>
            <span>
              <strong>Selger vil ikke vise stempel</strong> eller gi deg smykket i hånden for
              inspeksjon. Alle seriøse selgere lar deg undersøke varen i ro og mak.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-danger font-bold shrink-0">•</span>
            <span>
              <strong>Gullbelagt selges som massivt gull</strong> — "gold-filled" eller
              "gold-plated" er kun et tynt gulllag over et annet metall (ofte messing eller
              kobber). Verdien er en brøkdel.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-danger font-bold shrink-0">•</span>
            <span>
              <strong>Misfarging</strong> — hvis et påstått gullsmykke har avslørt huden grønn
              eller oksidert ujevnt, er det sannsynligvis ikke gull. Rent gull oksiderer ikke.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-danger font-bold shrink-0">•</span>
            <span>
              <strong>Hastverk og kontantkrav</strong> — svindlere presser på tempo og vil unngå
              sporbare betalinger. Ta deg tid; en ekte selger venter gjerne.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-danger font-bold shrink-0">•</span>
            <span>
              <strong>Wolfram-forfalskninger</strong> av gullbarrer — wolfram har nesten samme
              tetthet som gull (19,3 vs 19,25 g/cm³) og slipper forbi enkle tetthetstester.
              Kjøp barrer kun fra sertifiserte forhandlere (Tavex, K.A. Rasmussen,
              Scandinavian Bullion).
            </span>
          </li>
        </ul>
      </section>

      {/* Seksjon: Forstå prisen */}
      <section className="card">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-success/10 text-success flex items-center justify-center">
            <TrendingUp size={20} />
          </div>
          <h2 className="!mb-0">Forstå prisen</h2>
        </div>
        <div className="space-y-4 text-muted leading-relaxed">
          <p>
            <strong className="text-text">Spotpris</strong> er den globale markedsprisen på rent
            gull, notert per troy unse (31,1035 g). Dette er prisen store banker og børshandlere
            betaler for investeringsgull. Private får sjelden spotpris.
          </p>
          <p>
            <strong className="text-text">Kjøpere betaler typisk 70–90 % av spot</strong> for
            brukte smykker. Marginen dekker omstøping, raffinering og risiko. Gullkjøperens
            marginprosent varierer — sjekk flere aktører før du selger.
          </p>
          <p>
            <strong className="text-text">Gullmynter (Krugerrand, Sovereign, Maple Leaf)</strong>{' '}
            ligger nærmest spot — ofte 95–100 % fordi de kan videreselges uten omstøping.{' '}
            <strong className="text-text">Gullbarrer</strong> fra sertifiserte produsenter har
            lavest spread.
          </p>
          <p>
            <strong className="text-text">Smykker betaler lavere</strong> — 60–80 % av gulluvekten
            i smykket, fordi det skal smeltes om. Designermerke, diamanter og sjelden utførelse
            kan gi merverdi hos riktig kjøper, men for standardsmykker er det gullvekten som teller.
          </p>
        </div>
      </section>

      {/* Mini-sjekkliste */}
      <section className="card">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
            <ClipboardCheck size={20} />
          </div>
          <h2 className="!mb-0">Sjekkliste ved kjøp av gull privat</h2>
        </div>
        <p className="text-sm text-muted mb-4">
          Gå gjennom disse punktene før du fullfører et privatkjøp. Fremgang lagres lokalt.
        </p>

        <div className="mb-4 h-2 bg-bg rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent to-success transition-all"
            style={{
              width: `${Math.round((sjekketAntall / gullSjekkliste.length) * 100)}%`,
            }}
          />
        </div>
        <div className="text-sm text-muted mb-4">
          {sjekketAntall} av {gullSjekkliste.length} punkter sjekket
        </div>

        <ul className="space-y-2">
          {gullSjekkliste.map((item) => {
            const er = !!checked[item.id]
            return (
              <li key={item.id}>
                <button
                  onClick={() => toggle(item.id)}
                  className={`w-full text-left flex items-center gap-3 p-3 rounded-xl border-2 transition-colors ${
                    er
                      ? 'border-success bg-success/5'
                      : 'border-border hover:border-muted'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                      er ? 'bg-success border-success text-white' : 'border-border'
                    }`}
                  >
                    {er && <Check size={14} />}
                  </span>
                  <span className={`text-sm ${er ? 'line-through text-muted' : ''}`}>
                    {item.label}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>

        {sjekketAntall === gullSjekkliste.length && (
          <InfoBox type="success" title="Alle punkter sjekket">
            Du har gått gjennom hele sjekklisten — godt grunnlag for et trygt gullkjøp.
          </InfoBox>
        )}
      </section>
    </div>
  )
}

'use client'
import { useState } from 'react'
import { Car, ExternalLink, ClipboardCheck, BookOpen, ChevronDown } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import BruktbilSjekkliste from '@/components/BruktbilSjekkliste'
import InfoBox from '@/components/InfoBox'
import { kjøpsguide, nyttigeLenker } from '@/lib/bruktbilData'

export default function BruktbilPage() {
  const [tab, setTab] = useState<'sjekkliste' | 'guide'>('sjekkliste')
  const [openGuide, setOpenGuide] = useState<string | null>('behov')

  return (
    <div className="space-y-8">
      <PageHeader
        badge="Interaktiv sjekkliste"
        title="Kjøp bruktbil trygt"
        subtitle="36 punkter, 8-stegs kjøpsguide og nyttige lenker — alt du trenger."
        icon={Car}
      />

      <InfoBox type="tip" title="Før du starter">
        Klikk på grønn (OK), gul (usikker) eller rød (problem) for hvert punkt. Fremgang lagres
        automatisk lokalt i nettleseren — du kan lukke og fortsette senere. Bruk "Eksporter PDF"
        for å lagre et ferdig utfylt eksemplar.
      </InfoBox>

      {/* Tabs */}
      <div className="flex border-b border-border gap-1">
        <button
          onClick={() => setTab('sjekkliste')}
          className={`px-5 py-3 font-semibold text-sm transition-colors border-b-2 -mb-px ${
            tab === 'sjekkliste'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted hover:text-text'
          }`}
        >
          <span className="inline-flex items-center gap-2">
            <ClipboardCheck size={16} /> Sjekkliste
          </span>
        </button>
        <button
          onClick={() => setTab('guide')}
          className={`px-5 py-3 font-semibold text-sm transition-colors border-b-2 -mb-px ${
            tab === 'guide'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted hover:text-text'
          }`}
        >
          <span className="inline-flex items-center gap-2">
            <BookOpen size={16} /> Kjøpsguide
          </span>
        </button>
      </div>

      {tab === 'sjekkliste' && <BruktbilSjekkliste />}

      {tab === 'guide' && (
        <div className="space-y-3">
          {kjøpsguide.map((s) => {
            const open = openGuide === s.id
            return (
              <div key={s.id} className="card !p-0 overflow-hidden">
                <button
                  onClick={() => setOpenGuide(open ? null : s.id)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-bg transition-colors"
                >
                  <span className="font-heading font-semibold text-lg">{s.tittel}</span>
                  <ChevronDown
                    size={20}
                    className={`transition-transform ${open ? 'rotate-180' : ''} text-muted`}
                  />
                </button>
                {open && (
                  <div className="px-5 pb-5 text-muted leading-relaxed">{s.innhold}</div>
                )}
              </div>
            )
          })}

          <div className="card mt-6">
            <h3 className="mb-3">Nyttige lenker</h3>
            <ul className="space-y-2">
              {nyttigeLenker.map((l) => (
                <li key={l.url}>
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                  >
                    {l.navn}
                    <ExternalLink size={14} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

'use client'
import { useState } from 'react'
import { HelpCircle } from 'lucide-react'

type Props = {
  text: string
}

export default function Tooltip({ text }: Props) {
  const [open, setOpen] = useState(false)
  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((o) => !o)}
        className="text-muted hover:text-primary transition-colors"
        aria-label="Mer informasjon"
      >
        <HelpCircle size={14} />
      </button>
      {open && (
        <span
          role="tooltip"
          className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-text text-white text-xs rounded-xl shadow-lg z-20 leading-relaxed"
        >
          {text}
        </span>
      )}
    </span>
  )
}

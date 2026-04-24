'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  Home,
  Car,
  Coins,
  CarFront,
  Building2,
  TrendingUp,
  Menu,
  X,
} from 'lucide-react'

const navItems = [
  { href: '/', label: 'Hjem', icon: Home },
  { href: '/bruktbil', label: 'Kjøp bruktbil', icon: Car },
  { href: '/gull', label: 'Kjøp gull', icon: Coins },
  { href: '/billan', label: 'Billånkalkulator', icon: CarFront },
  { href: '/boliglan', label: 'Boliglånkalkulator', icon: Building2 },
  { href: '/investering', label: 'Investeringskalkulator', icon: TrendingUp },
]

export default function SideNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      {/* Mobile topbar trigger */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 bg-white border border-border rounded-xl p-2.5 shadow-sm"
        aria-label="Åpne meny"
      >
        <Menu size={20} />
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-white">
        <div className="p-6 border-b border-border">
          <Link href="/" className="block">
            <div className="font-heading font-bold text-xl text-text">Allverktøy<span className="text-primary">.no</span></div>
            <div className="text-xs text-muted mt-1">Alle verktøyene du trenger</div>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                  active
                    ? 'bg-primary text-white'
                    : 'text-text hover:bg-bg'
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-border text-xs text-muted">
          © 2025 Allverktøy.no
        </div>
      </aside>

      {/* Mobile overlay menu */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/40"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-72 bg-white p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 p-2">
              <div className="font-heading font-bold text-lg">Allverktøy<span className="text-primary">.no</span></div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg hover:bg-bg"
                aria-label="Lukk meny"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                      active ? 'bg-primary text-white' : 'text-text hover:bg-bg'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Bottom nav on mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border z-30 overflow-x-auto">
        <div className="flex gap-1 p-2 min-w-max">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap ${
                  active ? 'bg-primary text-white' : 'text-muted'
                }`}
              >
                <Icon size={18} />
                <span>{item.label.split(' ')[0]}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}

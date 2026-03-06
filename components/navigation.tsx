"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Props = {
  onOpenDrawer?: () => void
}

const navLinks = [
  { name: "Inicio", href: "/" },
  { name: "Galeria", href: "/gallery" },
  { name: "Eventos", href: "/events" },
  { name: "Aliados", href: "/partners" },
]

export default function Navigation({ onOpenDrawer }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="relative">
              <img src="/logo.webp" alt="Logo" className="h-10 w-10" />
              <div className="absolute inset-0 h-10 w-10 bg-primary/20 rounded-full blur-md" />
            </div>
            <span className="font-serif font-bold text-2xl tracking-tight">
              Aerolux Panamá
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-12">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-foreground/80 hover:text-foreground transition-colors text-sm font-medium tracking-wide group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            <Button
              onClick={onOpenDrawer}
              className="bg-gradient-red hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 px-8 py-2 text-sm font-medium tracking-wide animate-gradient"
              size="sm"
            >
              Agendar Vuelo
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 glass rounded-full"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-5 h-0.5 bg-foreground transition-all duration-200 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-5 h-0.5 bg-foreground transition-all duration-200 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-0.5 bg-foreground transition-all duration-200 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden glass-strong border-t border-primary/10">
          <div className="px-6 py-8 space-y-6">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block text-foreground/80 hover:text-primary transition-colors text-lg font-medium"
              >
                {item.name}
              </Link>
            ))}
            <Button
              onClick={() => { onOpenDrawer?.(); setIsMenuOpen(false) }}
              className="w-full bg-gradient-red mt-6 animate-gradient"
            >
              Agendar Vuelo
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
import { Instagram, Plane } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
            <footer className="glass-strong border-t border-border/20 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <img src="/logo.webp" alt="Aerolux Panama Logo" className="h-8 w-8" />
                  <span className="font-serif font-bold text-xl">Aerolux Panama</span>
                </div>
                <p className="text-muted-foreground">
                  Seguridad, exclusividad y servicio premium en cada experiencia.
                </p>
              </div>
              <div></div>
              <div></div>

              <div>
                <h3 className="font-serif font-bold text-lg mb-4">Contácto</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>+507 6371-3108</li>
                  <li>ventasinfo@aeroluxpanama.com</li>
                  <li>Aeropuerto Marcos A. Gelabert, Hangar 17-C My Flight Corp</li>
                  <Link href="https://www.instagram.com/aeroluxpanama/" target='_blank'>
                  <li><Instagram className="inline-block w-4 h-4 ml-1" /></li>
                  </Link>
                </ul>
              </div>
            </div>

            <div className="border-t border-border/20 mt-8 pt-8 text-center text-muted-foreground">
              <p>&copy; 2024 Aerolux Panama. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
  )
}

export default Footer
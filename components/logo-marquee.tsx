"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const partnerNames = [
  "My Flight Corp.",
  "Air Supplies International",
  "AeroErmo Magazine",
  "AeroShell",
  "Autódromo Panamá",
  "Gran Fondo PROBISIDA",
  "Ferrari Panamá",
  "Snap-on Tools",
  "ALAS Corp.",
]

function getPartnerKey(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export function LogoMarquee() {
  const [images, setImages] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch("/api/partners")
      .then((res) => res.json())
      .then((data) => { if (!data.error) setImages(data) })
      .catch(() => {})
  }, [])

  const partners = partnerNames.map((name) => ({
    name,
    src: images[getPartnerKey(name)],
  }))

  const allPartners = [...partners, ...partners]

  return (
    <section className="pb-20 pt-10 px-4 relative overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground/90">
          Nuestros Aliados
        </h2>
        <div className="mt-4 mx-auto w-16 h-px bg-primary/60" />
      </motion.div>

      {/* Fade edges */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, var(--background, #0a0a0a), transparent)" }}
        />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, var(--background, #0a0a0a), transparent)" }}
        />

        {/* Marquee Track */}
        <div className="overflow-hidden">
          <motion.div
            className="flex items-center gap-0"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, ease: "linear", repeat: Infinity }}
            style={{ width: "max-content" }}
          >
            {allPartners.map((partner, i) => (
              <div key={i} className="flex items-center group mx-8">
                {partner.src ? (
                  <img
                    src={partner.src}
                    alt={partner.name}
                    className="h-12 w-auto max-w-[160px] object-contain opacity-50 hover:opacity-100 transition-opacity duration-500 select-none"
                    draggable={false}
                  />
                ) : (
                  <span className="text-foreground/30 font-serif font-bold text-sm whitespace-nowrap select-none">
                    {partner.name}
                  </span>
                )}
                <div className="ml-8 w-1 h-1 rounded-full bg-primary/20 flex-shrink-0" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Second row going opposite direction */}
        <div className="overflow-hidden mt-6">
          <motion.div
            className="flex items-center gap-0"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 22, ease: "linear", repeat: Infinity }}
            style={{ width: "max-content" }}
          >
            {[...allPartners].reverse().map((partner, i) => (
              <div key={i} className="flex items-center group mx-8">
                {partner.src ? (
                  <img
                    src={partner.src}
                    alt={partner.name}
                    className="h-8 w-auto max-w-[120px] object-contain opacity-20 hover:opacity-50 transition-opacity duration-500 select-none scale-75"
                    draggable={false}
                  />
                ) : (
                  <span className="text-foreground/15 font-serif font-bold text-xs whitespace-nowrap select-none scale-75">
                    {partner.name}
                  </span>
                )}
                <div className="ml-8 w-1 h-1 rounded-full bg-white/5 flex-shrink-0" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
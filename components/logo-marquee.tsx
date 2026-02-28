"use client"

import { motion } from "framer-motion"

const partners = [
  { name: "My Flight Corp.", svg: (
    <svg viewBox="0 0 120 40" className="h-8 w-auto fill-current">
      <text x="0" y="30" fontFamily="serif" fontSize="28" fontWeight="bold">My Flight Corp.</text>
    </svg>
  )},
  { name: "Air Supplies International", svg: (
    <svg viewBox="0 0 120 40" className="h-8 w-auto fill-current">
      <text x="0" y="30" fontFamily="serif" fontSize="26" fontWeight="bold">Air Supplies International</text>
    </svg>
  )},
  { name: "AeroErmo Magazine", svg: (
    <svg viewBox="0 0 130 40" className="h-8 w-auto fill-current">
      <text x="0" y="30" fontFamily="serif" fontSize="26" fontWeight="bold">AeroErmo Magazine</text>
    </svg>
  )},
  { name: "AeroShell", svg: (
    <svg viewBox="0 0 200 40" className="h-8 w-auto fill-current">
      <text x="0" y="30" fontFamily="serif" fontSize="22" fontWeight="bold">AeroShell</text>
    </svg>
  )},
  { name: "Autódromo Panamá", svg: (
    <svg viewBox="0 0 200 40" className="h-8 w-auto fill-current">
      <text x="0" y="30" fontFamily="serif" fontSize="22" fontWeight="bold">Autódromo Panamá</text>
    </svg>
  )},
  { name: "Gran Fondo PROBISIDA", svg: (
    <svg viewBox="0 0 160 40" className="h-8 w-auto fill-current">
      <text x="0" y="30" fontFamily="serif" fontSize="24" fontWeight="bold">Gran Fondo PROBISIDA</text>
    </svg>
  )},
  { name: "Ferrari Panamá", svg: (
    <svg viewBox="0 0 160 40" className="h-8 w-auto fill-current">
      <text x="0" y="30" fontFamily="serif" fontSize="24" fontWeight="bold">Ferrari Panamá</text>
    </svg>
  )},
  { name: "Snap-on Tools", svg: (
    <svg viewBox="0 0 150 40" className="h-8 w-auto fill-current">
      <text x="0" y="30" fontFamily="serif" fontSize="24" fontWeight="bold">Snap-on Tools</text>
    </svg>
  )},
  { name: "ALAS Corp.", svg: (
    <svg viewBox="0 0 150 40" className="h-8 w-auto fill-current">
      <text x="0" y="30" fontFamily="serif" fontSize="24" fontWeight="bold">ALAS Corp.</text>
    </svg>
  )},
]

// Duplicate for seamless loop
const allPartners = [...partners, ...partners]

export function LogoMarquee() {
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
            transition={{
              duration: 28,
              ease: "linear",
              repeat: Infinity,
            }}
            style={{ width: "max-content" }}
          >
            {allPartners.map((partner, i) => (
              <div
                key={i}
                className="flex items-center group"
              >
                {/* Logo pill */}
                <div className="
                  mx-8 px-8 py-4
                  glass rounded-xl
                  border border-white/5
                  text-foreground/30
                  hover:text-primary
                  hover:border-primary/20
                  hover:bg-primary/5
                  transition-all duration-500
                  cursor-default
                  select-none
                  whitespace-nowrap
                  flex items-center justify-center
                  min-w-[140px]
                ">
                  {partner.svg}
                </div>

                {/* Divider dot */}
                <div className="w-1 h-1 rounded-full bg-primary/20 flex-shrink-0" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Second row going opposite direction */}
        <div className="overflow-hidden mt-6">
          <motion.div
            className="flex items-center gap-0"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              duration: 22,
              ease: "linear",
              repeat: Infinity,
            }}
            style={{ width: "max-content" }}
          >
            {[...allPartners].reverse().map((partner, i) => (
              <div
                key={i}
                className="flex items-center group"
              >
                <div className="
                  mx-8 px-8 py-3
                  text-foreground/15
                  hover:text-primary/60
                  transition-all duration-500
                  cursor-default
                  select-none
                  whitespace-nowrap
                  flex items-center justify-center
                  min-w-[140px]
                  scale-75
                ">
                  {partner.svg}
                </div>
                <div className="w-1 h-1 rounded-full bg-white/5 flex-shrink-0" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
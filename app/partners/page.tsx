"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Shield, ArrowRight, ExternalLink } from "lucide-react"

type Partner = {
  name: string
  shortDescription: string
  fullDescription: string
  category: string
  website?: string
}

const partners: Partner[] = [
  {
    name: "My Flight Corp.",
    category: "Aviación",
    shortDescription: "Nuestro aliado estratégico en ala fija, brindando soluciones de vuelo charter con los más altos estándares de seguridad y confort para nuestros clientes en toda la región.",
    fullDescription: "My Flight Corp. es nuestro aliado estratégico en ala fija. Juntos ofrecemos soluciones de vuelo charter con los más altos estándares de seguridad y confort. Su flota moderna y equipo especializado nos permite brindar cobertura regional con flexibilidad y confiabilidad operacional.",
  },
  {
    name: "Air Supplies International",
    category: "Operaciones",
    shortDescription: "El corazón de nuestras operaciones de helicóptero. Proveen suministros aeronáuticos de primera calidad que garantizan la continuidad y seguridad de nuestras misiones.",
    fullDescription: "Air Supplies International es el corazón de nuestros helicópteros. Proveedores de suministros aeronáuticos de primera calidad, garantizan la continuidad operacional y la seguridad de cada misión. Su red de distribución internacional nos permite mantenernos abastecidos en cualquier destino.",
  },
  {
    name: "AeroErmo Magazine",
    category: "Media",
    shortDescription: "Nuestro International Media Partner. Una publicación de referencia en la industria aeronáutica latinoamericana que amplifica nuestra presencia en el ecosistema del sector.",
    fullDescription: "AeroErmo Magazine es nuestro International Media Partner. Esta publicación de referencia en la industria aeronáutica latinoamericana amplifica nuestra presencia en el ecosistema del sector, conectándonos con lectores, profesionales y tomadores de decisión en toda la región.",
    website: "https://aeroermo.com",
  },
  {
    name: "AeroShell",
    category: "Combustibles",
    shortDescription: "Nuestros aliados en calidad y seguridad de combustibles. AeroShell provee lubricantes y combustibles de aviación que cumplen con los estándares internacionales más exigentes.",
    fullDescription: "AeroShell es nuestra alianza en calidad y seguridad de combustibles. Como líder mundial en lubricantes y combustibles de aviación, nos garantizan productos que cumplen con los estándares internacionales más exigentes, protegiendo nuestros motores y operaciones en todo momento.",
    website: "https://aeroshell.com",
  },
  {
    name: "Autódromo Panamá",
    category: "Lifestyle",
    shortDescription: "Nuestro socio clave en experiencias lifestyle de alto rendimiento. Compartimos la pasión por la velocidad, la precisión y la excelencia en cada evento que co-organizamos.",
    fullDescription: "Autódromo Panamá es nuestro socio clave en experiencias lifestyle de alto rendimiento. Compartimos la pasión por la velocidad, la precisión y la excelencia. Juntos co-organizamos eventos exclusivos que conectan el mundo de la aviación ejecutiva con el automovilismo de alto nivel.",
  },
  {
    name: "Gran Fondo PROBISIDA",
    category: "RSE",
    shortDescription: "Colaboramos con el Gran Fondo por la Vida apoyando causas sociales que impactan positivamente a comunidades vulnerables, reafirmando nuestro compromiso con la responsabilidad social.",
    fullDescription: "Colaboramos con el Gran Fondo por el Derecho a la Vida - PROBISIDA, apoyando causas sociales que impactan positivamente a comunidades vulnerables. Esta alianza reafirma nuestro compromiso con la responsabilidad social empresarial y el desarrollo humano sostenible en Panamá.",
  },
  {
    name: "Ferrari Panamá",
    category: "Lujo",
    shortDescription: "Una alianza de lujo y alta performance que une dos mundos de excelencia: la aviación ejecutiva y el automovilismo de élite. Dealer oficial Ferrari en Panamá.",
    fullDescription: "Ferrari Panamá — Dealer Oficial — es nuestra alianza de lujo y alta performance. Compartimos valores de precisión, exclusividad y pasión por la ingeniería. Esta sinergia nos posiciona en el segmento más premium del mercado, conectando a clientes que buscan la excelencia en cada experiencia.",
  },
  {
    name: "Snap-on Tools",
    category: "Herramientas",
    shortDescription: "En AeroLux Panamá utilizamos exclusivamente herramientas Snap-on, garantizando la precisión y confiabilidad requerida en cada intervención técnica de nuestras aeronaves.",
    fullDescription: "En AeroLux Panamá utilizamos exclusivamente herramientas Snap-on en nuestras operaciones de mantenimiento. Esta decisión garantiza la precisión y confiabilidad requerida en cada intervención técnica. Snap-on es sinónimo de calidad profesional, y es el estándar que nuestros técnicos exigen.",
    website: "https://snapon.com",
  },
  {
    name: "ALAS Corp.",
    category: "Aeroespacial",
    shortDescription: "Aliados en logística, tecnología aeroespacial e innovación. ALAS Corp. impulsa el desarrollo del ecosistema aeroespacial latinoamericano junto a AeroLux y MITI Group.",
    fullDescription: "ALAS Corp. es nuestro aliado en logística, tecnología aeroespacial e innovación. Juntos impulsamos el desarrollo del ecosistema aeroespacial latinoamericano, apoyando iniciativas STEM, formación de talento joven y proyectos de cohetería deportiva que representan el futuro del sector en la región.",
  },
]

const categoryColors: Record<string, string> = {
  Aviación: "bg-primary/10 border-primary/20 text-primary",
  Operaciones: "bg-primary/10 border-primary/20 text-primary",
  Media: "bg-primary/10 border-primary/20 text-primary",
  Combustibles: "bg-primary/10 border-primary/20 text-primary",
  Lifestyle: "bg-primary/10 border-primary/20 text-primary",
  RSE: "bg-primary/10 border-primary/20 text-primary",
  Lujo: "bg-primary/10 border-primary/20 text-primary",
  Herramientas: "bg-primary/10 border-primary/20 text-primary",
  Aeroespacial: "bg-primary/10 border-primary/20 text-primary",
}

function getPartnerKey(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function ImageSkeleton() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-white/5">
      <div
        className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite]"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
        }}
      />
    </div>
  )
}

export default function PartnersPage() {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null)
  const [partnerImages, setPartnerImages] = useState<Record<string, string>>({})
  const [imagesLoading, setImagesLoading] = useState(true)
  // Track which individual img elements have finished loading
  const [loadedImgs, setLoadedImgs] = useState<Record<string, boolean>>({})

  useEffect(() => {
    fetch("/api/partners")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setPartnerImages(data)
        setImagesLoading(false)
      })
      .catch(() => setImagesLoading(false))
  }, [])

  const resolveImage = (partner: Partner): string | undefined => {
    const key = getPartnerKey(partner.name)
    return partnerImages[key]
  }

  const handleImgLoad = (name: string) => {
    setLoadedImgs((prev) => ({ ...prev, [name]: true }))
  }

  return (
    <section id="operators" className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background blur */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 right-10 w-80 h-80 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center glass rounded-full px-6 py-3 mb-8"
          >
            <Shield className="h-5 w-5 text-primary mr-2" />
            <span className="text-sm font-medium">Excelencia Certificada</span>
          </motion.div>
          <h2 className="font-serif font-bold text-5xl md:text-6xl lg:text-7xl mb-8 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Aliados Estratégicos
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Cada alianza que formamos refleja nuestro compromiso con la excelencia, la seguridad y el crecimiento del ecosistema aeronáutico regional.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => {
            const imgUrl = resolveImage(partner)
            const imgLoaded = loadedImgs[partner.name]
            const showSkeleton = imagesLoading || (!!imgUrl && !imgLoaded)

            return (
              <motion.div
                key={partner.name}
                initial={{ y: 80, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card
                  className="glass-strong overflow-hidden hover:scale-105 transition-all duration-500 cursor-pointer relative flex flex-col h-full"
                  onClick={() => setSelectedPartner(partner)}
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden bg-muted/20 flex-shrink-0">
                    {/* Skeleton — visible while API is loading or image hasn't decoded yet */}
                    {showSkeleton && <ImageSkeleton />}

                    {/* Actual image — rendered but invisible until loaded */}
                    {imgUrl && (
                      <img
                        src={imgUrl}
                        alt={partner.name}
                        onLoad={() => handleImgLoad(partner.name)}
                        className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className={`text-xs font-semibold tracking-wider uppercase border rounded-full px-3 py-1 ${categoryColors[partner.category]}`}>
                        {partner.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-serif font-bold text-xl mb-3 leading-snug">{partner.name}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">
                      {partner.shortDescription}
                    </p>
                    <div className="flex items-center gap-2 text-primary text-sm font-medium mt-4 group-hover:gap-3 transition-all duration-300">
                      <span>Ver más</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedPartner && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
            onClick={() => setSelectedPartner(null)}
          >
            <motion.div
              key="modal-content"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl glass-strong shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-2">

                {/* LEFT — Content */}
                <div className="p-8 flex flex-col">
                  <span className={`text-xs font-semibold tracking-wider uppercase border rounded-full px-3 py-1 w-fit mb-4 ${categoryColors[selectedPartner.category]}`}>
                    {selectedPartner.category}
                  </span>
                  <h3 className="font-serif font-bold text-2xl md:text-3xl leading-tight mb-6">
                    {selectedPartner.name}
                  </h3>
                  <div className="h-px bg-primary/20 w-12 mb-6" />
                  <p className="text-muted-foreground leading-relaxed text-base mb-8 flex-1">
                    {selectedPartner.fullDescription}
                  </p>
                  {selectedPartner.website && (
                   <a
                      href={selectedPartner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Visitar sitio web
                    </a>
                  )}
                </div>

                {/* RIGHT — Image */}
                <div className="relative bg-muted/20 min-h-[300px] md:min-h-full overflow-hidden">
                  {/* Skeleton for modal image */}
                  {resolveImage(selectedPartner) && !loadedImgs[selectedPartner.name] && (
                    <ImageSkeleton />
                  )}
                  {resolveImage(selectedPartner) && (
                    <img
                      src={resolveImage(selectedPartner)}
                      alt={selectedPartner.name}
                      onLoad={() => handleImgLoad(selectedPartner.name)}
                      className={`w-full h-full object-contain transition-opacity duration-500 ${loadedImgs[selectedPartner.name] ? "opacity-100" : "opacity-0"}`}
                    />
                  )}
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={() => setSelectedPartner(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label="Cerrar"
              >
                <span className="text-foreground/70 text-lg leading-none">&times;</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
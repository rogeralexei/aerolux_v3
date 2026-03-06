"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, MapPin, X, ArrowRight, Plane, Rocket, Car } from "lucide-react"

type Event = {
  id: number
  title: string
  shortTitle: string
  date: string
  location: string
  category: string
  role: string
  summary: string
  body: string[]
  highlights: string[]
  icon: React.ElementType
  blobKey?: string
}

const events: Event[] = [
  {
    id: 1,
    title: "F-Air Colombia 2025",
    shortTitle: "F-Air Colombia",
    date: "2025",
    location: "Colombia",
    category: "feria",
    role: "Expositores",
    summary: "Un hito estratégico que consolidó nuestra presencia en el mercado aeronáutico latinoamericano.",
    body: [
      "Nuestra participación como expositores en F-AIR Colombia 2025 marcó un hito estratégico para AeroLux Panamá y MITI Group Inc., consolidando nuestra presencia en el mercado aeronáutico latinoamericano.",
      "F-AIR es uno de los eventos aeronáuticos más importantes de la región, reuniendo fabricantes, operadores, autoridades aeronáuticas, empresas MRO, aviación ejecutiva y defensa. Nuestra presencia no fue únicamente comercial; fue una declaración clara de expansión regional.",
      "F-AIR 2025 reafirmó nuestra visión: consolidar el futuro de la aviación privada y ejecutiva en la región.",
    ],
    highlights: [
      "Presentamos nuestro portafolio integral de servicios: vuelos charter, operaciones VIP y soluciones corporativas.",
      "Fortalecimos relaciones con fabricantes, proveedores estratégicos y potenciales aliados en Colombia y Centroamérica.",
      "Exploramos nuevas oportunidades de representación y alianzas técnicas.",
      "Posicionamos a AeroLux Panamá como operador dinámico, moderno y en crecimiento.",
    ],
    icon: Plane,
  },
  {
    id: 2,
    title: "Fly-In Cartago 2024",
    shortTitle: "Fly-In Cartago",
    date: "2024",
    location: "Cartago, Colombia",
    category: "aviacion",
    role: "Expositores",
    summary: "Reafirmamos nuestro compromiso con la aviación general en Centroamérica y exploramos mercados de expansión.",
    body: [
      "Nuestra participación como expositores en Fly-In Cartago 2024 reafirmó nuestro compromiso con la aviación general en Centroamérica.",
      "Este evento, organizado por la comunidad aeronáutica regional, reúne pilotos, propietarios de aeronaves, escuelas de vuelo y empresas del sector.",
      "Más allá de una exposición, fue un espacio de networking de alto valor para fortalecer la presencia de AeroLux en la aviación general regional.",
    ],
    highlights: [
      "Presentamos nuestras operaciones de ala fija y ala rotativa.",
      "Generamos alianzas con operadores de la región.",
      "Exploramos oportunidades de expansión hacia Costa Rica y Centroamérica.",
      "Conectamos con pilotos y propietarios interesados en servicios especializados.",
    ],
    icon: Plane,
  },
  {
    id: 3,
    title: "Ferrari Track Day 2025",
    shortTitle: "Ferrari Track Day",
    date: "2025",
    location: "Panamá",
    category: "lujo",
    role: "Patrocinadores",
    summary: "La sinergia natural entre la aviación ejecutiva y el mundo del alto rendimiento automotriz.",
    body: [
      "Nuestra participación como patrocinadores en el Ferrari Track Day 2025 consolidó la sinergia natural entre la aviación ejecutiva y el mundo del alto rendimiento automotriz.",
      "AeroLux Panamá comparte con Ferrari los valores de precisión, exclusividad, desempeño y pasión por la ingeniería. Este evento reunió a propietarios, empresarios y amantes del lujo en un entorno de alto nivel.",
      "El Ferrari Track Day fue más que un patrocinio: fue una experiencia que alineó nuestra marca con el concepto de excelencia y exclusividad.",
    ],
    highlights: [
      "Fortalecimos nuestra presencia en el segmento premium.",
      "Conectamos con clientes potenciales del mercado VIP.",
      "Posicionamos nuestros servicios charter como extensión del estilo de vida de alto rendimiento.",
      "Reforzamos alianzas estratégicas con marcas de lujo.",
    ],
    icon: Car,
  },
  {
    id: 4,
    title: "Concurso Colombiano de Cohetería Deportiva ALAS",
    shortTitle: "Cohetería ALAS",
    blobKey: "coheteria-alas-2025",
    date: "2025",
    location: "Colombia",
    category: "aeroespacial",
    role: "Patrocinadores",
    summary: "Apoyando el futuro del talento técnico y científico aeroespacial de Latinoamérica.",
    body: [
      "En alianza con ALAS, participamos como patrocinadores del Concurso Colombiano de Cohetería Deportiva 2025, un evento que impulsa la innovación, la ingeniería y el talento joven en el sector aeroespacial.",
      "Este evento representa la evolución natural del ecosistema aeronáutico hacia el ámbito espacial. Para MITI Group y AeroLux, apoyar este tipo de iniciativas significa invertir en el futuro del talento técnico y científico de la región.",
      "Este patrocinio refuerza nuestra visión de crecimiento no solo en aviación, sino también en el ecosistema aeroespacial regional.",
    ],
    highlights: [
      "Apoyo al desarrollo STEM y a la ingeniería aeroespacial.",
      "Vinculación con jóvenes talentos y universidades.",
      "Posicionamiento como empresa comprometida con la innovación tecnológica.",
      "Integración con proyectos aeroespaciales emergentes en Latinoamérica.",
    ],
    icon: Rocket,
  },
]

const categoryColors: Record<string, string> = {
  feria: "bg-primary/10 border-primary/20 text-primary",
  aviacion: "bg-primary/10 border-primary/20 text-primary",
  lujo: "bg-primary/10 border-primary/20 text-primary",
  aeroespacial: "bg-primary/10 border-primary/20 text-primary",
}

function getEventKey(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function ImageSkeleton() {
  return (
    <div className="absolute inset-0 z-10 bg-muted/20 animate-pulse overflow-hidden">
      <div
        className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite]"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
        }}
      />
    </div>
  )
}

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [eventImages, setEventImages] = useState<Record<string, string>>({})
  const [imagesLoading, setImagesLoading] = useState(true)
  const [loadedImgs, setLoadedImgs] = useState<Record<string, boolean>>({})

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setEventImages(data)
        setImagesLoading(false)
      })
      .catch(() => setImagesLoading(false))
  }, [])

  const resolveImage = (event: Event): string | undefined => {
    const key = event.blobKey ?? getEventKey(event.title)
    return eventImages[key]
  }

  const handleImgLoad = (title: string) => {
    setLoadedImgs((prev) => ({ ...prev, [title]: true }))
  }

  return (
    <div className="min-h-screen mt-4 bg-gradient-to-br from-background via-muted/30 to-secondary/20">
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center glass rounded-full px-6 py-3 mb-8"
            >
              <Calendar className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium">Presencia</span>
            </motion.div>

            <h1 className="font-serif font-bold text-5xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent leading-tight">
              Donde estamos,
              <br />
              dejamos huella.
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Ferias internacionales, patrocinios de alto perfil y eventos aeronáuticos que consolidan nuestra presencia en la región.
            </p>
          </motion.div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event, i) => {
              const Icon = event.icon
              const imgUrl = resolveImage(event)
              const imgLoaded = loadedImgs[event.title]
              const showSkeleton = imagesLoading || (!!imgUrl && !imgLoaded)

              return (
                <motion.div
                  key={event.id}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  onClick={() => setSelectedEvent(event)}
                  className="group cursor-pointer"
                >
                  <div className="relative h-72 rounded-2xl overflow-hidden glass-strong border border-white/5 hover:border-primary/20 transition-all duration-500 bg-black">

                    {/* Shimmer skeleton */}
                    {showSkeleton && <ImageSkeleton />}

                    {/* Image */}
                    {imgUrl && (
                      <img
                        src={imgUrl}
                        alt={event.title}
                        onLoad={() => handleImgLoad(event.title)}
                        className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
                      />
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                    {/* Role badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className={`text-xs font-semibold tracking-widest uppercase border rounded-full px-3 py-1 ${categoryColors[event.category]}`}>
                        {event.role}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="absolute top-4 right-4 z-20 glass rounded-full p-2 opacity-60 group-hover:opacity-100 transition-opacity">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>

                    {/* Bottom content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <div className="flex items-center gap-2 mb-2 text-white/50 text-xs tracking-wider">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                        <span>·</span>
                        <Calendar className="h-3 w-3" />
                        <span>{event.date}</span>
                      </div>
                      <h3 className="font-serif font-bold text-xl text-white mb-2 leading-snug">
                        {event.title}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed line-clamp-2 mb-4">
                        {event.summary}
                      </p>
                      <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all duration-300">
                        <span>Ver más</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 50/50 Split Panel */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-stretch"
            style={{ backdropFilter: "blur(4px)", background: "rgba(0,0,0,0.5)" }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 35 }}
              className="ml-auto w-full flex flex-col md:flex-row h-full shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* LEFT: Image */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="relative md:w-1/2 h-72 md:h-full flex-shrink-0 overflow-hidden bg-black"
              >
                {/* Skeleton for modal image */}
                {resolveImage(selectedEvent) && !loadedImgs[selectedEvent.title] && (
                  <ImageSkeleton />
                )}

                {resolveImage(selectedEvent) && (
                  <img
                    src={resolveImage(selectedEvent)}
                    alt={selectedEvent.title}
                    onLoad={() => handleImgLoad(selectedEvent.title)}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${loadedImgs[selectedEvent.title] ? "opacity-80" : "opacity-0"}`}
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-primary/20" />

                <div className="absolute bottom-8 left-8 right-8 z-20">
                  <span className={`text-xs font-semibold tracking-widest uppercase border rounded-full px-3 py-1 ${categoryColors[selectedEvent.category]}`}>
                    {selectedEvent.role}
                  </span>
                  <div className="flex items-center gap-3 mt-4 text-white/60 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{selectedEvent.location}</span>
                    <span>·</span>
                    <span>{selectedEvent.date}</span>
                  </div>
                </div>
              </motion.div>

              {/* RIGHT: Content */}
              <div
                className="md:w-1/2 flex flex-col overflow-y-auto"
                style={{ background: "hsl(0, 0%, 0%, 0.7)" }}
              >
                <div className="flex justify-end p-6 pb-0 flex-shrink-0">
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="glass rounded-full p-2 hover:scale-110 transition-transform hover:bg-primary/10"
                  >
                    <X className="h-5 w-5 text-foreground/70" />
                  </button>
                </div>

                <div className="px-8 pb-10 pt-4 flex flex-col gap-6">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.25, duration: 0.5 }}
                  >
                    <h2 className="font-serif font-bold text-3xl md:text-4xl leading-tight mb-3">
                      {selectedEvent.title}
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {selectedEvent.summary}
                    </p>
                  </motion.div>

                  <div className="h-px bg-primary/20 w-16" />

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.35, duration: 0.5 }}
                    className="space-y-4"
                  >
                    {selectedEvent.body.map((para, i) => (
                      <p key={i} className="text-muted-foreground leading-relaxed text-sm">
                        {para}
                      </p>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.45, duration: 0.5 }}
                  >
                    <h4 className="font-serif font-bold text-lg mb-4 text-foreground">Durante el evento</h4>
                    <div className="space-y-3">
                      {selectedEvent.highlights.map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.5 + i * 0.07 }}
                          className="flex items-start gap-3"
                        >
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          <p className="text-sm text-muted-foreground leading-relaxed">{h}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
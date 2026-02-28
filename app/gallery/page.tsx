"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Play, Camera, Video, Plane, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"

type MediaItem = {
  id: number
  type: "image" | "video"
  category: string
  title: string
  description: string
  image: string
  thumbnail: string
}

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load gallery")
        return res.json()
      })
      .then((data) => setMediaItems(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const categories = [
    { id: "all", label: "Todo", icon: Camera },
    // { id: "aircraft", label: "Aeronaves", icon: Plane },
    // { id: "destinations", label: "Destinos", icon: Camera },
    // { id: "experience", label: "Experiencia", icon: Video },
  ]

  const filteredMedia =
    selectedCategory === "all" ? mediaItems : mediaItems.filter((item) => item.category === selectedCategory)

  const openLightbox = (media: MediaItem, index: number) => {
    setSelectedMedia(media)
    setCurrentIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setSelectedMedia(null)
  }

  const navigateMedia = (direction: "prev" | "next") => {
    const newIndex =
      direction === "next"
        ? (currentIndex + 1) % filteredMedia.length
        : (currentIndex - 1 + filteredMedia.length) % filteredMedia.length
    setCurrentIndex(newIndex)
    setSelectedMedia(filteredMedia[newIndex])
  }

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") navigateMedia("next")
      if (e.key === "ArrowLeft") navigateMedia("prev")
      if (e.key === "Escape") closeLightbox()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [lightboxOpen, currentIndex, filteredMedia])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/20 mt-4">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center glass rounded-full px-6 py-3 mb-8"
            >
              <Camera className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm font-medium">Experiencia Visual</span>
            </motion.div>
            <h1 className="font-serif font-bold text-5xl md:text-6xl lg:text-7xl mb-8 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              Galería
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Explora nuestro mundo de aviación de lujo a través de imágenes impresionantes.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`glass ${selectedCategory === category.id ? "animate-glow" : "border-primary/30 hover:bg-primary/10"}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <category.icon className="h-4 w-4 mr-2" />
                {category.label}
              </Button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
              <p className="text-muted-foreground text-sm">Cargando galería...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-32">
              <p className="text-destructive mb-2">No se pudo cargar la galería.</p>
              <p className="text-muted-foreground text-sm">{error}</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredMedia.length === 0 && (
            <div className="text-center py-32">
              <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No hay imágenes en esta categoría.</p>
            </div>
          )}

          {/* Grid */}
          {!loading && !error && filteredMedia.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMedia.map((media, index) => (
                <motion.div
                  key={media.id}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="group cursor-pointer"
                  onClick={() => openLightbox(media, index)}
                >
                  <Card className="glass overflow-hidden hover:scale-105 transition-all duration-500 relative">
                    <div className="relative h-80 overflow-hidden bg-muted/30">
                      <img
                        src={media.thumbnail}
                        alt={media.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Media Type Badge */}
                      <div className="absolute top-4 right-4 glass rounded-full p-2">
                        {media.type === "video"
                          ? <Play className="h-4 w-4 text-primary" />
                          : <Camera className="h-4 w-4 text-primary" />
                        }
                      </div>

                      {/* Hover Center Icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="glass rounded-full p-4">
                          {media.type === "video"
                            ? <Play className="h-8 w-8 text-primary" />
                            : <Camera className="h-8 w-8 text-primary" />
                          }
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-lg"
            onClick={closeLightbox}
          >
            <div className="relative max-w-6xl max-h-[90vh] mx-4" onClick={(e) => e.stopPropagation()}>
              {/* Close */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 glass rounded-full p-2 hover:scale-110 transition-transform"
              >
                <X className="h-6 w-6 text-primary" />
              </button>

              {/* Prev */}
              <button
                onClick={() => navigateMedia("prev")}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 glass rounded-full p-3 hover:scale-110 transition-transform"
              >
                <ChevronLeft className="h-6 w-6 text-primary" />
              </button>

              {/* Next */}
              <button
                onClick={() => navigateMedia("next")}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 glass rounded-full p-3 hover:scale-110 transition-transform"
              >
                <ChevronRight className="h-6 w-6 text-primary" />
              </button>

              <motion.div
                key={selectedMedia.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="glass-strong rounded-2xl overflow-hidden"
              >
                <div className="relative">
                  {selectedMedia.type === "video" ? (
                    <video
                      src={selectedMedia.image}
                      controls
                      autoPlay
                      className="w-full h-auto max-h-[70vh] object-contain bg-black"
                    />
                  ) : (
                    <img
                      src={selectedMedia.image}
                      alt={selectedMedia.title}
                      className="w-full h-auto max-h-[70vh] object-contain"
                    />
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

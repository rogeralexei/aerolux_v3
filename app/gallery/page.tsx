"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, X, Play, Camera, Video, Plane, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState<any>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const mediaItems = [
    {
      id: 1,
      type: "image",
      category: "aircraft",
      title: "Gulfstream G650 Interior",
      description: "Luxurious cabin with premium leather seating and state-of-the-art entertainment",
      image: "luxury private jet interior with leather seats and modern amenities",
      thumbnail: "luxury private jet interior with leather seats and modern amenities",
    },
    {
      id: 2,
      type: "video",
      category: "destinations",
      title: "Monaco Arrival Experience",
      description: "Landing at Monaco heliport with stunning Mediterranean views",
      image: "Monaco coastline with luxury yachts and private helicopter landing",
      thumbnail: "Monaco coastline with luxury yachts and private helicopter landing",
    },
    {
      id: 3,
      type: "image",
      category: "aircraft",
      title: "Bombardier Global 7500",
      description: "The pinnacle of long-range luxury aviation",
      image: "sleek white private jet on runway at sunset with dramatic sky",
      thumbnail: "sleek white private jet on runway at sunset with dramatic sky",
    },
    {
      id: 4,
      type: "image",
      category: "destinations",
      title: "Aspen Mountain Views",
      description: "Breathtaking alpine scenery from 40,000 feet",
      image: "snow-capped mountains in Aspen viewed from private jet window",
      thumbnail: "snow-capped mountains in Aspen viewed from private jet window",
    },
    {
      id: 5,
      type: "video",
      category: "experience",
      title: "Concierge Service",
      description: "White-glove service from departure to arrival",
      image: "luxury airport lounge with concierge service and champagne",
      thumbnail: "luxury airport lounge with concierge service and champagne",
    },
    {
      id: 6,
      type: "image",
      category: "aircraft",
      title: "Citation X+ Cockpit",
      description: "Advanced avionics and cutting-edge technology",
      image: "modern private jet cockpit with advanced digital displays and controls",
      thumbnail: "modern private jet cockpit with advanced digital displays and controls",
    },
    {
      id: 7,
      type: "image",
      category: "destinations",
      title: "Maldives Seaplane Transfer",
      description: "Scenic approach to paradise",
      image: "seaplane flying over crystal clear waters and coral atolls in Maldives",
      thumbnail: "seaplane flying over crystal clear waters and coral atolls in Maldives",
    },
    {
      id: 8,
      type: "video",
      category: "aircraft",
      title: "Fleet Showcase",
      description: "Our complete range of luxury aircraft",
      image: "multiple luxury private jets lined up on tarmac at golden hour",
      thumbnail: "multiple luxury private jets lined up on tarmac at golden hour",
    },
    {
      id: 9,
      type: "image",
      category: "experience",
      title: "Gourmet Dining",
      description: "Michelin-star quality cuisine at altitude",
      image: "elegant fine dining setup inside private jet with gourmet meal",
      thumbnail: "elegant fine dining setup inside private jet with gourmet meal",
    },
  ]

  const categories = [
    { id: "all", label: "All Media", icon: Camera },
    { id: "aircraft", label: "Aircraft", icon: Plane },
    { id: "destinations", label: "Destinations", icon: Camera },
    { id: "experience", label: "Experience", icon: Video },
  ]

  const filteredMedia =
    selectedCategory === "all" ? mediaItems : mediaItems.filter((item) => item.category === selectedCategory)

  const openLightbox = (media: any, index: number) => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/20">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-strong">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2 hover:scale-105 transition-transform">
              <ArrowLeft className="h-5 w-5 text-primary" />
              <Plane className="h-8 w-8 text-primary" />
              <span className="font-serif font-bold text-xl">Aerolux Charter</span>
            </Link>
            <Button className="animate-glow">Schedule Flight</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
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
              <span className="text-sm font-medium">Visual Journey</span>
            </motion.div>
            <h1 className="font-serif font-bold text-5xl md:text-6xl lg:text-7xl mb-8 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              Gallery
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Explore our world of luxury aviation through stunning visuals. From our premium fleet to breathtaking
              destinations, witness the Aerolux experience.
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMedia.map((media, index) => (
              <motion.div
                key={media.id}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => openLightbox(media, index)}
              >
                <Card className="glass overflow-hidden hover:scale-105 transition-all duration-500 relative">
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={`/abstract-geometric-shapes.png?height=400&width=600&query=${media.thumbnail}`}
                      alt={media.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Media Type Indicator */}
                    <div className="absolute top-4 right-4 glass rounded-full p-2">
                      {media.type === "video" ? (
                        <Play className="h-4 w-4 text-primary" />
                      ) : (
                        <Camera className="h-4 w-4 text-primary" />
                      )}
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="glass rounded-full p-4">
                        {media.type === "video" ? (
                          <Play className="h-8 w-8 text-primary" />
                        ) : (
                          <Camera className="h-8 w-8 text-primary" />
                        )}
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="font-serif font-bold text-xl text-white mb-2">{media.title}</h3>
                      <p className="text-white/80 text-sm">{media.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
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
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 glass rounded-full p-2 hover:scale-110 transition-transform"
              >
                <X className="h-6 w-6 text-primary" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={() => navigateMedia("prev")}
                className="absolute left-4 top-1/2 -translate-y-1/2 glass rounded-full p-3 hover:scale-110 transition-transform"
              >
                <ChevronLeft className="h-6 w-6 text-primary" />
              </button>
              <button
                onClick={() => navigateMedia("next")}
                className="absolute right-4 top-1/2 -translate-y-1/2 glass rounded-full p-3 hover:scale-110 transition-transform"
              >
                <ChevronRight className="h-6 w-6 text-primary" />
              </button>

              {/* Media Content */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="glass-strong rounded-2xl overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={`/abstract-geometric-shapes.png?height=600&width=900&query=${selectedMedia.image}`}
                    alt={selectedMedia.title}
                    className="w-full h-auto max-h-[70vh] object-contain"
                  />
                  {selectedMedia.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="glass rounded-full p-6">
                        <Play className="h-12 w-12 text-primary" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-serif font-bold text-2xl mb-2">{selectedMedia.title}</h3>
                  <p className="text-muted-foreground">{selectedMedia.description}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

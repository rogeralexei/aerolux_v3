"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Clock,
  Star,
  Plane,
  Trophy,
  Combine as Champagne,
  Music,
} from "lucide-react"
import Link from "next/link"

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const events = [
    {
      id: 1,
      title: "Monaco Grand Prix VIP Experience",
      date: "May 25-28, 2024",
      location: "Monaco, French Riviera",
      category: "sports",
      price: "From $45,000",
      image: "Monaco Grand Prix with luxury yachts and private jets",
      description: "Experience the pinnacle of motorsport luxury with exclusive access to the Monaco Grand Prix.",
      highlights: ["Paddock Club Access", "Private Yacht Party", "Helicopter Transfers", "Michelin Star Dining"],
      duration: "4 Days",
      capacity: "12 Guests",
      status: "Available",
    },
    {
      id: 2,
      title: "Aspen Winter Luxury Retreat",
      date: "December 15-22, 2024",
      location: "Aspen, Colorado",
      category: "lifestyle",
      price: "From $28,000",
      image: "luxury ski resort in Aspen with private jets on snowy runway",
      description: "Ultimate winter luxury experience in the heart of the Rocky Mountains.",
      highlights: ["Private Ski Lessons", "Luxury Lodge Stay", "Spa Treatments", "Gourmet Mountain Dining"],
      duration: "7 Days",
      capacity: "8 Guests",
      status: "Limited",
    },
    {
      id: 3,
      title: "Maldives Exclusive Island Charter",
      date: "March 10-17, 2024",
      location: "Maldives, Indian Ocean",
      category: "luxury",
      price: "From $65,000",
      image: "private island resort in Maldives with seaplane and luxury overwater villas",
      description: "Private island experience with unparalleled luxury and pristine natural beauty.",
      highlights: ["Private Island Access", "Overwater Villa", "Personal Butler", "Underwater Dining"],
      duration: "7 Days",
      capacity: "6 Guests",
      status: "Exclusive",
    },
    {
      id: 4,
      title: "Napa Valley Wine & Dine Experience",
      date: "September 8-11, 2024",
      location: "Napa Valley, California",
      category: "culinary",
      price: "From $18,000",
      image: "luxury vineyard in Napa Valley with private jet and wine tasting",
      description: "Exclusive wine country experience with world-renowned vintners and chefs.",
      highlights: ["Private Vineyard Tours", "Master Sommelier", "Chef's Table Dinners", "Luxury Estate Stay"],
      duration: "4 Days",
      capacity: "10 Guests",
      status: "Available",
    },
    {
      id: 5,
      title: "Art Basel Miami VIP Access",
      date: "December 6-10, 2024",
      location: "Miami, Florida",
      category: "culture",
      price: "From $22,000",
      image: "modern art gallery in Miami with luxury private jet and contemporary art",
      description: "Immerse yourself in the world's premier contemporary art fair with exclusive access.",
      highlights: ["VIP Preview Access", "Private Gallery Tours", "Artist Meet & Greets", "Luxury Beach Resort"],
      duration: "5 Days",
      capacity: "8 Guests",
      status: "Available",
    },
    {
      id: 6,
      title: "Northern Lights Arctic Adventure",
      date: "February 12-18, 2024",
      location: "Tromsø, Norway",
      category: "adventure",
      price: "From $35,000",
      image: "northern lights over arctic landscape with luxury ice hotel and private jet",
      description: "Witness the magical Aurora Borealis in ultimate comfort and style.",
      highlights: ["Glass Igloo Stay", "Husky Sledding", "Private Aurora Guide", "Ice Hotel Experience"],
      duration: "6 Days",
      capacity: "6 Guests",
      status: "Limited",
    },
  ]

  const categories = [
    { id: "all", label: "All Events", icon: Star },
    { id: "sports", label: "Sports", icon: Trophy },
    { id: "lifestyle", label: "Lifestyle", icon: Champagne },
    { id: "luxury", label: "Luxury", icon: Star },
    { id: "culinary", label: "Culinary", icon: Music },
    { id: "culture", label: "Culture", icon: Music },
    { id: "adventure", label: "Adventure", icon: Plane },
  ]

  const filteredEvents =
    selectedCategory === "all" ? events : events.filter((event) => event.category === selectedCategory)

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
            <Button className="animate-glow">Book Event</Button>
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
              <Calendar className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm font-medium">Exclusive Events</span>
            </motion.div>
            <h1 className="font-serif font-bold text-5xl md:text-6xl lg:text-7xl mb-8 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              Curated Experiences
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Join us for extraordinary events and exclusive experiences around the world. Each journey is carefully
              crafted to create unforgettable memories.
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

      {/* Events Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group"
              >
                <Card className="glass-strong overflow-hidden hover:scale-105 transition-all duration-500 relative">
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={`/abstract-geometric-shapes.png?height=500&width=800&query=${event.image}`}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

                    {/* Status Badge */}
                    <div
                      className={`absolute top-4 right-4 glass rounded-full px-3 py-1 ${
                        event.status === "Exclusive"
                          ? "bg-primary/20 border-primary/30"
                          : event.status === "Limited"
                            ? "bg-yellow-500/20 border-yellow-500/30"
                            : "bg-green-500/20 border-green-500/30"
                      }`}
                    >
                      <span
                        className={`text-xs font-medium ${
                          event.status === "Exclusive"
                            ? "text-primary"
                            : event.status === "Limited"
                              ? "text-yellow-500"
                              : "text-green-500"
                        }`}
                      >
                        {event.status}
                      </span>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center mb-2">
                        <MapPin className="h-4 w-4 text-primary mr-2" />
                        <span className="text-sm text-white/80">{event.location}</span>
                      </div>
                      <h3 className="font-serif font-bold text-2xl text-white mb-2">{event.title}</h3>
                      <div className="flex items-center text-white/90 mb-4">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-sm">{event.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <p className="text-muted-foreground mb-6 leading-relaxed">{event.description}</p>

                    {/* Event Details */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <Clock className="h-5 w-5 text-primary mx-auto mb-2" />
                        <div className="text-sm font-medium">{event.duration}</div>
                      </div>
                      <div className="text-center">
                        <Users className="h-5 w-5 text-primary mx-auto mb-2" />
                        <div className="text-sm font-medium">{event.capacity}</div>
                      </div>
                      <div className="text-center">
                        <Star className="h-5 w-5 text-primary mx-auto mb-2" />
                        <div className="text-sm font-medium">VIP Access</div>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-6">
                      <h4 className="font-serif font-bold text-lg mb-3">Experience Highlights</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {event.highlights.map((highlight) => (
                          <div key={highlight} className="flex items-center">
                            <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                            <span className="text-sm text-muted-foreground">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-muted-foreground">Starting from</div>
                        <div className="font-serif font-bold text-2xl text-primary">{event.price}</div>
                      </div>
                      <Button className="animate-glow group">
                        Reserve Now
                        <Calendar className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

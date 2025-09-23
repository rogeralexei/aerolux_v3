"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plane3D } from "@/components/3d-plane"
import { ParticleSystem } from "@/components/particle-system"
import { LoadingScreen } from "@/components/loading-screen"
import { ScrollProgress } from "@/components/scroll-progress"
import {
  Plane,
  Users,
  Star,
  ArrowRight,
  Globe,
  Shield,
  Award,
  MapPin,
  Clock,
  Compass,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  TrendingUp,
  Zap,
} from "lucide-react"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedOperator, setSelectedOperator] = useState<number | null>(null)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)

  const [stats, setStats] = useState([
    { number: 15000, suffix: "+", label: "Flights Completed", icon: Plane },
    { number: 98, suffix: "%", label: "Client Satisfaction", icon: Star },
    { number: 150, suffix: "+", label: "Destinations", icon: MapPin },
    { number: 24, suffix: "/7", label: "Concierge Service", icon: Clock },
  ])

  const [operators, setOperators] = useState([
    {
      name: "Elite Aviation",
      rating: 5,
      flights: "2,500+",
      established: "2010",
      fleet: "25 Aircraft",
      specialties: ["Business Jets", "Long Range", "VIP Service"],
      certifications: ["IS-BAO", "Wyvern", "ARGUS"],
      description: "Premier luxury aviation with unmatched attention to detail and personalized service.",
      contact: "+1 (555) 123-0001",
    },
    {
      name: "Platinum Jets",
      rating: 5,
      flights: "3,200+",
      established: "2008",
      fleet: "32 Aircraft",
      specialties: ["Global Reach", "Cargo", "Group Travel"],
      certifications: ["IS-BAO", "IOSA", "ARGUS"],
      description: "Global aviation solutions with the largest fleet and worldwide coverage.",
      contact: "+1 (555) 123-0002",
    },
    {
      name: "Luxury Air",
      rating: 5,
      flights: "1,800+",
      established: "2012",
      fleet: "18 Aircraft",
      specialties: ["Ultra Luxury", "Concierge", "Custom Interior"],
      certifications: ["IS-BAO", "Wyvern", "NBAA"],
      description: "Ultra-luxury experiences with bespoke interiors and white-glove service.",
      contact: "+1 (555) 123-0003",
    },
    {
      name: "Premier Flight",
      rating: 5,
      flights: "2,900+",
      established: "2009",
      fleet: "28 Aircraft",
      specialties: ["Medical Transport", "Emergency", "24/7 Service"],
      certifications: ["IS-BAO", "EURAMI", "ARGUS"],
      description: "Specialized in urgent and medical transport with round-the-clock availability.",
      contact: "+1 (555) 123-0004",
    },
  ])

  const [operatorCounts, setOperatorCounts] = useState([
    { metric: "On-Time Performance", value: "99.2%", icon: Clock, trend: "+0.3%" },
    { metric: "Safety Rating", value: "5.0/5", icon: Shield, trend: "Perfect" },
    { metric: "Customer Satisfaction", value: "4.9/5", icon: Star, trend: "+0.1%" },
    { metric: "Fleet Availability", value: "96.8%", icon: Plane, trend: "+2.1%" },
  ])

  useEffect(() => {
    cursorDotRef.current = document.querySelector(".cursor-dot") as HTMLDivElement
    cursorRingRef.current = document.querySelector(".cursor-ring") as HTMLDivElement

    const moveCursor = (e: MouseEvent) => {
      if (cursorDotRef.current && cursorRingRef.current) {
        const x = e.clientX
        const y = e.clientY

        // Smooth cursor movement with requestAnimationFrame
        requestAnimationFrame(() => {
          if (cursorDotRef.current && cursorRingRef.current) {
            cursorDotRef.current.style.left = x - 4 + "px"
            cursorDotRef.current.style.top = y - 4 + "px"
            cursorRingRef.current.style.left = x - 16 + "px"
            cursorRingRef.current.style.top = y - 16 + "px"
          }
        })
      }
    }

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement
      const tagName = target.tagName.toLowerCase()

      if (cursorRingRef.current && cursorDotRef.current) {
        // Different cursor states for different elements
        if (tagName === "button") {
          cursorRingRef.current.style.transform = "scale(2)"
          cursorRingRef.current.style.borderColor = "var(--color-accent)"
          cursorRingRef.current.style.borderWidth = "3px"
          cursorDotRef.current.style.transform = "scale(1.5)"
          cursorDotRef.current.style.background = "var(--color-accent)"
        } else if (tagName === "a") {
          cursorRingRef.current.style.transform = "scale(1.5)"
          cursorRingRef.current.style.borderColor = "var(--color-primary)"
          cursorRingRef.current.style.background = "var(--color-primary)"
          cursorRingRef.current.style.opacity = "0.3"
          cursorDotRef.current.style.transform = "scale(0.5)"
        } else {
          cursorRingRef.current.style.transform = "scale(1.8)"
          cursorRingRef.current.style.borderColor = "var(--color-accent)"
          cursorRingRef.current.style.borderWidth = "3px"
        }

        // Enhanced magnetic effect with smooth interpolation
        const rect = target.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        cursorRingRef.current.style.left = centerX - 16 + "px"
        cursorRingRef.current.style.top = centerY - 16 + "px"
      }
    }

    const handleMouseLeave = () => {
      if (cursorRingRef.current && cursorDotRef.current) {
        cursorRingRef.current.style.transform = "scale(1)"
        cursorRingRef.current.style.borderColor = "var(--color-primary)"
        cursorRingRef.current.style.borderWidth = "2px"
        cursorRingRef.current.style.background = "transparent"
        cursorRingRef.current.style.opacity = "1"
        cursorDotRef.current.style.transform = "scale(1)"
        cursorDotRef.current.style.background = "var(--color-primary)"
      }
    }

    // Handle text selection cursor state
    const handleTextSelect = () => {
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = "scale(0.5)"
        cursorDotRef.current.style.background = "var(--color-accent)"
      }
    }

    document.addEventListener("mousemove", moveCursor)
    document.addEventListener("selectstart", handleTextSelect)

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"], input, textarea')
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      document.removeEventListener("mousemove", moveCursor)
      document.removeEventListener("selectstart", handleTextSelect)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      <LoadingScreen />
      <div className="min-h-screen bg-gradient-modern custom-cursor relative texture-overlay">
        <ScrollProgress />
        <ParticleSystem />

        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 w-full z-50 glass-strong border-b border-primary/10"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative">
                  <Plane className="h-10 w-10 text-primary rotate-45" />
                  <div className="absolute inset-0 h-10 w-10 bg-primary/20 rounded-full blur-md"></div>
                </div>
                <div>
                  <span className="font-serif font-bold text-2xl tracking-tight">Aerolux</span>
                  <div className="text-xs text-muted-foreground tracking-widest uppercase">Charter</div>
                </div>
              </motion.div>

              {/* Desktop Navigation - Modern minimal style */}
              <div className="hidden lg:flex items-center space-x-12">
                {[
                  { name: "Home", href: "home" },
                  { name: "Fleet", href: "destinations" },
                  { name: "Partners", href: "operators" },
                  { name: "Gallery", href: "gallery" },
                  { name: "Team", href: "team" },
                ].map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="relative text-foreground/80 hover:text-foreground transition-all duration-300 text-sm font-medium tracking-wide group"
                    whileHover={{ y: -2 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </motion.button>
                ))}

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    className="bg-gradient-red hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 px-8 py-2 text-sm font-medium tracking-wide animate-gradient"
                    size="sm"
                  >
                    Book Flight
                  </Button>
                </motion.div>
              </div>

              {/* Mobile menu button - Modern hamburger */}
              <motion.button
                className="lg:hidden relative w-10 h-10 flex items-center justify-center glass rounded-full"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={isMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -3 }}
                  className="w-5 h-0.5 bg-foreground absolute"
                />
                <motion.div
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-5 h-0.5 bg-foreground absolute"
                />
                <motion.div
                  animate={isMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 3 }}
                  className="w-5 h-0.5 bg-foreground absolute"
                />
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation - Modern slide-down */}
          <motion.div
            initial={false}
            animate={{
              height: isMenuOpen ? "auto" : 0,
              opacity: isMenuOpen ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden glass-strong border-t border-primary/10"
          >
            <div className="px-6 py-8 space-y-6">
              {[
                { name: "Home", href: "home" },
                { name: "Fleet", href: "destinations" },
                { name: "Partners", href: "operators" },
                { name: "Gallery", href: "gallery" },
                { name: "Team", href: "team" },
              ].map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block text-foreground/80 hover:text-primary transition-colors text-lg font-medium w-full text-left"
                  initial={{ x: -20, opacity: 0 }}
                  animate={isMenuOpen ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.name}
                </motion.button>
              ))}
              <Button className="w-full bg-gradient-red mt-6 animate-gradient">Book Flight</Button>
            </div>
          </motion.div>
        </motion.nav>

        {/* Custom Cursors */}
        <div ref={cursorDotRef} className="cursor-dot"></div>
        <div ref={cursorRingRef} className="cursor-ring"></div>

        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <motion.div style={{ y }} className="absolute inset-0 z-0">
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('/luxury-private-jet-flying-above-clouds-at-sunset-w.png')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-background/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </motion.div>

          {/* <motion.div
            className="absolute top-1/2 right-1/4 transform -translate-y-1/2 hidden lg:block"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <Plane3D />
          </motion.div> */}

          <motion.div style={{ opacity }} className="relative z-10 text-center max-w-4xl mx-auto px-6 lg:px-8">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent leading-tight"
            >
              Your Sky, Your Rules
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed font-light"
            >
              Experience the pinnacle of luxury aviation with our premium charter services.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                className="text-base px-8 py-3 bg-gradient-red hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Schedule Your Flight
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-base px-8 py-3 glass-strong border-primary/30 hover:bg-primary/10 bg-transparent hover:border-primary/60 transition-all duration-300"
              >
                Explore Fleet
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Enhanced Mission & Vision Section */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
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
                <Globe className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm font-medium">Global Excellence</span>
              </motion.div>
              <h2 className="font-serif font-bold text-5xl md:text-6xl lg:text-7xl mb-8 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                Redefining Luxury Aviation
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                We believe that travel should be an experience, not just a means to an end. Our commitment to excellence
                ensures every flight exceeds expectations and creates lasting memories.
              </p>
            </motion.div>

            {/* Enhanced Mission & Vision Cards */}
            <div className="grid lg:grid-cols-2 gap-12 mb-20">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="group"
              >
                <Card className="glass-strong p-10 h-full hover:scale-105 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center mb-8">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="glass-strong rounded-full p-4 mr-6"
                      >
                        <Plane className="h-10 w-10 text-primary" />
                      </motion.div>
                      <h3 className="font-serif font-bold text-3xl">Our Mission</h3>
                    </div>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                      To provide unparalleled private aviation experiences that combine luxury, safety, and personalized
                      service. We transform travel into memorable journeys that reflect the unique preferences and
                      requirements of each client, ensuring every flight is a testament to excellence.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 text-primary mr-3" />
                        <span className="text-sm font-medium">Safety First Approach</span>
                      </div>
                      <div className="flex items-center">
                        <Award className="h-5 w-5 text-primary mr-3" />
                        <span className="text-sm font-medium">Personalized Service</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-primary mr-3" />
                        <span className="text-sm font-medium">24/7 Availability</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="group"
              >
                <Card className="glass-strong p-10 h-full hover:scale-105 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center mb-8">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="glass-strong rounded-full p-4 mr-6"
                      >
                        <Star className="h-10 w-10 text-primary" />
                      </motion.div>
                      <h3 className="font-serif font-bold text-3xl">Our Vision</h3>
                    </div>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                      To be the world's most trusted and innovative private jet charter service, setting new standards
                      for luxury travel while maintaining our commitment to sustainability and exceptional customer
                      relationships that span generations.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Globe className="h-5 w-5 text-primary mr-3" />
                        <span className="text-sm font-medium">Global Leadership</span>
                      </div>
                      <div className="flex items-center">
                        <Compass className="h-5 w-5 text-primary mr-3" />
                        <span className="text-sm font-medium">Innovation Focus</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-primary mr-3" />
                        <span className="text-sm font-medium">Sustainable Future</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => {
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <Card className="glass p-6 hover:scale-105 transition-transform duration-300 group">
                      <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                        <stat.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                      </motion.div>
                      <div className="font-serif font-bold text-3xl md:text-4xl text-primary mb-2">
                        {stat.number.toLocaleString()}
                        {stat.suffix}
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* Enhanced Destinations Section */}
        <section
          id="destinations"
          className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/10 to-background relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
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
                <MapPin className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm font-medium">Worldwide Access</span>
              </motion.div>
              <h2 className="font-serif font-bold text-5xl md:text-6xl lg:text-7xl mb-8 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                Exclusive Destinations
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                From bustling metropolises to secluded paradises, we'll take you anywhere your heart desires with
                unmatched style and comfort.
              </p>
            </motion.div>

            {/* Enhanced Destination Cards */}
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {[
                {
                  name: "Monaco",
                  region: "French Riviera",
                  image: "luxury yacht harbor in Monaco with private jets overhead",
                  description: "Mediterranean luxury at its finest",
                  highlights: ["Monte Carlo Casino", "Yacht Week", "Grand Prix"],
                  flightTime: "2.5 hrs from London",
                },
                {
                  name: "Aspen",
                  region: "Colorado, USA",
                  image: "snow-capped mountains in Aspen with luxury ski resort",
                  description: "Alpine elegance and world-class skiing",
                  highlights: ["Powder Mountain", "Luxury Lodges", "Après-Ski"],
                  flightTime: "4 hrs from NYC",
                },
                {
                  name: "Maldives",
                  region: "Indian Ocean",
                  image: "crystal clear waters and overwater bungalows in Maldives",
                  description: "Tropical paradise and pristine beaches",
                  highlights: ["Private Islands", "Coral Reefs", "Overwater Villas"],
                  flightTime: "8 hrs from Dubai",
                },
              ].map((destination, index) => (
                <motion.div
                  key={destination.name}
                  initial={{ y: 100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="group"
                >
                  <Card className="glass-strong overflow-hidden group-hover:scale-105 transition-all duration-500 relative">
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src={`/abstract-geometric-shapes.png?height=500&width=700&query=${destination.image}`}
                        alt={destination.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

                      {/* Floating Info Badge */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="absolute top-4 right-4 glass rounded-full px-3 py-1"
                      >
                        <span className="text-xs font-medium text-primary">{destination.flightTime}</span>
                      </motion.div>

                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center mb-2">
                          <MapPin className="h-4 w-4 text-primary mr-2" />
                          <span className="text-sm text-white/80">{destination.region}</span>
                        </div>
                        <h3 className="font-serif font-bold text-3xl text-white mb-3">{destination.name}</h3>
                        <p className="text-white/90 mb-4">{destination.description}</p>

                        {/* Highlights */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {destination.highlights.map((highlight) => (
                            <span
                              key={highlight}
                              className="glass rounded-full px-3 py-1 text-xs text-white/90 border border-white/20"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="p-6">
                      <Button
                        variant="outline"
                        className="w-full glass border-primary/30 hover:bg-primary/10 bg-transparent group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                      >
                        Explore Destination
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Destination Categories */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="grid md:grid-cols-4 gap-6"
            >
              {[
                { category: "Business Hubs", count: "45+", icon: "🏙️" },
                { category: "Tropical Escapes", count: "32+", icon: "🏝️" },
                { category: "Mountain Retreats", count: "28+", icon: "🏔️" },
                { category: "Cultural Cities", count: "67+", icon: "🏛️" },
              ].map((category, index) => (
                <motion.div
                  key={category.category}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="glass p-6 text-center hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl mb-3">{category.icon}</div>
                    <h4 className="font-serif font-bold text-lg mb-2">{category.category}</h4>
                    <p className="text-2xl font-bold text-primary mb-1">{category.count}</p>
                    <p className="text-sm text-muted-foreground">destinations</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Operators Section */}
        <section id="operators" className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 right-10 w-80 h-80 bg-primary rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-64 h-64 bg-accent rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
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
                <span className="text-sm font-medium">Certified Excellence</span>
              </motion.div>
              <h2 className="font-serif font-bold text-5xl md:text-6xl lg:text-7xl mb-8 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                Trusted Partners
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                We work exclusively with certified operators who share our commitment to safety, luxury, and excellence.
                Each partner undergoes rigorous vetting to ensure the highest standards.
              </p>
            </motion.div>

            {/* Enhanced Operator Cards */}
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {operators.map((operator, index) => (
                <motion.div
                  key={operator.name}
                  initial={{ y: 100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="group"
                >
                  <Card
                    className={`glass-strong p-8 hover:scale-105 transition-all duration-500 cursor-pointer relative overflow-hidden ${
                      selectedOperator === index ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedOperator(selectedOperator === index ? null : index)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className="glass-strong rounded-full p-3 mr-4"
                          >
                            <Users className="h-8 w-8 text-primary" />
                          </motion.div>
                          <div>
                            <h3 className="font-serif font-bold text-2xl mb-1">{operator.name}</h3>
                            <div className="flex items-center">
                              {[...Array(operator.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                              ))}
                              <span className="text-sm text-muted-foreground ml-2">({operator.flights} flights)</span>
                            </div>
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: selectedOperator === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ArrowRight className="h-5 w-5 text-primary" />
                        </motion.div>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="glass rounded-lg p-3">
                          <div className="text-sm text-muted-foreground">Established</div>
                          <div className="font-bold text-primary">{operator.established}</div>
                        </div>
                        <div className="glass rounded-lg p-3">
                          <div className="text-sm text-muted-foreground">Fleet Size</div>
                          <div className="font-bold text-primary">{operator.fleet}</div>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-6 leading-relaxed">{operator.description}</p>

                      {/* Expandable Details */}
                      <motion.div
                        initial={false}
                        animate={{
                          height: selectedOperator === index ? "auto" : 0,
                          opacity: selectedOperator === index ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-6 pt-6 border-t border-border/20">
                          {/* Specialties */}
                          <div>
                            <h4 className="font-serif font-bold text-lg mb-3 flex items-center">
                              <Zap className="h-5 w-5 text-primary mr-2" />
                              Specialties
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {operator.specialties.map((specialty) => (
                                <span
                                  key={specialty}
                                  className="glass rounded-full px-3 py-1 text-sm border border-primary/20"
                                >
                                  {specialty}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Certifications */}
                          <div>
                            <h4 className="font-serif font-bold text-lg mb-3 flex items-center">
                              <CheckCircle className="h-5 w-5 text-primary mr-2" />
                              Certifications
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {operator.certifications.map((cert) => (
                                <span
                                  key={cert}
                                  className="glass rounded-full px-3 py-1 text-sm bg-primary/10 border border-primary/30"
                                >
                                  {cert}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Contact Actions */}
                          <div className="flex gap-3">
                            <Button size="sm" className="flex-1">
                              <Phone className="h-4 w-4 mr-2" />
                              Call Now
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 glass border-primary/30 bg-transparent"
                            >
                              <Mail className="h-4 w-4 mr-2" />
                              Email
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 glass border-primary/30 bg-transparent"
                            >
                              <Calendar className="h-4 w-4 mr-2" />
                              Book
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Operator Performance Metrics */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="glass-strong rounded-2xl p-8"
            >
              <div className="text-center mb-8">
                <h3 className="font-serif font-bold text-3xl mb-4">Network Performance</h3>
                <p className="text-muted-foreground">Real-time metrics from our trusted operator network</p>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                {operatorCounts.map((metric, index) => (
                  <motion.div
                    key={metric.metric}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <Card className="glass p-6 hover:scale-105 transition-transform duration-300">
                      <metric.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                      <div className="font-serif font-bold text-2xl text-primary mb-1">{metric.value}</div>
                      <div className="text-sm text-muted-foreground mb-2">{metric.metric}</div>
                      <div className="flex items-center justify-center">
                        <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                        <span className="text-xs text-green-500">{metric.trend}</span>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Destinations Preview */}
        <section id="destinations-preview" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-serif font-bold text-4xl md:text-5xl lg:text-7xl mb-8 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                Redefining Luxury Aviation
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                We believe that travel should be an experience, not just a means to an end. Our commitment to excellence
                ensures every flight exceeds expectations.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  name: "Monaco",
                  image: "luxury yacht harbor in Monaco with private jets overhead",
                  description: "Mediterranean luxury at its finest",
                },
                {
                  name: "Aspen",
                  image: "snow-capped mountains in Aspen with luxury ski resort",
                  description: "Alpine elegance and world-class skiing",
                },
                {
                  name: "Maldives",
                  image: "crystal clear waters and overwater bungalows in Maldives",
                  description: "Tropical paradise and pristine beaches",
                },
              ].map((destination, index) => (
                <motion.div
                  key={destination.name}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <Card className="glass overflow-hidden group hover:scale-105 transition-all duration-300">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={`/abstract-geometric-shapes.png?height=400&width=600&query=${destination.image}`}
                        alt={destination.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <h3 className="font-serif font-bold text-2xl text-white mb-2">{destination.name}</h3>
                        <p className="text-white/80">{destination.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif font-bold text-4xl md:text-5xl mb-6">Ready to Elevate Your Journey?</h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Experience the difference of true luxury aviation. Contact us today to plan your next extraordinary
                flight.
              </p>
              <Button size="lg" className="text-lg px-12 py-4 animate-glow group bg-gradient-red animate-gradient">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="glass-strong border-t border-border/20 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Plane className="h-8 w-8 text-primary" />
                  <span className="font-serif font-bold text-xl">Aerolux Charter</span>
                </div>
                <p className="text-muted-foreground">
                  Your Sky, Your Rules. Premium private jet charter services for the discerning traveler.
                </p>
              </div>

              <div>
                <h3 className="font-serif font-bold text-lg mb-4">Services</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      Private Charters
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      Group Travel
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      Cargo Services
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      Aircraft Management
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-serif font-bold text-lg mb-4">Destinations</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      Europe
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      Americas
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      Asia Pacific
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      Middle East
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-serif font-bold text-lg mb-4">Contact</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>+1 (555) 123-4567</li>
                  <li>charter@aerolux.com</li>
                  <li>24/7 Concierge Service</li>
                  <li>Global Operations</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-border/20 mt-8 pt-8 text-center text-muted-foreground">
              <p>&copy; 2024 Aerolux Charter. All rights reserved. | Privacy Policy | Terms of Service</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

"use client"

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ParticleSystem } from "@/components/particle-system"
import { LoadingScreen } from "@/components/loading-screen"
import { ScrollProgress } from "@/components/scroll-progress"
import { LogoMarquee } from "@/components/logo-marquee"
import { FlightRequestDrawer } from "@/components/flight-request-drawer"
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
  Handshake,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const router = useRouter()

  return (
    <>
      <LoadingScreen />
      <div className="min-h-screen bg-gradient-modern custom-cursor relative texture-overlay">
        <ScrollProgress />
        <ParticleSystem />

        {/* Flight Request Drawer */}
        <FlightRequestDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <motion.div style={{ y }} className="absolute inset-0 z-0">
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('/hero.webp')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-background/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </motion.div>

          <motion.div style={{ opacity }} className="relative z-10 text-center max-w-4xl mx-auto px-6 lg:px-8">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl mb-6"
            >
              LA PASIÓN QUE DESPEGA CONTIGO
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed font-semibold"
            >
              Seguridad, exclusividad y servicio premium en cada experiencia.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              {/* Agenda un vuelo → opens drawer */}
              <Button
                size="lg"
                className="text-base px-8 py-3 bg-gradient-red hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 group relative overflow-hidden"
                onClick={() => setDrawerOpen(true)}
              >
                <span className="relative z-10 flex items-center">
                  Agenda un Vuelo
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>

              {/* Conoce a nuestros Aliados → navigates */}
              <Button
                variant="outline"
                size="lg"
                className="text-base px-8 py-3 glass-strong border-primary/30 hover:bg-primary/10 bg-transparent hover:border-primary/60 transition-all duration-300"
                onClick={() => router.push("/partners")}
              >
                Conóce a nuestros Aliados
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Mission & Vision Section */}
        <section className="pt-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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
                <span className="text-sm font-medium">Excelencia regional</span>
              </motion.div>
              <h2 className="font-serif font-bold text-5xl md:text-6xl lg:text-7xl mb-8 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                Redefiniendo la aviación regional
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Fortaleciendo la posición de Panamá como un hub estratégico, creando conexiones inteligentes y alianzas
                internacionales que impulsan el crecimiento de la aviación ejecutiva y comercial con estándares de clase
                mundial.
              </p>
            </motion.div>

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
                      <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }} className="glass-strong rounded-full p-4 mr-6">
                        <Plane className="h-10 w-10 text-primary" />
                      </motion.div>
                      <h3 className="font-serif font-bold text-3xl">Nuestra Misión</h3>
                    </div>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                      Conectamos personas y empresas a nivel global, ofreciendo soluciones aéreas seguras y
                      personalizadas que fortalecen alianzas estratégicas y posicionan a Panamá como centro de conexión
                      internacional.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Compass className="h-5 w-5 text-primary mr-3" />
                        <span className="text-sm font-medium">Conectar destinos y personas</span>
                      </div>
                      <div className="flex items-center">
                        <Award className="h-5 w-5 text-primary mr-3" />
                        <span className="text-sm font-medium">Impulsar a Panamá como hub regional</span>
                      </div>
                      <div className="flex items-center">
                        <Plane className="h-5 w-5 text-primary mr-3" />
                        <span className="text-sm font-medium">Ofrecer experiencias aéreas únicas</span>
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
                      <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }} className="glass-strong rounded-full p-4 mr-6">
                        <Star className="h-10 w-10 text-primary" />
                      </motion.div>
                      <h3 className="font-serif font-bold text-3xl">Nuestra Visión</h3>
                    </div>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                      Ser el referente en aviación ejecutiva y comercial de la región, creando conexiones inteligentes y
                      alianzas globales que transformen la manera de volar. Explorando destinos nuevos de forma segura y
                      confiable.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Globe className="h-5 w-5 text-primary mr-3" />
                        <span className="text-sm font-medium">Ser referente de la aviación regional</span>
                      </div>
                      <div className="flex items-center">
                        <Handshake className="h-5 w-5 text-primary mr-3" />
                        <span className="text-sm font-medium">Crear alianzas estratégicas globales</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-primary mr-3" />
                        <span className="text-sm font-medium">Crear conexiones inteligentes y sostenibles</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Partners Marquee */}
        <LogoMarquee />

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif font-bold text-4xl md:text-5xl mb-6">¿Listo para viajar con nosotros?</h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Experimente la diferencia de la verdadera aviación de lujo. Póngase en contacto con nosotros hoy mismo
                para planificar su próximo vuelo extraordinario.
              </p>
              <Button
                size="lg"
                className="text-lg px-12 py-4 animate-glow group bg-gradient-red animate-gradient"
                onClick={() => setDrawerOpen(true)}
              >
                Agenda un vuelo
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}

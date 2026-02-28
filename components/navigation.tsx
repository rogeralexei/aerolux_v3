"use client"

import React, { useState } from 'react'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

type Props = {
  onOpenDrawer?: () => void
}

function Navigation({ onOpenDrawer }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 glass-strong"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-3 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              onClick={() => router.push("/")}
            >
              <div className="relative">
                <img src="/logo.webp" alt="Logo" className="h-10 w-10" />
                <div className="absolute inset-0 h-10 w-10 bg-primary/20 rounded-full blur-md"></div>
              </div>
              <div>
                <span className="font-serif font-bold text-2xl tracking-tight">Aerolux Panamá</span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-12">
              {[
                { name: "Inicio", href: "/" },
                { name: "Galeria", href: "/gallery" },
                { name: "Eventos", href: "/events" },
                { name: "Aliados", href: "/partners" },
              ].map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => router.push(item.href)}
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
                  onClick={onOpenDrawer}
                  className="bg-gradient-red hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 px-8 py-2 text-sm font-medium tracking-wide animate-gradient"
                  size="sm"
                >
                  Agendar Vuelo
                </Button>
              </motion.div>
            </div>

            {/* Mobile hamburger */}
            <motion.button
              className="lg:hidden relative w-10 h-10 flex items-center justify-center glass rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div animate={isMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -3 }} className="w-5 h-0.5 bg-foreground absolute" />
              <motion.div animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }} className="w-5 h-0.5 bg-foreground absolute" />
              <motion.div animate={isMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 3 }} className="w-5 h-0.5 bg-foreground absolute" />
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div
          initial={false}
          animate={{ height: isMenuOpen ? "auto" : 0, opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="lg:hidden overflow-hidden glass-strong border-t border-primary/10"
        >
          <div className="px-6 py-8 space-y-6">
            {[
              { name: "Inicio", href: "/" },
              { name: "Galeria", href: "/gallery" },
              { name: "Eventos", href: "/events" },
              { name: "Aliados", href: "/partners" },
            ].map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => { router.push(item.href); setIsMenuOpen(false) }}
                className="block text-foreground/80 hover:text-primary transition-colors text-lg font-medium w-full text-left"
                initial={{ x: -20, opacity: 0 }}
                animate={isMenuOpen ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.name}
              </motion.button>
            ))}
            <Button
              onClick={() => { onOpenDrawer?.(); setIsMenuOpen(false) }}
              className="w-full bg-gradient-red mt-6 animate-gradient"
            >
              Agendar Vuelo
            </Button>
          </div>
        </motion.div>
      </motion.nav>
    </>
  )
}

export default Navigation

"use client"

import { motion, useScroll } from "framer-motion"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary/20 z-50"
      style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
    >
      <div className="h-full bg-gradient-red" />
    </motion.div>
  )
}

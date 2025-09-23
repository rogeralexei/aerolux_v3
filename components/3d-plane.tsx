"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

export function Plane3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = 400
    canvas.height = 300

    let animationFrame: number
    let rotation = 0

    const drawPlane = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Save context
      ctx.save()

      // Move to center
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.rotate(rotation)

      // Set styles
      ctx.strokeStyle = "oklch(0.55 0.22 15)" // Primary red color
      ctx.fillStyle = "oklch(0.55 0.22 15 / 0.1)"
      ctx.lineWidth = 2
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      // Draw plane body (fuselage)
      ctx.beginPath()
      ctx.ellipse(0, 0, 80, 12, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      // Draw wings
      ctx.beginPath()
      ctx.moveTo(-40, -8)
      ctx.lineTo(-60, -35)
      ctx.lineTo(-20, -35)
      ctx.lineTo(20, -8)
      ctx.lineTo(60, -35)
      ctx.lineTo(80, -35)
      ctx.lineTo(40, -8)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      // Draw tail
      ctx.beginPath()
      ctx.moveTo(-70, 0)
      ctx.lineTo(-90, -20)
      ctx.lineTo(-85, -25)
      ctx.lineTo(-70, -8)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      // Draw vertical stabilizer
      ctx.beginPath()
      ctx.moveTo(-75, 0)
      ctx.lineTo(-85, 15)
      ctx.lineTo(-80, 20)
      ctx.lineTo(-70, 8)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      // Draw cockpit
      ctx.beginPath()
      ctx.ellipse(60, 0, 15, 8, 0, 0, Math.PI * 2)
      ctx.fillStyle = "oklch(0.65 0.25 15 / 0.3)"
      ctx.fill()
      ctx.stroke()

      // Restore context
      ctx.restore()

      // Update rotation
      rotation += 0.005

      animationFrame = requestAnimationFrame(drawPlane)
    }

    drawPlane()

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="relative"
    >
      <canvas
        ref={canvasRef}
        className="drop-shadow-2xl"
        style={{
          filter: "drop-shadow(0 0 20px oklch(0.55 0.22 15 / 0.3))",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl -z-10 animate-pulse-red"></div>
    </motion.div>
  )
}

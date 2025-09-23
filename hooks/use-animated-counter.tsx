"use client"

import { useEffect, useState, useRef } from "react"
import { useInView } from "framer-motion"

export function useAnimatedCounter(end: number, duration = 2000) {
  const countRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(countRef)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, isInView])

  return { count, ref: countRef }
}

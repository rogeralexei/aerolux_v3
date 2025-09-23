"use client"

import { useEffect } from "react"

export function CustomCursor() {
  useEffect(() => {
    const cursor = document.getElementById("cursor-dot")
    const cursorRing = document.getElementById("cursor-ring")

    const moveCursor = (e: MouseEvent) => {
      if (cursor && cursorRing) {
        cursor.style.left = e.clientX - 4 + "px"
        cursor.style.top = e.clientY - 4 + "px"
        cursorRing.style.left = e.clientX - 16 + "px"
        cursorRing.style.top = e.clientY - 16 + "px"
      }
    }

    const handleMouseEnter = () => {
      if (cursorRing) {
        cursorRing.style.transform = "scale(1.5)"
        cursorRing.style.borderColor = "var(--color-accent)"
      }
    }

    const handleMouseLeave = () => {
      if (cursorRing) {
        cursorRing.style.transform = "scale(1)"
        cursorRing.style.borderColor = "var(--color-primary)"
      }
    }

    document.addEventListener("mousemove", moveCursor)

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"]')
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      document.removeEventListener("mousemove", moveCursor)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  return null
}

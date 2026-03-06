"use client"

import { useEffect } from "react"

export function CursorProvider() {
  useEffect(() => {
    // Don't initialize on touch/tablet devices
    if (window.matchMedia("(pointer: coarse)").matches) return

    const cursorDot = document.getElementById("cursor-dot") as HTMLDivElement
    const cursorRing = document.getElementById("cursor-ring") as HTMLDivElement

    if (!cursorDot || !cursorRing) return

    // Show cursors only on fine-pointer devices
    cursorDot.style.display = "block"
    cursorRing.style.display = "block"

    const moveCursor = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        cursorDot.style.left = e.clientX - 4 + "px"
        cursorDot.style.top = e.clientY - 4 + "px"
        cursorRing.style.left = e.clientX - 16 + "px"
        cursorRing.style.top = e.clientY - 16 + "px"
      })
    }

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement
      const tagName = target.tagName.toLowerCase()

      if (tagName === "button") {
        cursorRing.style.transform = "scale(2)"
        cursorRing.style.borderColor = "var(--color-accent)"
        cursorRing.style.borderWidth = "3px"
        cursorDot.style.transform = "scale(1.5)"
        cursorDot.style.background = "var(--color-accent)"
      } else if (tagName === "a") {
        cursorRing.style.transform = "scale(1.5)"
        cursorRing.style.borderColor = "var(--color-primary)"
        cursorRing.style.background = "var(--color-primary)"
        cursorRing.style.opacity = "0.3"
        cursorDot.style.transform = "scale(0.5)"
      } else {
        cursorRing.style.transform = "scale(1.8)"
        cursorRing.style.borderColor = "var(--color-accent)"
        cursorRing.style.borderWidth = "3px"
      }

      const rect = target.getBoundingClientRect()
      cursorRing.style.left = rect.left + rect.width / 2 - 16 + "px"
      cursorRing.style.top = rect.top + rect.height / 2 - 16 + "px"
    }

    const handleMouseLeave = () => {
      cursorRing.style.transform = "scale(1)"
      cursorRing.style.borderColor = "var(--color-primary)"
      cursorRing.style.borderWidth = "2px"
      cursorRing.style.background = "transparent"
      cursorRing.style.opacity = "1"
      cursorDot.style.transform = "scale(1)"
      cursorDot.style.background = "var(--color-primary)"
    }

    const handleTextSelect = () => {
      cursorDot.style.transform = "scale(0.5)"
      cursorDot.style.background = "var(--color-accent)"
    }

    document.addEventListener("mousemove", moveCursor)
    document.addEventListener("selectstart", handleTextSelect)

    const attachListeners = () => {
      const interactiveElements = document.querySelectorAll('button, a, [role="button"], input, textarea')
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter)
        el.addEventListener("mouseleave", handleMouseLeave)
      })
      return interactiveElements
    }

    let interactiveElements = attachListeners()

    const observer = new MutationObserver(() => {
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
      interactiveElements = attachListeners()
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener("mousemove", moveCursor)
      document.removeEventListener("selectstart", handleTextSelect)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseLeave)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
      observer.disconnect()
    }
  }, [])

  return null
}
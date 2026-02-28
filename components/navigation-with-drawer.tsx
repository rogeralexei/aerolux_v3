"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import { FlightRequestDrawer } from "@/components/flight-request-drawer"

export function NavigationWithDrawer() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <Navigation onOpenDrawer={() => setDrawerOpen(true)} />
      <FlightRequestDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}

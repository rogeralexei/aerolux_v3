import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import "./globals.css"
import Footer from "@/components/footer"
import { CursorProvider } from "@/components/cursor-provider"
import { NavigationWithDrawer } from "@/components/navigation-with-drawer"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "Aerolux Panama - La pasión que despega contigo",
  description: "Seguridad, exclusividad y servicio premium en cada experiencia.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased custom-cursor">
        {/* Cursor elements must exist before CursorProvider runs */}
        <div className="cursor-dot" id="cursor-dot" style={{ display: "none" }}></div>
        <div className="cursor-ring" id="cursor-ring" style={{ display: "none" }}></div>
        <CursorProvider />
        <NavigationWithDrawer />
        {children}
        <Footer />
      </body>
    </html>
  )
}

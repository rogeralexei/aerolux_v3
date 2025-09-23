import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import "./globals.css"

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
  title: "Aerolux Charter - Your Sky, Your Rules",
  description:
    "Premium private jet charter services for the discerning traveler. Experience luxury aviation with personalized service and unmatched comfort.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased custom-cursor">
        {children}
        <div className="cursor-dot" id="cursor-dot"></div>
        <div className="cursor-ring" id="cursor-ring"></div>
      </body>
    </html>
  )
}

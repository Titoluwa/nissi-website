import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geistSans = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nissi Home Health Care - Professional In-Home Healthcare Services",
  description: "Compassionate, professional home health care services in Aurora, CO. Skilled nursing, physical therapy, and personalized care from trusted caregivers.",
  keywords: "home health care, skilled nursing, physical therapy, health aides, Aurora CO",
  openGraph: {
    title: "Nissi Home Health Care",
    description: "Professional in-home healthcare services with compassionate, certified caregivers.",
    type: "website",
  },
  icons: {
    icon: [
      {
        url: "/images/nissi-logo-1.png",
        type: "image/png+xml",
      },
    ],
    shortcut: "/images/nissi-logo-1.png",
    apple: "/images/nissi-logo-1.png",
  },

}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#051E3D",
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

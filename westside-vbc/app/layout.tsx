import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/ui/Navigation"
import Sponsors from "@/components/ui/Sponsors"
import WelcomeAnimation from "@/components/ui/WelcomeAnimation"
import PageTransition from "@/components/ui/PageTransition"

import { AuthProvider } from "@/contexts/AuthContext"
import { CartProvider } from "@/contexts/CartContext"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Westside VBC",
  description: "Westside Volleyball Club",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <AuthProvider>
          <CartProvider>
            <WelcomeAnimation />
            <Navigation />
            <PageTransition>
              {children}
            </PageTransition>
            <Sponsors />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
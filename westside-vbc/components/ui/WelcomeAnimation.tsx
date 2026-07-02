"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function WelcomeAnimation() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem("hasSeenWelcome")
    if (!hasSeenWelcome) {
      setShow(true)
      sessionStorage.setItem("hasSeenWelcome", "true")
      
      // Auto-hide the welcome screen after 2.5s so exit animation can play
      const timer = setTimeout(() => {
        setShow(false)
      }, 900)
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="welcome-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%", filter: "blur(10px)" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.5 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <h1 className="text-white font-black text-5xl sm:text-7xl md:text-9xl tracking-tight text-center">
              WESTSIDE
            </h1>
            <div className="flex items-center justify-center w-full mt-4">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "4rem" }}
                transition={{ duration: 0.8, delay: 0.5, ease: "circOut" }}
                className="h-1 bg-white hidden md:block"
              />
              <h2 className="text-white font-bold text-2xl sm:text-3xl md:text-5xl tracking-widest px-4 text-center">
                VBC
              </h2>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "4rem" }}
                transition={{ duration: 0.8, delay: 0.5, ease: "circOut" }}
                className="h-1 bg-white hidden md:block"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

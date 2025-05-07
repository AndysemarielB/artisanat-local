"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return

      const { clientX, clientY } = e
      const { left, top, width, height } = imageRef.current.getBoundingClientRect()

      const x = (clientX - left) / width - 0.5
      const y = (clientY - top) / height - 0.5

      imageRef.current.style.transform = `perspective(1000px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <section className="relative flex items-center min-h-screen overflow-hidden bg-neutral-50">
      <div className="container grid items-center grid-cols-1 gap-12 px-4 py-24 mx-auto md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10 max-w-xl"
        >
          <h1 className="mb-6 text-4xl font-light tracking-tight md:text-5xl lg:text-6xl">
            L'art de vivre <span className="font-medium">local</span>
          </h1>
          <p className="mb-8 text-lg text-neutral-600">
            Découvrez des pièces uniques créées par des artisans locaux, alliant tradition et modernité pour sublimer
            votre intérieur.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full bg-neutral-900 hover:bg-neutral-800" asChild>
              <Link href="/produits">Explorer la collection</Link>
            </Button>
            <Link href="/artisans">
              <Button variant="outline" size="lg" className="rounded-full">
                Rencontrer nos artisans
              </Button>
            </Link>
          </div>
        </motion.div>

        <div ref={imageRef} className="relative flex justify-center transition-transform duration-200 ease-out">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative w-full h-[500px] rounded-2xl overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80"
              alt="Mobilier artisanal"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 z-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </section>
  )
}

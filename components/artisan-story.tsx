"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"

export default function ArtisanStory() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      <div className="container grid items-center grid-cols-1 gap-12 px-4 mx-auto md:grid-cols-2">
        <motion.div style={{ opacity, scale }} className="relative h-[600px] rounded-2xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            alt="Artisan au travail"
            fill
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-xl"
        >
          <h2 className="mb-6 text-3xl font-light tracking-tight md:text-4xl">
            L'histoire de nos <span className="font-medium">Artisans</span>
          </h2>
          <div className="w-16 h-px mb-6 bg-neutral-300"></div>
          <p className="mb-6 text-lg text-neutral-600">
            Derrière chaque création se cache un artisan passionné, héritier d'un savoir-faire transmis de génération en
            génération.
          </p>
          <p className="mb-8 text-neutral-600">
            Nos artisans travaillent avec des matériaux locaux et durables, dans le respect de l'environnement et des
            traditions. Chaque pièce est unique, façonnée avec amour et attention aux détails.
          </p>
          <Button size="lg" variant="outline" className="rounded-full" asChild>
            <Link href="/artisans">Découvrir leurs histoires</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

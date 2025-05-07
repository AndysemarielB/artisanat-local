"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { useInView } from "react-intersection-observer"

export default function ArtisanStoryArtistic() {
  const sectionRef = useRef<HTMLElement>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })
  const [isHovered, setIsHovered] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50])

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  }

  const imageHoverVariants = {
    rest: {
      filter: "grayscale(80%)",
      transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] },
    },
    hover: {
      filter: "grayscale(0%)",
      transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] },
    },
  }

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.05),transparent_60%)]"></div>
      </div>

      <div className="container grid items-center grid-cols-1 gap-12 px-4 mx-auto md:grid-cols-2">
        <motion.div
          style={{ opacity, scale, y }}
          className="relative h-[600px] rounded-2xl overflow-hidden"
          variants={imageHoverVariants}
          initial="rest"
          animate={isHovered ? "hover" : "rest"}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            alt="Artisan au travail"
            fill
            className="object-cover"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: isHovered ? 0.2 : 0.6 }}
            transition={{ duration: 0.5 }}
          />

          <motion.div
            className="absolute bottom-0 left-0 right-0 p-8 text-white"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-medium mb-2">Découvrez nos artisans</h3>
            <p className="text-white/80">Chaque création raconte une histoire unique</p>
          </motion.div>
        </motion.div>

        <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} className="max-w-xl">
          <motion.h2 custom={0} variants={textVariants} className="mb-6 text-3xl font-light tracking-tight md:text-4xl">
            L'histoire de nos <span className="font-medium">Artisans</span>
          </motion.h2>

          <motion.div custom={1} variants={textVariants} className="w-16 h-px mb-6 bg-neutral-300" />

          <motion.p custom={2} variants={textVariants} className="mb-6 text-lg text-neutral-600">
            Derrière chaque création se cache un artisan passionné, héritier d'un savoir-faire transmis de génération en
            génération.
          </motion.p>

          <motion.p custom={3} variants={textVariants} className="mb-8 text-neutral-600">
            Nos artisans travaillent avec des matériaux locaux et durables, dans le respect de l'environnement et des
            traditions. Chaque pièce est unique, façonnée avec amour et attention aux détails.
          </motion.p>

          <motion.div custom={4} variants={textVariants}>
            <Button size="lg" variant="outline" className="rounded-full overflow-hidden relative group" asChild>
              <Link href="/artisans">
                <span className="relative z-10">Découvrir leurs histoires</span>
                <span className="absolute inset-0 w-full h-full bg-neutral-100 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

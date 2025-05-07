"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useInView } from "react-intersection-observer"

const textRevealVariants = {
  hidden: { opacity: 0, y: 20 },
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

const imageVariants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
}

export default function HeroSectionArtistic() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const heroImages = [
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
    "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80",
  ]

  // Parallax effect values
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -250])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const { left, top, width, height } = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - left) / width - 0.5
      const y = (e.clientY - top) / height - 0.5
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Auto-change image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroImages.length])

  // Split text for character animation
  const titleWords = "L'art de vivre local".split(" ")

  return (
    <section ref={containerRef} className="relative flex items-center min-h-screen overflow-hidden bg-neutral-50">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating elements */}
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute top-1/4 left-[15%] w-16 h-16 rounded-full border border-neutral-200 opacity-30"
      />
      <motion.div
        style={{ y: y2, opacity }}
        className="absolute bottom-1/4 right-[10%] w-24 h-24 rounded-full border border-neutral-200 opacity-20"
      />
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute top-1/3 right-[20%] w-8 h-8 rounded-full bg-neutral-100 opacity-40"
      />

      <div className="container relative z-10 grid items-center grid-cols-1 gap-12 px-4 py-24 mx-auto md:grid-cols-2">
        <motion.div
          ref={titleRef}
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
          className="z-10 max-w-xl"
        >
          <h1 className="mb-6 text-4xl font-light tracking-tight md:text-5xl lg:text-6xl">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={textRevealVariants}
                className="inline-block mr-3 font-light"
                style={{
                  fontWeight: word === "local" ? 500 : 300,
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            variants={textRevealVariants}
            custom={titleWords.length + 1}
            className="mb-8 text-lg text-neutral-600"
          >
            Découvrez des pièces uniques créées par des artisans locaux, alliant tradition et modernité pour sublimer
            votre intérieur.
          </motion.p>

          <motion.div variants={textRevealVariants} custom={titleWords.length + 2} className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="rounded-full bg-neutral-900 hover:bg-neutral-800 overflow-hidden relative group"
              asChild
            >
              <Link href="/produits">
                <span className="relative z-10">Explorer la collection</span>
                <span className="absolute inset-0 w-full h-full bg-neutral-800 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full overflow-hidden relative group" asChild>
              <Link href="/artisans">
                <span className="relative z-10">Rencontrer nos artisans</span>
                <span className="absolute inset-0 w-full h-full bg-neutral-100 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <div
          className="relative flex justify-center"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <motion.div
            style={{
              scale,
              rotateY: isHovering ? mousePosition.x * 5 : 0,
              rotateX: isHovering ? mousePosition.y * -5 : 0,
              transition: "transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1)",
            }}
            className="relative w-full h-[500px] rounded-2xl overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={heroImages[currentImageIndex] || "/placeholder.svg"}
                  alt="Mobilier artisanal"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </motion.div>
            </AnimatePresence>

            {/* Image indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? "bg-white w-6" : "bg-white/50"
                  }`}
                  aria-label={`Voir l'image ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            style={{ y: y1 }}
            className="absolute -bottom-8 -left-8 w-16 h-16 border border-neutral-200 rounded-lg"
          />
          <motion.div
            style={{ y: y2 }}
            className="absolute -top-8 -right-8 w-24 h-24 border border-neutral-200 rounded-lg"
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-xs text-neutral-500 mb-2">Découvrir</span>
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
          className="w-6 h-10 border-2 border-neutral-300 rounded-full flex justify-center"
        >
          <motion.div className="w-1 h-1 bg-neutral-500 rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  )
}

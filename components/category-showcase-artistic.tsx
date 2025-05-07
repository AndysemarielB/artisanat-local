"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"

const categories = [
  {
    id: 1,
    name: "Mobilier",
    image:
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    count: 48,
  },
  {
    id: 2,
    name: "Luminaires",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    count: 36,
  },
  {
    id: 3,
    name: "Décoration",
    image:
      "https://images.unsplash.com/photo-1526057565006-20beab8dd2ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    count: 64,
  },
]

export default function CategoryShowcaseArtistic() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState<number | null>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -30])

  const yValues = [y1, y2, y3]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  }

  return (
    <motion.div
      ref={containerRef}
      className="grid grid-cols-1 gap-8 md:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      ref={ref}
    >
      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          style={{ y: yValues[index] }}
          className="group relative"
          variants={itemVariants}
          onMouseEnter={() => setActiveCategory(category.id)}
          onMouseLeave={() => setActiveCategory(null)}
        >
          <Link href={`/categories/${category.id}`}>
            <div className="relative mb-4 overflow-hidden rounded-lg aspect-[3/4]">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 transition-opacity duration-500 bg-gradient-to-t from-black/70 to-transparent group-hover:opacity-90"></div>

              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <motion.h3
                  className="mb-1 text-xl font-medium"
                  initial={{ y: 0 }}
                  animate={{ y: activeCategory === category.id ? -10 : 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {category.name}
                </motion.h3>

                <motion.p
                  className="text-sm opacity-80"
                  initial={{ opacity: 0.8 }}
                  animate={{
                    opacity: activeCategory === category.id ? 1 : 0.8,
                    y: activeCategory === category.id ? -5 : 0,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {category.count} produits
                </motion.p>

                <motion.div
                  className="w-8 h-px bg-white mt-3"
                  initial={{ width: "2rem" }}
                  animate={{ width: activeCategory === category.id ? "4rem" : "2rem" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />

                <motion.p
                  className="mt-4 text-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: activeCategory === category.id ? 1 : 0,
                    y: activeCategory === category.id ? 0 : 20,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  Découvrir la collection
                </motion.p>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}

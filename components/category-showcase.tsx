"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"

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

export default function CategoryShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -30])

  const yValues = [y1, y2, y3]

  return (
    <div ref={containerRef} className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {categories.map((category, index) => (
        <motion.div key={category.id} style={{ y: yValues[index] }} className="group">
          <Link href={`/categories/${category.id}`}>
            <div className="relative mb-4 overflow-hidden rounded-lg aspect-[3/4]">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 transition-opacity duration-300 bg-gradient-to-t from-black/50 to-transparent group-hover:opacity-80"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="mb-1 text-xl font-medium">{category.name}</h3>
                <p className="text-sm opacity-80">{category.count} produits</p>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

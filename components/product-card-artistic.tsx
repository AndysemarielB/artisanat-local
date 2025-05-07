"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductCardArtisticProps {
  product: {
    id: number
    name: string
    artisan: string
    price: number
    image: string
  }
  index: number
}

export default function ProductCardArtistic({ product, index }: ProductCardArtisticProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.3 })

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  }

  const imageVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] } },
  }

  const overlayVariants = {
    rest: { opacity: 0 },
    hover: { opacity: 1, transition: { duration: 0.3 } },
  }

  const buttonVariants = {
    rest: { y: 20, opacity: 0 },
    hover: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  }

  const nameVariants = {
    rest: { y: 0 },
    hover: { y: -5, transition: { duration: 0.4, ease: "easeOut" } },
  }

  const priceVariants = {
    rest: { opacity: 0.7 },
    hover: { opacity: 1, transition: { duration: 0.4 } },
  }

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/produits/${product.id}`} className="block">
        <div className="relative mb-4 overflow-hidden rounded-lg aspect-square">
          <motion.div variants={imageVariants} animate={isHovered ? "hover" : "rest"} className="absolute inset-0">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>

          <motion.div
            variants={overlayVariants}
            animate={isHovered ? "hover" : "rest"}
            className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
          />

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFavorite}
            className="absolute z-20 p-2 transition-colors bg-white rounded-full top-4 right-4 hover:bg-white"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isFavorite ? "filled" : "outline"}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? "fill-rose-500 text-rose-500" : "text-neutral-500"}`} />
              </motion.div>
            </AnimatePresence>
            <span className="sr-only">Ajouter aux favoris</span>
          </Button>

          <motion.div
            variants={buttonVariants}
            animate={isHovered ? "hover" : "rest"}
            className="absolute bottom-4 left-4 right-4 flex justify-between"
          >
            <Button
              size="sm"
              className="rounded-full bg-white text-neutral-900 hover:bg-white/90"
              onClick={(e) => {
                e.preventDefault()
                // Add to cart logic
              }}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Ajouter
            </Button>

            <Button size="icon" className="rounded-full bg-white text-neutral-900 hover:bg-white/90">
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>

        <motion.h3
          variants={nameVariants}
          animate={isHovered ? "hover" : "rest"}
          className="mb-1 text-lg font-medium transition-colors group-hover:text-neutral-900"
        >
          {product.name}
        </motion.h3>

        <p className="mb-2 text-sm text-neutral-500">Par {product.artisan}</p>

        <motion.p variants={priceVariants} animate={isHovered ? "hover" : "rest"} className="text-lg">
          {product.price} €
        </motion.p>
      </Link>
    </motion.div>
  )
}

"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import ProductCardArtistic from "./product-card-artistic"

const products = [
  {
    id: 1,
    name: "Fauteuil Élégance",
    artisan: "Marie Dubois",
    price: 590,
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1158&q=80",
  },
  {
    id: 2,
    name: "Table Horizon",
    artisan: "Jean Martin",
    price: 890,
    image:
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80",
  },
  {
    id: 3,
    name: "Lampe Aurore",
    artisan: "Sophie Laurent",
    price: 320,
    image:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 4,
    name: "Étagère Modulaire",
    artisan: "Thomas Petit",
    price: 450,
    image:
      "https://images.unsplash.com/photo-1594040226829-7f251ab46d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
]

export default function FeaturedProductsArtistic() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
    >
      {products.map((product, index) => (
        <ProductCardArtistic key={product.id} product={product} index={index} />
      ))}
    </motion.div>
  )
}

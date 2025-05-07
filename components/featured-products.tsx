"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

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
      "https://images.unsplash.com/photo-1532372320572-cda25653a694?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80",
  },
]

export default function FeaturedProducts() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="group"
          onMouseEnter={() => setHoveredId(product.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <Link href={`/produits/${product.id}`} className="block">
            <div className="relative mb-4 overflow-hidden rounded-lg aspect-square">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className={`object-cover transition-transform duration-700 ${
                  hoveredId === product.id ? "scale-105" : "scale-100"
                }`}
              />
              <div
                className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                  hoveredId === product.id ? "opacity-10" : "opacity-0"
                }`}
              ></div>
              <div
                className={`absolute bottom-4 right-4 p-2 bg-white rounded-full transition-transform duration-300 ${
                  hoveredId === product.id ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                <ArrowUpRight className="w-4 h-4 text-neutral-900" />
              </div>
            </div>
            <h3 className="mb-1 text-lg font-medium">{product.name}</h3>
            <p className="mb-2 text-sm text-neutral-500">Par {product.artisan}</p>
            <p className="text-lg">{product.price} €</p>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

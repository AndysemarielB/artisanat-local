"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

// Base de données des produits
const productsDatabase = {
  // Mobilier
  1: {
    id: 1,
    name: "Fauteuil Élégance",
    artisan: "Marie Dubois",
    price: 590,
    category: 1,
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1158&q=80",
  },
  2: {
    id: 2,
    name: "Table Horizon",
    artisan: "Jean Martin",
    price: 890,
    category: 1,
    image:
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80",
  },
  4: {
    id: 4,
    name: "Étagère Modulaire",
    artisan: "Thomas Petit",
    price: 450,
    category: 1,
    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
  },
  9: {
    id: 9,
    name: "Bureau Compact",
    artisan: "Nicolas Roux",
    price: 650,
    category: 1,
    image:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80",
  },
  12: {
    id: 12,
    name: "Table Basse en Bois",
    artisan: "Jean Martin",
    price: 350,
    category: 1,
    image:
      "https://images.unsplash.com/photo-1567016526105-22da7c13161a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80",
  },
  // Luminaires
  3: {
    id: 3,
    name: "Lampe Aurore",
    artisan: "Sophie Laurent",
    price: 320,
    category: 2,
    image:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  10: {
    id: 10,
    name: "Suspension Géométrique",
    artisan: "Sophie Laurent",
    price: 240,
    category: 2,
    image:
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
  },
  // Décoration
  5: {
    id: 5,
    name: "Vase Céramique",
    artisan: "Claire Moreau",
    price: 120,
    category: 3,
    image:
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  6: {
    id: 6,
    name: "Miroir Soleil",
    artisan: "Pierre Durand",
    price: 280,
    category: 3,
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80",
  },
  8: {
    id: 8,
    name: "Coussin Tissé",
    artisan: "Emma Petit",
    price: 85,
    category: 3,
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
  },
  11: {
    id: 11,
    name: "Bibliothèque Murale",
    artisan: "Jean Martin",
    price: 420,
    category: 3,
    image:
      "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
}

interface CategoryProductGridProps {
  categoryId: number
}

export default function CategoryProductGrid({ categoryId }: CategoryProductGridProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])

  // Filtrer les produits par catégorie
  const products = Object.values(productsDatabase).filter((product) => product.category === categoryId)

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setFavorites((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]))
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
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

              <Button
                variant="ghost"
                size="icon"
                className="absolute p-2 transition-transform bg-white rounded-full top-4 right-4"
                onClick={(e) => toggleFavorite(product.id, e)}
              >
                <Heart
                  className={`w-4 h-4 ${favorites.includes(product.id) ? "fill-rose-500 text-rose-500" : "text-neutral-500"}`}
                />
                <span className="sr-only">Ajouter aux favoris</span>
              </Button>

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

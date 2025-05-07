"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { ArrowUpRight, Heart, Search, ShoppingCart, Trash2 } from "lucide-react"
import AccountSidebar from "@/components/account-sidebar"

// Données fictives des favoris
const favorites = [
  {
    id: 1,
    name: "Fauteuil Élégance",
    artisan: "Marie Dubois",
    price: 590,
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1158&q=80",
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
    id: 6,
    name: "Miroir Soleil",
    artisan: "Pierre Durand",
    price: 280,
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80",
  },
  {
    id: 10,
    name: "Suspension Géométrique",
    artisan: "Sophie Laurent",
    price: 240,
    image:
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
  },
]

export default function FavoritesPage() {
  const [userFavorites, setUserFavorites] = useState(favorites)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const removeFavorite = (id: number) => {
    setUserFavorites(userFavorites.filter((item) => item.id !== id))
  }

  const filteredFavorites = userFavorites.filter((favorite) => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      return favorite.name.toLowerCase().includes(searchLower) || favorite.artisan.toLowerCase().includes(searchLower)
    }
    return true
  })

  return (
    <main className="min-h-screen pt-20">
      <section className="container px-4 py-16 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
          <AccountSidebar />

          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-medium">Mes Favoris</h1>
              <p className="text-neutral-600">Retrouvez tous les produits que vous avez ajoutés à vos favoris</p>
            </div>

            <div className="p-6 bg-white border rounded-lg shadow-sm">
              <div className="flex flex-col justify-between gap-4 mb-6 sm:flex-row sm:items-center">
                <p className="text-sm text-neutral-500">{userFavorites.length} produits</p>

                <div className="relative">
                  <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-neutral-400" />
                  <Input
                    placeholder="Rechercher un produit..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 rounded-full"
                  />
                </div>
              </div>

              {filteredFavorites.length === 0 ? (
                <div className="p-8 text-center">
                  <Heart className="w-12 h-12 mx-auto mb-4 text-neutral-300" />
                  <h3 className="mb-2 text-lg font-medium">Aucun favori trouvé</h3>
                  <p className="mb-6 text-neutral-500">
                    {searchTerm
                      ? `Aucun produit ne correspond à "${searchTerm}"`
                      : "Vous n'avez pas encore ajouté de produits à vos favoris"}
                  </p>
                  <Button className="rounded-full bg-neutral-900 hover:bg-neutral-800" asChild>
                    <Link href="/produits">Explorer les produits</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredFavorites.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group"
                      onMouseEnter={() => setHoveredId(product.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
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
                          onClick={() => removeFavorite(product.id)}
                        >
                          <Trash2 className="w-4 h-4 text-rose-500" />
                          <span className="sr-only">Retirer des favoris</span>
                        </Button>

                        <Link href={`/produits/${product.id}`}>
                          <div
                            className={`absolute bottom-4 right-4 p-2 bg-white rounded-full transition-transform duration-300 ${
                              hoveredId === product.id ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                            }`}
                          >
                            <ArrowUpRight className="w-4 h-4 text-neutral-900" />
                          </div>
                        </Link>
                      </div>
                      <Link href={`/produits/${product.id}`}>
                        <h3 className="mb-1 text-lg font-medium">{product.name}</h3>
                      </Link>
                      <p className="mb-2 text-sm text-neutral-500">Par {product.artisan}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-lg">{product.price} €</p>
                        <Button size="sm" className="rounded-full bg-neutral-900 hover:bg-neutral-800">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Ajouter
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

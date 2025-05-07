"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart, Minus, Plus, Share2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RelatedProducts from "@/components/related-products"
import { motion } from "framer-motion"

// Base de données de produits
const productsDatabase = {
  1: {
    id: 1,
    name: "Fauteuil Élégance",
    artisan: "Marie Dubois",
    price: 590,
    description:
      "Ce fauteuil élégant allie confort et esthétique. Fabriqué à la main en bois de chêne massif avec une finition naturelle, il est complété par un coussin en tissu de haute qualité. Chaque pièce est unique, avec de légères variations qui témoignent de son caractère artisanal.",
    details: [
      "Dimensions: 70 x 80 x 90 cm (L x l x H)",
      "Matériaux: Chêne massif, tissu 100% coton",
      "Fabriqué à la main en France",
      "Livraison en 2-3 semaines",
    ],
    story:
      "Marie Dubois travaille le bois depuis plus de 15 ans dans son atelier près de Lyon. Inspirée par les formes organiques et les lignes épurées du design scandinave, elle crée des pièces intemporelles qui s'intègrent harmonieusement dans tous les intérieurs. Chaque meuble raconte une histoire, celle d'un savoir-faire transmis de génération en génération.",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1158&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1165&q=80",
      "https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    ],
  },
  2: {
    id: 2,
    name: "Table Horizon",
    artisan: "Jean Martin",
    price: 890,
    description:
      "La Table Horizon est une pièce maîtresse pour votre salle à manger. Son plateau en noyer massif repose sur une base en métal forgé à la main, créant un équilibre parfait entre chaleur naturelle et modernité industrielle. Chaque table est unique, avec des variations subtiles dans les veines du bois.",
    details: [
      "Dimensions: 180 x 90 x 75 cm (L x l x H)",
      "Matériaux: Noyer massif, métal forgé",
      "Fabriqué à la main en France",
      "Livraison en 3-4 semaines",
    ],
    story:
      "Jean Martin est ébéniste depuis plus de 20 ans. Dans son atelier près de Bordeaux, il combine des techniques traditionnelles avec une vision contemporaine pour créer des meubles qui traverseront les générations. Son travail est reconnu pour sa précision et son souci du détail.",
    images: [
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80",
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1615874694520-474822394e73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80",
      "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    ],
  },
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = Number.parseInt(params.id)
  const product = productsDatabase[productId as keyof typeof productsDatabase] || productsDatabase[1]

  const [mainImage, setMainImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  return (
    <main className="min-h-screen py-12 pt-32">
      <div className="container px-4 mx-auto">
        <Link href="/produits" className="inline-flex items-center mb-8 text-sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour aux produits
        </Link>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-lg aspect-square"
            >
              <Image
                src={product.images[mainImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(index)}
                  className={`relative overflow-hidden rounded-md aspect-square ${
                    mainImage === index ? "ring-2 ring-neutral-900" : ""
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - vue ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <Link
                href={`/artisans/${product.artisan.toLowerCase().replace(" ", "-")}`}
                className="text-sm text-neutral-500 hover:underline"
              >
                Par {product.artisan}
              </Link>
              <h1 className="mt-2 mb-2 text-3xl font-medium">{product.name}</h1>
              <p className="text-2xl">{product.price} €</p>
            </div>

            <p className="text-neutral-600">{product.description}</p>

            <div className="pt-6 border-t border-neutral-200">
              <div className="flex items-center mb-6 space-x-4">
                <div className="flex items-center border border-neutral-200 rounded-full">
                  <Button variant="ghost" size="icon" onClick={decreaseQuantity} className="rounded-full">
                    <Minus className="w-4 h-4" />
                    <span className="sr-only">Diminuer</span>
                  </Button>
                  <span className="w-8 text-center">{quantity}</span>
                  <Button variant="ghost" size="icon" onClick={increaseQuantity} className="rounded-full">
                    <Plus className="w-4 h-4" />
                    <span className="sr-only">Augmenter</span>
                  </Button>
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="rounded-full"
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? "fill-rose-500 text-rose-500" : ""}`} />
                  <span className="sr-only">Ajouter aux favoris</span>
                </Button>

                <Button variant="outline" size="icon" className="rounded-full">
                  <Share2 className="w-4 h-4" />
                  <span className="sr-only">Partager</span>
                </Button>
              </div>

              <Button size="lg" className="w-full rounded-full bg-neutral-900 hover:bg-neutral-800">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Ajouter au panier
              </Button>
            </div>

            <Tabs defaultValue="details" className="pt-6 mt-6 border-t border-neutral-200">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Détails</TabsTrigger>
                <TabsTrigger value="livraison">Livraison</TabsTrigger>
                <TabsTrigger value="artisan">L'Artisan</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="pt-4">
                <ul className="space-y-2 text-neutral-600">
                  {product.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="livraison" className="pt-4">
                <div className="space-y-4 text-neutral-600">
                  <p>Chaque pièce est fabriquée sur commande, avec un délai de livraison de 2 à 3 semaines.</p>
                  <p>Livraison gratuite en France métropolitaine.</p>
                  <p>Livraison soignée par transporteur spécialisé, avec prise de rendez-vous.</p>
                </div>
              </TabsContent>
              <TabsContent value="artisan" className="pt-4">
                <div className="space-y-4 text-neutral-600">
                  <p>{product.story}</p>
                  <Link
                    href={`/artisans/${product.artisan.toLowerCase().replace(" ", "-")}`}
                    className="inline-block text-neutral-900 hover:underline"
                  >
                    Découvrir l'univers de {product.artisan}
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <section className="mt-24">
          <h2 className="mb-8 text-2xl font-medium">Vous aimerez aussi</h2>
          <RelatedProducts currentProductId={productId} />
        </section>
      </div>
    </main>
  )
}

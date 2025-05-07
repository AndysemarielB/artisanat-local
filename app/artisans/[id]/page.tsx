"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

const artisansDatabase = {
  "marie-dubois": {
    id: "marie-dubois",
    name: "Marie Dubois",
    specialty: "Mobilier en bois",
    location: "Lyon",
    since: 2008,
    bio: "Marie Dubois a découvert sa passion pour le travail du bois lors d'un voyage en Scandinavie. Inspirée par les lignes épurées et l'élégance du design nordique, elle a décidé de se former auprès de maîtres ébénistes avant d'ouvrir son propre atelier à Lyon en 2008. Depuis, elle crée des pièces uniques qui allient fonctionnalité et esthétique, en privilégiant les bois locaux et les finitions naturelles.",
    philosophy:
      "Je crois que chaque meuble doit raconter une histoire et s'intégrer harmonieusement dans son environnement. Je travaille avec des matériaux nobles et durables, dans le respect des traditions artisanales tout en y apportant ma vision contemporaine. Chaque pièce est pensée pour traverser le temps et les modes.",
    portrait:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
    workshop:
      "https://images.unsplash.com/photo-1580193769210-b8d1c049a7d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80",
    products: [
      {
        id: 1,
        name: "Fauteuil Élégance",
        image:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1158&q=80",
      },
      {
        id: 5,
        name: "Table Basse Horizon",
        image:
          "https://images.unsplash.com/photo-1567016526105-22da7c13161a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80",
      },
      {
        id: 8,
        name: "Étagère Modulaire",
        image:
          "https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      },
      {
        id: 12,
        name: "Bureau Compact",
        image:
          "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80",
      },
    ],
  },
  "jean-martin": {
    id: "jean-martin",
    name: "Jean Martin",
    specialty: "Ébénisterie",
    location: "Bordeaux",
    since: 2003,
    bio: "Jean Martin est issu d'une famille d'ébénistes depuis trois générations. Après avoir travaillé aux côtés de son père pendant dix ans, il a ouvert son propre atelier à Bordeaux en 2003. Formé aux techniques traditionnelles, il les associe à une vision contemporaine pour créer des meubles d'exception. Son travail a été récompensé par plusieurs prix d'excellence artisanale.",
    philosophy:
      "L'ébénisterie est un art qui demande patience, précision et passion. Je sélectionne personnellement chaque pièce de bois pour ses caractéristiques uniques et je m'efforce de révéler sa beauté naturelle à travers mes créations. Mes meubles sont conçus pour être à la fois beaux et fonctionnels, avec une attention particulière portée aux détails et aux finitions.",
    portrait:
      "https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1021&q=80",
    workshop:
      "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    products: [
      {
        id: 2,
        name: "Table Horizon",
        image:
          "https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80",
      },
      {
        id: 6,
        name: "Bibliothèque Murale",
        image:
          "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      },
      {
        id: 9,
        name: "Commode Vintage",
        image:
          "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      },
      {
        id: 14,
        name: "Table de Chevet",
        image:
          "https://images.unsplash.com/photo-1611967164521-abae8fba4668?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      },
    ],
  },
}

export default function ArtisanPage({ params }: { params: { id: string } }) {
  const artisanId = params.id
  const artisan = artisansDatabase[artisanId as keyof typeof artisansDatabase] || artisansDatabase["marie-dubois"]

  const [selectedImage, setSelectedImage] = useState<string>(artisan.portrait)

  return (
    <main className="min-h-screen py-12 pt-32">
      <div className="container px-4 mx-auto">
        <Link href="/artisans" className="inline-flex items-center mb-8 text-sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour aux artisans
        </Link>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-lg aspect-[4/3]"
            >
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt={artisan.name}
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setSelectedImage(artisan.portrait)}
                className={`relative overflow-hidden rounded-md aspect-video ${
                  selectedImage === artisan.portrait ? "ring-2 ring-neutral-900" : ""
                }`}
              >
                <Image
                  src={artisan.portrait || "/placeholder.svg"}
                  alt={`${artisan.name} - Portrait`}
                  fill
                  className="object-cover"
                />
              </button>
              <button
                onClick={() => setSelectedImage(artisan.workshop)}
                className={`relative overflow-hidden rounded-md aspect-video ${
                  selectedImage === artisan.workshop ? "ring-2 ring-neutral-900" : ""
                }`}
              >
                <Image
                  src={artisan.workshop || "/placeholder.svg"}
                  alt={`${artisan.name} - Atelier`}
                  fill
                  className="object-cover"
                />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-neutral-500">
                {artisan.specialty} • {artisan.location}
              </p>
              <h1 className="mt-2 mb-2 text-3xl font-medium">{artisan.name}</h1>
              <p className="text-neutral-600">Artisan depuis {new Date().getFullYear() - artisan.since}</p>
            </div>

            <Tabs defaultValue="bio" className="pt-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="bio">Biographie</TabsTrigger>
                <TabsTrigger value="philosophy">Philosophie</TabsTrigger>
              </TabsList>
              <TabsContent value="bio" className="pt-4">
                <p className="text-neutral-600">{artisan.bio}</p>
              </TabsContent>
              <TabsContent value="philosophy" className="pt-4">
                <p className="text-neutral-600">{artisan.philosophy}</p>
              </TabsContent>
            </Tabs>

            <div className="pt-6 mt-6 border-t border-neutral-200">
              <h2 className="mb-4 text-xl font-medium">Créations</h2>
              <div className="grid grid-cols-2 gap-4">
                {artisan.products.map((product) => (
                  <Link key={product.id} href={`/produits/${product.id}`} className="group">
                    <div className="relative overflow-hidden rounded-lg aspect-square">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 transition-opacity duration-300 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                        <h3 className="text-sm font-medium">{product.name}</h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

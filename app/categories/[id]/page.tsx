"use client"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import ProductFilters from "@/components/product-filters"
import ProductSort from "@/components/product-sort"
import CategoryProductGrid from "@/components/category-product-grid"

// Base de données des catégories
const categoriesDatabase = {
  "1": {
    id: 1,
    name: "Mobilier",
    description:
      "Découvrez notre collection de meubles artisanaux, créés avec passion par nos artisans locaux. Chaque pièce est unique et fabriquée avec des matériaux de qualité pour sublimer votre intérieur.",
    image:
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    count: 16,
    products: [1, 2, 4, 9, 12],
  },
  "2": {
    id: 2,
    name: "Luminaires",
    description:
      "Illuminez votre intérieur avec nos luminaires artisanaux. Des suspensions aux lampes de table, chaque création apporte une ambiance unique et chaleureuse à votre espace de vie.",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    count: 12,
    products: [3, 10],
  },
  "3": {
    id: 3,
    name: "Décoration",
    description:
      "Ajoutez une touche personnelle à votre intérieur avec nos objets de décoration faits main. Vases, coussins, miroirs... Chaque pièce raconte une histoire et apporte du caractère à votre espace.",
    image:
      "https://images.unsplash.com/photo-1526057565006-20beab8dd2ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    count: 20,
    products: [5, 6, 8, 11],
  },
}

export default function CategoryPage({ params }: { params: { id: string } }) {
  const categoryId = params.id
  const category = categoriesDatabase[categoryId as keyof typeof categoriesDatabase] || categoriesDatabase["1"]

  return (
    <main className="min-h-screen pt-20">
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={category.image || "/placeholder.svg"}
            alt={category.name}
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container relative z-10 px-4 mx-auto text-white">
          <Link href="/categories" className="inline-flex items-center mb-6 text-sm text-white/80 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Toutes les catégories
          </Link>
          <h1 className="mb-4 text-4xl font-light tracking-tight md:text-5xl">
            <span className="font-medium">{category.name}</span>
          </h1>
          <p className="max-w-2xl mb-2 text-white/80">{category.description}</p>
          <p className="text-sm text-white/70">{category.count} produits</p>
        </div>
      </section>

      <section className="container px-4 py-12 mx-auto">
        <div className="flex flex-col items-center justify-between gap-4 mb-8 md:flex-row">
          <div className="flex items-center gap-4 md:hidden w-full">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex-1">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtres
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Filtres</SheetTitle>
                  <SheetDescription>Affinez votre recherche selon vos préférences</SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <ProductFilters />
                </div>
              </SheetContent>
            </Sheet>

            <ProductSort className="flex-1" />
          </div>

          <p className="text-sm text-neutral-500">{category.count} produits</p>

          <div className="hidden md:flex md:items-center gap-4">
            <ProductSort />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
          <div className="hidden md:block">
            <ProductFilters />
          </div>

          <CategoryProductGrid categoryId={category.id} />
        </div>
      </section>
    </main>
  )
}

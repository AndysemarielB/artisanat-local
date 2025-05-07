import { Filter } from "lucide-react"
import ProductGrid from "@/components/product-grid"
import ProductFilters from "@/components/product-filters"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import ProductSort from "@/components/product-sort"

export default function ProductsPage() {
  return (
    <main className="min-h-screen pt-20">
      <section className="py-12 bg-neutral-50">
        <div className="container px-4 mx-auto">
          <h1 className="mb-2 text-3xl font-light tracking-tight md:text-4xl">
            Nos <span className="font-medium">Créations</span>
          </h1>
          <p className="max-w-2xl mb-8 text-neutral-600">
            Découvrez notre collection de meubles et décorations artisanales, créés avec passion par nos artisans
            locaux.
          </p>
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

          <p className="text-sm text-neutral-500">48 produits</p>

          <div className="hidden md:flex md:items-center gap-4">
            <ProductSort />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
          <div className="hidden md:block">
            <ProductFilters />
          </div>

          <ProductGrid />
        </div>
      </section>
    </main>
  )
}

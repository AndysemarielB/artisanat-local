import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import HeroSectionArtistic from "@/components/hero-section-artistic"
import CategoryShowcaseArtistic from "@/components/category-showcase-artistic"
import ArtisanStoryArtistic from "@/components/artisan-story-artistic"
import FeaturedProductsArtistic from "@/components/featured-products-artistic"
import NewsletterArtistic from "@/components/newsletter-artistic"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSectionArtistic />

      <section className="container px-4 py-24 mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-3xl font-light tracking-tight md:text-4xl">
            Découvrez notre <span className="font-medium">Collection</span>
          </h2>
          <div className="w-16 h-px my-6 bg-neutral-300"></div>
          <p className="max-w-2xl text-neutral-600">
            Chaque pièce raconte une histoire, façonnée par des artisans locaux avec passion et savoir-faire.
          </p>
        </div>

        <CategoryShowcaseArtistic />
      </section>

      <section className="py-24 bg-neutral-50">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-3xl font-light tracking-tight md:text-4xl">
              Pièces <span className="font-medium">Sélectionnées</span>
            </h2>
            <div className="w-16 h-px my-6 bg-neutral-300"></div>
            <p className="max-w-2xl text-neutral-600">
              Notre sélection de créations uniques, choisies pour leur beauté et leur originalité.
            </p>
          </div>

          <FeaturedProductsArtistic />

          <div className="flex justify-center mt-12">
            <Button
              variant="outline"
              className="group relative overflow-hidden rounded-full border-neutral-300 px-8 py-3"
              asChild
            >
              <Link href="/produits">
                <span className="relative z-10 flex items-center text-sm font-medium">
                  Voir tous les produits
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 z-0 bg-neutral-100 transform origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <ArtisanStoryArtistic />

      <NewsletterArtistic />
    </main>
  )
}

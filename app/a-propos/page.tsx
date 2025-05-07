import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-20">
      <section className="py-12 bg-neutral-50">
        <div className="container px-4 mx-auto">
          <h1 className="mb-2 text-3xl font-light tracking-tight md:text-4xl">
            À <span className="font-medium">Propos</span>
          </h1>
          <p className="max-w-2xl mb-8 text-neutral-600">Découvrez notre histoire, notre mission et nos valeurs.</p>
        </div>
      </section>

      <section className="container px-4 py-16 mx-auto">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-medium">Notre Histoire</h2>
            <div className="space-y-4 text-neutral-600">
              <p>
                Artisanat Local est né en 2018 de la passion de trois amis pour l'artisanat et le design. Convaincus que
                chaque objet qui nous entoure devrait avoir une âme et raconter une histoire, nous avons décidé de créer
                une plateforme qui mettrait en lumière le talent des artisans locaux.
              </p>
              <p>
                Au fil des années, nous avons parcouru la France à la recherche des meilleurs créateurs, sélectionnés
                pour leur savoir-faire, leur créativité et leur engagement envers des pratiques durables. Ce qui a
                commencé comme une petite boutique en ligne est devenu aujourd'hui une communauté florissante d'artisans
                et de passionnés de design authentique.
              </p>
            </div>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80"
              alt="L'équipe d'Artisanat Local"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-neutral-50">
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-2xl font-medium text-center">Nos Valeurs</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="mb-4 text-xl font-medium">Authenticité</h3>
              <p className="text-neutral-600">
                Nous valorisons le travail fait main, les techniques traditionnelles et l'expression créative unique de
                chaque artisan. Chaque pièce que nous proposons a une histoire et une âme.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="mb-4 text-xl font-medium">Durabilité</h3>
              <p className="text-neutral-600">
                Nous nous engageons à promouvoir des pratiques respectueuses de l'environnement. Nos artisans utilisent
                des matériaux durables, locaux quand c'est possible, et des méthodes de production à faible impact.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="mb-4 text-xl font-medium">Communauté</h3>
              <p className="text-neutral-600">
                Nous croyons au pouvoir de la communauté et au soutien de l'économie locale. En achetant chez Artisanat
                Local, vous contribuez directement à la préservation des savoir-faire et à la vitalité des territoires.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container px-4 py-16 mx-auto">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1577401239170-897942555fb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
              alt="Notre mission"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="mb-6 text-2xl font-medium">Notre Mission</h2>
            <div className="space-y-4 text-neutral-600">
              <p>
                Notre mission est de créer un pont entre les artisans talentueux et les personnes qui cherchent à donner
                du sens à leur intérieur. Nous voulons offrir une alternative aux produits standardisés en proposant des
                créations uniques, fabriquées avec passion et savoir-faire.
              </p>
              <p>
                Nous nous efforçons de rendre l'artisanat accessible à tous, en expliquant les processus de création, en
                racontant l'histoire des artisans et en proposant des pièces à différents prix. Nous croyons que chaque
                foyer mérite d'accueillir des objets qui ont une âme.
              </p>
              <div className="pt-4">
                <Button className="rounded-full bg-neutral-900 hover:bg-neutral-800" asChild>
                  <Link href="/contact">Contactez-nous</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

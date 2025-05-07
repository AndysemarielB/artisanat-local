import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const artisans = [
  {
    id: "marie-dubois",
    name: "Marie Dubois",
    specialty: "Mobilier en bois",
    location: "Lyon",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
    description:
      "Spécialisée dans la création de mobilier en bois massif, Marie Dubois combine des techniques traditionnelles avec un design contemporain.",
  },
  {
    id: "jean-martin",
    name: "Jean Martin",
    specialty: "Ébénisterie",
    location: "Bordeaux",
    image:
      "https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1021&q=80",
    description:
      "Ébéniste passionné, Jean Martin crée des pièces uniques en bois noble, alliant fonctionnalité et esthétique intemporelle.",
  },
  {
    id: "sophie-laurent",
    name: "Sophie Laurent",
    specialty: "Luminaires",
    location: "Paris",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
    description:
      "Designer de luminaires, Sophie Laurent joue avec la lumière et les matériaux pour créer des pièces qui transforment l'ambiance de votre intérieur.",
  },
  {
    id: "thomas-petit",
    name: "Thomas Petit",
    specialty: "Métal et bois",
    location: "Nantes",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
    description:
      "Thomas Petit associe le métal et le bois pour créer des meubles au style industriel et contemporain, robustes et élégants.",
  },
  {
    id: "claire-moreau",
    name: "Claire Moreau",
    specialty: "Céramique",
    location: "Marseille",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description:
      "Céramiste talentueuse, Claire Moreau façonne l'argile pour créer des objets décoratifs et utilitaires aux formes organiques et aux textures uniques.",
  },
  {
    id: "pierre-durand",
    name: "Pierre Durand",
    specialty: "Verre soufflé",
    location: "Strasbourg",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
    description:
      "Maître verrier, Pierre Durand crée des pièces en verre soufflé aux couleurs vibrantes et aux formes élégantes, véritables œuvres d'art pour votre intérieur.",
  },
]

export default function ArtisansPage() {
  return (
    <main className="min-h-screen pt-20">
      <section className="py-12 bg-neutral-50">
        <div className="container px-4 mx-auto">
          <h1 className="mb-2 text-3xl font-light tracking-tight md:text-4xl">
            Nos <span className="font-medium">Artisans</span>
          </h1>
          <p className="max-w-2xl mb-8 text-neutral-600">
            Découvrez les créateurs passionnés qui façonnent chaque pièce avec amour et savoir-faire.
          </p>
        </div>
      </section>

      <section className="container px-4 py-16 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {artisans.map((artisan) => (
            <Link key={artisan.id} href={`/artisans/${artisan.id}`} className="group">
              <div className="overflow-hidden transition-all duration-300 bg-white border rounded-lg shadow-sm group-hover:shadow-md">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={artisan.image || "/placeholder.svg"}
                    alt={artisan.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h2 className="mb-1 text-xl font-medium">{artisan.name}</h2>
                  <p className="mb-2 text-sm text-neutral-500">
                    {artisan.specialty} • {artisan.location}
                  </p>
                  <p className="mb-4 text-neutral-600">{artisan.description}</p>
                  <Button variant="outline" size="sm" className="rounded-full group-hover:bg-neutral-100">
                    Découvrir son univers
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

import Image from "next/image"
import Link from "next/link"

const categories = [
  {
    id: 1,
    name: "Mobilier",
    description: "Tables, chaises, fauteuils et autres meubles fabriqués à la main par nos artisans.",
    image:
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    count: 16,
  },
  {
    id: 2,
    name: "Luminaires",
    description: "Lampes, suspensions et appliques pour créer une ambiance chaleureuse.",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    count: 12,
  },
  {
    id: 3,
    name: "Décoration",
    description: "Objets décoratifs, vases, coussins et autres accessoires pour personnaliser votre intérieur.",
    image:
      "https://images.unsplash.com/photo-1526057565006-20beab8dd2ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    count: 20,
  },
  {
    id: 4,
    name: "Textiles",
    description: "Tapis, plaids, rideaux et autres textiles pour apporter chaleur et confort à votre intérieur.",
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
    count: 14,
  },
  {
    id: 5,
    name: "Art Mural",
    description: "Tableaux, miroirs et autres créations pour habiller vos murs avec style.",
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    count: 10,
  },
  {
    id: 6,
    name: "Céramique",
    description: "Vaisselle, vases et objets décoratifs en céramique façonnés à la main.",
    image:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    count: 18,
  },
]

export default function CategoriesPage() {
  return (
    <main className="min-h-screen pt-20">
      <section className="py-12 bg-neutral-50">
        <div className="container px-4 mx-auto">
          <h1 className="mb-2 text-3xl font-light tracking-tight md:text-4xl">
            Nos <span className="font-medium">Catégories</span>
          </h1>
          <p className="max-w-2xl mb-8 text-neutral-600">
            Explorez notre sélection de créations artisanales par catégorie et trouvez l'inspiration pour votre
            intérieur.
          </p>
        </div>
      </section>

      <section className="container px-4 py-16 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.id}`} className="group">
              <div className="overflow-hidden transition-all duration-300 bg-white border rounded-lg shadow-sm group-hover:shadow-md">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 transition-opacity duration-300 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h2 className="mb-1 text-xl font-medium">{category.name}</h2>
                    <p className="text-sm text-white/80">{category.count} produits</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-neutral-600">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

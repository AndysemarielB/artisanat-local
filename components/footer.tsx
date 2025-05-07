import Link from "next/link"
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-neutral-50">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="mb-4 text-lg font-medium">Artisanat Local</h2>
            <p className="mb-6 text-sm text-neutral-600">
              Des créations uniques, façonnées avec passion par des artisans locaux.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium uppercase">Navigation</h3>
            <nav className="grid gap-2">
              <Link href="/" className="text-sm text-neutral-600 hover:text-neutral-900">
                Accueil
              </Link>
              <Link href="/produits" className="text-sm text-neutral-600 hover:text-neutral-900">
                Produits
              </Link>
              <Link href="/categories" className="text-sm text-neutral-600 hover:text-neutral-900">
                Catégories
              </Link>
              <Link href="/artisans" className="text-sm text-neutral-600 hover:text-neutral-900">
                Artisans
              </Link>
              <Link href="/a-propos" className="text-sm text-neutral-600 hover:text-neutral-900">
                À propos
              </Link>
              <Link href="/contact" className="text-sm text-neutral-600 hover:text-neutral-900">
                Contact
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium uppercase">Contact</h3>
            <div className="grid gap-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-neutral-600" />
                <span className="text-sm text-neutral-600">
                  123 Rue de l'Artisanat
                  <br />
                  75001 Paris, France
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-neutral-600" />
                <span className="text-sm text-neutral-600">+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-neutral-600" />
                <span className="text-sm text-neutral-600">contact@artisanat-local.fr</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium uppercase">Newsletter</h3>
            <p className="mb-4 text-sm text-neutral-600">
              Inscrivez-vous pour recevoir nos actualités et offres exclusives.
            </p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Votre email" className="rounded-full" />
              <Button className="rounded-full bg-neutral-900 hover:bg-neutral-800">S'inscrire</Button>
            </div>
          </div>
        </div>

        <div className="pt-8 mt-12 border-t border-neutral-200">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-neutral-600">
              © {new Date().getFullYear()} Artisanat Local. Tous droits réservés.
            </p>
            <div className="flex space-x-6">
              <Link href="/mentions-legales" className="text-sm text-neutral-600 hover:text-neutral-900">
                Mentions légales
              </Link>
              <Link href="/confidentialite" className="text-sm text-neutral-600 hover:text-neutral-900">
                Politique de confidentialité
              </Link>
              <Link href="/cgv" className="text-sm text-neutral-600 hover:text-neutral-900">
                CGV
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-neutral-500">
            <p>
              Développé par{" "}
              <a
                href="https://www.instagram.com/b.andysa/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:underline"
              >
                Andy B
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

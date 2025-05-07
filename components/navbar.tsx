"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, Search, ShoppingBag, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent",
      )}
    >
      <div className="container flex items-center justify-between h-20 px-4 mx-auto">
        <div className="flex items-center lg:w-1/3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="w-5 h-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 mt-8">
                <Link href="/" className="text-lg font-medium">
                  Accueil
                </Link>
                <Link href="/produits" className="text-lg font-medium">
                  Produits
                </Link>
                <Link href="/categories" className="text-lg font-medium">
                  Catégories
                </Link>
                <Link href="/artisans" className="text-lg font-medium">
                  Artisans
                </Link>
                <Link href="/a-propos" className="text-lg font-medium">
                  À propos
                </Link>
                <Link href="/contact" className="text-lg font-medium">
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <nav className="hidden ml-8 lg:flex lg:items-center lg:space-x-8">
            <Link href="/produits" className="text-sm font-medium transition-colors hover:text-neutral-500">
              Produits
            </Link>
            <Link href="/categories" className="text-sm font-medium transition-colors hover:text-neutral-500">
              Catégories
            </Link>
            <Link href="/artisans" className="text-sm font-medium transition-colors hover:text-neutral-500">
              Artisans
            </Link>
          </nav>
        </div>

        <Link href="/" className="absolute transform -translate-x-1/2 left-1/2">
          <h1 className="text-xl font-medium tracking-tight">Artisanat Local</h1>
        </Link>

        <div className="flex items-center justify-end space-x-4 lg:w-1/3">
          {isSearchOpen ? (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-white">
              <div className="container flex items-center px-4 mx-auto">
                <Input type="search" placeholder="Rechercher..." className="flex-1" autoFocus />
                <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)} className="ml-2">
                  <X className="w-5 h-5" />
                  <span className="sr-only">Fermer</span>
                </Button>
              </div>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="w-5 h-5" />
              <span className="sr-only">Rechercher</span>
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
                <span className="sr-only">Compte</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/compte/connexion">Connexion</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/compte/inscription">Inscription</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/compte/profil">Mon profil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/compte/commandes">Mes commandes</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/compte/favoris">Mes favoris</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" asChild>
            <Link href="/panier">
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-[10px] font-medium text-white transform translate-x-1/2 -translate-y-1/2 bg-neutral-900 rounded-full">
                  3
                </span>
              </div>
              <span className="sr-only">Panier</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

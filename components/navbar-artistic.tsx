"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, Search, ShoppingBag, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function NavbarArtistic() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY

      // Determine if scrolled past threshold
      setIsScrolled(currentScrollPos > 10)

      // Hide/show navbar based on scroll direction
      const isScrollingDown = prevScrollPos < currentScrollPos
      setVisible(currentScrollPos < 10 || !isScrollingDown)

      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [prevScrollPos])

  const navbarVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
    hidden: {
      y: -100,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  }

  const searchVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  }

  return (
    <motion.header
      variants={navbarVariants}
      initial="visible"
      animate={visible ? "visible" : "hidden"}
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
            <Link href="/produits" className="text-sm font-medium transition-all hover:text-neutral-500 relative group">
              <span>Produits</span>
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-neutral-900 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/categories"
              className="text-sm font-medium transition-all hover:text-neutral-500 relative group"
            >
              <span>Catégories</span>
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-neutral-900 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/artisans" className="text-sm font-medium transition-all hover:text-neutral-500 relative group">
              <span>Artisans</span>
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-neutral-900 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>
        </div>

        <Link href="/" className="absolute transform -translate-x-1/2 left-1/2">
          <h1 className="text-xl font-medium tracking-tight">Artisanat Local</h1>
        </Link>

        <div className="flex items-center justify-end space-x-4 lg:w-1/3">
          <AnimatePresence>
            {isSearchOpen ? (
              <motion.div
                variants={searchVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm"
              >
                <div className="container flex items-center px-4 mx-auto">
                  <Input
                    type="search"
                    placeholder="Rechercher..."
                    className="flex-1 border-0 border-b-2 border-neutral-200 rounded-none focus-visible:ring-0 focus-visible:border-neutral-900 transition-all duration-300 pl-0"
                    autoFocus
                  />
                  <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)} className="ml-2">
                    <X className="w-5 h-5" />
                    <span className="sr-only">Fermer</span>
                  </Button>
                </div>
              </motion.div>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                <Search className="w-5 h-5" />
                <span className="sr-only">Rechercher</span>
              </Button>
            )}
          </AnimatePresence>

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
                <motion.span
                  className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-[10px] font-medium text-white transform translate-x-1/2 -translate-y-1/2 bg-neutral-900 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                >
                  3
                </motion.span>
              </div>
              <span className="sr-only">Panier</span>
            </Link>
          </Button>
        </div>
      </div>
    </motion.header>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { CreditCard, Heart, LogOut, Package, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"

const menuItems = [
  {
    name: "Profil",
    href: "/compte/profil",
    icon: User,
  },
  {
    name: "Commandes",
    href: "/compte/commandes",
    icon: Package,
  },
  {
    name: "Favoris",
    href: "/compte/favoris",
    icon: Heart,
  },
  {
    name: "Moyens de paiement",
    href: "/compte/paiement",
    icon: CreditCard,
  },
  {
    name: "Paramètres",
    href: "/compte/parametres",
    icon: Settings,
  },
]

export default function AccountSidebar() {
  const pathname = usePathname()

  return (
    <div className="space-y-6">
      <div className="hidden md:block">
        <h2 className="mb-4 text-lg font-medium">Mon compte</h2>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm rounded-md",
                pathname === item.href
                  ? "bg-neutral-100 text-neutral-900 font-medium"
                  : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900",
              )}
            >
              <item.icon className="w-4 h-4 mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex md:hidden">
        <nav className="flex w-full overflow-x-auto pb-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center px-4 py-2 text-xs whitespace-nowrap",
                pathname === item.href ? "text-neutral-900 font-medium" : "text-neutral-600 hover:text-neutral-900",
              )}
            >
              <item.icon className="w-5 h-5 mb-1" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="hidden pt-6 mt-6 border-t border-neutral-200 md:block">
        <Button variant="outline" className="w-full rounded-full" asChild>
          <Link href="/logout">
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </Link>
        </Button>
      </div>
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowDownAZ, ArrowUpDown } from "lucide-react"
import { useState } from "react"

interface ProductSortProps {
  className?: string
}

export default function ProductSort({ className }: ProductSortProps) {
  const [sortOption, setSortOption] = useState("featured")

  const sortOptions = {
    featured: "En vedette",
    newest: "Nouveautés",
    priceAsc: "Prix: croissant",
    priceDesc: "Prix: décroissant",
    nameAsc: "Nom: A-Z",
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={className}>
          <ArrowUpDown className="w-4 h-4 mr-2" />
          Trier: {sortOptions[sortOption as keyof typeof sortOptions]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuItem onClick={() => setSortOption("featured")}>En vedette</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSortOption("newest")}>Nouveautés</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSortOption("priceAsc")}>Prix: croissant</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSortOption("priceDesc")}>Prix: décroissant</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSortOption("nameAsc")}>
          <ArrowDownAZ className="w-4 h-4 mr-2" />
          Nom: A-Z
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

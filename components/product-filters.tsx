"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 1000])

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-medium">Catégories</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="mobilier" />
            <Label htmlFor="mobilier" className="text-sm font-normal">
              Mobilier
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="luminaires" />
            <Label htmlFor="luminaires" className="text-sm font-normal">
              Luminaires
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="decoration" />
            <Label htmlFor="decoration" className="text-sm font-normal">
              Décoration
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="textiles" />
            <Label htmlFor="textiles" className="text-sm font-normal">
              Textiles
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="art" />
            <Label htmlFor="art" className="text-sm font-normal">
              Art mural
            </Label>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-neutral-200">
        <h3 className="mb-4 text-lg font-medium">Prix</h3>
        <Slider
          defaultValue={[0, 1000]}
          max={1000}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-6"
        />
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-600">{priceRange[0]} €</span>
          <span className="text-sm text-neutral-600">{priceRange[1]} €</span>
        </div>
      </div>

      <Accordion type="multiple" className="pt-4 border-t border-neutral-200">
        <AccordionItem value="materiaux">
          <AccordionTrigger className="text-lg font-medium">Matériaux</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="bois" />
                <Label htmlFor="bois" className="text-sm font-normal">
                  Bois
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="ceramique" />
                <Label htmlFor="ceramique" className="text-sm font-normal">
                  Céramique
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="metal" />
                <Label htmlFor="metal" className="text-sm font-normal">
                  Métal
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="textile" />
                <Label htmlFor="textile" className="text-sm font-normal">
                  Textile
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="verre" />
                <Label htmlFor="verre" className="text-sm font-normal">
                  Verre
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="artisans">
          <AccordionTrigger className="text-lg font-medium">Artisans</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="marie" />
                <Label htmlFor="marie" className="text-sm font-normal">
                  Marie Dubois
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="jean" />
                <Label htmlFor="jean" className="text-sm font-normal">
                  Jean Martin
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="sophie" />
                <Label htmlFor="sophie" className="text-sm font-normal">
                  Sophie Laurent
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="thomas" />
                <Label htmlFor="thomas" className="text-sm font-normal">
                  Thomas Petit
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="claire" />
                <Label htmlFor="claire" className="text-sm font-normal">
                  Claire Moreau
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="style">
          <AccordionTrigger className="text-lg font-medium">Style</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="moderne" />
                <Label htmlFor="moderne" className="text-sm font-normal">
                  Moderne
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="scandinave" />
                <Label htmlFor="scandinave" className="text-sm font-normal">
                  Scandinave
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="rustique" />
                <Label htmlFor="rustique" className="text-sm font-normal">
                  Rustique
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="industriel" />
                <Label htmlFor="industriel" className="text-sm font-normal">
                  Industriel
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="boheme" />
                <Label htmlFor="boheme" className="text-sm font-normal">
                  Bohème
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

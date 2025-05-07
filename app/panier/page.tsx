"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"

// Exemple de panier
const initialCart = [
  {
    id: 1,
    name: "Fauteuil Élégance",
    artisan: "Marie Dubois",
    price: 590,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1158&q=80",
  },
  {
    id: 3,
    name: "Lampe Aurore",
    artisan: "Sophie Laurent",
    price: 320,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 8,
    name: "Coussin Tissé",
    artisan: "Emma Petit",
    price: 85,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1584346133934-a3a4db9b5732?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
]

export default function CartPage() {
  const [cart, setCart] = useState(initialCart)
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCart(cart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "bienvenue") {
      setPromoApplied(true)
    }
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 1000 ? 0 : 50
  const discount = promoApplied ? subtotal * 0.1 : 0
  const total = subtotal + shipping - discount

  return (
    <main className="min-h-screen pt-20">
      <section className="py-12 bg-neutral-50">
        <div className="container px-4 mx-auto">
          <h1 className="mb-2 text-3xl font-light tracking-tight md:text-4xl">
            Votre <span className="font-medium">Panier</span>
          </h1>
          <p className="max-w-2xl mb-8 text-neutral-600">Vérifiez vos articles et procédez au paiement.</p>
        </div>
      </section>

      <section className="container px-4 py-16 mx-auto">
        {cart.length === 0 ? (
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-medium">Votre panier est vide</h2>
            <p className="mb-8 text-neutral-600">Découvrez nos produits et ajoutez-les à votre panier.</p>
            <Button className="rounded-full bg-neutral-900 hover:bg-neutral-800" asChild>
              <Link href="/produits">Voir les produits</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="mb-6 text-2xl font-medium">
                Articles ({cart.reduce((sum, item) => sum + item.quantity, 0)})
              </h2>
              <div className="space-y-6">
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col p-4 border rounded-lg sm:flex-row"
                  >
                    <div className="relative w-full h-32 mb-4 overflow-hidden rounded-md sm:w-32 sm:mb-0 sm:mr-6">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between">
                        <div>
                          <h3 className="text-lg font-medium">{item.name}</h3>
                          <p className="text-sm text-neutral-500">Par {item.artisan}</p>
                        </div>
                        <p className="text-lg font-medium">{item.price} €</p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-neutral-200 rounded-full">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="rounded-full"
                          >
                            <Minus className="w-4 h-4" />
                            <span className="sr-only">Diminuer</span>
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="rounded-full"
                          >
                            <Plus className="w-4 h-4" />
                            <span className="sr-only">Augmenter</span>
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-neutral-500 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="sr-only">Supprimer</span>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/produits" className="inline-flex items-center text-sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continuer mes achats
                </Link>
              </div>
            </div>

            <div>
              <div className="p-6 border rounded-lg">
                <h2 className="mb-4 text-xl font-medium">Récapitulatif</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-600">Sous-total</span>
                    <span>{subtotal.toFixed(2)} €</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-600">Livraison</span>
                    <span>{shipping > 0 ? `${shipping.toFixed(2)} €` : "Gratuite"}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex items-center justify-between text-green-600">
                      <span>Réduction (10%)</span>
                      <span>-{discount.toFixed(2)} €</span>
                    </div>
                  )}
                  <Separator className="my-3" />
                  <div className="flex items-center justify-between text-lg font-medium">
                    <span>Total</span>
                    <span>{total.toFixed(2)} €</span>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Code promo"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="rounded-full"
                    />
                    <Button variant="outline" onClick={applyPromoCode} className="rounded-full" disabled={promoApplied}>
                      Appliquer
                    </Button>
                  </div>
                  {promoApplied && <p className="text-sm text-green-600">Code promo "BIENVENUE" appliqué !</p>}
                  <Button className="w-full rounded-full bg-neutral-900 hover:bg-neutral-800">
                    Procéder au paiement
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

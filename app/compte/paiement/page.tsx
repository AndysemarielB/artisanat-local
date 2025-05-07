"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { Check, CreditCard, Plus, Trash2 } from "lucide-react"
import AccountSidebar from "@/components/account-sidebar"

// Données fictives des moyens de paiement
const paymentMethods = [
  {
    id: 1,
    type: "card",
    brand: "Visa",
    last4: "4242",
    expMonth: 12,
    expYear: 2025,
    isDefault: true,
  },
  {
    id: 2,
    type: "card",
    brand: "Mastercard",
    last4: "5555",
    expMonth: 8,
    expYear: 2024,
    isDefault: false,
  },
]

export default function PaymentPage() {
  const [methods, setMethods] = useState(paymentMethods)
  const [isAddingCard, setIsAddingCard] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const [newCard, setNewCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewCard({
      ...newCard,
      [name]: value,
    })
  }

  const setDefaultMethod = (id: number) => {
    setMethods(
      methods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    )
    setSuccessMessage("Votre moyen de paiement par défaut a été mis à jour.")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const removeMethod = (id: number) => {
    setMethods(methods.filter((method) => method.id !== id))
    setSuccessMessage("Le moyen de paiement a été supprimé avec succès.")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simuler l'ajout d'une carte
    const newId = Math.max(...methods.map((m) => m.id)) + 1
    const newMethod = {
      id: newId,
      type: "card",
      brand: newCard.number.startsWith("4") ? "Visa" : "Mastercard",
      last4: newCard.number.slice(-4),
      expMonth: Number.parseInt(newCard.expiry.split("/")[0]),
      expYear: Number.parseInt(`20${newCard.expiry.split("/")[1]}`),
      isDefault: methods.length === 0,
    }

    setMethods([...methods, newMethod])
    setNewCard({
      number: "",
      name: "",
      expiry: "",
      cvc: "",
    })
    setIsAddingCard(false)
    setSuccessMessage("Votre nouvelle carte a été ajoutée avec succès.")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  return (
    <main className="min-h-screen pt-20">
      <section className="container px-4 py-16 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
          <AccountSidebar />

          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-medium">Moyens de paiement</h1>
              <p className="text-neutral-600">Gérez vos cartes et autres moyens de paiement</p>
            </div>

            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 mb-6 text-green-700 bg-green-50 rounded-md"
              >
                <div className="flex items-center">
                  <Check className="w-5 h-5 mr-2" />
                  {successMessage}
                </div>
              </motion.div>
            )}

            <div className="p-6 mb-8 bg-white border rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-medium">Vos moyens de paiement</h2>
                <Button
                  onClick={() => setIsAddingCard(!isAddingCard)}
                  className="rounded-full bg-neutral-900 hover:bg-neutral-800"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter une carte
                </Button>
              </div>

              {isAddingCard && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 mb-6 border rounded-lg"
                >
                  <h3 className="mb-4 text-lg font-medium">Ajouter une nouvelle carte</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom sur la carte</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="JEAN DUPONT"
                        value={newCard.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="number">Numéro de carte</Label>
                      <Input
                        id="number"
                        name="number"
                        placeholder="4242 4242 4242 4242"
                        value={newCard.number}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Date d'expiration (MM/YY)</Label>
                        <Input
                          id="expiry"
                          name="expiry"
                          placeholder="12/25"
                          value={newCard.expiry}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input
                          id="cvc"
                          name="cvc"
                          placeholder="123"
                          value={newCard.cvc}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsAddingCard(false)}
                        className="rounded-full"
                      >
                        Annuler
                      </Button>
                      <Button type="submit" className="rounded-full bg-neutral-900 hover:bg-neutral-800">
                        Ajouter
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}

              {methods.length === 0 ? (
                <div className="p-8 text-center">
                  <CreditCard className="w-12 h-12 mx-auto mb-4 text-neutral-300" />
                  <h3 className="mb-2 text-lg font-medium">Aucun moyen de paiement</h3>
                  <p className="mb-6 text-neutral-500">Vous n'avez pas encore ajouté de moyen de paiement</p>
                  <Button
                    onClick={() => setIsAddingCard(true)}
                    className="rounded-full bg-neutral-900 hover:bg-neutral-800"
                  >
                    Ajouter une carte
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {methods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center">
                        <div className="p-2 mr-4 bg-neutral-100 rounded-md">
                          <CreditCard className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center">
                            <p className="font-medium">
                              {method.brand} •••• {method.last4}
                            </p>
                            {method.isDefault && (
                              <span className="px-2 py-1 ml-2 text-xs text-green-700 bg-green-100 rounded-full">
                                Par défaut
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-neutral-500">
                            Expire {method.expMonth}/{method.expYear}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {!method.isDefault && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDefaultMethod(method.id)}
                            className="rounded-full"
                          >
                            Définir par défaut
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeMethod(method.id)}
                          className="text-neutral-500 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="sr-only">Supprimer</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 bg-white border rounded-lg shadow-sm">
              <h2 className="mb-4 text-xl font-medium">Facturation</h2>
              <Separator className="mb-6" />
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-neutral-500">Adresse de facturation</p>
                  <p>15 rue des Artisans</p>
                  <p>75001 Paris</p>
                  <p>France</p>
                </div>
                <Button variant="outline" className="rounded-full">
                  Modifier l'adresse de facturation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

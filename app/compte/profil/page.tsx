"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { Camera, Check } from "lucide-react"
import AccountSidebar from "@/components/account-sidebar"

// Données fictives de l'utilisateur
const userData = {
  firstName: "Thomas",
  lastName: "Durand",
  email: "thomas.durand@example.com",
  phone: "06 12 34 56 78",
  address: {
    street: "15 rue des Artisans",
    city: "Paris",
    postalCode: "75001",
    country: "France",
  },
  avatar:
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
}

export default function ProfilePage() {
  const [user, setUser] = useState(userData)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(userData)
  const [isSaving, setIsSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData({
        ...formData,
        [parent]: {
          ...(formData[parent as keyof typeof formData] as Record<string, string>),
          [child]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // Simuler une sauvegarde
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setUser(formData)
    setIsEditing(false)
    setIsSaving(false)
    setSuccessMessage("Vos informations ont été mises à jour avec succès.")

    // Effacer le message après 3 secondes
    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  return (
    <main className="min-h-screen pt-20">
      <section className="container px-4 py-16 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
          <AccountSidebar />

          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-medium">Mon Profil</h1>
              <p className="text-neutral-600">Gérez vos informations personnelles et vos préférences</p>
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
              <div className="flex flex-col items-center justify-between gap-4 mb-6 sm:flex-row">
                <div className="flex items-center">
                  <div className="relative mr-4">
                    <div className="relative overflow-hidden rounded-full w-14 h-14">
                      <Image
                        src={user.avatar || "/placeholder.svg"}
                        alt={`${user.firstName} ${user.lastName}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <button className="absolute bottom-0 right-0 p-1 text-white bg-neutral-900 rounded-full">
                      <Camera className="w-3 h-3" />
                    </button>
                  </div>
                  <div>
                    <h2 className="text-xl font-medium">
                      {user.firstName} {user.lastName}
                    </h2>
                    <p className="text-sm text-neutral-500">{user.email}</p>
                  </div>
                </div>
                <Button
                  variant={isEditing ? "outline" : "default"}
                  onClick={() => setIsEditing(!isEditing)}
                  className="rounded-full"
                >
                  {isEditing ? "Annuler" : "Modifier le profil"}
                </Button>
              </div>

              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="personal">Informations personnelles</TabsTrigger>
                  <TabsTrigger value="address">Adresse</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="pt-6">
                  {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Prénom</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Nom</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                      </div>
                      <div className="flex justify-end">
                        <Button type="submit" className="rounded-full" disabled={isSaving}>
                          {isSaving ? "Enregistrement..." : "Enregistrer les modifications"}
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-sm font-medium text-neutral-500">Prénom</p>
                          <p>{user.firstName}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-neutral-500">Nom</p>
                          <p>{user.lastName}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-neutral-500">Email</p>
                        <p>{user.email}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-neutral-500">Téléphone</p>
                        <p>{user.phone}</p>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="address" className="pt-6">
                  {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="street">Adresse</Label>
                        <Input
                          id="street"
                          name="address.street"
                          value={formData.address.street}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="city">Ville</Label>
                          <Input
                            id="city"
                            name="address.city"
                            value={formData.address.city}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="postalCode">Code postal</Label>
                          <Input
                            id="postalCode"
                            name="address.postalCode"
                            value={formData.address.postalCode}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Pays</Label>
                        <Input
                          id="country"
                          name="address.country"
                          value={formData.address.country}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button type="submit" className="rounded-full" disabled={isSaving}>
                          {isSaving ? "Enregistrement..." : "Enregistrer les modifications"}
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-neutral-500">Adresse</p>
                        <p>{user.address.street}</p>
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-sm font-medium text-neutral-500">Ville</p>
                          <p>{user.address.city}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-neutral-500">Code postal</p>
                          <p>{user.address.postalCode}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-neutral-500">Pays</p>
                        <p>{user.address.country}</p>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            <div className="p-6 bg-white border rounded-lg shadow-sm">
              <h2 className="mb-4 text-xl font-medium">Sécurité</h2>
              <Separator className="mb-6" />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Mot de passe</h3>
                    <p className="text-sm text-neutral-500">Dernière modification il y a 3 mois</p>
                  </div>
                  <Button variant="outline" className="rounded-full">
                    Modifier
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Déconnexion de tous les appareils</h3>
                    <p className="text-sm text-neutral-500">
                      Déconnectez-vous de tous les autres navigateurs et appareils
                    </p>
                  </div>
                  <Button variant="outline" className="rounded-full">
                    Déconnecter
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Supprimer le compte</h3>
                    <p className="text-sm text-neutral-500">
                      Supprimez définitivement votre compte et toutes vos données
                    </p>
                  </div>
                  <Button variant="destructive" className="rounded-full">
                    Supprimer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

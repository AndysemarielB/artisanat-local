"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { Check, Globe, Lock, Mail, Sun } from "lucide-react"
import AccountSidebar from "@/components/account-sidebar"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    theme: "light",
    language: "fr",
    notifications: {
      email: true,
      promotions: true,
      orders: true,
      newsletter: false,
    },
    privacy: {
      shareData: false,
      cookies: true,
    },
  })
  const [successMessage, setSuccessMessage] = useState("")

  const updateSettings = (category: string, setting: string, value: boolean) => {
    setSettings({
      ...settings,
      [category]: {
        ...(settings[category as keyof typeof settings] as Record<string, boolean>),
        [setting]: value,
      },
    })
    setSuccessMessage("Vos paramètres ont été mis à jour avec succès.")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const setTheme = (theme: string) => {
    setSettings({
      ...settings,
      theme,
    })
    setSuccessMessage("Le thème a été mis à jour avec succès.")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const setLanguage = (language: string) => {
    setSettings({
      ...settings,
      language,
    })
    setSuccessMessage("La langue a été mise à jour avec succès.")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  return (
    <main className="min-h-screen pt-20">
      <section className="container px-4 py-16 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
          <AccountSidebar />

          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-medium">Paramètres</h1>
              <p className="text-neutral-600">Personnalisez votre expérience sur Artisanat Local</p>
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
              <div className="flex items-center mb-6">
                <Sun className="w-5 h-5 mr-2" />
                <h2 className="text-xl font-medium">Apparence</h2>
              </div>
              <Separator className="mb-6" />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <button
                  onClick={() => setTheme("light")}
                  className={`p-4 border rounded-lg text-left ${
                    settings.theme === "light" ? "border-neutral-900 bg-neutral-50" : "border-neutral-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Clair</h3>
                    {settings.theme === "light" && <Check className="w-4 h-4" />}
                  </div>
                  <p className="text-sm text-neutral-500">Thème clair pour une utilisation de jour</p>
                </button>

                <button
                  onClick={() => setTheme("dark")}
                  className={`p-4 border rounded-lg text-left ${
                    settings.theme === "dark" ? "border-neutral-900 bg-neutral-50" : "border-neutral-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Sombre</h3>
                    {settings.theme === "dark" && <Check className="w-4 h-4" />}
                  </div>
                  <p className="text-sm text-neutral-500">Thème sombre pour une utilisation de nuit</p>
                </button>
              </div>
            </div>

            <div className="p-6 mb-8 bg-white border rounded-lg shadow-sm">
              <div className="flex items-center mb-6">
                <Globe className="w-5 h-5 mr-2" />
                <h2 className="text-xl font-medium">Langue</h2>
              </div>
              <Separator className="mb-6" />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <button
                  onClick={() => setLanguage("fr")}
                  className={`p-4 border rounded-lg text-left ${
                    settings.language === "fr" ? "border-neutral-900 bg-neutral-50" : "border-neutral-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Français</h3>
                    {settings.language === "fr" && <Check className="w-4 h-4" />}
                  </div>
                </button>

                <button
                  onClick={() => setLanguage("en")}
                  className={`p-4 border rounded-lg text-left ${
                    settings.language === "en" ? "border-neutral-900 bg-neutral-50" : "border-neutral-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">English</h3>
                    {settings.language === "en" && <Check className="w-4 h-4" />}
                  </div>
                </button>
              </div>
            </div>

            <div className="p-6 mb-8 bg-white border rounded-lg shadow-sm">
              <div className="flex items-center mb-6">
                <Mail className="w-5 h-5 mr-2" />
                <h2 className="text-xl font-medium">Notifications</h2>
              </div>
              <Separator className="mb-6" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Notifications par email</h3>
                    <p className="text-sm text-neutral-500">Recevoir des notifications par email</p>
                  </div>
                  <Switch
                    checked={settings.notifications.email}
                    onCheckedChange={(checked) => updateSettings("notifications", "email", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Mises à jour des commandes</h3>
                    <p className="text-sm text-neutral-500">Recevoir des notifications sur l'état de vos commandes</p>
                  </div>
                  <Switch
                    checked={settings.notifications.orders}
                    onCheckedChange={(checked) => updateSettings("notifications", "orders", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Offres promotionnelles</h3>
                    <p className="text-sm text-neutral-500">Recevoir des offres et promotions exclusives</p>
                  </div>
                  <Switch
                    checked={settings.notifications.promotions}
                    onCheckedChange={(checked) => updateSettings("notifications", "promotions", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Newsletter</h3>
                    <p className="text-sm text-neutral-500">Recevoir notre newsletter mensuelle</p>
                  </div>
                  <Switch
                    checked={settings.notifications.newsletter}
                    onCheckedChange={(checked) => updateSettings("notifications", "newsletter", checked)}
                  />
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border rounded-lg shadow-sm">
              <div className="flex items-center mb-6">
                <Lock className="w-5 h-5 mr-2" />
                <h2 className="text-xl font-medium">Confidentialité</h2>
              </div>
              <Separator className="mb-6" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Partage des données</h3>
                    <p className="text-sm text-neutral-500">Autoriser le partage de vos données avec nos partenaires</p>
                  </div>
                  <Switch
                    checked={settings.privacy.shareData}
                    onCheckedChange={(checked) => updateSettings("privacy", "shareData", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Cookies</h3>
                    <p className="text-sm text-neutral-500">Accepter les cookies pour une expérience personnalisée</p>
                  </div>
                  <Switch
                    checked={settings.privacy.cookies}
                    onCheckedChange={(checked) => updateSettings("privacy", "cookies", checked)}
                  />
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-200">
                  <Button variant="outline" className="rounded-full">
                    Télécharger mes données
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

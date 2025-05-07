"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simuler une connexion
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Rediriger vers la page d'accueil après connexion
      window.location.href = "/"
    } catch (err) {
      setError("Identifiants incorrects. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen pt-20">
      <section className="container px-4 py-16 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md p-8 mx-auto bg-white border rounded-lg shadow-sm"
        >
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-2xl font-medium">Connexion</h1>
            <p className="text-neutral-600">Accédez à votre compte Artisanat Local</p>
          </div>

          {error && <div className="p-3 mb-6 text-sm text-red-600 bg-red-50 rounded-md">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mot de passe</Label>
                <Link href="/compte/mot-de-passe-oublie" className="text-xs text-neutral-500 hover:underline">
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute inset-y-0 right-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  <span className="sr-only">{showPassword ? "Masquer" : "Afficher"} le mot de passe</span>
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="remember" checked={rememberMe} onCheckedChange={(checked) => setRememberMe(!!checked)} />
              <Label htmlFor="remember" className="text-sm font-normal">
                Se souvenir de moi
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full rounded-full bg-neutral-900 hover:bg-neutral-800"
              disabled={isLoading}
            >
              {isLoading ? "Connexion en cours..." : "Se connecter"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-600">
              Vous n'avez pas de compte ?{" "}
              <Link href="/compte/inscription" className="font-medium text-neutral-900 hover:underline">
                S'inscrire
              </Link>
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  )
}

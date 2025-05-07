"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

  return (
    <section className="py-24 bg-neutral-900 text-white">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="mb-6 text-3xl font-light tracking-tight md:text-4xl">
            Restez <span className="font-medium">Inspiré</span>
          </h2>
          <div className="w-16 h-px my-6 mx-auto bg-neutral-700"></div>
          <p className="mb-8 text-neutral-300">
            Inscrivez-vous à notre newsletter pour découvrir nos nouveautés, rencontrer nos artisans et recevoir des
            conseils de décoration.
          </p>

          {submitted ? (
            <div className="flex items-center justify-center p-4 bg-neutral-800 rounded-lg">
              <Check className="w-5 h-5 mr-2 text-green-400" />
              <p>Merci pour votre inscription !</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400 rounded-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="rounded-full bg-white text-neutral-900 hover:bg-neutral-200">
                S'inscrire
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}

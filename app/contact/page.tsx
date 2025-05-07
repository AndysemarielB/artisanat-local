"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"
import { motion } from "framer-motion"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simuler l'envoi du formulaire
    setTimeout(() => {
      setIsSubmitted(true)
    }, 500)
  }

  return (
    <main className="min-h-screen pt-20">
      <section className="py-12 bg-neutral-50">
        <div className="container px-4 mx-auto">
          <h1 className="mb-2 text-3xl font-light tracking-tight md:text-4xl">
            Contactez <span className="font-medium">Nous</span>
          </h1>
          <p className="max-w-2xl mb-8 text-neutral-600">
            Une question, une suggestion ou un projet ? N'hésitez pas à nous contacter.
          </p>
        </div>
      </section>

      <section className="container px-4 py-16 mx-auto">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-medium">Nos Coordonnées</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mt-1 mr-4 text-neutral-600" />
                <div>
                  <h3 className="mb-2 text-lg font-medium">Adresse</h3>
                  <p className="text-neutral-600">
                    123 Rue de l'Artisanat
                    <br />
                    75001 Paris, France
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="w-5 h-5 mt-1 mr-4 text-neutral-600" />
                <div>
                  <h3 className="mb-2 text-lg font-medium">Téléphone</h3>
                  <p className="text-neutral-600">+33 1 23 45 67 89</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="w-5 h-5 mt-1 mr-4 text-neutral-600" />
                <div>
                  <h3 className="mb-2 text-lg font-medium">Email</h3>
                  <p className="text-neutral-600">contact@artisanat-local.fr</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-medium">Horaires d'Ouverture</h2>
              <div className="space-y-2 text-neutral-600">
                <p>Lundi - Vendredi: 9h00 - 18h00</p>
                <p>Samedi: 10h00 - 17h00</p>
                <p>Dimanche: Fermé</p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 bg-white rounded-lg shadow-sm"
          >
            <h2 className="mb-6 text-2xl font-medium">Envoyez-nous un Message</h2>
            {isSubmitted ? (
              <div className="p-6 text-center bg-green-50 rounded-lg">
                <h3 className="mb-2 text-lg font-medium text-green-800">Message Envoyé !</h3>
                <p className="text-green-700">
                  Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Nom
                    </label>
                    <Input id="name" name="name" value={formState.name} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Sujet
                  </label>
                  <Input id="subject" name="subject" value={formState.subject} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button type="submit" className="w-full rounded-full bg-neutral-900 hover:bg-neutral-800">
                  Envoyer
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4 mx-auto">
          <h2 className="mb-8 text-2xl font-medium text-center">Notre Emplacement</h2>
          <div className="overflow-hidden rounded-lg h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.3414702!3d48.8615162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sPalais%20Royal%2C%2075001%20Paris!5e0!3m2!1sfr!2sfr!4v1651234567890!5m2!1sfr!2sfr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  )
}

"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, useInView } from "framer-motion"
import { Check } from "lucide-react"

export default function NewsletterArtistic() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isInputFocused, setIsInputFocused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  }

  const successVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  }

  return (
    <section className="py-24 bg-neutral-900 text-white">
      <div className="container px-4 mx-auto">
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.h2 variants={childVariants} className="mb-6 text-3xl font-light tracking-tight md:text-4xl">
            Restez <span className="font-medium">Inspiré</span>
          </motion.h2>

          <motion.div variants={childVariants} className="w-16 h-px my-6 mx-auto bg-neutral-700"></motion.div>

          <motion.p variants={childVariants} className="mb-8 text-neutral-300">
            Inscrivez-vous à notre newsletter pour découvrir nos nouveautés, rencontrer nos artisans et recevoir des
            conseils de décoration.
          </motion.p>

          {submitted ? (
            <motion.div
              variants={successVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center justify-center p-6 bg-neutral-800 rounded-lg"
            >
              <Check className="w-5 h-5 mr-3 text-green-400" />
              <p>Merci pour votre inscription !</p>
            </motion.div>
          ) : (
            <motion.form
              variants={childVariants}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 relative"
            >
              <div className="relative flex-1">
                <Input
                  type="email"
                  placeholder="Votre adresse email"
                  className={`flex-1 bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400 rounded-full h-12 pl-6 pr-4 transition-all duration-300 ${
                    isInputFocused ? "border-white" : ""
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  required
                />
                <motion.span
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-px bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: isInputFocused ? "90%" : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <Button type="submit" className="rounded-full bg-white text-neutral-900 hover:bg-neutral-200 h-12 px-8">
                S'inscrire
              </Button>
            </motion.form>
          )}
        </motion.div>
      </div>
    </section>
  )
}

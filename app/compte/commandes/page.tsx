"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, Package, Search, Truck } from "lucide-react"
import AccountSidebar from "@/components/account-sidebar"

// Données fictives des commandes
const orders = [
  {
    id: "CMD-2023-001",
    date: "15/04/2023",
    status: "delivered",
    statusLabel: "Livré",
    total: 890,
    items: [
      {
        id: 2,
        name: "Table Horizon",
        price: 890,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80",
      },
    ],
    tracking: {
      number: "TRK123456789",
      carrier: "Chronopost",
      events: [
        { date: "15/04/2023", time: "14:30", status: "Livré", location: "Paris" },
        { date: "14/04/2023", time: "09:15", status: "En cours de livraison", location: "Paris" },
        { date: "13/04/2023", time: "18:45", status: "Arrivé au centre de tri", location: "Paris" },
        { date: "12/04/2023", time: "10:30", status: "En transit", location: "Lyon" },
        { date: "11/04/2023", time: "16:20", status: "Colis pris en charge", location: "Bordeaux" },
      ],
    },
  },
  {
    id: "CMD-2023-002",
    date: "02/05/2023",
    status: "in-transit",
    statusLabel: "En transit",
    total: 405,
    items: [
      {
        id: 3,
        name: "Lampe Aurore",
        price: 320,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      },
      {
        id: 8,
        name: "Coussin Tissé",
        price: 85,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
      },
    ],
    tracking: {
      number: "TRK987654321",
      carrier: "Colissimo",
      events: [
        { date: "04/05/2023", time: "11:20", status: "En transit", location: "Lyon" },
        { date: "03/05/2023", time: "16:45", status: "Colis pris en charge", location: "Marseille" },
      ],
    },
  },
  {
    id: "CMD-2023-003",
    date: "18/05/2023",
    status: "processing",
    statusLabel: "En préparation",
    total: 590,
    items: [
      {
        id: 1,
        name: "Fauteuil Élégance",
        price: 590,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1158&q=80",
      },
    ],
    tracking: null,
  },
]

export default function OrdersPage() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  const filteredOrders = orders.filter((order) => {
    // Filtrer par statut si nécessaire
    if (activeTab !== "all" && order.status !== activeTab) {
      return false
    }

    // Filtrer par terme de recherche
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      return (
        order.id.toLowerCase().includes(searchLower) ||
        order.items.some((item) => item.name.toLowerCase().includes(searchLower))
      )
    }

    return true
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "in-transit":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-neutral-100 text-neutral-800"
    }
  }

  return (
    <main className="min-h-screen pt-20">
      <section className="container px-4 py-16 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
          <AccountSidebar />

          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-medium">Mes Commandes</h1>
              <p className="text-neutral-600">Suivez l'état de vos commandes et consultez votre historique d'achats</p>
            </div>

            <div className="p-6 bg-white border rounded-lg shadow-sm">
              <div className="flex flex-col justify-between gap-4 mb-6 sm:flex-row sm:items-center">
                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
                  <TabsList className="grid w-full grid-cols-3 sm:w-auto">
                    <TabsTrigger value="all">Toutes</TabsTrigger>
                    <TabsTrigger value="in-transit">En cours</TabsTrigger>
                    <TabsTrigger value="delivered">Livrées</TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="relative">
                  <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-neutral-400" />
                  <Input
                    placeholder="Rechercher une commande..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 rounded-full"
                  />
                </div>
              </div>

              {filteredOrders.length === 0 ? (
                <div className="p-8 text-center">
                  <Package className="w-12 h-12 mx-auto mb-4 text-neutral-300" />
                  <h3 className="mb-2 text-lg font-medium">Aucune commande trouvée</h3>
                  <p className="text-neutral-500">
                    {searchTerm
                      ? `Aucune commande ne correspond à "${searchTerm}"`
                      : "Vous n'avez pas encore de commande dans cette catégorie"}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="overflow-hidden border rounded-lg"
                    >
                      <div
                        className="flex flex-col items-start justify-between p-4 cursor-pointer sm:flex-row sm:items-center"
                        onClick={() => toggleOrderDetails(order.id)}
                      >
                        <div className="mb-2 sm:mb-0">
                          <div className="flex items-center">
                            <h3 className="mr-2 font-medium">{order.id}</h3>
                            <Badge className={getStatusColor(order.status)}>{order.statusLabel}</Badge>
                          </div>
                          <p className="text-sm text-neutral-500">Commandé le {order.date}</p>
                        </div>
                        <div className="flex items-center w-full sm:w-auto">
                          <p className="mr-4 font-medium">{order.total} €</p>
                          {expandedOrder === order.id ? (
                            <ChevronUp className="w-5 h-5 text-neutral-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-neutral-400" />
                          )}
                        </div>
                      </div>

                      {expandedOrder === order.id && (
                        <div className="p-4 border-t">
                          <h4 className="mb-3 font-medium">Produits</h4>
                          <div className="space-y-4">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex items-center">
                                <div className="relative w-16 h-16 mr-4 overflow-hidden rounded-md">
                                  <Image
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h5 className="font-medium">{item.name}</h5>
                                  <p className="text-sm text-neutral-500">
                                    {item.price} € x {item.quantity}
                                  </p>
                                </div>
                                <Link href={`/produits/${item.id}`}>
                                  <Button variant="outline" size="sm" className="rounded-full">
                                    Voir le produit
                                  </Button>
                                </Link>
                              </div>
                            ))}
                          </div>

                          {order.tracking && (
                            <div className="mt-6">
                              <div className="flex items-center mb-3">
                                <Truck className="w-5 h-5 mr-2 text-neutral-500" />
                                <h4 className="font-medium">Suivi de livraison</h4>
                              </div>
                              <p className="mb-2 text-sm">
                                <span className="text-neutral-500">Transporteur:</span> {order.tracking.carrier}
                              </p>
                              <p className="mb-4 text-sm">
                                <span className="text-neutral-500">Numéro de suivi:</span> {order.tracking.number}
                              </p>

                              <div className="relative pl-6 border-l-2 border-neutral-200">
                                {order.tracking.events.map((event, index) => (
                                  <div
                                    key={index}
                                    className={`mb-4 ${index === 0 ? "text-neutral-900" : "text-neutral-500"}`}
                                  >
                                    <div
                                      className={`absolute w-3 h-3 rounded-full -left-[7px] ${
                                        index === 0 ? "bg-neutral-900 ring-4 ring-neutral-100" : "bg-neutral-300"
                                      }`}
                                      style={{ top: `${index * 4 + 0.5}rem` }}
                                    ></div>
                                    <p className="text-sm font-medium">{event.status}</p>
                                    <p className="text-xs">
                                      {event.date} à {event.time} • {event.location}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="flex justify-between mt-6">
                            <Button variant="outline" className="rounded-full">
                              Contacter le support
                            </Button>
                            {order.status === "delivered" && (
                              <Button className="rounded-full bg-neutral-900 hover:bg-neutral-800">
                                Laisser un avis
                              </Button>
                            )}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

"use client";

import { motion } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Truck, CheckCircle2, Clock } from "lucide-react"
import iphone13 from '@/components/iphone13.png';
import samsung from '@/components/samsungs21.png';
import m1 from '@/components/macbookm1.png';
import { NavBar } from "@/components/nav-bar"
import ProtectedRoute from "@/context/ProtectedRoute";

const orders = [
  {
    id: "ORD-2024-001",
    date: "2024-02-20",
    status: "Delivered",
    total: 599,
    items: [
      {
        id: 1,
        title: "Refurbished iPhone 13",
        price: 599,
        image: iphone13,
        quantity: 1,
      },
    ],
    shippingAddress: "123 Green Street, Eco City, EC 12345",
  },
  {
    id: "ORD-2024-002",
    date: "2024-02-22",
    status: "In Transit",
    total: 1248,
    items: [
      {
        id: 2,
        title: "MacBook Air M1",
        price: 799,
        image: m1,
        quantity: 1,
      },
      {
        id: 3,
        title: "Samsung Galaxy S21",
        price: 449,
        image: samsung,
        quantity: 1,
      },
    ],
    shippingAddress: "456 Sustainable Ave, Green Town, GT 67890",
  },
  {
    id: "ORD-2024-003",
    date: "2024-02-24",
    status: "Processing",
    total: 449,
    items: [
      {
        id: 3,
        title: "Samsung Galaxy S21",
        price: 449,
        image: samsung,
        quantity: 1,
      },
    ],
    shippingAddress: "789 Eco Lane, Nature City, NC 54321",
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Delivered":
      return <CheckCircle2 className="w-4 h-4" />
    case "In Transit":
      return <Truck className="w-4 h-4" />
    case "Processing":
      return <Clock className="w-4 h-4" />
    default:
      return <Package className="w-4 h-4" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Delivered":
      return "bg-green-500"
    case "In Transit":
      return "bg-blue-500"
    case "Processing":
      return "bg-yellow-500"
    default:
      return "bg-gray-500"
  }
}

export default function OrdersPage() {

  return (
    <ProtectedRoute>
    <NavBar />
    <section className="min-h-screen bg-gray-50 py-8 px-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base font-medium">Order {order.id}</CardTitle>
                  <Badge className={`${getStatusColor(order.status)} text-white flex items-center gap-1 text-xs`}>
                    {getStatusIcon(order.status)}
                    {order.status}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="text-sm text-muted-foreground">
                      Ordered on {new Date(order.date).toLocaleDateString()}
                    </div>
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <motion.div
                          key={item.id}
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative h-12 w-12 overflow-hidden rounded-md shrink-0">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-sm truncate">{item.title}</h3>
                              <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                            <div className="font-medium text-sm">₹{item.price}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="rounded-lg bg-muted p-3 space-y-2 text-sm">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium">Shipping Address:</span>
                        <span className="text-xs text-muted-foreground">{order.shippingAddress}</span>
                      </div>
                      <div className="flex justify-between font-medium pt-2 border-t">
                        <span>Total:</span>
                        <span>₹{order.total}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
    </ProtectedRoute>
  )
}
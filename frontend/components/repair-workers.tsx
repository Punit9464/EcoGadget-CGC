'use client'

import { motion } from "framer-motion"
import Image from "next/image"
import { Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const repairWorkers = [
  {
    id: 1,
    name: "Tech Expert",
    rating: 4.8,
    reviews: 156,
    specialties: ["Smartphones", "Laptops"],
    image: "/placeholder.svg?height=100&width=100",
    available: true
  },
  {
    id: 2,
    name: "Gadget Pro",
    rating: 4.9,
    reviews: 203,
    specialties: ["Gaming Consoles", "TVs"],
    image: "/placeholder.svg?height=100&width=100",
    available: true
  },
  {
    id: 3,
    name: "Circuit Master",
    rating: 4.7,
    reviews: 128,
    specialties: ["Audio Equipment", "Tablets"],
    image: "/placeholder.svg?height=100&width=100",
    available: false
  }
]

export function RepairWorkers() {
  return (
    <section className="p-20 bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Expert Repair Workers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our certified technicians are ready to help with your device repairs. Book a home visit or schedule a repair at your convenience.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repairWorkers.map((worker, index) => (
            <motion.div
              key={worker.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden">
                      <Image
                        src={worker.image || "/placeholder.svg"}
                        alt={worker.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{worker.name}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{worker.rating}</span>
                        <span className="text-gray-500">({worker.reviews} reviews)</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {worker.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t">
                  <Button className="w-full" disabled>
                  Currently Unavailable
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


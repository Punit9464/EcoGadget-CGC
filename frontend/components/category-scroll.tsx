'use client'

import { Laptop, Smartphone, Watch, Headphones, Tv, Camera, Printer, TabletSmartphone, Speaker, Gamepad } from 'lucide-react'
import { motion } from "framer-motion"

import { Card } from "@/components/ui/card"

const categories = [
  { name: "Laptops", icon: Laptop },
  { name: "Smartphones", icon: Smartphone },
  { name: "Smartwatches", icon: Watch },
  { name: "Headphones", icon: Headphones },
  { name: "TVs", icon: Tv },
  { name: "Cameras", icon: Camera },
  { name: "Printers", icon: Printer },
  { name: "Tablets", icon: TabletSmartphone },
  { name: "Speakers", icon: Speaker },
  { name: "Gaming", icon: Gamepad },
]

export function CategoryScroll() {

  return (
    <div className="px-20 pb-20 bg-white">
      <div className="container">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="flex flex-col items-center justify-center p-4 h-full cursor-pointer transition-transform hover:scale-105">
                <category.icon className="h-8 w-8 mb-2 text-green-600" />
                <span className="text-sm font-medium text-center">{category.name}</span>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}


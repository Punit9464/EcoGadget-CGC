"use client"

import { motion } from "framer-motion"
import { NavBar } from "@/components/nav-bar"
import { RentDeviceForm } from "@/components/rent-device-form"
import { GiveDeviceForm } from "@/components/give-device-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import ProtectedRoute from "@/context/ProtectedRoute"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function BorrowPage() {

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main>
        <section className="relative overflow-hidden bg-gradient-to-b from-green-50 to-white py-24">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4ade8030_1px,transparent_1px),linear-gradient(to_bottom,#4ade8030_1px,transparent_1px)] bg-[size:14px_24px]" />
          </div>
          <div className="container mx-auto px-4">
            <motion.div initial="initial" animate="animate" variants={fadeInUp} className="text-center">
              <h1 className="text-4xl font-bold mb-6">
                EcoGadget <span className="text-green-600">Borrow</span>
              </h1>
              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                Rent the latest tech or earn by sharing your devices. Join our community of eco-conscious gadget
                enthusiasts.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div initial="initial" animate="animate" variants={fadeInUp} className="max-w-4xl mx-auto">
              <Card className="overflow-hidden shadow-lg">
                <Tabs defaultValue="rent" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="rent" className="text-lg py-4 data-[state=active]:bg-green-50">
                      Rent a Device
                    </TabsTrigger>
                    <TabsTrigger value="give" className="text-lg py-4 data-[state=active]:bg-green-50">
                      Give Your Device for Rent
                    </TabsTrigger>
                  </TabsList>
                  <CardContent className="p-6">
                    <TabsContent value="rent">
                      <RentDeviceForm />
                    </TabsContent>
                    <TabsContent value="give">
                      <GiveDeviceForm />
                    </TabsContent>
                  </CardContent>
                </Tabs>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
    </ProtectedRoute>
  )
}


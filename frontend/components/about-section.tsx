"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Leaf, Recycle, Shield, Zap, BarChart, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import eco from './eco.png';
import eco3 from './eco3.png';
import eco4 from './eco4.png';
import * as React from 'react';

interface SectionProps {
  learnMoreRef: React.RefObject<HTMLElement>
}


export function AboutSection({ learnMoreRef }: SectionProps ) {
  const stats = [
    {
      value: "Soon to be reflected",
      label: "Devices Recycled",
      description: "Keeping electronics out of landfills",
      icon: Recycle,
    },
    {
      value: "Soon to be reflected",
      label: "Happy Users",
      description: "Building a sustainable community",
      icon: Users,
    },
    {
      value: "Soon to be reflected",
      label: "User Savings",
      description: "Making technology affordable",
      icon: BarChart,
    },
  ]

  const features = [
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "Every refurbished device saves up to 100kg of CO₂ emissions",
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "Rigorous 40-point quality check on all devices",
    },
    {
      icon: Zap,
      title: "Extended Life",
      description: "Professional repairs add years to device lifespans",
    },
  ]

  return (
    <section ref={learnMoreRef} className="relative overflow-hidden bg-gradient-to-b from-green-50 via-white to-white py-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4ade8030_1px,transparent_1px),linear-gradient(to_bottom,#4ade8030_1px,transparent_1px)] bg-[size:14px_24px]" />
      </div>

      <div className="container px-4 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-green-100 rounded-full blur-3xl" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-100 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="text-4xl font-bold tracking-tight mb-6">
                Revolutionizing
                <span className="block text-green-600">Electronics Consumption</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We&apos;re not just another marketplace - we&apos;re building a sustainable future for electronics. Through our
                innovative platform, we&apos;re transforming how people buy, use, and recycle technology.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="flex items-center gap-4 mb-2">
                      <div className="p-2 rounded-lg bg-green-100">
                        <feature.icon className="w-5 h-5 text-green-600" />
                      </div>
                      <h3 className="font-semibold">{feature.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 pl-[52px]">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Image
                  src={eco}
                  alt="Refurbished devices"
                  width={250}
                  height={300}
                  className="rounded-lg shadow-xl"
                />
                <Image
                  src={eco3}
                  alt="Quality testing"
                  width={250}
                  height={200}
                  className="rounded-lg shadow-xl"
                />
              </div>
              <div className="pt-8">
                <Image
                  src={eco4}
                  alt="Sustainable packaging"
                  width={250}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -translate-y-16 translate-x-16" />
                  <stat.icon className="w-8 h-8 text-green-600 mb-4" />
                  <div className="text-4xl font-bold text-green-600 mb-2">{stat.value}</div>
                  <div className="font-medium mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-600">{stat.description}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-20 relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8 md:p-12"
        >
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Join Our Green Revolution</h3>
            <p className="text-green-50 max-w-2xl">
              Every device you buy, sell, or borrow through EcoGadget contributes to reducing e-waste and building a
              more sustainable future. Together, we can make a difference.
            </p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24" />
        </motion.div>
      </div>
    </section>
  )
}


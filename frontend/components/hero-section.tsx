'use client'

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, Recycle, DollarSign, Clock, Shield } from 'lucide-react'
import { Button } from "@/components/ui/button"
import eco2 from './eco2.png';
import React from "react"

interface PropsTypes {
  sectionRef: React.RefObject<HTMLElement>,
  learnMoreRef: React.RefObject<HTMLElement>
}


export function HeroSection({ sectionRef, learnMoreRef }: PropsTypes) {

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  const features = [
    {
      icon: Recycle,
      title: "Sustainable",
      description: "Reducing e-waste through circular economy"
    },
    {
      icon: DollarSign,
      title: "Cost-Effective",
      description: "Save money on quality refurbished devices"
    },
    {
      icon: Clock,
      title: "Quick Process",
      description: "Fast turnaround on all services"
    },
    {
      icon: Shield,
      title: "Guaranteed",
      description: "All devices tested and certified"
    }
  ]

  const handleScroll = () => {
    sectionRef?.current?.scrollIntoView({ behavior: "smooth" });
  }

  const handleLearnMoreScroll = () => {
    learnMoreRef?.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-green-50 to-white">
      <div className="relative pt-16 pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <motion.div 
              className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1>
                <span className="block text-sm font-semibold uppercase tracking-wide text-green-600">
                  Welcome to the future
                </span>
                <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                  <span className="block text-gray-900">Sustainable Technology</span>
                  <span className="block text-green-600">for a Better Tomorrow</span>
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Join our mission to revolutionize the electronics industry through sustainable practices, 
                making technology accessible while protecting our planet.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto lg:mx-0">
                <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-4">
                  <Button onClick={handleScroll} size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button onClick={handleLearnMoreScroll} size="lg" variant="outline" className="w-full sm:w-auto">
                    Learn More
                  </Button>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="relative block w-full rounded-lg overflow-hidden">
                  <Image
                    src={eco2}
                    alt="Sustainable technology"
                    width={600}
                    height={400}
                    className="w-full rounded-lg"
                  />
                  <div className="absolute inset-0 bg-green-600 mix-blend-multiply opacity-20" />
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="mt-24 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{
              initial: { opacity: 0 },
              animate: {
                opacity: 1,
                transition: {
                  delayChildren: 0.3,
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative"
              >
                <div className="absolute flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                  <feature.icon className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4ade8030_1px,transparent_1px),linear-gradient(to_bottom,#4ade8030_1px,transparent_1px)] bg-[size:14px_24px]" />
      </div>
    </section>
  )
}


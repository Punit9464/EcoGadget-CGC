"use client";

import { NavBar } from "@/components/nav-bar"
import { HeroSection } from "@/components/hero-section"
import { FeaturedDeals } from "@/components/featured-deals"
import { AboutSection } from "@/components/about-section"
import { RepairWorkers } from "@/components/repair-workers"
import { ContactSection } from "@/components/contact-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRef } from "react"

export default function Home() {
  const sectionRef = useRef(null);

  const learnMoreRef = useRef(null);

  return (
    <div className="min-h-screen">
      <NavBar />
      <main>
        <HeroSection sectionRef={sectionRef} learnMoreRef={learnMoreRef} />
        <FeaturedDeals sectionRef={sectionRef} />
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 pt-2">
            <h2 className="text-3xl font-bold mb-8 text-center">Borrow Devices</h2>
            <p className="text-xl text-center mb-12 text-gray-600">
              Rent the latest tech or earn by sharing your devices
            </p>
            <div className="flex justify-center space-x-8">
              <Link href="/borrow?tab=rent">
                <Button size="lg">Rent a Device</Button>
              </Link>
              <Link href="/borrow?tab=give">
                <Button size="lg" variant="outline">
                  Give Your Device for Rent
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <AboutSection learnMoreRef={learnMoreRef} />
        <RepairWorkers />
        <ContactSection />
      </main>
    </div>
  )
}


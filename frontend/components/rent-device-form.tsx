"use client"

import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image, { StaticImageData } from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPinIcon, CalendarIcon, Search } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import mac from '@/components/macbookm1.png';
import sam from '@/components/samsungs21.png';
import iphone from '@/components/iphone13.png';
import axios from 'axios';
import Link from "next/link"

const images = [iphone, sam, mac];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

type DeviceType = {
  _id: string
  deviceName: string
  images: StaticImageData[]
  description: string
  name: string
  deviceType: string
  dailyRate: string
  location: string
  availableFrom: string
  availableTo: string
  termsAgreed: boolean
  deviceImages: string[]
}

export function RentDeviceForm() {

  const [devices, setDevices] = useState<DeviceType[]>([]);

  useEffect(() => {
    const fetchDevices = async() => {
      const ds = await axios.get("https://ecogadget.onrender.com/rent/devices");

      const result = ds.data;
      result.devices.forEach((device: DeviceType) => {
        device.images = [images[Math.floor(Math.random() * images.length)]];
        setDevices((prevData) => [...prevData, device]);
      });
    }

    fetchDevices();
  }, []);

  const [searchParams, setSearchParams] = useState({
    deviceType: "",
    location: "",
    startDate: "",
    endDate: "",
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSearchParams((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="space-y-8">
      <motion.form
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        onSubmit={handleSearch}
        className="space-y-6"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="deviceType">Device Type</Label>
            <Select
              value={searchParams.deviceType}
              onValueChange={(value) => setSearchParams((prev) => ({ ...prev, deviceType: value }))}
            >
              <SelectTrigger id="deviceType">
                <SelectValue placeholder="Select device type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="smartphone">Smartphone</SelectItem>
                <SelectItem value="laptop">Laptop</SelectItem>
                <SelectItem value="camera">Camera</SelectItem>
                <SelectItem value="tablet">Tablet</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={searchParams.location}
              onChange={handleInputChange}
              placeholder="Enter your location"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              value={searchParams.startDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input id="endDate" name="endDate" type="date" value={searchParams.endDate} onChange={handleInputChange} />
          </div>
        </div>
        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
          <Search className="w-4 h-4 mr-2" />
          Search Devices
        </Button>
      </motion.form>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {devices.map((device, index) => (
          <motion.div
            key={device._id}
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden h-full flex flex-col">
              <CardHeader className="p-0">
                <Carousel className="w-full">
                  <CarouselContent>
                    {device.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${device.name} - Image ${index + 1}`}
                          width={300}
                          height={300}
                          className="w-full h-48 object-cover"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                <CardTitle className="mb-2">{device.deviceName}</CardTitle>
                <p className="text-sm text-gray-600 mb-4">{device.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                  
                  <div className="flex items-center">
                    <MapPinIcon className="w-4 h-4 mr-1" />
                    <span>{device.location}</span>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <CalendarIcon className="w-4 h-4 mr-1" />
                  <span className="mr-3">Available Now</span>
                  <span>30% Security fee+2% platform fee</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center bg-gray-50 p-4">
                <span className="text-2xl font-bold text-green-600">₹{device.dailyRate}/day</span>
                <Link href={`/borrow/device/${device._id}`} className="px-4 py-2 rounded-lg text-white bg-green-600 hover:bg-green-700">Rent Now</Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}


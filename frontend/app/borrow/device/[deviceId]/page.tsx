"use client"

import * as React from "react"
import Image from "next/image"
import { format } from "date-fns"
import axios from 'axios';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { useParams } from "next/navigation"
import iphone from '@/components/iphone13.png';
import sam from '@/components/samsungs21.png';
import mac from '@/components/macbookm1.png';
import { NavBar } from "@/components/nav-bar"
import ProtectedRoute from "@/context/ProtectedRoute"

const images = [iphone, sam, mac];

type DeviceData = {
  dailyRate: number
  deviceName: string
  description: string
  deviceType: string
  location: string
  availableFrom: string
  availableTo: string
  termsAgreed: boolean
  deviceImages: string[]
  images: string[]
}

export default function RentPage() {
  const [loading, setLoading] = React.useState(true);
  const [selectedImage, setSelectedImage] = React.useState(0)
  const [agreed, setAgreed] = React.useState(false)

  const { deviceId } = useParams();

  const [deviceData, setDeviceData] = React.useState<DeviceData | null>(null);

  const handleRentClick = async (e: React.MouseEvent) => {

    let amount: string | number = deviceData!.dailyRate!;
    if (typeof amount != 'number') amount = parseFloat(amount);
    amount += (32 / 100) * amount;
    amount = amount.toFixed(2).toString();

    amount = amount.split(".")[0] + amount.split(".")[1];
    amount = Number(amount);

    const currency = "INR";

    const result = await axios({
      method: "post",
      data: { amount, currency },
      url: "https://ecogadget.onrender.com/orders/create"
    });

    const response = result.data;

    const options = {
      "key": response.key,
      "amount": response.amount,
      "currency": "INR",
      "name": "EcoGadget",
      "order_id": response.id,
      "callback_url": "http://localhost:3000/orders",
    };

    if (typeof window !== 'undefined' && 'Razorpay' in window) {
      const RazorpayConstructor = (window).Razorpay;
      const rzp1 = new RazorpayConstructor(options);
      rzp1.open();
    }

    e.preventDefault();
  }

  React.useEffect(() => {


    if (!deviceId) return;

    const fetchDevice = async () => {
      const result = await axios.get(`https://ecogadget.onrender.com/rent/devices/${deviceId}`);
      const response = result.data;

      const { device } = response;
      device.images = [images[Math.floor(Math.random() * images.length)]];
      setDeviceData(device);
      setLoading(false);
    }

    fetchDevice();

  }, [deviceId]);


  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <Skeleton className="h-[400px] w-full rounded-lg" />
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-lg" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-10 w-1/2" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg border">
              <Image
                src={deviceData!.images![selectedImage] || "/placeholder.svg"}
                alt={deviceData!.deviceName}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {deviceData!.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "relative aspect-square overflow-hidden rounded-lg border",
                    selectedImage === index && "ring-2 ring-primary",
                  )}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${deviceData!.deviceName} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{deviceData!.deviceName}</h1>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="secondary">{deviceData!.deviceType}</Badge>
                <Badge variant="outline">{deviceData!.location}</Badge>
              </div>
            </div>

            <p className="text-lg text-muted-foreground">{deviceData!.description}</p>

            <div className="space-y-4 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Daily Rate</span>
                <span className="text-xl font-bold">₹ {deviceData!.dailyRate}</span>
              </div>
              <span className="text-muted-foreground ml-[375px]">excluding 30% Security fee</span>
              <span className="text-muted-foreground ml-[375px]"> + 2% Platform fee</span>


              <div className="flex items-start space-x-2">
                <Checkbox id="terms" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} />
                <label
                  htmlFor="terms"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the rental terms and conditions
                </label>
              </div>

              <Button onClick={handleRentClick} className="w-full" disabled={!agreed}>
                Rent Now
              </Button>
            </div>

            <div className="space-y-2 rounded-lg border p-4">
              <h3 className="font-semibold">Availability</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Available From</span>
                  <p>{format(new Date(deviceData!.availableFrom), "PPP")}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Available To</span>
                  <p>{format(new Date(deviceData!.availableTo), "PPP")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
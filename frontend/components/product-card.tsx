'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import { useState} from 'react'
import { StarRating } from './star-rating'
import { Button } from '@/components/ui/button'
import axios from 'axios'

interface ProductCardProps {
  _id: string
  productName: string
  image: string
  price: number
  rating: number
  condition: string
  warranty: string
}

export function ProductCard({
  productName,
  image,
  price,
  rating,
  condition,
  warranty
}: ProductCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div className="relative aspect-square">
        <Image
          src={image || "/placeholder.svg"}
          alt={productName}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="pt-3 p-4 space-y-3 pb-5">
        <h3 className="font-bold text-lg">{productName}</h3>
        <StarRating rating={rating} />

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold">₹{price}</span>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <p>Condition: {condition}</p>
          <p>Warranty: {warranty / 12} Years</p>
        </div>

        <div className="flex gap-2">
          <Button
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black" onClick={async (e) => {
              let amount: number | string = price.toString();
              amount = parseFloat(amount);
              amount = amount.toFixed(2).toString();
              amount = amount.split(".")[0] + amount.split(".")[1];
              amount = Number(amount);

              const response1 = await axios.post("https://ecogadget.onrender.com/orders/create", {
                amount, currency: "INR"
              });

              const options: RazorpayOptions = {
                "key": response1.data.key,
                "amount": response1.data.amount,
                "currency": "INR",
                "name": "EcoGadget",
                "order_id": response1.data.id,
                "callback_url": "/orders"
              };
              if(typeof window != 'undefined' && 'Razorpay' in window) {
                const RazorpayConstructor = (window).Razorpay;
                const rzp1 = new RazorpayConstructor(options);
                rzp1.open();
              }
              e.preventDefault();
            }}>
            Buy Now
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={isSaved ? 'text-red-600' : ''}
            onClick={() => setIsSaved(!isSaved)}
          >
            <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

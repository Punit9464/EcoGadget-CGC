'use client'

import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  maxRating?: number
  reviewCount?: number
  className?: string
}

export function StarRating({ rating, maxRating = 5, reviewCount, className = '' }: StarRatingProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex">
        {[...Array(maxRating)].map((_, index) => {
          const filled = index < Math.floor(rating)
          const halfFilled = index === Math.floor(rating) && rating % 1 !== 0

          return (
            <Star
              key={index}
              className={`w-4 h-4 ${
                filled
                  ? 'fill-yellow-400 text-yellow-400'
                  : halfFilled
                  ? 'fill-yellow-400/50 text-yellow-400'
                  : 'fill-gray-200 text-gray-200'
              }`}
            />
          )
        })}
      </div>
      {reviewCount !== undefined && (
        <span className="text-sm text-gray-600">({reviewCount})</span>
      )}
    </div>
  )
}


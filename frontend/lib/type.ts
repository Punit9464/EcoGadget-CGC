export type Product = {
    id: number
    name: string
    productName: string
    productType: string
    category: string
    price: number
    stock: number
    status: string
    description?: string
    condition?: string
    images?: string[]
    featured?: boolean
    date?: string
  }
  
  export type SellingRequest = {
    id: number
    user: string
    device: string
    condition: string
    description: string
    images: string[]
    status: "Pending" | "Approved" | "Rejected"
    date: string
    userEmail?: string
    userPhone?: string
    decision?: "refurbish" | "recycle" | "reject"
    logisticsPartner?: number
    notes?: string
    model: string
    askingPrice: number
  }
  
  export type LogisticsPartner = {
    id: number
    name: string
    rating: number
    email?: string
    phone?: string
    address?: string
  }
  
  
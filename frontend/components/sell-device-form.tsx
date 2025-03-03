'use client'

import { ChangeEvent, useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import axios from 'axios'
import Swal from 'sweetalert2'

export function SellDeviceForm() {

  const [formData, setFormData] = useState({
    deviceType: '',
    brand: '',
    model: '',
    condition: '',
    description: '',
    askingPrice: ''
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
 
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.askingPrice || !formData.brand || !formData.condition || !formData.description || !formData.deviceType || !formData.model) {
      await Swal.fire({
        title: "Invalid Credentials",
        icon: 'warning',
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
      });

      setFormData({
        deviceType: '',
        brand: '',
        model: '',
        condition: '',
        description: '',
        askingPrice: ''
      });

      return;
    }
    
    const result = await axios({
      method: "post",
      data: formData,
      url: "https://ecogadget.onrender.com/sell",
    });

    const response = result.data;

    await Swal.fire({
      title: response.msg,
      icon: response.success ? 'success' : 'error',
      showConfirmButton: true,
      position: 'center'
    });

    setFormData({
      deviceType: '',
      brand: '',
      model: '',
      condition: '',
      description: '',
      askingPrice: '',
    });

    return;
  }

  

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
      onSubmit={handleSubmit}
    >
      <div className="space-y-2">
        <Label htmlFor="deviceType">Device Type</Label>
        <Select
          name="deviceType"
          value={formData.deviceType}
          onValueChange={(value) => setFormData(prevState => ({ ...prevState, deviceType: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select device type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="smartphone">Smartphone</SelectItem>
            <SelectItem value="laptop">Laptop</SelectItem>
            <SelectItem value="tablet">Tablet</SelectItem>
            <SelectItem value="desktop">Desktop</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="brand">Brand</Label>
        <Input
          id="brand"
          name="brand"
          value={formData.brand}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="model">Model</Label>
        <Input
          id="model"
          name="model"
          value={formData.model}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="condition">Condition</Label>
        <Select
          id="condition"
          name="condition"
          value={formData.condition}
          onValueChange={(value) => setFormData(prevState => ({ ...prevState, condition: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select device condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="like-new">Like New</SelectItem>
            <SelectItem value="excellent">Excellent</SelectItem>
            <SelectItem value="good">Good</SelectItem>
            <SelectItem value="fair">Fair</SelectItem>
            <SelectItem value="poor">Poor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
      </div>


      <div className="space-y-2">
        <Label htmlFor="askingPrice">Asking Price (₹)</Label>
        <Input
          id="askingPrice"
          name="askingPrice"
          type="number"
          value={formData.askingPrice}
          onChange={handleInputChange}
          required
        />
      </div>

      <Button type="submit" className="w-full">Submit Device for Sale</Button>
    </motion.form>
  )
}


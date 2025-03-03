"use client"

import { ChangeEvent, FormEvent, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload } from "lucide-react"
import axios from "axios"
import Swal from "sweetalert2"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export function GiveDeviceForm() {
  const [formData, setFormData] = useState({
    deviceName: "",
    deviceType: "",
    description: "",
    dailyRate: "",
    location: "",
    availableFrom: "",
    availableTo: "",
    termsAgreed: false,
    deviceImages: [],
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleFileUpload = () => { return; }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const result = await axios({
      method: "post",
      url: 'https://ecogadget.onrender.com/borrow/give',
      data: formData
    });

    const response = result.data;

    await Swal.fire({
      toast: false,
      timer: 2000,
      timerProgressBar: true,
      showCancelButton: false,
      title: response.msg,
      icon: response.success ? 'success' : 'warning'
    });

    setFormData({
      deviceName: "",
      deviceType: "",
      description: "",
      dailyRate: "",
      location: "",
      availableFrom: "",
      availableTo: "",
      termsAgreed: false,
      deviceImages: [],
    });

    return;
  }

  return (
    <motion.form initial="initial" animate="animate" variants={fadeInUp} className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="deviceName">Device Name</Label>
          <Input id="deviceName" name="deviceName" value={formData.deviceName} onChange={handleInputChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="deviceType">Device Type</Label>
          <Select
            value={formData.deviceType}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, deviceType: value }))}
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
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Device Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleTextChange}
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dailyRate">Daily Rate ($)</Label>
          <Input
            id="dailyRate"
            name="dailyRate"
            type="number"
            value={formData.dailyRate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" value={formData.location} onChange={handleInputChange} required />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="availableFrom">Available From</Label>
          <Input
            id="availableFrom"
            name="availableFrom"
            type="date"
            value={formData.availableFrom}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="availableTo">Available To</Label>
          <Input
            id="availableTo"
            name="availableTo"
            type="date"
            value={formData.availableTo}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="deviceImages">Device Images</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors duration-300">
          <Input
            id="deviceImages"
            name="deviceImages"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            required
            className="hidden"
          />
          <Label htmlFor="deviceImages" className="cursor-pointer">
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <span className="text-sm text-gray-600">Click to upload or drag and drop</span>
            <span className="block mt-2 text-xs text-gray-500">
              Upload up to 5 images of your device (max 5MB each)
            </span>
          </Label>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="termsAgreed"
          checked={formData.termsAgreed}
          onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, termsAgreed: !checked }))}
        />
        <Label htmlFor="termsAgreed" className="text-sm text-gray-600">
          I agree to the terms and conditions
        </Label>
      </div>

      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={!formData.termsAgreed}>
        List Your Device
      </Button>
    </motion.form>
  )
}


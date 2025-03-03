'use client'

import { motion } from "framer-motion"
import { ChangeEvent, FormEvent, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from "axios"
import Swal from "sweetalert2"

export function RepairForm() {

  const [formData, setFormData] = useState({
    deviceType: '',
    brand: '',
    issue: '',
    partsRequired: '',
    date: '',
    time: '',
    address: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value }
    });
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const result = await axios({
      method: "post",
      url: "https://ecogadget.onrender.com/repair",
      data: formData
    });

    const response = result.data;

    await Swal.fire({
      toast: false,
      icon: response.success ? 'success' : 'error',
      title: response.msg,
      showConfirmButton: true,
      position: 'center',
      timer: 2000
    });

    setFormData({
      deviceType: '',
      brand: '',
      issue: '',
      partsRequired: '',
      date: '',
      time: '',
      address: ''
    });

    return;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Schedule a Repair</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="device-type">Device Type</Label>
                      <Select value={formData.deviceType} onValueChange={(val) => setFormData((prevVal)=> ({ ...prevVal, deviceType: val}))}>
                        <SelectTrigger id="device-type">
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
                      <Input name="brand" value={formData.brand} onChange={handleChange} id="brand" placeholder="Enter device brand" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="issue">Describe the Issue</Label>
                    <Textarea
                      name="issue"
                      value={formData.issue}
                      onChange={handleChange}
                      id="issue"
                      placeholder="Please describe the problem with your device"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Parts Required</Label>
                    <RadioGroup
                      defaultValue={formData.partsRequired}
                      onValueChange={(value) => setFormData((prevVal) => ({ ...prevVal, partsRequired: value }))}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="need-parts" id="need-parts" />
                        <Label htmlFor="need-parts">I need parts from EcoGadget</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="have-parts" id="have-parts" />
                        <Label htmlFor="have-parts">I have my own parts</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="unsure" id="unsure" />
                        <Label htmlFor="unsure">Not sure</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Preferred Date</Label>
                      <Input name="date" value={formData.date} onChange={handleChange} id="date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Preferred Time</Label>
                      <Input id="time" value={formData.time} name="time" onChange={handleChange} type="time" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Service Address</Label>
                    <Textarea
                      id="address"
                      placeholder="Enter your complete address"
                      className="min-h-[80px]"
                      value={formData.address}
                      name="address"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Schedule Repair
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}


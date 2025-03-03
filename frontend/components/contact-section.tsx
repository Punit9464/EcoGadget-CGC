'use client'

import { motion } from "framer-motion"
import { Mail, MapPin, Phone, Clock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { ChangeEvent, FormEvent, useState } from "react"
import Swal from "sweetalert2";
import axios from "axios"


export function ContactSection() {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value
      }
    });
  }

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value
      }
    });
  }

  const handleSubmit = async(e: FormEvent)=>{
    e.preventDefault();
    if(!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message){
      Swal.fire({
        text: "Fill all fields properly!",
        icon: "question"
      });
      return;
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailPattern.test(formData.email)){
      Swal.fire({
        text: "Email should be correct!",
        icon: "question"
      });
    }

    const response = await axios.post("https://ecogadget.onrender.com/contact", formData);
    if(response.data.success){
      Swal.fire({
        toast: true,
        icon: "success",
        text: "We'll soon reach you out through your email!",
        position: "top",
        timer: 5000,
        showConfirmButton: false
      });
      
    }

    setFormData({firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: ""})
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-lg text-gray-600">
            Have questions about our services? We&apos;re here to help you make sustainable choices.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardContent className="p-6">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">First Name</label>
                      <Input placeholder="John" name = "firstName" value={formData.firstName} onChange = {handleInputChange}/>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Last Name</label>
                      <Input placeholder="Doe" name = "lastName" value={formData.lastName} onChange={handleInputChange}/>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" name = "email" placeholder="john@example.com" value={formData.email} onChange={handleInputChange}/>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject</label>
                    <Input placeholder="How can we help?" name = "subject" value={formData.subject} onChange={handleInputChange}/>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <Textarea
                      placeholder="Your message..."
                      className="min-h-[150px]"
                      name = "message"
                      value={formData.message}
                      onChange={handleTextChange}
                    />
                  </div>
                  <Button type="submit" onClick={handleSubmit} className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Visit Us</h3>
                      <p className="text-sm text-gray-600">
                        123 Eco Street
                        <br />
                        San Francisco, CA 94105
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Call Us</h3>
                      <p className="text-sm text-gray-600">+91 6283425993</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Email Us</h3>
                      <p className="text-sm text-gray-600">support@ecogadget.com</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Clock className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Working Hours</h3>
                      <p className="text-sm text-gray-600">
                        Mon - Fri: 9:00 AM - 6:00 PM
                        <br />
                        Sat: 10:00 AM - 4:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

           
          </motion.div>
        </div>
      </div>
    </section>
  )
}


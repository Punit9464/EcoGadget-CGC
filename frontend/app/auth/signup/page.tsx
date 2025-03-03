'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChangeEvent, FormEvent, useState } from "react"
import Swal from 'sweetalert2';
import axios from 'axios';
import { useRouter } from "next/navigation";

export default function SignupPage() {

  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    address: ""
  });

  const router = useRouter();

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { firstName, lastName, email, password, address } = signupData;
    const username = firstName + " " + lastName;

    const result = await axios({
      method: "POST",
      url: "https://ecogadget.onrender.com/signup",
      data: { email, username, password, address }
    });

    const response = result.data;

    await Swal.fire({
      title: response.msg,
      toast: true,
      timer: 2000,
      timerProgressBar: true,
      showCancelButton: false,
      showConfirmButton: false,
      position: "top",
      icon: response.success ? "success" : "info",
      background: response.success ? "#caf5c1" : "#fccaca"
    });

    return router.push(`/auth/login`);
  }

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setSignupData((prevVal) => {
      return { ...prevVal, [e.target.name]: e.target.value };
    });
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/placeholder.svg?height=1080&width=1920')`
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card className="backdrop-blur-sm bg-white/90">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Create Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input onChange={handleChange} value={signupData.firstName} name="firstName" id="firstName" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input onChange={handleChange} value={signupData.lastName} name="lastName" id="lastName" placeholder="Doe" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input onChange={handleChange} value={signupData.email} name="email" id="email" type="email" placeholder="john@example.com" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Address<p className="muted text-[12px] inline pl-4">(You can change this anytime before placing order)</p></Label>
                <Input onChange={handleChange} value={signupData.address} name="address" id="address" type="address" placeholder="Street City, State" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input onChange={handleChange} value={signupData.password} name="password" id="password" type="password" placeholder="Create a password" required />
              </div>
              <div className="space-y-2">
                <Label>Account Type</Label>
                <RadioGroup defaultValue="user" className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="user" id="user" />
                    <Label htmlFor="user">User</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="repair-worker" id="repair-worker" />
                    <Label htmlFor="repair-worker">Repair Worker</Label>
                  </div>
                </RadioGroup>
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}


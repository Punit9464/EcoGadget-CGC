'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChangeEvent, FormEvent, useState } from "react"
import Swal from 'sweetalert2';
import axios from "axios";

export default function LoginPage() {

  const [loginData, setLoginData] = useState({
    emailOrUsername: "",
    password: ""
  });

  const handleFormSubmit = async(e: FormEvent) => {
    e.preventDefault();

    const { emailOrUsername, password } = loginData;

    if(!emailOrUsername || !password) {
      await Swal.fire({
        toast: true,
        position: "top",
        title: "Insufficient Login Credentials",
        timer: 2000,
        showDenyButton: false,
        showConfirmButton: false,
        timerProgressBar: true,
        icon: "error",
        background: "#fccaca",
        customClass: { popup: 'borderClass' }
      });

      setLoginData({ emailOrUsername: "", password: "" });

      return;
    }

    const response = await axios({
      method: "post",
      url: "https://ecogadget.onrender.com/login",
      data: { emailOrUsername, password },
      withCredentials: true
    });

    const result = response.data;

    await Swal.fire({
      title: result.msg,
      showCancelButton: false,
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      position: 'top',
      icon: result.success ? "success" : "info",
      toast: true,
      background: result.success ? '#caf5c1' : '#fccaca'
    });

    setLoginData({ emailOrUsername: '', password: '' });
    if(result.success) {
      window.location.href = "http://localhost:3000/";
    } else {
      window.location.href = "http://localhost:3000/auth/login";
    }
  }

  const handleChange = async(e: ChangeEvent<HTMLInputElement>) => {
    setLoginData((prevVal) => {
      return { ...prevVal, [e.target.name]: e.target.value }
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
            <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input onChange={handleChange} value={loginData.emailOrUsername} id="email" name="emailOrUsername" type="text" placeholder="Email or Username" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input onChange={handleChange} value={loginData.password} id="password" name="password" type="password" placeholder="Password" />
              </div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
              Forgot your password?
            </Link>
            <div className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}


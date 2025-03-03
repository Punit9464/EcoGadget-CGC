"use client";
import React, { useState, useEffect, useRef, MouseEvent } from "react";
import {
  Menu,
  User,
  CreditCard,
  Package,
  Headphones,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import axios from "axios";
import { useUser } from "../context/AuthContext.jsx";
import Swal from "sweetalert2";

export function NavBar() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showAuthOptions, setShowAuthOptions] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: globalThis.MouseEvent) {
      if (!dropdownRef || !dropdownRef.current) {
        return;
      }
      if (
        dropdownRef.current &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowAuthOptions(false);
      }
    }
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const user = useUser();

  const handleLogoutClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const result = await axios({
      method: "post",
      data: { user },
      withCredentials: true,
      url: "https://ecogadget.onrender.com/logout",
    });
    const response = result.data;

    await Swal.fire({
      toast: true,
      timer: 2000,
      timerProgressBar: true,
      title: response.msg,
      icon: response.success ? "success" : "warning",
      showConfirmButton: false,
      color: response.success ? "#bff79e" : "#f7a49e",
      position: "top",
    });

    {
      window.location.href = "http://localhost:3000/";
    }
  };

  return (
    <header className="px-10 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 justify-between items-center">
        <Button variant="ghost" className="mr-4 md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold">EcoGadget</span>
        </Link>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/buy" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  Buy
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>


            <NavigationMenuItem>
              <Link href="/sell" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  Sell
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            
            <NavigationMenuItem>
              <NavigationMenuTrigger>Borrow</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 w-[400px] md:w-[500px] lg:w-[600px]">
                  <Link
                    href="/borrow?tab=rent"
                    className="group grid gap-1 p-4 hover:bg-muted rounded-lg"
                  >
                    <div className="font-medium">Rent a Device</div>
                    <div className="text-sm text-muted-foreground">
                      Borrow the latest tech for your needs
                    </div>
                  </Link>
                  <Link
                    href="/borrow?tab=give"
                    className="group grid gap-1 p-4 hover:bg-muted rounded-lg"
                  >
                    <div className="font-medium">Give Your Device for Rent</div>
                    <div className="text-sm text-muted-foreground">
                      Earn by sharing your devices
                    </div>
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            

            <NavigationMenuItem>
              <NavigationMenuTrigger>Repair</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 w-[400px] md:w-[500px] lg:w-[600px]">
                  <Link
                    href="/repair"
                    className="group grid gap-1 p-4 hover:bg-muted rounded-lg"
                  >
                    <div className="font-medium">Schedule a Repair</div>
                    <div className="text-sm text-muted-foreground">
                      Get your devices fixed by experts
                    </div>
                  </Link>
                  <Link
                    href="/repair"
                    className="group grid gap-1 p-4 hover:bg-muted rounded-lg"
                  >
                    <div className="font-medium">Join as a Technician</div>
                    <div className="text-sm text-muted-foreground">
                      Become a certified repair professional
                    </div>
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>


        <div className="flex items-center ml-auto space-x-4">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowAuthOptions(!showAuthOptions)}
            >
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
            <AnimatePresence>
              {showAuthOptions && (
                <motion.div
                  ref={dropdownRef}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-[380px] rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div className="p-6">
                    {!user && (
                      <div className="flex items-center space-x-4 mb-6">
                        <User className="h-8 w-8 text-green-600" />
                        <div>
                          <h3 className="text-lg font-semibold">
                            Get more with an account
                          </h3>
                        </div>
                      </div>
                    )}
                    {!user && (
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-start space-x-3">
                          <Package className="h-5 w-5 text-green-600 mt-0.5" />
                          <span className="text-sm">
                            Free shipping on orders $35+
                          </span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CreditCard className="h-5 w-5 text-green-600 mt-0.5" />
                          <span className="text-sm">Save payment methods</span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Headphones className="h-5 w-5 text-green-600 mt-0.5" />
                          <span className="text-sm">Priority support</span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Settings className="h-5 w-5 text-green-600 mt-0.5" />
                          <span className="text-sm">Order tracking</span>
                        </div>
                      </div>
                    )}
                    <div className="space-y-3">
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700"
                        asChild
                      >
                        {user ? (
                          <h1>{user.username}</h1>
                        ) : (
                          <Link href="/auth/login">Sign In</Link>
                        )}
                      </Button>
                      {user ? (
                        <Button
                          onClick={handleLogoutClick}
                          variant="outline"
                          className="w-full"
                          asChild
                        >
                          <p>Logout</p>
                        </Button>
                      ) : (
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="/auth/signup">Create Account</Link>
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="border-t px-6 py-4">
                    <div className="space-y-4">
                      <Link
                        href="/account"
                        className="flex items-center space-x-3 text-sm hover:text-green-600"
                      >
                        <User className="h-5 w-5" />
                        <span>Your Account</span>
                      </Link>
                      <Link
                        href="/orders"
                        className="flex items-center space-x-3 text-sm hover:text-green-600"
                      >
                        <Package className="h-5 w-5" />
                        <Link href="/orders">Your Orders</Link>
                      </Link>
                      
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}

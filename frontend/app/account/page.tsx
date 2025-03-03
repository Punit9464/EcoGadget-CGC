"use client";

import React, { ChangeEvent, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Pencil, Save, User } from "lucide-react";
import { useUser } from "@/context/AuthContext";
import axios from "axios";
import ProtectedRoute from "@/context/ProtectedRoute";

const ProfilePage = () => {
  const user = useUser();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    phone: user.phone,
    address: user.address,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setIsEditing(false);
    const updatedUser = await axios.post(
      "https://ecogadget.onrender.com/updateUser",
      formData
    );
    setFormData(updatedUser.data);
  };

  return (
    <ProtectedRoute>
      <div>
        <header className="bg-white shadow-sm">
          <div className="container mx-auto p-4 flex justify-between items-center">
            <div className="font-bold text-xl">EcoGadget</div>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <a href="/" className="hover:text-blue-500">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/orders" className="hover:text-blue-500">
                    Orders
                  </a>
                </li>
                <li>
                  <a
                    href="/profile"
                    className="hover:text-blue-500 font-semibold"
                  >
                    Profile
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <section className="min-h-screen bg-gray-50 py-8 px-4">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">Your Account</h1>
              <Button
                variant={isEditing ? "default" : "outline"}
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className="flex items-center gap-2"
              >
                {isEditing ? (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Pencil className="w-4 h-4" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>

            <Card className="mb-6">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="relative h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <CardTitle className="text-xl">{formData.username}</CardTitle>
                  <p className="text-sm text-muted-foreground text-green-500">
                    Green Points : 30
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="username"
                      name="userame"
                      value={formData.username}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Shipping Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="emailNotifications">
                      Email Notifications
                    </Label>
                    <Input
                      id="emailNotifications"
                      type="checkbox"
                      className="w-4 h-4"
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="smsNotifications">SMS Notifications</Label>
                    <Input
                      id="smsNotifications"
                      type="checkbox"
                      className="w-4 h-4"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
};

export default ProfilePage;

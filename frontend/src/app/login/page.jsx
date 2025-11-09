"use client";
import { useState } from "react";
import { Card, CardContent } from "../../../@/components/ui/card";
import { Button } from "../../../@/components/ui/button";
import { Input } from "../../../@/components/ui/input";
import { Label } from "../../../@/components/ui/label";
import { motion } from "framer-motion";
import Image from "next/image";
import bg from "../../../public/bg.png"; // ✅ Import background image properly
import { Mail, Lock, LogIn, User, Shield, Chrome } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-black text-white overflow-hidden">
      {/* ✅ Background Image */}
      <Image
        src={bg}
        alt="background"
        fill
        priority
        className="absolute inset-0 object-cover opacity-40"
      />

      {/* Background Grid */}
      <div className="absolute inset-0 grid grid-cols-6 gap-2 opacity-30">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="bg-neutral-800/20 backdrop-blur-sm rounded-lg shadow-md"
          />
        ))}
      </div>




      {/* Center Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-neutral-900/80 text-white border border-neutral-800 shadow-xl w-[400px] rounded-2xl backdrop-blur-md">
          <CardContent className="p-6 flex flex-col space-y-6">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-lg font-semibold text-neutral-300">
                <span className="font-bold text-white">shadcn/</span>studio
              </h2>
              <p className="text-sm text-neutral-400 mt-1">
                Ship Faster and Focus on Growth.
              </p>
            </div>

            {/* Login Type Buttons */}
            <div className="flex justify-between gap-2">
              <Button
                variant="secondary"
                className="w-1/2 bg-neutral-800 hover:bg-neutral-700 text-white"
              >
                <User size={16} className="mr-2" /> Login as User
              </Button>
              <Button
                variant="secondary"
                className="w-1/2 bg-neutral-800 hover:bg-neutral-700 text-white"
              >
                <Shield size={16} className="mr-2" /> Login as Admin
              </Button>
            </div>

            {/* Login Form */}
            <form className="flex flex-col space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-neutral-500" size={16} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 bg-neutral-800 text-white border-neutral-700 focus:ring-2 focus:ring-white/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-neutral-500" size={16} />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 bg-neutral-800 text-white border-neutral-700 focus:ring-2 focus:ring-white/20"
                  />
                </div>
              </div>

              <div className="flex justify-between text-sm">
                <a href="#" className="text-neutral-400 hover:text-white">
                  Login with Magic Link
                </a>
                <a href="#" className="text-neutral-400 hover:text-white">
                  Forgot Password?
                </a>
              </div>

              <Button
                type="submit"
                className="bg-white text-black hover:bg-neutral-200 font-semibold"
              >
                <LogIn size={16} className="mr-2" /> Sign in to Shadcn Studio
              </Button>
            </form>

            {/* Footer */}
            <div className="text-center text-sm text-neutral-400 space-y-2">
              <p>
                New on our platform?{" "}
                <a href="#" className="text-white hover:underline">
                  Create an account
                </a>
              </p>
              <div className="flex items-center justify-center gap-2 text-neutral-400">
                <Chrome size={16} />
                <a href="#" className="hover:text-white">
                  Sign in with Google
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

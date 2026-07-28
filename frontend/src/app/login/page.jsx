"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import bg from "../../../public/images/bg.png";
import { Mail, Lock, LogIn, User, Shield, Chrome } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-black text-white overflow-hidden">
      <Image
        src={bg}
        alt="background"
        fill
        priority
        className="absolute inset-0 md:-mt-5 -ml-4 object-cover opacity-50"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
      >
        <div className="bg-neutral-900/80 text-white border border-neutral-800 shadow-xl w-[400px] rounded-2xl backdrop-blur-md">
          <div className="p-6 flex flex-col space-y-6">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-neutral-300">
                Resume Studio
              </h2>
              <p className="text-sm text-neutral-400 mt-1">
                Sign in to manage your resumes
              </p>
            </div>

            <div className="flex justify-between gap-2">
              <button
                className="w-1/2 bg-neutral-800 hover:bg-neutral-700 text-white inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium px-4 py-2 transition-colors cursor-pointer"
              >
                <User size={16} /> Login as User
              </button>
              <button
                className="w-1/2 bg-neutral-800 hover:bg-neutral-700 text-white inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium px-4 py-2 transition-colors cursor-pointer"
              >
                <Shield size={16} /> Login as Admin
              </button>
            </div>

            <form className="flex flex-col space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-neutral-500" size={16} />
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 bg-neutral-800 text-white border border-neutral-700 focus:ring-2 focus:ring-white/20 h-9 w-full min-w-0 rounded-md px-3 py-1 text-base shadow-xs outline-none md:text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-neutral-500" size={16} />
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 bg-neutral-800 text-white border border-neutral-700 focus:ring-2 focus:ring-white/20 h-9 w-full min-w-0 rounded-md px-3 py-1 text-base shadow-xs outline-none md:text-sm"
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

              <button
                type="submit"
                className="bg-white text-black hover:bg-neutral-200 font-semibold inline-flex items-center justify-center gap-2 rounded-md text-sm px-4 py-2 h-9 transition-colors cursor-pointer"
              >
                <LogIn size={16} /> Sign in
              </button>
            </form>

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
          </div>
        </div>
      </motion.div>
    </div>
  );
}

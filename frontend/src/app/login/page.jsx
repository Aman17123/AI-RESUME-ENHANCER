"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import bg from "../../../public/images/bg.png";
import { Mail, Lock, LogIn, Chrome, Loader2 } from "lucide-react";
import { createClient } from "../../lib/supabase";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/dashboard";

  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login"); // login | signup
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${appUrl}/auth/callback?next=${encodeURIComponent(next)}`,
        },
      });
      if (error) throw error;
    } catch (err) {
      setError(err.message || "Google sign-in failed. Please try again.");
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      setLoading(false);
      return;
    }

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${appUrl}/auth/callback` },
        });
        if (error) throw error;
        setMessage(
          "Account created! Check your email to confirm, then sign in.",
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push(next);
        router.refresh();
      }
    } catch (err) {
      setError(err.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLink = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (!email) {
      setError("Enter your email to receive a magic link.");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${appUrl}/auth/callback?next=${encodeURIComponent(next)}`,
        },
      });
      if (error) throw error;
      setMessage("Magic link sent! Check your inbox.");
    } catch (err) {
      setError(err.message || "Failed to send magic link.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (!email) {
      setError("Enter your email to reset your password.");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${appUrl}/auth/callback?next=/dashboard`,
      });
      if (error) throw error;
      setMessage("Password reset link sent! Check your inbox.");
    } catch (err) {
      setError(err.message || "Failed to send reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-neutral-900/80 text-white border border-neutral-800 shadow-xl w-[400px] rounded-2xl backdrop-blur-md">
      <div className="p-6 flex flex-col space-y-6">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-neutral-300">
            {mode === "signup" ? "Create your account" : "Welcome to AchiVAI"}
          </h2>
          <p className="text-sm text-neutral-400 mt-1">
            {mode === "signup"
              ? "Join AchiVAI and build winning resumes"
              : "Sign in to manage your resumes"}
          </p>
        </div>

        {/* Google Sign-In */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-white text-black hover:bg-neutral-200 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium px-4 py-2 transition-colors cursor-pointer disabled:opacity-60"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Chrome size={16} />
          )}
          Continue with Google
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-neutral-700" />
          <span className="text-xs text-neutral-500">or</span>
          <div className="flex-1 h-px bg-neutral-700" />
        </div>

        <form onSubmit={handleEmailSubmit} className="flex flex-col space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium leading-none">
              Email address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-3 text-neutral-500"
                size={16}
              />
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
            <label
              htmlFor="password"
              className="text-sm font-medium leading-none"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-3 text-neutral-500"
                size={16}
              />
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

          {mode === "login" && (
            <div className="flex justify-between text-sm">
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={loading}
                className="text-neutral-400 hover:text-white cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
          )}

          {error && <p className="text-sm text-red-400">{error}</p>}
          {message && <p className="text-sm text-green-400">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-white text-black hover:bg-neutral-200 font-semibold inline-flex items-center justify-center gap-2 rounded-md text-sm px-4 py-2 h-9 transition-colors cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <LogIn size={16} />
            )}
            {mode === "signup" ? "Create account" : "Sign in"}
          </button>
        </form>

        <div className="text-center text-sm text-neutral-400">
          <p>
            {mode === "signup" ? "Already have an account?" : "New to AchiVAI?"}{" "}
            <button
              onClick={() => {
                setMode(mode === "signup" ? "login" : "signup");
                setError("");
                setMessage("");
              }}
              className="text-white hover:underline cursor-pointer"
            >
              {mode === "signup" ? "Sign in" : "Create an account"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
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
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </motion.div>
    </div>
  );
}

"use client";
import Image from "next/image";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../globals.css";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (remember) {
          localStorage.setItem("remember", "true");
        }
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/dashboard");
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex-grow flex justify-center items-center p-4">
        <div className="flex flex-row w-full max-w-6xl min-h-[70vh] bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Left side */}
          <div className="w-1/2 flex flex-col items-center p-8 text-white relative bg-gradient-to-r from-purple-500 to-indigo-600">
            <h1 className="text-5xl font-semibold leading-tight text-white mt-2">
              Welcome!
            </h1>
            <p className="text-md text-white opacity-80">Please enter your details</p>
            <Image
              src="/Img.png"
              alt="image for login"
              width={400}
              height={400}
              className="flex justify-center items-center mt-8"
            />
          </div>

          {/* Right side */}
          <div className="w-1/2 min-h-[70vh] p-2 flex flex-col justify-center bg-gray-300">
            <h2 className="text-xl font-semibold mb-4 text-black text-center">
              Sign In from Here!!
            </h2>
            <div className="flex flex-col justify-center items-center rounded-xl p-4 shadow-lg max-w-sm w-full mx-auto bg-white">
              <form
                className="rounded-xl w-full flex flex-col"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                {/* Name */}
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name:
                </label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  id="name"
                  name="name"
                  required
                  className="mt-1 block w-full px-4 py-2 border-2 border-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                {/* Email */}
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mt-5"
                >
                  Email:
                </label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full px-4 py-2 border-2 border-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {/* Password */}
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mt-5"
                >
                  Password:
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    id="password"
                    name="password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value.trimStart())}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {showPassword ? (
                    <FaEye
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <FaEyeSlash
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </div>

                {/* Remember me + Forgot Password */}
                <div className="flex flex-row justify-between items-center w-full mt-4 mb-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      name="remember"
                      className="mr-2"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium text-gray-700"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-blue-500 text-sm hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Error + Loading */}
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                {loading && <p className="text-blue-500 text-sm mb-2">Loading...</p>}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-blue-500 mt-5 shadow-sm text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Login"}
                </button>
              </form>
            </div>

            {/* Sign Up link only */}
            <p className="text-sm text-gray-500 mt-5 flex justify-center items-center">
              Don't have an account?
              <Link href="/signup" className="text-blue-500 hover:underline pl-1">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <footer className="flex justify-center flex-col items-center w-full h-7 bg-gray-400 text-white">
        <p>© Copyright 2025. All rights reserved.</p>
      </footer>
    </div>
  );
}

"use client";
import Image from "next/image";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import "../globals.css";

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
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login Successful:", data.message);
         console.log("User Info:", data.user);
        if (remember) localStorage.setItem("remember", "true");

        const { user, accessToken, refreshToken } = data;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/dashboard");
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login | MyApp</title>
      </Head>

      <div className="login-page">
        <div className="login-container">
          {/* Left section */}
          <div className="login-left">
            <h1>Welcome!</h1>
            <p>Please enter your details</p>
            <Image
              src="/Img.png"
              alt="Login illustration"
              width={380}
              height={380}
            />
          </div>

          {/* Right section */}
            <div className="login-right">
              <h2>SignIn</h2>
              <div className="login-card">
                <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
                  {/* Name */}
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                {/* Email */}
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Password */}
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <div className="password-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value.trimStart())}
                      minLength={8}
                      required
                    />
                    {showPassword ? (
                      <FaEye
                        className="password-toggle"
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <FaEyeSlash
                        className="password-toggle"
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                  </div>
                </div>

                {/* Remember + Forgot */}
                <div className="login-options">
                  <label className="remember-me-label">
                    <input
                      type="checkbox"
                      className="checkbox-input"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                    />
                    Remember me
                  </label>
                  <Link href="/forgot-password">Forgot Password?</Link>
                </div>

                {/* Error + Loading */}
                {error && <p className="error-text">{error}</p>}
                {loading && <p className="loading-text">Loading...</p>}

                {/* Submit */}
                <button type="submit" className="btn" disabled={loading}>
                  {loading ? "Loading..." : "Submit"}
                </button>
              </form>
            </div>

            <p className="form-note">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="form-note-link">
                Sign up
              </Link>
            </p>
          </div>
        </div>
        </div>
    </>
  );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { CloseOutlined } from "@ant-design/icons"; 

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      message.error("All fields are required!");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      message.error("Password must be at least 8 characters long!");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      message.error("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        message.success("Signup successful! Please login.");
        router.push("/login"); // ✅ redirect to login page
      } else {
        message.error(data.error || "Signup failed");
      }
    } catch (err) {
      message.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="relative bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        {/* Cancel / Close icon */}
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={() => router.push("/login")} 
        >
          <CloseOutlined style={{ fontSize: "18px" }} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Signup Page</h2>

        <label className="block mb-1 font-medium">Name *</label>
        <input
          type="text"
          placeholder="Enter Name"
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className="block mb-1 font-medium">Email *</label>
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-1 font-medium">Password *</label>
        <input
          type="password"
          placeholder="Enter Password"
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label className="block mb-1 font-medium">Confirm Password *</label>
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {/* Terms and Privacy Policy */}
        <p className="text-sm text-gray-600 mb-6">
          I accept the{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
        </p>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        {/* ✅ Note for existing users */}
        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <a
            onClick={() => router.push("/login")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

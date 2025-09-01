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
        router.push("/login");
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
    <div className="signup-container">
      <form onSubmit={handleSignup} className="signup-form">
        {/* Cancel / Close icon */}
        <button
          type="button"
          className="close-btn"
          onClick={() => router.push("/login")}
        >
          <CloseOutlined className="icon-lg" />
        </button>

        <h2 className="form-title">Signup Page</h2>

        <label className="form-label">Name *</label>
        <input
          type="text"
          placeholder="Enter Name"
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className="form-label">Email *</label>
        <input
          type="email"
          placeholder="Enter Email"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="form-label">Password *</label>
        <input
          type="password"
          placeholder="Enter Password"
          className="form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label className="form-label">Confirm Password *</label>
        <input
          type="password"
          placeholder="Confirm Password"
          className="form-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {/* Terms and Privacy Policy */}
        <p className="form-terms">
          I accept the{" "}
          <a href="#" className="form-link">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="form-link">
            Privacy Policy
          </a>
        </p>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        {/* Note for existing users */}
        <p className="form-note">
          Already have an account?{" "}
          <a
            onClick={() => router.push("/login")}
            className="form-link cursor-pointer"
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

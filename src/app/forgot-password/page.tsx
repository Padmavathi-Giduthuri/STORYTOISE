"use client";
import React from 'react';
import { IoClose } from 'react-icons/io5';
import Image from "next/image";
import "../globals.css";
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

export default function ForgotPassword() {
    const [showEmailSentModal, setShowEmailSentModal] = useState(false);
    const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const router = useRouter();

    const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage("A password reset link has been sent to your email.");
        setIsError(false);
        setShowResetPasswordModal(true);
    };

    const handleResetPasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match!");
            setIsError(true);
            return;
        }

        setMessage("Password has been successfully reset!");
        setIsError(false);
        
        // Hide the reset modal and show the success modal
        setShowResetPasswordModal(false);
        setShowEmailSentModal(true);
    };

    const closeModalAndRedirect = () => {
        setShowEmailSentModal(false);
        setShowResetPasswordModal(false);
        setMessage("");
        setIsError(false);
        setNewPassword("");
        setConfirmPassword("");
        router.push('/login');
    };

    const closeModal = () => {
        setShowEmailSentModal(false);
        setShowResetPasswordModal(false);
        setMessage("");
        setIsError(false);
        setNewPassword("");
        setConfirmPassword("");
    }

    return (
        <>
            <Head>
                <title>Forgot Password | MyApp</title>
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

                    {/* Right side of the page */}
                    <div className="forgot-password-right-section">
                        <h2 className="text-xl font-semibold mb-4 text-black text-center">Forgot Password?</h2>
                        <p className="text-sm text-gray-500 mb-4 text-center">Enter your email to reset your password</p>
                        <div className="forgot-password-card">
                            <form className="forgot-password-form" onSubmit={handleEmailSubmit}>
                                <label htmlFor="email" className="block text-md font-semibold text-gray-700 mb-1 font-sans">Email *</label>
                                <input
                                    type="email"
                                    placeholder="Enter Email"
                                    className="form-input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button type="submit" className="form-button">Reset Password</button>
                            </form>
                        </div>
                        <Link href="/login" className="go-back-link">Go Back to Login</Link>
                    </div>
                </div>

                {/* Password reset form modal */}
                {showResetPasswordModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h3 className="modal-title">Reset Password</h3>
                            <p className="modal-message">A password reset link has been sent to your email.</p>
                            <form className="reset-password-form" onSubmit={handleResetPasswordSubmit}>
                                <IoClose className="close-modal-icon" onClick={closeModal} />
                                <div className="relative">
                                    <label htmlFor="new-password" className="label-style">Password *</label>
                                    <input
                                        type="password"
                                        id="new-password"
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="form-input"
                                        required
                                    />
                                </div>
                                <div className="relative">
                                    <label htmlFor="confirm-password" className="label-style">Confirm Password *</label>
                                    <input
                                        type="password"
                                        id="confirm-password"
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="form-input"
                                        required
                                    />
                                </div>
                                <button type="submit" className="form-button">Reset Password</button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Success message modal */}
                {showEmailSentModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h3 className="modal-title">Success</h3>
                            <p className="modal-message">Password has been successfully reset!</p>
                            <button onClick={closeModalAndRedirect} className="form-button">Go to Login</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
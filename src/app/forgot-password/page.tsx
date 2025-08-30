"use client";
import React from 'react';
import { IoClose } from 'react-icons/io5';
import Image from "next/image";
import "../globals.css";
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {
    const [showModal, setShowModal] = useState(false); 
    const [email, setEmail] = useState(""); 
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const router = useRouter();

    const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Email submitted for password reset:", email);

        setTimeout(() => {
            setShowModal(true);
        }, 1000);
        };

    const handleResetPasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
    
        console.log("New Password:", newPassword);
        console.log("Confirm Password:", confirmPassword);

        setTimeout(() => {
            alert("Password has been successfully reset!");
            setShowModal(false);
            setNewPassword("");
            setConfirmPassword("");
            setEmail("");
            router.push('/login'); 
          }, 1000);
        };
      
        const closeModal = () => {
          setShowModal(false);
          setNewPassword("");
          setConfirmPassword("");
        };
        // const hadleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
        //     e.preventDefault();
        //     if (newPassword !== confirmPassword) {
        //         alert("Passwords do not match!");
        //         return;
        //     }
        //     alert("Password has been successfully reset!");
        //     router.push('/login');
        // }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100"> 
    <div className="flex-grow flex justify-center items-center p-4">
        <div className="flex flex-row w-full max-w-6xl min-h-[70vh] bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Left side of the page */}
          <div className="w-1/2 flex flex-col items-center p-8 text-white relative bg-gradient-to-r from-purple-500 to-indigo-600">
            <p className="text-md text-white opacity-80 mt-15">Enter Your new details</p>
              <Image src="/Img.png" alt="image for login" width={400} height={400} className="flex justify-center items-center mt-6"/>
              {/* <h1 className="text-5xl flex justify-center items-center font-lg text-center leading-tight text-black">Welcome!</h1> */}
            </div>

          {/* Right side of the page */}
          <div className="w-1/2 min-h-[70vh] p-2 flex flex-col justify-center bg-gray-300">
            <h2 className="text-xl font-semibold mb-4 text-black text-center">Forgot Password ?</h2>
            <p className="text-sm text-gray-500 mb-4 text-center">Enter your email to reset your password</p>
            <div className="flex flex-col justify-center items-center rounded-xl p-4 shadow-lg max-w-sm w-full mx-auto bg-white">
            <form className="flex flex-col max-w-sm w-full mx-auto mt-4" onSubmit={handleEmailSubmit}>
               <label htmlFor="email" className="block text-md font-semibold text-gray-700 mb-1 font-sans">Email *</label>
               <input type="email" placeholder="Enter Email" className="bg-white w-full px-4 py-2 border-2 border-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={email} onChange={(e) => setEmail(e.target.value)}/>
               <button type="submit" className="bg-blue-500 mt-5 shadow-sm text-white px-4 py-2 rounded-md flex-end hover:bg-blue-600">Reset Password</button>
            </form>
            </div>
            <Link href="/login" className="text-blue-600 text-sm hover:underline flex justify-center items-center mt-4">Go Back to Login</Link>
            </div>
            </div>
            </div>
            {showModal && (
        <div className="fixed inset-0 bg-gray-200 bg-opacity-75 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-6 font-sans">Reset Password</h3>

            
            <form onSubmit={handleResetPasswordSubmit} className="flex flex-col gap-6">
            <IoClose className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold" onClick={closeModal}/>
              <div className="relative">
                <label htmlFor="new-password" className="block text-md font-medium text-gray-700 mb-2 font-sans">Password *</label>
                <input
                    type="password"
                    id="new-password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                />
                </div>
              <div className="relative">
                <label htmlFor="confirm-password" className="block text-md font-medium text-gray-700 mb-2 font-sans">Confirm Password *</label>
                <input
                    type="password"
                    id="confirm-password"
                    placeholder="Enter new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                />
                </div>
              <button type="submit" className="bg-blue-500 mt-5 shadow-sm text-white px-4 py-2 rounded-md flex-end hover:bg-blue-600">Reset Password</button>
            </form>
          </div>
        </div>
      )}
            <footer className="flex justify-center flex-col items-center w-full h-7 bg-gray-400 text-white">
          <p>© Copyright 2025. All rights reserved.</p>
        </footer>
        </div>
    );
}
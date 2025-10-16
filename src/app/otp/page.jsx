"use client"
import { useVerifyOtpMutation } from "@/redux/feature/auth/authApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import { IoClose } from "react-icons/io5";


export default function Otp() {
  const [code, setCode] = useState(new Array(6).fill("")); // 6 digit OTP
  const [verifyOtp, { isLoading, isError, error, isSuccess }] = useVerifyOtpMutation();
  const navigate = useRouter();

  const handleChange = (value, index) => {
    if (!isNaN(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move to next input
      if (value && index < 5) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      // Move to previous input on backspace
      document.getElementById(`code-${index - 1}`).focus();
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  
  const otpCode = code.join('');
  const email = localStorage.getItem("forgotPasswordEmail");
  
  if (otpCode.length !== 6) {
    alert("Please enter 6 digit OTP");
    return;
  }

  try {
    const result = await verifyOtp({
      email: email,
      code: parseInt(otpCode)
    }).unwrap();
    
    console.log("OTP verified successfully:", result);
    
    // ✅ EKHAN THEKE CHANGE KORO - resetToken properly save koro
    if (result.data && result.data.resetToken) {
      localStorage.setItem("resetToken", result.data.resetToken);
      console.log("Reset token saved:", result.data.resetToken);
    } else if (result.resetToken) {
      localStorage.setItem("resetToken", result.resetToken);
      console.log("Reset token saved:", result.resetToken);
    } else {
      console.log("No reset token in response:", result);
    }
    
    // Password reset page e navigate koro
    navigate.push("/reset-password");
    
  } catch (err) {
    console.error("Failed to verify OTP:", err);
  }
};

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Column - Form */}
      <div className="w-full md:w-1/2 bg-[#171717] p-8 flex flex-col justify-center relative">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-center text-3xl font-bold text-white mb-4">Verification Code</h1>
          <p className="text-center text-[#9F9C96] mb-8">
            We have sent the verification code to your email
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between max-w-md mx-auto mb-8">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-xl text-center bg-[#2D2D2D] text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              ))}
            </div>

            {/* Error Message */}
            {isError && (
              <div className="text-red-500 text-center">
                {error?.data?.message || "Invalid OTP! Please try again."}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#136BFB] text-white text-lg font-bold py-3 px-4 rounded-lg transition hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isLoading ? "Verifying..." : "Verify Code"}
            </button>
          </form>
        </div>
      </div>

      {/* Right Column - Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-[#162236] items-center justify-center relative">
        <div className="absolute top-4 right-4">
          <Link href="/" className="text-white hover:bg-blue-700 p-2 rounded-full inline-block">
            <IoClose size={24} />
          </Link>
        </div>
        <div className="text-center px-12">
          <div className="w-[400px] h-[400px] mx-auto">
            <img src="/otp.svg" alt="Verification" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
}
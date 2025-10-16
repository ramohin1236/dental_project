"use client"
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { IoEyeOffOutline, IoEyeOutline, IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useResetPasswordMutation } from "@/redux/feature/auth/authApi";

export default function ResetPassword() {
  const [formData, setFormData] = useState({
    password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [resetToken, setResetToken] = useState("");
  
  const [resetPassword, { isLoading, isError, error }] = useResetPasswordMutation();
  const router = useRouter();

  // ✅ Debug korar jonno - component load e check koro resetToken ache kina
  useEffect(() => {
    const token = localStorage.getItem("resetToken");
    console.log("ResetToken from localStorage:", token);
    setResetToken(token || "");
    
    if (!token) {
      console.error("❌ No resetToken found in localStorage!");
      console.log("Available localStorage items:", {
        forgotPasswordEmail: localStorage.getItem("forgotPasswordEmail"),
        resetToken: localStorage.getItem("resetToken"),
        token: localStorage.getItem("token"),
        user: localStorage.getItem("user")
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    }
    
    if (!isChecked) {
      newErrors.terms = "You must agree to the terms and conditions";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // ✅ Debug: Current resetToken check koro
    const currentToken = localStorage.getItem("resetToken");
    console.log("🔍 Submitting with resetToken:", currentToken);
    
    if (!currentToken) {
      alert("Reset token not found. Please restart the password reset process.");
      return;
    }

    try {
      const resetData = {
        resetToken: currentToken,
        newPassword: formData.password
      };

      console.log("📤 Sending reset request:", resetData);

      const result = await resetPassword(resetData).unwrap();
      console.log("✅ Password reset successful:", result);
      
      // Clear local storage
      localStorage.removeItem("resetToken");
      localStorage.removeItem("forgotPasswordEmail");
      
      // Success page e navigate koro
      router.push("/congratulations");
      
    } catch (err) {
      console.error("❌ Failed to reset password:", err);
      if (err?.data) {
        setErrors({ submit: err.data.message || "Failed to reset password" });
      } else {
        setErrors({ submit: "Network error. Please try again." });
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Column - Form */}
      <div className="w-full md:w-1/2 bg-[#171717] p-8 flex flex-col justify-center relative">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-center text-3xl font-bold text-white mb-4">Reset Password</h1>
          <p className="text-center text-[#9F9C96] mb-8">Enter your new password</p>

          {/* ✅ Debug Info */}
          {!resetToken && (
            <div className="bg-yellow-500 text-black p-3 rounded mb-4 text-sm">
              ⚠️ No reset token found. Please complete OTP verification first.
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-300 text-sm mb-2">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your new password"
                  className="w-full px-4 py-3 bg-[#2D2D2D] text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm mb-2">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  placeholder="Confirm your new password"
                  className="w-full px-4 py-3 bg-[#2D2D2D] text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                </button>
              </div>
              {errors.confirm_password && (
                <p className="text-red-500 text-sm mt-1">{errors.confirm_password}</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-300">
                I agree to the Terms and Conditions
              </label>
            </div>
            {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}

            {isError && error?.data && (
              <div className="text-red-500 text-center bg-red-100 border border-red-400 rounded py-2 px-3">
                {error.data.message || "Password reset failed"}
              </div>
            )}

            {errors.submit && (
              <div className="text-red-500 text-center bg-red-100 border border-red-400 rounded py-2 px-3">
                {errors.submit}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !resetToken}
              className="w-full bg-[#136BFB] text-white text-lg font-bold py-3 px-4 rounded-lg transition mt-5 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? "Resetting Password..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>

      {/* Right Column - Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-[#162236] items-center justify-center relative">
        <div className="absolute top-4 right-4">
          <Link href="/login" className="text-white hover:bg-blue-700 p-2 rounded-full inline-block">
            <IoClose size={24} />
          </Link>
        </div>
        <div className="text-center px-12">
          <div className="w-[500px] h-[500px] mx-auto">
            <img src="./forgot.svg" alt="Reset Password" />
          </div>
        </div>
      </div>
    </div>
  );
}
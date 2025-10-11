"use client"
import React from "react";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { FiCamera, FiX } from "react-icons/fi";
import { useRegisterUserMutation } from "@/redux/feature/auth/authApi";
import Link from "next/link";

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    gdc_no: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [registerUser, {isLoading,error}] = useRegisterUserMutation()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    setImagePreview(null);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Column - Form */}
      <div className="w-full md:w-1/2 bg-[#171717] p-8 flex flex-col justify-center relative">
        <div className="max-w-md mx-auto w-full">
          {/* Profile Image Uploader */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              {/* Main Upload Circle */}
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#136BFB] to-[#0D4FB8] p-1 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-blue-500/30 group cursor-pointer">
                <div className="w-full h-full rounded-full bg-[#2D2D2D] border-2 border-transparent flex items-center justify-center overflow-hidden relative transition-all duration-300 group-hover:border-[#136BFB]/50">
                  {imagePreview ? (
                    <>
                      <img
                        src={imagePreview}
                        alt="Profile preview"
                        className="w-full h-full object-cover transition-all duration-300"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                        <FiCamera className="text-white text-2xl" />
                      </div>
                    </>
                  ) : (
                    <>
                      <img
                        src="https://avatar.iran.liara.run/public/3"
                        alt="Default avatar"
                        className="w-full h-full object-cover transition-all duration-300"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                        <FiCamera className="text-white text-2xl" />
                      </div>
                    </>
                  )}
                  
                  {/* Upload Button - positioned to cover only the circle */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    id="profile-upload"
                  />
                </div>
              </div>
              
              {/* Remove Button */}
              {imagePreview && (
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:scale-110 hover:shadow-red-500/30 z-20"
                >
                  <FiX />
                </button>
              )}
              
              {/* Pulse Animation Ring */}
              {!imagePreview && (
                <div className="absolute inset-0 rounded-full border-2 border-[#136BFB]/30 animate-pulse pointer-events-none"></div>
              )}
            </div>
            
         
          </div>

          <h1 className="text-center text-3xl font-bold text-white mb-2">
            Create Account
          </h1>
          <p className="text-center text-[#9F9C96] mb-8">
            Please enter your information to create account
          </p>

          <form className="space-y-5">
            <div className="flex gap-5">
              <div>
                <label className="block text-white font-bold text-lg mb-2">
                  First name
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-[#2D2D2D] text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                  required
                />
              </div>
              <div>
                <label className="block text-white font-bold text-lg mb-2">
                  Last name
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-[#2D2D2D] text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-white font-bold text-lg mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-[#2D2D2D] text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                required
              />
            </div>
            <div>
              <label className="block text-white font-bold text-lg mb-2">
                GDC No
              </label>
              <input
                type="number"
                name="gdc_no"
                value={formData.gdc_no}
                onChange={handleChange}
                placeholder="Enter your GDC No"
                className="w-full px-4 py-3 bg-[#2D2D2D] text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                required
              />
            </div>
            <div>
              <label className="block text-white font-bold text-lg mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-[#2D2D2D] text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <IoEyeOffOutline size={20} />
                  ) : (
                    <IoEyeOutline size={20} />
                  )}
                </button>
              </div>
            </div>

            <Link href="/login">
              <button
                type="submit"
                className="w-full bg-[#136BFB] text-white font-bold py-3 px-4 rounded-lg transition mt-5"
              >
                Sign Up
              </button>
            </Link>

            <p className="text-center text-[#9F9C96] mt-5">
              Already have an account?{" "}
              <Link href="/login" className="text-[#136BFB]">
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Column - Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-[#162236] items-center justify-center relative">
        <div className="text-center px-12">
          <div className="w-[500px] h-[500px] mx-auto">
            <img src="./signin.svg" alt="sign up logo" />
          </div>
        </div>
      </div>
    </div>
  );
}

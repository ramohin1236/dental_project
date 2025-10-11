'use client'
import Link from "next/link";
import React from "react";


export default function Congratulations() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Column - Content */}
      <div className="w-full md:w-1/2 bg-[#171717] p-8 flex flex-col justify-center relative">
        <div className="max-w-md mx-auto w-full text-center">
          <h1 className="text-3xl font-bold text-white mb-10">
            Congratulation !
          </h1>
          <p className="text-[#9F9C96] mb-8 text-xl">
            Your password has been updated, please change your password
            regularly to avoid this happening.
          </p>

          <Link href="/login">
            <button
              type="submit"
              className="w-full bg-[#136BFB] text-white text-lg font-bold py-3 px-4 rounded-lg transition mt-5"
            >
              Continue
            </button>
          </Link>
        </div>
      </div>

      {/* Right Column - Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-[#162236] items-center justify-center relative">
        <div className="absolute top-4 right-4">
          <Link
            href="/"
            className="text-white hover:bg-blue-700 p-2 rounded-full inline-block"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Link>
        </div>
        <div className="text-center px-12">
          <div className="w-[400px] h-[400px] mx-auto">
            <img
              src="/welcome.svg"
              alt="Welcome"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
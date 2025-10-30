"use client";
import React, { Suspense } from "react";
import Slider from "../components/home/Slider";
import ExploreByCategory from "../components/home/ExploreByCategory";
import HotSelling from "../components/home/HotSelling";
import MagicMoney from "../components/home/MagicMoney";
import AboutUs from "../components/home/AboutUs";
import Subscribe from "../components/home/Subscribe";

// Client component that will be wrapped in Suspense
function HomeContent() {
  return (
    <div>
      <Slider />
      <ExploreByCategory />
      <HotSelling />
      <MagicMoney />
      <AboutUs />
      <Subscribe />
    </div>
  );
}

// Main page component with Suspense boundary
export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}

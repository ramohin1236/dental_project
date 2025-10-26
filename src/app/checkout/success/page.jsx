"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearCartLocal } from "@/redux/feature/cart/cartSlice";

export default function CheckoutSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    // Ensure cart is cleared; harmless if already cleared
    try { dispatch(clearCartLocal()); } catch {}

    const orderId = searchParams.get("orderId");
    // Redirect to congratulations, optionally pass orderId
    const target = orderId ? `/congratulations?orderId=${encodeURIComponent(orderId)}` : "/congratulations";
    router.replace(target);
  }, [dispatch, router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#171717]">
      <div className="text-center text-white">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p>Finalizing your order, redirecting...</p>
      </div>
    </div>
  );
}

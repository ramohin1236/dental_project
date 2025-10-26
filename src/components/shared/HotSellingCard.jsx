"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "@/redux/feature/cart/cartSlice";
import { useAddToCartMutation } from "@/redux/feature/cart/cartApi"; 
import Swal from "sweetalert2";

const HotSellingCard = ({ product, image, title, description, id }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.user);
  const [addToCartApi, { isLoading }] = useAddToCartMutation();

  const handleAddToCart = async () => {
    try {
      if (!user) {
        router.push("/sign_in");
        return;
      }
      if (!product?._id) {
        Swal.fire("Error!", "Product information missing", "error");
        return;
      }

      
      const res = await addToCartApi({
        productId: product._id,
        quantity: 1,
      }).unwrap();

      
      if (res?.statusCode === 200) {
        dispatch(addToCart({
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.images?.[0],
          quantity: 1,
          selected: true
        }));
        
        Swal.fire("Success!", "Product added to cart", "success");
      }

    } catch (error) {
      console.error("Add to cart error:", error);
      
      
      if (error?.status === 401) {
        Swal.fire("Login Required!", "Please login to add items to cart", "error");
        router.push("/sign_in");
      } else {
        Swal.fire("Error!", error?.data?.message || "Failed to add product to cart", "error");
      }
    }
  };

  const handleWishlistClick = () => {
    router.push("/favourite");
  };

  const productImage = image || product?.images?.[0] || "https://via.placeholder.com/300";
  const productTitle = title || product?.name || "Default Title";
  const productDescription = description || product?.description || "Default Description";
  const productId = id || product?._id;

  return (
    <div className="bg-[#1E1E1E] rounded-lg p-4 shadow-lg">
      {/* Image Section */}
      <div className="relative rounded-md overflow-hidden cursor-pointer">
        <img
          src={productImage}
          alt={productTitle}
          className="w-full h-[280px] object-cover"
        />
        {/* Heart Icon */}
        <div className="absolute top-2 right-2">
          <img
            src="/favourite.svg"
            alt="heart"
            className="cursor-pointer hover:scale-110 transition-all duration-300"
            onClick={handleWishlistClick}
          />
        </div>
      </div>

      {/* Text and Buttons */}
      <div className="flex flex-col gap-4 mt-4">
        <p className="text-white text-lg font-semibold line-clamp-1">{productTitle}</p>
        <p className="text-gray-400 text-sm line-clamp-2">
          {productDescription}
        </p>
        <div className="flex justify-between gap-2">
          <Link
            href={`/product/${productId}`}
            className="px-4 py-2 rounded-md text-[#136BFB] border border-[#136BFB] cursor-pointer whitespace-nowrap hover:bg-[#136BFB] hover:text-white transition-colors"
          >
            View Details
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={isLoading}
            className="bg-[#136BFB] px-4 py-2 rounded-md text-white border border-[#136BFB] cursor-pointer whitespace-nowrap hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Adding..." : "Add To Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotSellingCard;
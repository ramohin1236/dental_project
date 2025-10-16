"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/feature/cart/cartSlice";

const HotSellingCard = ({ product,image, title, description, id, cardWidth = 288 }) => {
  const router = useRouter();
  const dispatch = useDispatch()

  // Set the current card values as local state (defaults)
  const [cardData, setCardData] = useState({
    title: title || "Default Title",
    description: description || "Default Description",
    image: image || "https://via.placeholder.com/300",
  });

    const handleAddToCart =(product)=>{
       dispatch(addToCart(product))
       console.log(product)
    } 

  const handleWishlistClick = () => {
    router.push("/favourite");
  };

  return (
    <div>
      {/* Image Section */}
      <div className="relative rounded-md overflow-hidden cursor-pointer">
        <img
          src={cardData.image}
          alt={cardData.title}
          className="w-full lg:w-[280px] h-[280px] object-cover"
        />
        {/* Heart Icon */}
        <div className="absolute z-10 top-2 right-2">
          <img
            src="/favourite.svg"
            alt="heart"
            className="cursor-pointer hover:scale-110 transition-all duration-300 text-[#136BFB]"
            onClick={handleWishlistClick}
          />
        </div>
      </div>

      {/* Text and Buttons */}
      <div className="flex flex-col gap-4 mt-4">
        <p className="text-[#FCFBF8] text-lg line-clamp-1">{cardData.title}</p>
        <p className="text-[#9F9C96] text-sm line-clamp-2">
          {cardData.description}
        </p>
        <div className="flex justify-between gap-2">
          <Link
            href={`/product/${id}`}
            className="px-4 py-2 rounded-md text-[#136BFB] border border-[#136BFB] cursor-pointer whitespace-nowrap"
            
          >
            View Details
          </Link>
          <button
          onClick={()=>handleAddToCart(product)}
            className="bg-[#136BFB] px-4 py-2 rounded-md text-white border border-[#136BFB] cursor-pointer whitespace-nowrap"
            
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotSellingCard;

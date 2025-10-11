import React from "react";
import Checkbox from "../shared/Checkbox";



export default function ProductCard({ product, isSelected, onSelect }) {
  return (
    <div
      className={`relative bg-white rounded-xl shadow-sm border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${isSelected ? 'border-[#136BFB] ring-2 ring-[#136BFB]' : 'border-gray-200 hover:border-gray-300'
        }`}
      onClick={onSelect}
    >
      <div className="absolute top-2 left-2">
        <Checkbox isSelected={isSelected} />
      </div>

      {/* Product Image */}
      <div className="">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain rounded-xl"
        />
      </div>

      {/* Product Name */}
      <div className="">
        <p className="absolute bottom-5 left-3 text-sm font-medium text-gray-900 line-clamp-2">
          {product.name}
        </p>
      </div>
    </div>
  );
}
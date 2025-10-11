"use client"
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { PiShoppingCartBold } from "react-icons/pi";
import { useParams } from "next/navigation";
import { useFetchProcedureByIdQuery } from "@/redux/feature/procedure/procedure";
import BreadCrumb from "@/components/shared/BreadCrumb";
import { getBaseUrl } from "@/utils/getBaseUrl";
import ProductCard from "@/components/procedure/ProductCard";


export default function ProcedureDetails() {
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  
  const {id} = useParams()
  const {data: {data: procedureDetails}={}} =useFetchProcedureByIdQuery(id)

  const products = [
    { id: "1", name: "Walden Tesla Air Rotor", image: "/image.png" },
    { id: "2", name: "Walden Tesla Air Rotor", image: "/image.png" },
    { id: "3", name: "Walden Tesla Air Rotor", image: "/image.png" },
    { id: "4", name: "Walden Tesla Air Rotor", image: "/image.png" },
    { id: "5", name: "Walden Tesla Air Rotor", image: "/image.png" },
    { id: "6", name: "Walden Tesla Air Rotor", image: "/image.png" },
    { id: "7", name: "Walden Tesla Air Rotor", image: "/image.png" },
    { id: "8", name: "Walden Tesla Air Rotor", image: "/image.png" },
  ];

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(products.map((p) => p.id)));
    }
    setSelectAll(!selectAll);
  };

  const handleItemSelect = (itemId) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
    setSelectAll(newSelected.size === products.length);
  };

  const selectedCount = selectedItems.size;
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <div className="container mx-auto flex justify-start items-center">
          <BreadCrumb name="Procedure Guide" title="Root Canal Treatment" />
        </div>
        {/* Hero Section */}
        <div className="relative bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={`${getBaseUrl()}${procedureDetails?.imageUrl}`}
              alt="Endodontic procedure equipment"
              className="w-full h-80 object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
        <div className="mt-10">
          <h1 className="text-2xl font-bold text-white">
            {procedureDetails?.name}
          </h1>
          <p className="text-gray-600 text-lg mt-2">
            {procedureDetails?.description}
          </p>
        </div>

        {/* Select All Header */}
        <div className="flex justify-between items-center mt-10">
          <h2 className="text-2xl font-bold text-white">Products (08)</h2>
          <label className="flex items-center space-x-3 cursor-pointer group">
            <span className="text-gray-600">Select all</span>
            <div className="relative">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="sr-only cursor-pointer bg-black"
              />
              <div
                className={`w-5 h-5 rounded border-2 border-[#136BFB] bg-black  transition-all duration-200 ${
                  selectAll ? "border-[#136BFB]" : ""
                }`}
              >
                {selectAll && (
                  <FaCheck className="w-3 h-3 text-[#136BFB] absolute top-1 left-1" />
                )}
              </div>
            </div>
          </label>
        </div>
        {/* Divider */}
        <div className="border-b-2 border-gray-700 my-5"></div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 mb-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isSelected={selectedItems.has(product.id)}
              onSelect={() => handleItemSelect(product.id)}
            />
          ))}
        </div>

        {/* Add to Cart Button */}
        <div className="flex justify-center">
          <button
            className={`flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 ${
              selectedCount > 0
                ? "bg-blue-500 hover:bg-blue-600 transform hover:scale-105 shadow-lg hover:shadow-xl"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={selectedCount === 0}
          >
            <PiShoppingCartBold className="w-5 h-5" />
            <span>Add To Cart {selectedCount > 0 && `(${selectedCount})`}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

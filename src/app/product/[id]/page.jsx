"use client"
import BreadCrumb from "@/components/shared/BreadCrumb";
import SectionHeading from "@/components/shared/SectionHeading";
import { addToCart } from "@/redux/feature/cart/cartSlice";
import { useAddToCartMutation } from "@/redux/feature/cart/cartApi";
import { useFetchProductbyIdQuery } from "@/redux/feature/products/productsApi";
import { getBaseUrl } from "@/utils/getBaseUrl";
import { useParams,useRouter } from "next/navigation";

import React, { useState, useEffect } from "react";
import { FaTruck, FaUndo, FaMedal } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";


const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch()
  const [addToCartMutation] = useAddToCartMutation();

  const { data, isLoading, isError } = useFetchProductbyIdQuery(id);
  const product = data;
  console.log(product);
  const user = useSelector((state) => state?.auth?.user);
  const IsLogin = !!user;

  // image select
  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setSelectedImage(`${getBaseUrl()}${product.images[0]}`);
    }
  }, [product]);

  const handleAddToCart = async (product) => {
    try {
      await addToCartMutation({ product, quantity }).unwrap();
    } catch (e) {
      // ignore server error to keep UI responsive
    }
    dispatch(addToCart(product));
  }

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center text-white text-2xl">
        Loading...
      </div>
    );

  if (isError || !product)
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500 text-2xl">
        Product not found.
      </div>
    );

  // Quantity functions
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));
  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);
  };

  return (
    <div className="mx-auto container text-white py-6 sm:py-8 md:py-10">
      {/* Breadcrumb */}
      <div className="container mx-auto flex justify-start items-center px-2 sm:px-5">
        <BreadCrumb name="Home" title={product.name} />
      </div>

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row gap-8 md:gap-10 mt-6 md:mt-10 px-2 sm:px-5 md:px-0">
        {/* Image Section */}
        <div className="flex flex-col gap-3 md:gap-4 w-full lg:w-[40%] xl:w-[35%]">
          {selectedImage && (
            <div
              onClick={() => setShowModal(true)}
              className="rounded-md overflow-hidden w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] cursor-pointer"
            >
              <img
                src={selectedImage}
                alt="Main"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Thumbnails */}
          <div className="flex gap-2 sm:gap-3 md:gap-4 flex-wrap">
            {product.images &&
              product.images.map((img, i) => (
                <img
                  key={i}
                  src={`${getBaseUrl()}${img}`}
                  alt={`thumb-${i}`}
                  onClick={() => setSelectedImage(`${getBaseUrl()}${img}`)}
                  className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-md cursor-pointer object-cover ${
                    selectedImage === `${getBaseUrl()}${img}`
                      ? "ring-2 ring-blue-500"
                      : ""
                  }`}
                />
              ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col space-y-4 md:space-y-5 text-[#9F9C96] text-base sm:text-lg md:text-xl w-full lg:w-[35%] xl:w-[32%]">
          <div className="space-y-3">
            <h1 className="text-xl sm:text-2xl text-white font-semibold break-words">
              {product.name}
            </h1>
            <p>
              Availability:{" "}
              <span
                className={
                  product.availability === "In Stock"
                    ? "text-[#2ECC71]"
                    : "text-red-600"
                }
              >
                {product.availability}
              </span>
            </p>
            <p className="text-[#9F9C96]">{product.description}</p>

            <div className="space-y-1">
              <p>
                Brand:{" "}
                <span className="text-[#136BFB] cursor-pointer hover:underline">
                  {product.brand?.name || "-"}
                </span>
              </p>
              <p>
                Procedure:{" "}
                <span className="text-[#136BFB] cursor-pointer hover:underline">
                  {product.procedure?.name || "-"}
                </span>
              </p>
            </div>

            <p className="pt-1">
              {IsLogin ? (
                <span className="text-white font-medium text-base">
                  ${product.price}
                </span>
              ) : (
                <span
                  className="text-[#136BFB] font-medium cursor-pointer hover:underline"
                  onClick={() => navigate("/login")}
                >
                  Log In or Sign Up to view price
                </span>
              )}
            </p>

            <div className="border-b border-[#3a3a3a] pt-2 w-full" />
          </div>

          {/* Quantity + Buttons */}
          <div>
            <div className="flex justify-between">
              <label className="block mb-2 text-white font-medium">
                Quantity
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={decrementQuantity}
                  className="w-8 h-8 flex font-bold items-center justify-center rounded-md bg-[#9F9C96] hover:bg-[#3a3a3a] text-white"
                >
                  -
                </button>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-16 px-3 py-1 rounded-md bg-transparent border border-gray-500 text-white text-center"
                />
                <button
                  onClick={incrementQuantity}
                  className="w-8 h-8 flex font-bold items-center justify-center rounded-md bg-[#9F9C96] hover:bg-[#3a3a3a] text-white"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-3 md:pt-4">
              <button className="bg-[#136BFB] hover:bg-[#0f5ed1] px-6 md:px-8 py-2.5 md:py-3 rounded-md font-medium text-white w-full sm:w-auto whitespace-nowrap">
                Buy Now
              </button>
              <button
                onClick={()=>handleAddToCart(product)}
                className="border border-[#136BFB] text-[#136BFB] px-6 md:px-8 py-2.5 md:py-3 rounded-md font-medium w-full sm:w-auto whitespace-nowrap"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>

        {/* Right Side Info */}
        <div className="text-white space-y-3 md:space-y-4 w-full max-w-md mx-auto lg:w-[25%] xl:w-[23%] mt-8 lg:mt-0">
          <div className="flex items-center gap-4 p-4 border border-gray-700 rounded-md">
            <FaTruck className="text-gray-400 text-2xl" />
            <div>
              <h3 className="font-semibold text-white">Fast Delivery</h3>
              <p className="text-sm text-gray-400">
                Enter your Delivery Address
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 border border-gray-700 rounded-md">
            <FaUndo className="text-gray-400 text-2xl" />
            <div>
              <h3 className="font-semibold text-white">Return Delivery</h3>
              <p className="text-sm text-gray-400">
                Free 30 Days Delivery Returns.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 border border-gray-700 rounded-md">
            <FaMedal className="text-gray-400 text-2xl" />
            <div>
              <h3 className="font-semibold text-white">Best Product Quality</h3>
              <p className="text-sm text-gray-400">Customer Service Product</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <img
            src={selectedImage}
            alt="Enlarged"
            className="max-w-[90%] max-h-[90%] rounded-lg"
          />
        </div>
      )}

      {/* Product Details Section */}
      <div className="mt-8 md:mt-10">
        <SectionHeading title="Product Details:" showButton={false} />
        <p className="text-[#9F9C96] mt-3 md:mt-4 leading-7 px-2 sm:px-5 md:px-0 break-words">
          {product.description}
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;

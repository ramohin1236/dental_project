"use client"
import React from 'react'; 
import { useFetchAllHotSellingQuery } from '@/redux/feature/hotSellingApi/HotSellingApi';
import BreadCrumb from '@/components/shared/BreadCrumb';
import SectionHeading from '@/components/shared/SectionHeading';
import HotSellingCard from '@/components/shared/HotSellingCard';
import { getBaseUrl } from '@/utils/getBaseUrl';

const AllHotSelling = () => {
  const { data: products = [], isLoading, error } = useFetchAllHotSellingQuery();
  console.log("Alllllllllllllllllllllllllllllllllllllll",products)

  if (isLoading) {
    return (
      <div className="mx-auto container text-white py-10 px-2 sm:px-5 md:px-0">
        <div className="container mx-auto flex justify-start items-center px-2 sm:px-5 md:px-0">
          <BreadCrumb name="Home" title="Hot Selling" />
        </div>
        <div className="flex justify-center items-center min-h-40">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto container text-white py-10 px-2 sm:px-5 md:px-0">
        <div className="container mx-auto flex justify-start items-center px-2 sm:px-5 md:px-0">
          <BreadCrumb name="Home" title="Hot Selling" />
        </div>
        <div className="w-full flex flex-col items-center justify-center text-center bg-[#1E1E1E]/40 rounded-lg p-10 md:p-14 border border-gray-800 mt-6">
          <h3 className="text-white text-lg md:text-xl font-semibold">Failed to load hot selling products</h3>
          <p className="text-gray-400 mt-1 text-sm md:text-base">Please try again later.</p>
        </div>
      </div>
    );
  }

  const hasProducts = Array.isArray(products) && products.length > 0;
  console.log("dfdsfdsfsdfsdfsdfsdfsddfsd",hasProducts)

  return (
    <div className="mx-auto container text-white py-6 sm:py-8 md:py-10">
      <div className="container mx-auto flex justify-start items-center px-2 sm:px-5 md:px-0">
        <BreadCrumb name="Home" title="Hot Selling" />
      </div>

      <SectionHeading title="Hot Selling" showButton={false} />

      <div className="min-h-screen px-2 sm:px-4 md:px-0 pb-16 md:pb-24">
        {hasProducts ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 w-full items-stretch">
            {products.map((product) => (
              <HotSellingCard
                key={product._id}
                id={product?.productId}
                product={product}
                image={`${getBaseUrl()}${product?.images?.[0]}`}
                title={product?.name}
                description={product?.description}
              />
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center text-center bg-[#1E1E1E]/40 rounded-lg p-10 md:p-14 border border-gray-800">
            <div className="mb-4">
              <svg className="w-12 h-12 text-[#136BFB] animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
            </div>
            <h3 className="text-white text-lg md:text-xl font-semibold">No products found</h3>
            <p className="text-gray-400 mt-1 text-sm md:text-base">Please check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllHotSelling;
"use client"
import React from "react";
import HotSellingCard from "@/components/shared/HotSellingCard";
import SectionHeading from "@/components/shared/SectionHeading";
import { useFetchAllHotSellingQuery } from "@/redux/feature/hotSellingApi/HotSellingApi";
import { getBaseUrl } from "@/utils/getBaseUrl";
import { useRouter } from 'next/navigation'





const HotSelling = () => {
    const { data: products = [] } = useFetchAllHotSellingQuery();
    console.log("Hot Products --->", products); 
  const router = useRouter()
  return (
    <div className="pb-10">
      <SectionHeading
        title="Hot Selling"
        buttonText="View All"
        onButtonClick={() => {
           router.push("/hot-selling");
        }}
      />


      {/* cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 container mx-auto px-5 md:px-0">
        {products.map((product, idx) => (
          <HotSellingCard
            key={product._id}
            id={product.id}
            image={`${getBaseUrl()}${product?.images?.[0]}`}
            title={product?.name}
            description={product.description}
            cardHeight={260}
            cardWidth={260}
            price={product.price}
            onAddToCart={() => alert(`Added to Cart: ${product.title}`)}
            onWishlistClick={() => alert(`Wishlisted: ${product.title}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default HotSelling;

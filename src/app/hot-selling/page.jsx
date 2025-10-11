"use client"
import React from 'react';
import { useFetchAllHotSellingQuery } from '@/redux/feature/hotSellingApi/HotSellingApi';
import BreadCrumb from '@/components/shared/BreadCrumb';
import SectionHeading from '@/components/shared/SectionHeading';
import HotSellingCard from '@/components/shared/HotSellingCard';
import { getBaseUrl } from '@/utils/getBaseUrl';



const AllHotSelling = () => {



 const { data: products = [] } = useFetchAllHotSellingQuery();
    console.log("Hot Products --->", products); 

  return (
    <div className="mx-auto container text-white py-10 px-5 md:px-0">



      <div className="container mx-auto flex justify-start items-center pl-5">
        <BreadCrumb name="Home" title="Hot Selling" />
      </div>

      <SectionHeading title="Hot Selling" showButton={false} />

      {/* Category Cards */}
      {/* cards */}
      <div className='flex gap-5 flex-wrap justify-center space-y-8'>
        {products.map((product, idx) => (
          <HotSellingCard
             key={product._id}
             id={product.id}
           image={`${getBaseUrl()}${product?.images?.[0]}`}
            title={product?.name}
            description={product?.description}
            onViewDetails={() => alert(`View: ${product.title}`)}
            onAddToCart={() => alert(`Added to Cart: ${product.title}`)}
            onWishlistClick={() => alert(`Wishlisted: ${product.title}`)}
          />
        ))}
      </div>



    </div>
  );
};

export default AllHotSelling;
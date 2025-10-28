"use client"
import React from "react";
import BreadCrumb from "@/components/shared/BreadCrumb";
import CategoryCard from "@/components/shared/CategoryCard";
import SectionHeading from "@/components/shared/SectionHeading";
import { getBaseUrl } from "@/utils/getBaseUrl";
import { useFetchAllCategoriesQuery } from "@/redux/feature/category/CategoriesApi";





const AllCategory = () => {
 
  const { data: categories } = useFetchAllCategoriesQuery({});
  console.log(categories)

  return (
    <div>
      <div className="mx-auto container text-white py-10">

        <div className="container mx-auto flex justify-start items-center  px-5 md:px-0">
          <BreadCrumb name="Home" title="Category" />
        </div>

        <SectionHeading
          title="All Category"
          showButton={false}
        ></SectionHeading>

        {/* cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-5 container mx-auto  px-5 md:px-0">
          {categories?.map((category, idx) => (
            <CategoryCard
              key={idx}
              title={category?.name}
              image={`${getBaseUrl()}${category.imageUrl}`}
              link={`/product?category=${encodeURIComponent(category?._id || '')}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCategory;

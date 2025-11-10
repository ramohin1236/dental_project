"use client";

import React from "react";
import ProcedureCard from "@/components/shared/procedureCard";
import SectionHeading from "@/components/shared/SectionHeading";
import { useFetchAllProcedureQuery } from "@/redux/feature/procedure/procedure";

export default function ProcedureGuide() {
  const { data: procedures, isLoading, error } = useFetchAllProcedureQuery({});
  console.log(procedures)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#171717]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error loading procedures. Please try again later.
      </div>
    );
  }

  return (
    <div className="container text-white mx-auto py-8">
      <SectionHeading
        showButton={false}
        title="Insights & Innovations in Dental Care"
      />

      {/* Blog cards */}
      <div className="flex flex-wrap gap-5 px-5 md:px-0">
  {procedures?.map((blog, idx) => {
    
    const shortDescription =
      blog?.description?.length > 150
        ? blog.description.slice(0, 150) + "..."
        : blog?.description;

    return (
      <ProcedureCard
        key={idx}
        image={`${blog.imageUrl}`}
        id={blog?._id}
        title={blog?.name}
        description={shortDescription} 
      
        blogId={blog._id}
      />
    );
  })}
</div>

      {procedures?.length === 0 && (
        <div className="text-center py-10 text-gray-400">
          No blog posts found.
        </div>
      )}
    </div>
  );
}

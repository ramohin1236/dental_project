"use client"
import React from "react";
import BlogCard from "@/components/shared/BlogCard";
import SectionHeading from "@/components/shared/SectionHeading";
import { useFetchAllBlogsQuery } from "@/redux/feature/blog/blogApi";
import { getBaseUrl } from "@/utils/getBaseUrl";



const Blog = () => {


  // const navigate = useNavigate();
  const { data: blogs } = useFetchAllBlogsQuery({});
  console.log(blogs);

  return (
    <div className="container text-white mx-auto">
      <SectionHeading
        showButton={false}
        title="Insights & Innovations in Dental Care"
      />

      {/* cards */}
      <div className="flex gap-5 flex-wrap space-y-5 px-5 md:px-0">
        {blogs?.map((blog, idx) => (
          <BlogCard
            key={idx}
            image={`${getBaseUrl()}${blog.imageUrl?.[0]}`}
            id={blog?._id}
            title={blog?.title}
            description={blog?.description}
            date={new Date(blog.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            blogId={blog.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Blog;

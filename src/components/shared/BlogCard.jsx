import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { MdOutlineDateRange } from 'react-icons/md';

const BlogCard = ({ id,image, title, description, date, blogId }) => {
  const navigate = useRouter();

  const handleNavigate = () => {
    navigate(`/blog/details/${blogId}`);
  };

  return (
    <Link
    href={`/blog/${id}`}
      className="border-[#6F6F6F] border-[1.5px] bg-[#1c1c1c] rounded-md overflow-hidden max-w-[365px] cursor-pointer"
      
    >
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-[240px] object-cover"
        />
      </div>

      {/* content */}
      <div className="p-5 flex flex-col gap-2">
        <p className="text-white text-xl font-semibold cursor-pointer">
          {title}
        </p>
        <p className="text-[#9F9C96] text-sm">{description}</p>
        <div className="text-[#9F9C96] text-sm mt-2 flex items-center gap-2">
          <MdOutlineDateRange className="text-[#9F9C96] text-lg" />
          <span>{date}</span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;

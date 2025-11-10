import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { MdOutlineDateRange } from 'react-icons/md';

const procedureCard = ({ id,image, title, description, date, blogId }) => {
  const navigate = useRouter();

  const handleNavigate = () => {
    navigate(`/blog/details/${blogId}`);
  };

  return (
    <Link
      href={`/procedure_guide/${id}`}
      className="border-[#6F6F6F] border-[1.5px] bg-[#1c1c1c] rounded-md overflow-hidden max-w-[365px] cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-[#136BFB]/20 hover:-translate-y-1"
    >
      <div className="overflow-hidden group">
        <img
          src={image}
          alt={title}
          className="w-full h-[240px] object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/300x300/171717/ffffff?text=No+Image';
          }}
        />
      </div>

      {/* content */}
      <div className="p-5 flex flex-col gap-2">
        <p className="text-white text-xl font-semibold cursor-pointer">
          {title}
        </p>
        <p className="text-[#9F9C96] text-sm">{description}</p>
        
      </div>
    </Link>
  );
};

export default procedureCard;

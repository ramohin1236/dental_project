import React from "react";
import { FaCheck } from "react-icons/fa";

export default function Checkbox({ isSelected }) {
    return (
        <div className="relative">
            <div className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                    isSelected
                        ? 'bg-[#136BFB] border-[#136BFB]'
                        : 'bg-white border-gray-300 hover:border-[#136BFB]'
                }`}>
                {isSelected && (
                    <FaCheck className="w-3 h-3 text-white" />
                )}
            </div>
        </div>
    );
}
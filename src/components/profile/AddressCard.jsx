import React from 'react';
import { TbUserEdit } from 'react-icons/tb';
import { RiDeleteBinLine } from 'react-icons/ri';

const AddressCard = ({
    name,
    type,
    mobile,
    address,
    city,
    onEdit,
    onDelete
}) => {
    const typeColor = type === 'Home' ? 'border-[#136BFB] border-2 text-[#136BFB]' : 'border-green-500 border-2 text-green-500';

    return (
        <div className="p-5 text-white">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-[#9F9C96]">{name}</span>
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium ${typeColor}`}>
                        {type}
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={onEdit}
                        className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <TbUserEdit className="w-4 h-4 text-blue-400" />
                    </button>
                    <button
                        onClick={onDelete}
                        className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <RiDeleteBinLine className="w-4 h-4 text-red-400" />
                    </button>
                </div>
            </div>

            <div className="space-y-2 text-gray-300">
                <p className="text-sm">
                    <span className="font-medium text-[#9F9C96]">Mobile:</span> {mobile}
                </p>
                <p className="text-sm">
                    <span className="font-medium text-[#9F9C96]">Road no:</span> {address}
                </p>
                <p className="text-sm text-[#9F9C96]">{city}</p>
            </div>
        </div>
    );
};

export default AddressCard;
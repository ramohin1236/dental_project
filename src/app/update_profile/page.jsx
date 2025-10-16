'use client'
import React, { useState } from 'react';
import BreadCrumb from '../../components/shared/BreadCrumb';

export default function EditProfile({

    onClose,
   
    initialData = {
        firstName: '',
        lastName: '',
        contact: '',
        gdcNo: ''
    }
}) {
    const [formData, setFormData] = useState(initialData);

    return (
        <div className='py-10'>


                <div className="container mx-auto flex justify-start items-center">
                    <BreadCrumb name="Home" title="Edit Profile" />
                </div>
            <div className="bg-[#202020] rounded-lg p-5 max-w-4xl mx-auto py-10">

                <h2 className="text-2xl font-bold text-white text-center mb-8">Edit Profile</h2>

                <form className="space-y-5">
                    {/* First Name and Last Name Row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-300 text-lg font-bold mb-2">
                                First Name
                            </label>
                            <input
                                type="text"
                                value={formData.firstName}

                                className="w-full px-4 py-3 border-2 border-[#136BFB] rounded-lg text-white placeholder-gray-400"
                                placeholder="Enter first name"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 text-lg font-bold mb-2">
                                Last name
                            </label>
                            <input
                                type="text"
                                value={formData.lastName}

                                className="w-full px-4 py-3 border-2 border-[#136BFB] rounded-lg text-white placeholder-gray-400"
                                placeholder="Enter last name"
                            />
                        </div>
                    </div>

                    {/* Contact Field */}
                    <div>
                        <label className="block text-gray-300 text-lg font-bold mb-2">
                            Contact
                        </label>
                        <div className="relative">
                            <input
                                type="tel"
                                value={formData.contact}

                                className="w-full pl-16 pr-4 py-3 border-2 border-[#136BFB] rounded-lg text-white placeholder-gray-400"
                                placeholder="Enter contact number"
                            />
                        </div>
                    </div>

                    {/* GDC No Field */}
                    <div>
                        <label className="block text-gray-300 text-lg font-bold mb-2">
                            GDC No
                        </label>
                        <input
                            type="text"
                            value={formData.gdcNo}

                            className="w-full px-4 py-3 border-2 border-[#136BFB] rounded-lg text-white placeholder-gray-400"
                            placeholder="Enter GDC number"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-[#136BFB] text-white rounded-lg font-medium"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};


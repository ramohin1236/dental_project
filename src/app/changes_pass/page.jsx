import BreadCrumb from '@/components/shared/BreadCrumb';
import React from 'react';

export default function ChangePassword() {
    return (
        <div className='py-10'>

            <div className="container mx-auto flex justify-start items-center">
                <BreadCrumb name="Home" title="Change Password" />
            </div>
            <div className="bg-[#202020] rounded-lg p-5 max-w-4xl mx-auto py-10">


                <h2 className="text-2xl font-bold text-white text-center mb-8">Change Password</h2>

                <form className="space-y-5">


                    <div>
                        <label className="block text-gray-300 text-lg font-bold mb-2">
                            Current Password
                        </label>
                        <input
                            type="text"


                            className="w-full px-4 py-3 border-2 border-[#136BFB] rounded-lg text-white placeholder-gray-400"
                            placeholder="Enter GDC number"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 text-lg font-bold mb-2">
                            New Password
                        </label>
                        <input
                            type="text"


                            className="w-full px-4 py-3 border-2 border-[#136BFB] rounded-lg text-white placeholder-gray-400"
                            placeholder="Enter GDC number"
                        />
                    </div>



                    <div>
                        <label className="block text-gray-300 text-lg font-bold mb-2">
                            Confirm Password
                        </label>
                        <input
                            type="text"


                            className="w-full px-4 py-3 border-2 border-[#136BFB] rounded-lg text-white placeholder-gray-400"
                            placeholder="Enter GDC number"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"

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


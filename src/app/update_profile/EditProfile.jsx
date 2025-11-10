'use client'
import React, { useEffect, useState } from 'react';
import BreadCrumb from '../../components/shared/BreadCrumb';
import { useGetMyProfileQuery, useUpdateUserMutation } from '@/redux/feature/users/usersApi';
import { useDispatch, useSelector } from 'react-redux';
import usersApi from '@/redux/feature/users/usersApi';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function EditProfile() {
    const navigate = useRouter();
    const dispatch = useDispatch();
    const authUser = useSelector((state) => state?.auth?.user);
    const { data, isLoading, isFetching, error } = useGetMyProfileQuery();
    
    const profile = data?.data || data || {};
    const [updateUser, { isLoading: saving }] = useUpdateUserMutation();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobile: '',
        gdc: '',
    });
    const [countryCode, setCountryCode] = useState('+880');
    const [imagePreview, setImagePreview] = useState('');
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        if (!isLoading && !isFetching && profile) {
            let mobileRaw = profile.phone || profile.mobile || '';
            let code = countryCode;
            let local = mobileRaw;
            const match = String(mobileRaw).match(/^\+(\d{1,3})(.*)$/);
            if (match) {
                code = `+${match[1]}`;
                local = match[2].replace(/\D/g, '');
            }
            setCountryCode(code);
            setFormData({
                firstName: profile.firstName || profile.name?.split(' ')?.[0] || '',
                lastName: profile.lastName || (profile.name?.split(' ')?.slice(1).join(' ') || ''),
                mobile: local || '',
                gdc: profile.gdcNumber || profile.gdc || '',
            });
            setImagePreview(profile.image || profile.imageUrl || '');
        }
    }, [profile, isLoading, isFetching]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                Swal.fire({ icon: 'error', title: 'Invalid file type', text: 'Please select an image file.' });
                return;
            }
            
            if (file.size > 5 * 1024 * 1024) {
                Swal.fire({ icon: 'error', title: 'File too large', text: 'Please select an image smaller than 5MB.' });
                return;
            }

            setImageFile(file);
            
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const digits = String(formData.mobile || '').replace(/\D/g, '');
            if (digits && (digits.length < 10 || digits.length > 15)) {
                Swal.fire({ icon: 'warning', title: 'Invalid mobile number', text: 'Enter 10-15 digits.' });
                return;
            }
           
            const formDataToSend = new FormData();
            
            if (formData.firstName) formDataToSend.append('firstName', formData.firstName);
            if (formData.lastName) formDataToSend.append('lastName', formData.lastName);
            if (digits) {
                const cc = String(countryCode || '').replace(/\D/g, '');
                formDataToSend.append('phone', `+${cc}${digits}`);
            }
            if (formData.gdc) formDataToSend.append('gdcNumber', formData.gdc);
            
            // Append image file if selected
            if (imageFile) {
                formDataToSend.append('image', imageFile);
            }

            const res = await updateUser({ body: formDataToSend }).unwrap();
            
            const updated = res?.data || res || formData;
            try {
                dispatch(
                    usersApi.util.updateQueryData('getMyProfile', undefined, (draft) => {
                        if (!draft || typeof draft !== 'object') return updated;
                        if (draft.data && typeof draft.data === 'object') {
                            Object.assign(draft.data, updated);
                        } else {
                            Object.assign(draft, updated);
                        }
                    })
                );
            } catch {}
            
            Swal.fire({ icon: 'success', title: res?.message || 'Profile updated successfully' });
            navigate.push('/profile');
        } catch (err) {
            Swal.fire({ 
                icon: 'error', 
                title: 'Failed to update profile', 
                text: err?.data?.message || 'Please try again' 
            });
        }
    };

    if (isLoading || isFetching) {
        return (
            <div className='py-10'>
                <div className="container mx-auto flex justify-start items-center">
                    <BreadCrumb name="Home" title="Edit Profile" />
                </div>
                <div className="text-center text-gray-400 py-10">Loading profile...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='py-10'>
                <div className="container mx-auto flex justify-start items-center">
                    <BreadCrumb name="Home" title="Edit Profile" />
                </div>
                <div className="text-center text-red-500 py-10">Failed to load profile</div>
            </div>
        );
    }

    return (
        <div className='py-10'>
            <div className="container mx-auto flex justify-start items-center">
                <BreadCrumb name="Home" title="Edit Profile" />
            </div>
            
            <div className="bg-[#202020] rounded-lg p-5 max-w-4xl mx-auto py-10">
                <h2 className="text-2xl font-bold text-white text-center mb-8">Edit Profile</h2>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Profile Image Upload */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full border-4 border-[#136BFB] overflow-hidden bg-gray-700">
                                {imagePreview ? (
                                    <img 
                                        src={imagePreview} 
                                        alt="Profile preview" 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            
                            {/* Upload Button */}
                            <label 
                                htmlFor="profile-image"
                                className="absolute bottom-0 right-0 bg-[#136BFB] text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <input
                                    id="profile-image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        </div>

                     
                    </div>

                    {/* First Name and Last Name Row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-300 text-lg font-bold mb-2">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-[#136BFB] rounded-lg text-white placeholder-gray-400 bg-transparent"
                                placeholder="Enter first name"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 text-lg font-bold mb-2">
                                Last name
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-[#136BFB] rounded-lg text-white placeholder-gray-400 bg-transparent"
                                placeholder="Enter last name"
                            />
                        </div>
                    </div>

                    {/* Mobile with Country Code */}
                    <div>
                        <label className="block text-gray-300 text-lg font-bold mb-2">Mobile</label>
                        <div className="flex gap-2">
                            <select
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                                className="px-3 py-3 border-2 border-[#136BFB] rounded-lg bg-[#171717] text-white min-w-[110px]"
                            >
                                <option value="+880">+880 (BD)</option>
                                <option value="+91">+91 (IN)</option>
                                <option value="+1">+1 (US)</option>
                                <option value="+44">+44 (UK)</option>
                                <option value="+971">+971 (AE)</option>
                                <option value="+61">+61 (AU)</option>
                            </select>
                            <input
                                type="tel"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                className="flex-1 px-4 py-3 border-2 border-[#136BFB] rounded-lg text-white placeholder-gray-400 bg-transparent"
                                placeholder="Enter mobile number"
                            />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Your number will be saved as E.164, e.g., {countryCode}{formData.mobile?.replace(/\D/g,'')}</p>
                    </div>

                    {/* GDC No Field */}
                    <div>
                        <label className="block text-gray-300 text-lg font-bold mb-2">
                            GDC
                        </label>
                        <input
                            type="text"
                            name="gdc"
                            value={formData.gdc}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 border-[#136BFB] rounded-lg text-white placeholder-gray-400 bg-transparent"
                            placeholder="Enter GDC number"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate.push('/profile')}
                            className="w-1/3 px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 px-6 py-3 bg-[#136BFB] text-white rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
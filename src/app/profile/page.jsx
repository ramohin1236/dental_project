"use client";
import AddressSection from "@/components/profile/AddressSection";
import ProfileCard from "@/components/profile/ProfileCard";
import BreadCrumb from "@/components/shared/BreadCrumb";
import { useFetchUserAddressesByIdQuery } from "@/redux/feature/address/addressApi";
import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const handleChangePassword = () => {
    console.log("Change password clicked");
  };
  const user = useSelector((state) => state?.auth?.user);
  console.log("Logged in user:", user);
  console.log(user?.userId)

  // const {data: addressList,isLoading,error} = useFetchUserAddressesByIdQuery(user?.userId, {
  //   skip: !user?.userId,
  // });

  // console.log("Address Response =>", addressList);

  if (!user || !user.userId) {
  return <p>User not found</p>;
}

  return (
    <div>
      <div className="container mx-auto flex justify-start items-center py-10">
        <BreadCrumb name="Home" title="Profile" />
      </div>
      <div className="min-h-screen p-5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Profile Section */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md">
                <ProfileCard
                  name="Mr.jhon"
                  email={user?.email}
                  phone="01226565448545"
                  avatar="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
                  onChangePassword={handleChangePassword}
                />
              </div>
            </div>

            {/* Address Section */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-full max-w-md">
                <AddressSection
                  // addressList={addressList}
                  // isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

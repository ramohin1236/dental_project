"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import AddressCard from "./AddressCard";

export default function AddressSection() {
    // console.log(addressList)
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Sujon",
      type: "Home",
      mobile: "018XXXXXXX",
      address: "03, C - block, Banasree",
      city: "Dhaka North, Dhaka",
    },
    {
      id: 2,
      name: "Sujon",
      type: "Office",
      mobile: "018XXXXXXX",
      address: "03, C - block, Banasree",
      city: "Dhaka North, Dhaka",
    },
  ]);

  const handleEdit = (id) => {
    console.log("Edit address:", id);
  };

  const handleDelete = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const navigate = useRouter();
  const handleAddNew = () => {
    navigate("/add-new-address");
  };

  return (
    <div className="bg-[#202020] rounded-lg p-5">
      <div className="flex items-center justify-center mb-5">
        <h2 className="text-2xl font-bold text-white underline">
          Address information
        </h2>
      </div>

      <div className="space-y-5 mb-5">
        {addresses.map((address) => (
          <AddressCard
            key={address.id}
            name={address.name}
            type={address.type}
            mobile={address.mobile}
            address={address.address}
            city={address.city}
            onEdit={() => handleEdit(address.id)}
            onDelete={() => handleDelete(address.id)}
          />
        ))}
      </div>

      <button
        onClick={handleAddNew}
        className="w-1/2 mx-auto bg-[#136BFB] text-white py-3 px-3 rounded-lg font-semibold flex items-center justify-center gap-2 mb-2"
      >
        Add new Address
      </button>
    </div>
  );
}

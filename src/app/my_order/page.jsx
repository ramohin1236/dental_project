"use client"
import React, { useState } from "react";
import { ConfigProvider, Table, Select } from "antd";
import { IoEyeOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";
import BreadCrumb from "@/components/shared/BreadCrumb";



export default function AllOrder() {
  const [userDetailsModal, setUserDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchText, setSearchText] = useState("");

  const AllOrderData = [
    {
      key: "#1201",
      no: "1",
      products: "Root canal kit, Gloves",
      qty: "12",
      total: "123456",
      status: "Pending",
    },
    {
      key: "#1202",
      no: "2",
      customer: "Liam Smith",
      products: "Dental Mirror",
      qty: "5",
      total: "45678",
      status: "Processing",
    },
    {
      key: "#1203",
      no: "3",
      customer: "Emma Johnson",
      products: "Syringes",
      qty: "20",
      total: "98765",
      status: "Shipped",
    },
    {
      key: "#1204",
      no: "4",
      customer: "Noah Brown",
      products: "Gloves, Masks",
      qty: "50",
      total: "12300",
      status: "Cancelled",
    },
    {
      key: "#1205",
      no: "5",
      customer: "Olivia Jones",
      products: "X-ray Film",
      qty: "10",
      total: "23450",
      status: "Shipped",
    },
    {
      key: "#1206",
      no: "6",
      customer: "Ava Garcia",
      products: "Dental Drill",
      qty: "3",
      total: "76543",
      status: "Processing",
    },
    {
      key: "#1207",
      no: "7",
      customer: "William Martinez",
      products: "Face Shields",
      qty: "15",
      total: "11200",
      status: "Pending",
    },
    {
      key: "#1208",
      no: "8",
      customer: "James Rodriguez",
      products: "Anesthetic",
      qty: "8",
      total: "22000",
      status: "Cancelled",
    },
    {
      key: "#1209",
      no: "9",
      customer: "Sophia Lee",
      products: "Gloves",
      qty: "100",
      total: "15000",
      status: "Shipped",
    },
    {
      key: "#1210",
      no: "10",
      customer: "Benjamin Walker",
      products: "Masks",
      qty: "60",
      total: "9000",
      status: "Pending",
    }
  ];

  const getStatusStyle = (status) => {
    const styles = {
      Pending: "bg-yellow-100 text-yellow-800",
      Processing: "bg-blue-100 text-blue-800",
      Shipped: "bg-green-100 text-green-800",
      Cancelled: "bg-red-100 text-red-800",
    };
    return styles[status] || "bg-gray-100 text-gray-800";
  };
  const navigate = useRouter();
  const columns = [
    { title: "Order Id", dataIndex: "key", key: "key" },

    {
      title: "Product",
      key: "product",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={`https://avatar.iran.liara.run/public/${record?.no}`}
            className="w-10 h-10 object-cover rounded-full"
            alt="User Avatar"
          />
          <span>{record?.products}</span>
        </div>
      ),
    },
    { title: "Quantity", dataIndex: "qty", key: "qty" },
    { title: "Price", dataIndex: "total", key: "total" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <span
          className={`px-2 py-2 rounded text-sm font-medium ${getStatusStyle(
            record.status
          )}`}
        >
          {record.status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedUser(record);
              setUserDetailsModal(true);
              navigate("/order-details");
            }}
            className="border border-[#3b3b3b] text-[#3b3b3b] rounded-lg p-[6px]"
            title="View Details"
          >
            <IoEyeOutline className="w-5 h-5 text-[#3b3b3b]" />
          </button>
        </div>
      ),
    },
  ];
  const filteredData = AllOrderData.filter((item) => {
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;
    const matchesSearch =
      (item.customer && item.customer.toLowerCase().includes(searchText.toLowerCase())) ||
      (item.products && item.products.toLowerCase().includes(searchText.toLowerCase())) ||
      (item.key && item.key.toLowerCase().includes(searchText.toLowerCase()));
    return matchesStatus && matchesSearch;
  });
  const handleStatusChange = (orderId, newStatus) => {
    console.log(`Order ${orderId} status updated to ${newStatus}`);
    alert(`Order ${orderId} status changed to ${newStatus}`);
  };

  return (
    <div className="container mx-auto">
      <div className="container mx-auto flex justify-start items-center">
        <BreadCrumb name="Home" title="My Orders" />
      </div>
      <div className="flex items-center justify-between py-5">
        <h1 className="text-2xl font-bold text-white">My Orders</h1>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CiSearch className="h-4 w-4 text-[#136BFB]" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="bg-black border border-[#136BFB] rounded-xl pl-10 pr-4 py-2 text-white placeholder-[#136BFB] focus:outline-none w-64"
          />
        </div>
      </div>
      <ConfigProvider
        theme={{
          components: {
            InputNumber: {
              activeBorderColor: "#14803c",
            },
            Pagination: {
              colorPrimaryBorder: "#3b3b3b",
              colorBorder: "#3b3b3b",
              colorTextPlaceholder: "#3b3b3b",
              colorTextDisabled: "#3b3b3b",
              colorBgTextActive: "#3b3b3b",
              itemActiveBgDisabled: "#3b3b3b",
              itemActiveColorDisabled: "#3b3b3b",
              itemBg: "#3b3b3b",
              colorBgTextHover: "#3b3b3b",
              colorPrimary: "#3b3b3b",
              colorPrimaryHover: "#3b3b3b",
            },
            Table: {
              headerBg: "#3b3b3b",
              headerColor: "#fff",
              cellFontSize: 16,
              headerSplitColor: "#3b3b3b",
            },
          },
        }}
      >
        <Table
          dataSource={filteredData}
          columns={columns}
          pagination={{ pageSize: 10 }}
          scroll={{ x: true }}
        />
      </ConfigProvider>
    </div>
  );
}




"use client"
import React, { useMemo, useState } from "react";
import { ConfigProvider, Table } from "antd";
import { IoEyeOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";
import BreadCrumb from "@/components/shared/BreadCrumb";
import { useGetMyOrdersQuery } from "@/redux/feature/orders/ordersApi";
import { getBaseUrl } from "@/utils/getBaseUrl";



export default function AllOrder() {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, isLoading, isFetching, error } = useGetMyOrdersQuery({ page, limit });

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

  const rawOrders = data?.data?.items || data?.items || data?.data || [];
  const totalOrders = data?.meta?.total || data?.data?.meta?.total || data?.total || rawOrders.length;

  console.log("---->",data)

  const tableData = useMemo(() => {
    return (Array.isArray(rawOrders) ? rawOrders : []).map((order, idx) => {
      const prods = Array.isArray(order.products) ? order.products : [];
      const qty = prods.reduce((sum, p) => sum + (Number(p.quantity) || 0), 0);
      const names = prods.slice(0, 2).map(p => p.name).filter(Boolean).join(', ');
      const more = prods.length > 2 ? ` +${prods.length - 2} more` : '';
      const first = prods[0] || {};
      // Try multiple shapes: order.products[] may include image, images[], or nested product fields
      let img = first?.image
        || (Array.isArray(first?.images) ? first.images[0] : "")
        || first?.product?.image
        || (Array.isArray(first?.product?.images) ? first.product.images[0] : "");
      if (img && !/^https?:\/\//i.test(img)) {
        img = `${getBaseUrl()}${img}`;
      }
      return {
        key: order._id || order.id || `#${idx + 1}`,
        orderId: order._id || order.id,
        products: names || '—',
        qty: qty || 0,
        total: order.total ?? order.subtotal ?? 0,
        status: order.status || order.paymentStatus || 'pending',
        image: img || '/image.png',
      }
    });
  }, [rawOrders]);
  const columns = [
    { title: "Order Id", dataIndex: "key", key: "key" },

    {
      title: "Product",
      key: "product",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-neutral-700 overflow-hidden flex items-center justify-center">
            <img
              src={record?.image}
              alt={record?.products || 'Product'}
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = '/image.png'; }}
            />
          </div>
          <span>{record?.products}</span>
        </div>
      ),
    },
    { title: "Quantity", dataIndex: "qty", key: "qty" },
    { title: "Price", dataIndex: "total", key: "total", render: (v) => `$${Number(v || 0).toFixed(2)}` },
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
              if (record?.orderId) {
                navigate.push(`/my_order/${record.orderId}`);
              }
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
  const filteredData = useMemo(() => {
    if (!searchText) return tableData;
    const txt = searchText.toLowerCase();
    return tableData.filter((row) =>
      String(row.key).toLowerCase().includes(txt) ||
      String(row.products || '').toLowerCase().includes(txt) ||
      String(row.status || '').toLowerCase().includes(txt)
    );
  }, [tableData, searchText]);

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
          loading={isLoading || isFetching}
          pagination={{
            current: page,
            pageSize: limit,
            total: totalOrders,
            onChange: (p, ps) => { setPage(p); setLimit(ps); },
            showSizeChanger: true,
          }}
          scroll={{ x: true }}
          locale={{
            emptyText: error ? 'Failed to load orders' : 'No orders found',
          }}
        />
      </ConfigProvider>
    </div>
  );
}




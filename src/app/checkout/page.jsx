"use client"

import React, { useState } from "react"
import { RiDeleteBinLine } from "react-icons/ri"
import { TbUserEdit } from "react-icons/tb"
import { useRouter } from "next/navigation"
import BreadCrumb from "@/components/shared/BreadCrumb"
import Checkbox from "@/components/shared/Checkbox"
import { useSelector, useDispatch } from 'react-redux'
import { getBaseUrl } from '@/utils/getBaseUrl'
import { updateQuantity } from '@/redux/feature/cart/cartSlice'


export default function Checkout() {

    const [isSelected, setIsSelected] = useState("")
    const [selectedPayment, setSelectedPayment] = useState("")
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [editFormData, setEditFormData] = useState({
        name: "",
        type: "",
        mobile: "",
        address: "",
        location: ""
    })

    const addresses = [
        {
            id: "home",
            name: "Sujon",
            type: "Home",
            mobile: "018XXXXXXX",
            address: "Road no: 03 , C - block , Banasree",
            location: "Dhaka North , Dhaka",
        },
        {
            id: "office",
            name: "Sujon",
            type: "Office",
            mobile: "018XXXXXXX",
            address: "Road no: 03 , C - block , Banasree",
            location: "Dhaka North , Dhaka",
        },
    ]
    const router = useRouter()
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart || {})
    const products = cart.products || []
    const selectedProducts = products.filter(p => p.selected)
    const subtotal = cart.selectedSubtotal ?? selectedProducts.reduce((s, p) => s + (p.price * p.quantity), 0)
    const shippingFee = 5.00
    const total = subtotal + shippingFee
    return (
        <div className="px-5 md:px-0">
            <div className="container mx-auto flex justify-start items-center">
                <BreadCrumb name="Home" title="Checkout" />
            </div>
            <div className="container mx-auto  grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Shipping Address */}
                <div className="space-y-5 bg-[#202020] p-5 rounded-lg">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl text-white font-semibold">Select Shipping Address</h2>
                        <button onClick={() => navigate("/add-new-address")} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                            Add New Address
                        </button>
                    </div>
                    <div className="border-b-2 border-gray-700 my-5"></div>

                    <div className="space-y-5">
                        {addresses.map((address) => (
                            <div
                                key={address.id}
                                className="bg-neutral-700 border border-gray-700 rounded-lg p-4"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start space-x-3">
                                        <div onClick={() => setIsSelected(address.id)} className="cursor-pointer">
                                            <Checkbox isSelected={isSelected === address.id} />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <span className="font-medium">{address.name}</span>
                                                <span
                                                    className={`px-2 py-1 text-xs rounded ${address.type === "Home"
                                                        ? "bg-blue-600 text-blue-100"
                                                        : "bg-green-600 text-green-100"
                                                        }`}
                                                >
                                                    {address.type}
                                                </span>
                                            </div>
                                            <p className="text-gray-300 text-sm">Mobile: {address.mobile}</p>
                                            <p className="text-gray-300 text-sm">{address.address}</p>
                                            <p className="text-gray-300 text-sm">{address.location}</p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => {
                                                setSelectedAddress(address)
                                                setEditFormData({
                                                    name: address.name,
                                                    type: address.type,
                                                    mobile: address.mobile,
                                                    address: address.address,
                                                    location: address.location
                                                })
                                                setShowEditModal(true)
                                            }}
                                            className="text-blue-400 hover:text-blue-300"
                                        >
                                            <TbUserEdit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedAddress(address)
                                                setShowDeleteModal(true)
                                            }}
                                            className="text-red-400 hover:text-red-300"
                                        >
                                            <RiDeleteBinLine className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Summary + Payment */}
                <div className="space-y-5 bg-[#202020] p-5 rounded-lg">
                    {/* Order Summary */}
                    <div className="p-5 text-gray-300">
                        <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-300 mb-4">
                            <span>Product</span>
                            <span className="text-center">QTY</span>
                            <span className="text-right">Price</span>
                        </div>
                        <div className="border-b-2 border-gray-700 my-5"></div>

                        {selectedProducts.length === 0 ? (
                            <div className="py-4 text-center text-gray-400">No items selected in cart.</div>
                        ) : (
                            selectedProducts.map((product) => (
                                <div key={product._id} className="grid grid-cols-3 gap-4 items-center py-4 border-b border-gray-700">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                                            <img
                                                src={product.images && product.images[0] ? `${getBaseUrl()}${product.images[0]}` : '/image.png'}
                                                alt={product.name}
                                                className="rounded w-10 h-10"
                                            />
                                        </div>
                                        <span className="text-sm text-gray-300">{product.name}</span>
                                    </div>
                                    <span className="text-center">{String(product.quantity).padStart(2, '0')}</span>
                                    <span className="text-right">{(product.price * product.quantity).toFixed(2)}$</span>
                                </div>
                            ))
                        )}

                        <div className="flex justify-between py-3 text-sm text-gray-300">
                            <span>Delivery Fee</span>
                            <span>{shippingFee.toFixed(2)}$</span>
                        </div>

                        <div className="flex justify-between py-3 border-t border-gray-700 font-semibold">
                            <span>Total :</span>
                            <span className="text-blue-400">{total.toFixed(2)}$</span>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="p-5 text-gray-300">
                        <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div onClick={() => setSelectedPayment("bank")} className="cursor-pointer">
                                        <Checkbox isSelected={selectedPayment === "bank"} />
                                    </div>
                                    <span onClick={() => setSelectedPayment("bank")} className="cursor-pointer">Bank</span>
                                </div>

                                <div className="flex space-x-2">
                                    <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-xs font-bold">
                                        VISA
                                    </div>
                                    <div className="w-10 h-6 bg-gradient-to-r from-red-500 to-yellow-500 rounded flex items-center justify-center">
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-yellow-500 rounded-full -ml-1"></div>
                                    </div>
                                    <div className="w-10 h-6 bg-blue-500 rounded flex items-center justify-center text-xs font-bold">
                                        PP
                                    </div>
                                    <div className="w-10 h-6 bg-white rounded flex items-center justify-center text-xs font-bold text-gray-800">
                                        G Pay
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <div onClick={() => setSelectedPayment("cod")} className="cursor-pointer">
                                    <Checkbox isSelected={selectedPayment === "cod"} />
                                </div>
                                <span onClick={() => setSelectedPayment("cod")} className="cursor-pointer">Cash On Delivery</span>
                            </div>
                        </div>

                        <div className="flex justify-center w-1/2 mx-auto">
                            <button
                                onClick={() => setShowSuccessModal(true)}
                                className="w-full bg-[#136BFB] text-white py-3 mt-6 rounded-lg font-semibold hover:bg-[#0f5ae6] transition-colors"
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {showEditModal && (
                <div className="fixed inset-0 opacity-100 shadow-lg flex items-center justify-center z-50">
                    <div className="bg-[#202020] rounded-lg p-6 w-full max-w-md mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-white">Edit Address</h3>
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                                <input
                                    type="text"
                                    value={editFormData.name}
                                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                    className="w-full px-3 py-2 bg-neutral-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Type</label>
                                <select
                                    value={editFormData.type}
                                    onChange={(e) => setEditFormData({ ...editFormData, type: e.target.value })}
                                    className="w-full px-3 py-2 bg-neutral-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                >
                                    <option value="Home">Home</option>
                                    <option value="Office">Office</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Mobile</label>
                                <input
                                    type="text"
                                    value={editFormData.mobile}
                                    onChange={(e) => setEditFormData({ ...editFormData, mobile: e.target.value })}
                                    className="w-full px-3 py-2 bg-neutral-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Address</label>
                                <input
                                    type="text"
                                    value={editFormData.address}
                                    onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                                    className="w-full px-3 py-2 bg-neutral-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
                                <input
                                    type="text"
                                    value={editFormData.location}
                                    onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                                    className="w-full px-3 py-2 bg-neutral-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    // Handle save logic here
                                    console.log('Saving address:', editFormData)
                                    setShowEditModal(false)
                                }}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-10 shadow-lg flex items-center justify-center z-50">
                    <div className="bg-[#202020] rounded-lg p-6 w-full max-w-md mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-white">Delete Address</h3>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="mb-6">
                            <p className="text-gray-300 mb-4">Are you sure you want to delete this address?</p>
                            {selectedAddress && (
                                <div className="bg-neutral-700 rounded-lg p-3">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <span className="font-medium text-white">{selectedAddress.name}</span>
                                        <span className={`px-2 py-1 text-xs rounded ${selectedAddress.type === "Home"
                                            ? "bg-blue-600 text-blue-100"
                                            : "bg-green-600 text-green-100"
                                            }`}>
                                            {selectedAddress.type}
                                        </span>
                                    </div>
                                    <p className="text-gray-300 text-sm">{selectedAddress.address}</p>
                                    <p className="text-gray-300 text-sm">{selectedAddress.location}</p>
                                </div>
                            )}
                        </div>

                        <div className="flex space-x-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    // Handle delete logic here
                                    console.log('Deleting address:', selectedAddress)
                                    setShowDeleteModal(false)
                                }}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-[#202020] rounded-lg p-8 w-full max-w-md mx-4 text-center">
                        <div className="mb-6">
                            {/* Success Icon */}
                            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2">Order Placed Successfully!</h3>
                            <p className="text-gray-300 mb-4">Thank you for your order. We'll send you a confirmation email shortly.</p>

                            <div className="bg-neutral-700 rounded-lg p-4 mb-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-300">Order ID:</span>
                                    <span className="text-white font-semibold">#ORD-{Date.now().toString().slice(-6)}</span>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-300">Total Amount:</span>
                                    <span className="text-green-400 font-semibold">${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-300">Estimated Delivery:</span>
                                    <span className="text-white">3-5 Business Days</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={() => {
                                    setShowSuccessModal(false)
                                    router.push('/product')
                                }}
                                className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

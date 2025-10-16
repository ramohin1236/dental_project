"use client"
import BreadCrumb from '@/components/shared/BreadCrumb';
import CartHeader from '@/components/shoppingCart/CartHeader';
import CartItem from '@/components/shoppingCart/CartItem';
import OrderSummary from '@/components/shoppingCart/OrderSummary';
import { updateQuantity } from '@/redux/feature/cart/cartSlice';
import { getBaseUrl } from '@/utils/getBaseUrl';
import { useRouter } from 'next/navigation';
import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ShoppingCart = () => {
    const cart = useSelector((state) => state?.cart || {});
    const products = cart.products || [];
    const dispatch = useDispatch();

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const selectedProducts = products.filter(p => p.selected);
    const subtotal = cart.selectedSubtotal ?? selectedProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0);

    const shippingFee = 5.00;
    const total = subtotal + shippingFee;

    const allSelected = products.length > 0 && products.every(product => product.selected);
    
    console.log("Cart Products:", products);

    const handleToggleSelect = (id) => {
        dispatch({ type: 'cart/toggleSelect', payload: { id } });
    };

    const handleSelectAll = () => {
        dispatch({ type: 'cart/selectAll', payload: { selected: !allSelected } });
    };

    const handleUpdateQuantity = (id, type) => {
        const payload = {type, id}
        dispatch(updateQuantity(payload))
    };

    const handleDeleteSelected = () => {
        dispatch({ type: 'cart/removeSelected' });
    };

    const router = useRouter();
    
    const handleProceedToCheckout = () => {
        router.push("/checkout");
    };

    // ✅ Safe image URL generator
    const getProductImage = (product) => {
        // Check if images array exists and has at least one image
        if (product?.images && product.images.length > 0 && product.images[0]) {
            return `${getBaseUrl()}${product.images[0]}`;
        }
        
        // Fallback image jodi kono image na thake
        return "/default-product-image.jpg"; // Tomar project e ekta default image path dao
    };

    return (
        <div className="min-h-screen py-10 px-5 md:px-0">
            <div className="container mx-auto">
                <div className="container mx-auto flex justify-start items-center">
                    <BreadCrumb name="Home" title="Cart" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {/* Cart Items Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-[#202020] rounded-lg p-5">
                            <CartHeader
                                onSelectAll={handleSelectAll}
                                onDeleteSelected={handleDeleteSelected}
                                allSelected={allSelected}
                            />

                            <div className="mb-5">
                                <div className="flex items-center justify-between text-gray-400 text-sm font-medium mb-4">
                                    <span>Product</span>
                                    <span>QTY</span>
                                </div>
                                <div className='border-t border-gray-600 pt-4'></div>
                            </div>

                            <div className="space-y-0">
                                {!mounted ? (
                                    // Render the same placeholder on server and initial client to avoid hydration mismatch
                                    <div className="text-center py-10 text-gray-400">Your cart is empty</div>
                                ) : (
                                    products.length > 0 ? (
                                        products.map((product) => (
                                            <CartItem
                                                key={product._id}
                                                product={product}
                                                id={product._id}
                                                name={product?.name || "Unnamed Product"}
                                                price={product?.price || 0}
                                                quantity={product?.quantity || 1}
                                                image={getProductImage(product)}
                                                isSelected={product.selected}
                                                onToggleSelect={handleToggleSelect}
                                                onUpdateQuantity={handleUpdateQuantity}
                                            />
                                        ))
                                    ) : (
                                        <div className="text-center py-10 text-gray-400">Your cart is empty</div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Section */}
                    <div className="lg:col-span-1 bg-[#202020]">
                        <OrderSummary
                            subtotal={subtotal}
                            shippingFee={shippingFee}
                            total={total}
                            onProceedToCheckout={handleProceedToCheckout}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
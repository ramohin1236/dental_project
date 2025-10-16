import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import { getBaseUrl } from '@/utils/getBaseUrl';

const OrderSummary = ({
    subtotal,
    total,
    onProceedToCheckout
}) => {
    const cart = useSelector(state => state.cart || {});
    const products = cart.products || [];
    const selectedProducts = products.filter(p => p.selected);

    return (
        <div className=" rounded-lg p-5">
            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6">
                {selectedProducts?.length === 0 ? (
                    <div className="text-gray-400 text-sm">No items selected</div>
                ) : (
                    selectedProducts?.slice(0, 4).map((product) => (
                        <div key={product._id} className="flex items-center justify-start gap-3">
                            <div className="w-12 h-12 bg-neutral-700 rounded overflow-hidden flex-shrink-0">
                                <img
                                    src={product.images && product.images[0] ? `${getBaseUrl()}${product.images[0]}` : '/image.png'}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1 text-sm">
                                <div className="text-white font-medium truncate">{product.name}</div>
                                <div className="text-gray-400">Qty: {product.quantity}</div>
                            </div>
                            <div className="text-sm text-white font-semibold">${(product.price * product.quantity).toFixed(2)}</div>
                        </div>
                    ))
                )}
            </div>

            <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-white font-semibold">{subtotal.toFixed(2)}$</span>
                </div>
                <div className="border-t border-gray-600 pt-4">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-lg">Total :</span>
                        <span className="text-blue-400 font-bold text-xl">{total.toFixed(2)}$</span>
                    </div>
                </div>
            </div>

            <Link
            
                href='/checkout'
                className="w-full bg-[#136BFB] hover:bg-[#136BFB] text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200"
            >
                Proceed To Checkout
            </Link>
        </div>
    );
};

export default OrderSummary;
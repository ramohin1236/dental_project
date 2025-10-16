import React, { useState, useMemo } from 'react';
import CartHeader from './CartHeader';
import CartItem from './CartItem';
import OrderSummary from './OrderSummary';
import BreadCrumb from '../../components/shared/BreadCrumb';
import { useNavigate } from 'react-router-dom';



const ShoppingCart = () => {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: 'Walden Tesla Air Rotor',
            price: 300.00,
            quantity: 1,
            image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400',
            selected: true
        }
    ]);

    const selectedProducts = useMemo(() =>
        products.filter(product => product.selected),
        [products]
    );

    const subtotal = useMemo(() =>
        selectedProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0),
        [selectedProducts]
    );

    const shippingFee = 5.00;
    const total = subtotal + shippingFee;

    const allSelected = products.length > 0 && products.every(product => product.selected);

    const handleToggleSelect = (id) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, selected: !product.selected } : product
        ));
    };

    const handleSelectAll = () => {
        const newSelectedState = !allSelected;
        setProducts(products.map(product => ({ ...product, selected: newSelectedState })));
    };

    const handleUpdateQuantity = (id, quantity) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, quantity } : product
        ));
    };

    const handleDeleteSelected = () => {
        setProducts(products.filter(product => !product.selected));
    };
    const navigate = useNavigate();
    const handleProceedToCheckout = () => {
        navigate("/checkout");
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
                                {products.map((product) => (
                                    <CartItem
                                        key={product.id}
                                        id={product.id}
                                        name={product.name}
                                        price={product.price}
                                        quantity={product.quantity}
                                        image={product.image}
                                        isSelected={product.selected}
                                        onToggleSelect={handleToggleSelect}
                                        onUpdateQuantity={handleUpdateQuantity}
                                    />
                                ))}
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
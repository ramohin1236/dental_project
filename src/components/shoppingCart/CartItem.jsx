import React from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import Checkbox from '../../components/shared/Checkbox';
import { useDispatch } from 'react-redux';
import { updateQuantity } from '@/redux/feature/cart/cartSlice';

const CartItem = ({
    product,
    id,
    name,
    price,
    quantity,
    image,
    isSelected,
    onToggleSelect,
    onUpdateQuantity
}) => {
  console.log(product)
 const dispatch = useDispatch()

    const handleUpdateQuantity = (type, id) => {
        const payload = { type, id }
        // If parent provided a handler, call it (parent will handle dispatch).
        // Otherwise dispatch here. This prevents double-dispatch when both
        // CartItem and parent call updateQuantity.
        if (typeof onUpdateQuantity === 'function') {
            onUpdateQuantity(id, type)
        } else {
            dispatch(updateQuantity(payload))
        }
    }
    return (
        <div className="flex items-center gap-4 py-4 border-b border-gray-600 last:border-b-0">
            {/* Checkbox */}
            <div className="flex-shrink-0">
                <Checkbox isSelected={isSelected} onSelect={() => onToggleSelect(id)} />
            </div>

            {/* Product Image */}
            <div className="flex-shrink-0">
                <img
                    src={image}
                    alt={name}
                    className="w-16 h-16 object-cover rounded-lg bg-neutral-700"
                />
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium text-sm mb-1">{name}</h3>
                <p className="text-neutral-400 text-sm font-semibold">Price: ${price.toFixed(2)}</p>
                <p className="text-neutral-400 text-sm font-semibold">Subtotal: ${(product?.price * product?.quantity).toFixed(2)}</p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm mr-2">QTY</span>
                <button
                    onClick={() => handleUpdateQuantity("decrement",id)}
                    className="w-8 h-8 bg-gray-600 hover:bg-gray-500 rounded flex items-center justify-center transition-colors"
                    disabled={quantity <= 1}
                >
                    <FaMinus className="w-4 h-4 text-white" />
                </button>
                <span className="w-8 text-center text-blue-400 font-semibold">
                    {product?.quantity ?? quantity}
                </span>
                <button
                     onClick={() => handleUpdateQuantity("increment",id)}
                    className="w-8 h-8 bg-gray-600 hover:bg-gray-500 rounded flex items-center justify-center transition-colors"
                >
                    <FaPlus className="w-4 h-4 text-white" />
                </button>
            </div>
        </div>
    );
};

export default CartItem;

import React from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import Checkbox from '../../components/shared/Checkbox';
import { getBaseUrl } from '@/utils/getBaseUrl';

const CartItem = ({
    product,
    id,
    name,
    price,
    quantity,
    image,
    isSelected,
    onToggleSelect,
    onIncrement,
    onDecrement,
    onQuantityChange,
    onDeleteItem
}) => {
    const handleIncrement = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onIncrement) onIncrement();
        return false;
    };

    const handleDecrement = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onDecrement) onDecrement();
        return false;
    };

    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onDeleteItem) onDeleteItem();
        return false;
    };

    const handleInputChange = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onQuantityChange) onQuantityChange(e.target.value);
        return false;
    };

    const handleToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onToggleSelect) onToggleSelect();
        return false;
    };

    const displaySrc = (() => {
        if (image) return image;
        const first = product?.images?.[0];
        if (first) {
            const isAbsolute = /^https?:\/\//i.test(first);
            return isAbsolute ? first : `${getBaseUrl()}${first}`;
        }
        if (product?.image) return product.image;
        return '/image/icons/noproduct.png';
    })();

    return (
        <div className="contents">
            <div className="flex items-center gap-4 py-4 border-b border-gray-600 last:border-b-0">
                {/* Checkbox */}
                <div className="flex-shrink-0">
                    <Checkbox 
                        isSelected={isSelected} 
                        onSelect={handleToggle} 
                    />
                </div>

                {/* Product Image */}
                <div className="flex-shrink-0">
                    <img
                        src={displaySrc}
                        alt={name}
                        className="w-16 h-16 object-cover rounded-lg bg-neutral-700"
                    />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-sm mb-1">{name}</h3>
                    <p className="text-neutral-400 text-sm font-semibold">Price: ${price.toFixed(2)}</p>
                    <p className="text-neutral-400 text-sm font-semibold">Subtotal: ${(price * quantity).toFixed(2)}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm mr-2">QTY</span>
                    <button
                        onClick={handleDecrement}
                        className="w-8 h-8 bg-gray-600 hover:bg-gray-500 rounded flex items-center justify-center transition-colors"
                        disabled={quantity <= 1}
                        type="button"
                    >
                        <FaMinus className="w-4 h-4 text-white" />
                    </button>
                    
                    <input
                        type="number"
                        min={1}
                        value={quantity}
                        onChange={handleInputChange}
                        className="w-16 px-2 py-1 rounded-md bg-transparent border border-gray-500 text-white text-center"
                    />
                    
                    <button
                        onClick={handleIncrement}
                        className="w-8 h-8 bg-gray-600 hover:bg-gray-500 rounded flex items-center justify-center transition-colors"
                        type="button"
                    >
                        <FaPlus className="w-4 h-4 text-white" />
                    </button>
                </div>

                {/* Delete Button */}
                <div className="flex-shrink-0">
                    <button
                      onClick={handleDelete}
                      className="ml-2 px-3 py-1 text-sm bg-red-600 hover:bg-red-500 text-white rounded transition-colors"
                      type="button"
                    >
                      Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
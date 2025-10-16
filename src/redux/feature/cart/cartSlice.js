import { createSlice } from '@reduxjs/toolkit'
import Swal from 'sweetalert2'

const initialState ={
    products: [],
    selectedItems: 0,
    totalPrice: 0,
    selectedSubtotal: 0
}

const calculateCartTotals = (products) => {
    const selectedItems = products.reduce((total, product) => total + (product.quantity || 0), 0);
    const totalPrice = products.reduce((total, product) => total + (product.quantity || 0) * (product.price || 0) , 0)
    const selectedSubtotal = products
        .filter(product => product.selected)
        .reduce((total, product) => total + (product.quantity || 0) * (product.price || 0), 0);

    return {selectedItems, totalPrice, selectedSubtotal};
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const isExist = state.products.find(product => product._id === action.payload._id);
            if(!isExist) {
                // default a new product to selected = true so it contributes to subtotal
                state.products.push({...action.payload, quantity: 1, selected: true})
                alert("Product added successfully!")
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Product already Added to Cart',
                    icon: 'error',
                    confirmButtonText: "It's Ok"
                  })
            }
            const totals = calculateCartTotals(state.products);
            state.selectedItems = totals.selectedItems;
            state.totalPrice = totals.totalPrice;
            state.selectedSubtotal = totals.selectedSubtotal;
        },
        updateQuantity: (state, action) => {
            const product = state.products.find((item) => item._id === action.payload.id);
        
            if(product) {
                // Accept both correct and legacy misspelled action types for safety
                if(action.payload.type === "increment" || action.payload.type === "increament") {
                    product.quantity += 1;
                } else if(action.payload.type === "decrement" && product.quantity > 1) {
                    product.quantity -= 1;
                }
            }
            const totals = calculateCartTotals(state.products);
            state.selectedItems = totals.selectedItems;
            state.totalPrice = totals.totalPrice;
            state.selectedSubtotal = totals.selectedSubtotal;
        },
        removeFromCart: (state, action) => {
            state.products = state.products.filter(product => product._id !== action.payload.id)
            const totals = calculateCartTotals(state.products);
            state.selectedItems = totals.selectedItems;
            state.totalPrice = totals.totalPrice;
            state.selectedSubtotal = totals.selectedSubtotal;
        },
        // Toggle selected flag for a product (used for selecting items to checkout)
        toggleSelect: (state, action) => {
            const product = state.products.find(p => p._id === action.payload.id);
            if (product) product.selected = !product.selected;
            const totals = calculateCartTotals(state.products);
            state.selectedItems = totals.selectedItems;
            state.totalPrice = totals.totalPrice;
            state.selectedSubtotal = totals.selectedSubtotal;
        },
        // Set all products as selected/unselected
        selectAll: (state, action) => {
            const newState = !!action.payload?.selected;
            state.products = state.products.map(p => ({ ...p, selected: newState }));
            const totals = calculateCartTotals(state.products);
            state.selectedItems = totals.selectedItems;
            state.totalPrice = totals.totalPrice;
            state.selectedSubtotal = totals.selectedSubtotal;
        },
        // Remove all selected products
        removeSelected: (state) => {
            state.products = state.products.filter(p => !p.selected);
            const totals = calculateCartTotals(state.products);
            state.selectedItems = totals.selectedItems;
            state.totalPrice = totals.totalPrice;
            state.selectedSubtotal = totals.selectedSubtotal;
        },
        // Replace cart slice from persisted state (used on store hydration)
        replaceStateFromPersist: (state, action) => {
            // action.payload should be the saved cart slice
            const payload = action.payload || {};
            state.products = payload.products || state.products;
            state.selectedItems = payload.selectedItems ?? state.selectedItems;
            state.totalPrice = payload.totalPrice ?? state.totalPrice;
            state.selectedSubtotal = payload.selectedSubtotal ?? state.selectedSubtotal;
        },
        clearCart: (state) => {
            Object.assign(state, initialState)

        }
    }
})

export const {addToCart, updateQuantity, removeFromCart, clearCart, toggleSelect, selectAll, removeSelected} = cartSlice.actions;
export default cartSlice.reducer;
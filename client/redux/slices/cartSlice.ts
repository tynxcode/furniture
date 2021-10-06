import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItemInterface } from '../../interface/cart'

export interface CartState {
    cartItem: CartItemInterface[]
}

const initialState: CartState = {
    cartItem: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItemInterface>) => {
            const isExist = state.cartItem.find((v) => v.product.id === action.payload.product.id)

            if(!isExist) 
                state.cartItem = [...state.cartItem, action.payload]

            return state
        },
        updateQuantity: (state, action: PayloadAction<CartItemInterface>) => {
            state.cartItem.find((v) => {
                if(v.product.id === action.payload.product.id) {
                    v.quantity = action.payload.quantity
                    v.total_price = v.product.price*action.payload.quantity
                    return v
                }
            })
            return state
        },
        removeFromCart: (state, action: PayloadAction<CartItemInterface>) => {
            state.cartItem.forEach((v, i, a) => {
                if(v.product.id === action.payload.product.id) {
                    a.splice(i, 1)
                }
            })
            return state
        },
        resetCart: (state) => {
            return state = initialState
        }
    }
})

export const { addToCart, updateQuantity ,removeFromCart, resetCart } = cartSlice.actions

export default cartSlice.reducer
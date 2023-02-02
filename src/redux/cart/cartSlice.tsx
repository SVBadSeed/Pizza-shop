import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {getCartFromLS} from "../../../utils/getCartFromLS"
import {calcTotalPrice} from "../../../utils/calcTotalPrice"
import {CartItem, CartSliceState} from "./types"

const {items, totalPrice} = getCartFromLS()

const initialState: CartSliceState = {
    totalPrice: totalPrice,
    items: items
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find(item => item.id === action.payload.id)

            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload, count: 1
                })
            }
            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum
            }, 0)
        },

        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(item => item.id === action.payload)

            if (findItem) {
                findItem.count--
            }

            state.totalPrice = calcTotalPrice(state.items)
        },

        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter(item => item.id !== action.payload)

            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum
            }, 0)
        },

        clearItems(state) {
            state.items = []

            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum
            }, 0)
        },

    }
})

export const {addItem, clearItems, removeItem, minusItem} = cartSlice.actions

export default cartSlice.reducer
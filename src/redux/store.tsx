import {configureStore} from '@reduxjs/toolkit'
import filterSlice from "./filter/filterSlice"
import cartSlice from "./cart/cartSlice"
import pizzaSlice from "./pizza/pizzaSlice"
import {useDispatch} from "react-redux"

export const store = configureStore({
    reducer: {
        filter: filterSlice,
        cart: cartSlice,
        pizza: pizzaSlice
    }
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
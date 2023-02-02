import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Pizza, PizzaSliceState, Status} from "./types"
import {fetchPizza} from "./asyncActions"

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING, // loading | success | error
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizza.pending, (state) => {
                state.status = Status.LOADING
                state.items = []
            })
            .addCase(fetchPizza.fulfilled, (state, action) => {
                state.items = action.payload
                state.status = Status.SUCCESS
            })
            .addCase(fetchPizza.rejected, (state) => {
                state.items = []
                state.status = Status.ERROR
            })
    }
})

export const {setItems} = pizzaSlice.actions

export default pizzaSlice.reducer
import {createAsyncThunk} from "@reduxjs/toolkit"
import {Pizza, SearchPizzaParams} from "./types"
import axios from "axios"

export const fetchPizza = createAsyncThunk<Pizza[], SearchPizzaParams>(
    'pizza/fetchPizzaStatus',
    async (params) => {
        const {order, sortBy, category, search, currentPage} = params
        const res = await axios.get(`https://63c95435c3e2021b2d54faa5.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        return res.data
    }
)

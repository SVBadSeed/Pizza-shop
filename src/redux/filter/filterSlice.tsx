import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {FilterSliceState, Sort, SortPropertyEnum} from "./types"

const initialState: FilterSliceState = {
    categoryId: 0,
    sort: {
        name: 'популярности',
        sortProperty: SortPropertyEnum.RATING_DESC
    },
    value: '',
    currentPage: 1
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload
        },
        setSort(state, action: PayloadAction<Sort>) {
            state.sort = action.payload
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.value = action.payload
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            if (Object.keys(action.payload).length) {
                state.sort = action.payload.sort
                state.currentPage = Number(action.payload.currentPage)
                state.categoryId = Number(action.payload.categoryId)
            } else {
                state.currentPage = 1
                state.categoryId = 1
                state.sort = {
                    name: 'популярности',
                    sortProperty: SortPropertyEnum.RATING_DESC
                }
            }
        }
    }
})

export const {setCategoryId, setSort, setSearchValue, setCurrentPage, setFilters} = filterSlice.actions

export default filterSlice.reducer
export type Pizza = {
    imageUrl: string
    id: string
    name: string
    types: number[]
    sizes: number[]
    price: number
    count: number
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

export interface PizzaSliceState {
    items: Pizza[]
    status: Status
}

export type SearchPizzaParams = {
    order: string, sortBy: string, category: string, search: string, currentPage: string
}

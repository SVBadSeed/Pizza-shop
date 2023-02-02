import React, {useCallback, useEffect, useRef} from 'react'
import qs from 'qs'
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"

import Categories from "../components/categories/Categories"
import Sort, {sortArr} from "../components/sort/SortPopup"
import Skeleton from "../components/pizza-block/Skeleton"
import PizzaBlog from "../components/pizza-block/PizzaBlog"
import Pagination from "../components/pagination/Pagination"

import {setCategoryId, setCurrentPage, setFilters} from "../redux/filter/filterSlice"
import {useAppDispatch} from "../redux/store"
import {selectPizza} from "../redux/pizza/selectors"
import {SearchPizzaParams} from "../redux/pizza/types"
import {selectFilter} from "../redux/filter/selectors"
import {fetchPizza} from "../redux/pizza/asyncActions"

const Home: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const {items, status} = useSelector(selectPizza)
    const {categoryId, sort, value, currentPage} = useSelector(selectFilter)

    const onChangePage = ((page: number) => {
        dispatch(setCurrentPage(page))
    })

    const onChangeCategory = useCallback((id: number) => {
        dispatch(setCategoryId(id))
    }, [])

// Если изменили параметры и был первый рендер
    const getPizzas = async () => {
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const sortBy = sort.sortProperty.replace('-', '')
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = value > '' ? `&search=${value}` : ''

        dispatch(
            fetchPizza({
                order,
                sortBy,
                category,
                search,
                currentPage: String(currentPage)
            })
        )

        window.scrollTo(0, 0)
    }

// Если изменили параметры и был первый рендер
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty:
                sort,
                categoryId,
                currentPage
            })

            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sort.sortProperty, currentPage])

    // Если был первый рендер, то запрашиваем пиццы
    useEffect(() => {
        if (!isSearch.current) {
            getPizzas()
        }
        isSearch.current = false

        window.scrollTo(0, 0)
    }, [categoryId, sort.sortProperty, value, currentPage])

    // Если был 1 рендер проверяем URL параметры и сохраняем в редаксе
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams
            const sort = sortArr.find(obj => obj.sortProperty === params.sortBy)

            dispatch(setFilters({
                categoryId: Number(params.category),
                value: params.search,
                currentPage: Number(params.currentPage),
                sort: sort || sortArr[0]
            }))
            isSearch.current = true
        }
    }, [])

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
                <Sort value={sort}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status === 'error' ? <div className='content__error-info'>
                    <h2> Произошла ошибка 😕</h2>
                    <p>
                        К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.
                    </p>
                </div> : <div className="content__items">
                    {status === 'loading' ? [...new Array(6)].map((_, index) => <Skeleton
                        key={index}/>) : items.map((item: any) =>
                        <PizzaBlog key={item.id} {...item}/>)}
                </div>
            }
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    )
}

export default Home
import React, {useEffect, useRef} from 'react'
import qs from 'qs'
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"

import Categories from "../components/categories/Categories"
import Sort, {sortArr} from "../components/sort/Sort"
import Skeleton from "../components/pizza-block/Skeleton"
import PizzaBlog from "../components/pizza-block/PizzaBlog"
import Pagination from "../components/pagination/Pagination"

import {setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice"
import {fetchPizza} from "../redux/slices/pizzaSlice"

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const categoryId = useSelector((state) => state.filter.categoryId)
    const items = useSelector((state) => state.pizza.items)
    const isLoading = useSelector((state) => state.pizza.status)
    const sortType = useSelector((state) => state.filter.sort.sortProperty)
    const searchValue = useSelector(state => state.filter.value)
    const currentPage = useSelector(state => state.filter.currentPage)


    const onChangePage = ((number) => {
        dispatch(setCurrentPage(number))
    })
// Если изменили параметры и был первый рендер
    const getPizzas = async () => {

        const order = sortType.includes('-') ? 'asc' : 'desc'
        const sortBy = sortType.replace('-', '')
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue > '' ? `&search=${searchValue}` : ''


        dispatch(
            fetchPizza({
                order,
                sortBy,
                category,
                search,
                currentPage
            })
        )

        window.scrollTo(0, 0)
    }

// Если изменили параметры и был первый рендер
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty:
                sortType,
                categoryId,
                currentPage
            })

            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sortType, currentPage])

    // Если был первый рендер, то запрашиваем пиццы
    useEffect(() => {
        if (!isSearch.current) {
            getPizzas()
        }
        isSearch.current = false

        window.scrollTo(0, 0)
    }, [categoryId, sortType, searchValue, currentPage])

    // Если был 1 рендер проверяем URL параметры и сохраняем в редаксе
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sort = sortArr.find(obj => obj.sortProperty === params.sortProperty)

            dispatch(setFilters({
                    ...params,
                    sort
                })
            )
            isSearch.current = true
        }
    }, [])

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={(id) => dispatch(setCategoryId(id))}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                isLoading === 'error' ? <div className='content__error-info'>
                    <h2> Произошла ошибка 😕</h2>
                    <p>
                        К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.
                    </p>
                </div> : <div className="content__items">
                    {isLoading === 'loading' ? [...new Array(6)].map((_, index) => <Skeleton
                        key={index}/>) : items.map((item) =>
                        <PizzaBlog key={item.id} {...item}/>)}
                </div>
            }
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    )
}

export default Home
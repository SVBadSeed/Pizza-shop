import React, {useEffect, useRef, useState} from 'react'
import {useDispatch,} from "react-redux"
import {setSort} from "../../redux/filter/filterSlice"
import {Sort, SortPropertyEnum} from "../../redux/filter/types"

type SortArrItem = {
    name: string
    sortProperty: SortPropertyEnum
}


export const sortArr: SortArrItem[] = [
    {
        name: 'популярности(по возр.)',
        sortProperty: SortPropertyEnum.RATING_ASC
    },
    {
        name: 'популярности(по уб.)',
        sortProperty: SortPropertyEnum.RATING_DESC
    },
    {
        name: 'цене(по возр.)',
        sortProperty: SortPropertyEnum.PRICE_ASC
    },
    {
        name: 'цене(по уб.)',
        sortProperty: SortPropertyEnum.PRICE_DESC
    },
    {
        name: 'алфавиту(по возр.)',
        sortProperty: SortPropertyEnum.TITLE_ASC
    },
    {
        name: 'алфавиту(по уб.)',
        sortProperty: SortPropertyEnum.TITLE_DESC
    }
]

type SortPopupProps = {
    value: Sort
}

const SortPopup: React.FC<SortPopupProps> = React.memo(({value}) => {
    const dispatch = useDispatch()
    const sortRef = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(false)

    const onClickListItem = (sortType: SortArrItem) => {
        dispatch(setSort(sortType))
        setVisible(false)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
                setVisible(false)
            }
        }

        document.body.addEventListener('click', handleClickOutside)

        return () => document.body.removeEventListener('click', handleClickOutside)
    }, [])

    return (
        <div ref={sortRef} className="sort">
            <div className="sort__label">
                <svg width="10"
                     height="6"
                     viewBox="0 0 10 6"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"/>
                </svg>
                <b>Сортировка по:</b>
                <span onClick={() => setVisible(!visible)}>{value.name}</span>
            </div>
            {visible && (<div className="sort__popup">
                <ul>
                    {sortArr.map((obj, i) => (
                        <li key={i} className={value.sortProperty === obj.sortProperty ? 'active' : ''}
                            onClick={() => onClickListItem(obj)}>{obj.name}</li>
                    ))}
                </ul>
            </div>)}
        </div>
    )
})

export default SortPopup
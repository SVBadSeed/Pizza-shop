import React from 'react'

type CategoriesProps = {
    value: number
    onChangeCategory: (i: number) => void
}

const Categories: React.FC<CategoriesProps> = React.memo(({value, onChangeCategory}) => {
    const allCategories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытие']
    return (
        <div className="categories">
            <ul>
                {allCategories.map((categoryName, i) => (
                    <li key={i} className={value === i ? 'active' : ''}
                        onClick={() => onChangeCategory(i)}>{categoryName}
                    </li>
                ))}
            </ul>
        </div>
    )
})

export default Categories
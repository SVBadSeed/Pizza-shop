import React from 'react'

const Categories = ({value, onClickCategory}) => {
    const allCategories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытие']

    return (
        <div className="categories">
            <ul>
                {allCategories.map((categoryName, i) => (
                    <li key={i} className={value === i ? 'active' : ''}
                        onClick={() => onClickCategory(i)}>{categoryName}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Categories
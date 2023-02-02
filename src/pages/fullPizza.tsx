import React, {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from "axios"

const FullPizza = () => {
    const [pizza, setPizza] = useState()
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchPizza() {
            try {
                const response = await axios.get('https://63c95435c3e2021b2d54faa5.mockapi.io/items/' + params.id)
                setPizza(response.data)
            } catch (error) {
                alert('Ошибка при получении пиццы')
                navigate('/')
            }
        }

        fetchPizza()
    }, [])


    if (!pizza) {
        return 'Загрузка...'
    }
    return (
        <div className='container'>
            <img src={pizza.imageUrl} alt=""/>
            <h2>{pizza.name}</h2>
            <h4>{pizza.price} ₽</h4>
        </div>
    )
}

export default FullPizza
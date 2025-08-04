import React from 'react';
import {useNavigate, useParams} from "react-router";
import axios from "axios";

const FullPizza: React.FC = () => {
    const {id} = useParams();
    const [pizza, setPizza] = React.useState<{imageUrl: string, title: string, price: number} | null>(null);
    const navigate = useNavigate();

    React.useEffect(() => {
            async function fetchPizza() {
                try {
                    const {data} = await axios.get(`https://685a69ed9f6ef96111564553.mockapi.io/Items/` + id);
                    setPizza(data);
                } catch (error) {
                    alert("Ошибка при получении пиццы")
                    navigate('/');

                }
            }
            fetchPizza();
        },
        []
    );

    if (!pizza) {
        return <div>'Загрузка...'</div>;
    }

    return (
        <div>
            <img src={pizza.imageUrl} alt='cart image'
                 style={{
                     width: '300px',  // Фиксированная ширина
                     height: 'auto',   // Автоматическая высота для сохранения пропорций
                     display: 'block', // Убирает лишние отступы
                     margin: '0 auto', // Центрирование изображения
                     borderRadius: '10px', // Скругление углов
                     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // Тень для красоты
                 }} />
            <h2>{pizza.title}</h2>
            <h2>{pizza.price}</h2>
        </div>
    );
};

export default FullPizza;
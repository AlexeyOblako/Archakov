import React from 'react';
import './scss/app.scss';
import  Header from './components/Header';
import Sort from "./components/Sort";
import Categories from './components/Categories';
import PizzaBlock from './components/PizzaBlock/PizzaBlock';

import pizzas from './assets/pizzas.json';


function App() {
    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        fetch('https://685a69ed9f6ef96111564553.mockapi.io/Items')
        .then(res => res.json())
        .then(arr => {setItems(arr)});
    }, []);


    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories />
                        <Sort />
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {pizzas.map(obj => <PizzaBlock key={obj.id} {...obj}/>)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;

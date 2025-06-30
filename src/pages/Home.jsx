import React from 'react';

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";

const Home = () => {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [categoryID, setCategoryID] = React.useState(0);
    const [sort, setSort] = React.useState({
        name: 'популярности',
        sortProperty: 'rating',
    });
    const [orderType, setOrderType] = React.useState("asc");





    React.useEffect(() => {
        setIsLoading(true);
        fetch(`https://685a69ed9f6ef96111564553.mockapi.io/Items?${
            categoryID > 0 ? `category=${categoryID}` : ''
        }&sortBy=${sort.sortProperty}&order=${orderType}`
            )
            .then(res => res.json())
            .then(arr => {setItems(arr);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, [categoryID, sort, orderType]);



    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryID}
                            onClickCategory={(i) => setCategoryID(i)}/>
                <Sort value={sort} onClickSort={(i) => setSort(i)}/>
            </div>
            <div>
            <button onClick={() => setOrderType('asc')}> ↑ </button>
            <button onClick={() => setOrderType('desc')}> ↓ </button>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(6)].map((_, index) => <Skeleton
                        key={index} />) : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
            </div>
        </div>
    );
};

export default Home;
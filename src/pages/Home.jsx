import React from 'react';
import ReactPaginate from 'react-paginate';

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import {SearchContext} from "../App";

const Home = () => {
    const {searchValue} = React.useContext(SearchContext);

    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [categoryID, setCategoryID] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [sort, setSort] = React.useState({
        name: 'популярности',
        sortProperty: 'rating',
    });
    const [orderType, setOrderType] = React.useState("asc");

    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)


    const skeletons = [...new Array(6)]
        .map((_, index) => <Skeleton
            key={index}/>);


    React.useEffect(() => {
        setIsLoading(true);

        const search = searchValue ? `&search=${searchValue}` : '';

        fetch(`https://685a69ed9f6ef96111564553.mockapi.io/Items?page=${currentPage}&limit=4&${
                categoryID > 0 ? `category=${categoryID}` : ''
            }&sortBy=${sort.sortProperty}&order=${orderType}${search}`
        )
            .then(res => res.json())
            .then(arr => {
                setItems(arr);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, [categoryID, sort, searchValue, orderType, currentPage]);


    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryID}
                            onClickCategory={(i) => setCategoryID(i)}/>
                <Sort value={sort} onClickSort={(i) => setSort(i)}/>
            </div>
            <div>
                <button onClick={() => setOrderType('asc')}> ↑</button>
                <button onClick={() => setOrderType('desc')}> ↓</button>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletons : pizzas}
            </div>
            <Pagination onChangePage={(number) => setCurrentPage(number)}/>
        </div>
    );
};

export default Home;
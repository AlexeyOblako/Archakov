import React from 'react';
import ReactPaginate from 'react-paginate';
import {useSelector, useDispatch} from 'react-redux';
import qs from 'qs';
import {useNavigate} from "react-router";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import {setCategoryID, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import {fetchPizza} from "../redux/slices/pizzaSlice";


const Home = ({searchValue}) => {

    const dispatch = useDispatch();
    const categoryID = useSelector(state => state.filter.categoryID);
    const sortType = useSelector(state => state.filter.sort.sortProperty)
    const currentPage = useSelector(state => state.filter.currentPage);
    const {items, status} = useSelector(state => state.pizza);


    const navigate = useNavigate();

    const onClickCategory = (id) => {
        dispatch(setCategoryID(id));
    }

    const [orderType, setOrderType] = React.useState("asc");

    const onChangePage = number => {
        dispatch(setCurrentPage(number));
    }

    const skeletons = [...new Array(6)]
        .map((_, index) => <Skeleton
            key={index}/>);


    const getPizzas = async () => {


        const search = searchValue ? `&search=${searchValue}` : '';


        dispatch(fetchPizza({
            categoryID,
            sortType,
            search,
            orderType,
            currentPage
        }),);


        window.scrollTo(0, 0);
    }

    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)


    React.useEffect(() => {
        getPizzas()

    }, []);


    React.useEffect(() => {
        const queryString = qs.stringify({
            sortType,
            categoryID,
            currentPage,
        })
        navigate(`?${queryString}`);
    }, [categoryID, sortType, searchValue, orderType, currentPage, navigate])

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryID}
                            onClickCategory={(i) => onClickCategory(i)}/>
                <Sort/>
            </div>
            <div>
                <button onClick={() => setOrderType('asc')}> ↑</button>
                <button onClick={() => setOrderType('desc')}> ↓</button>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'error' ? (
                    <div>
                        <h2>Произошла ошибка</h2>
                        <p>
                            Не удалось получить пиццы
                        </p>
                    </div>)
                : (<div className="content__items">
                        {status === 'loading' ? skeletons : pizzas}
                    </div>
                )}

            <Pagination value={currentPage} onChangePage={onChangePage}/>
        </div>
    );
};

export default Home;
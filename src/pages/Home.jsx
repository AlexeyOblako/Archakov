import React from 'react';
import ReactPaginate from 'react-paginate';
import {useSelector, useDispatch} from 'react-redux';

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import {setCategoryID} from "../redux/slices/filterSlice";
import axios from "axios";


const Home = ({searchValue}) => {

    const dispatch = useDispatch();
    const categoryID = useSelector(state => state.filter.categoryID);
    const sortType = useSelector(state => state.filter.sort.sortProperty)




    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [currentPage, setCurrentPage] = React.useState(1);


    const onClickCategory = (id) => {
        dispatch(setCategoryID(id));
    }

    const [orderType, setOrderType] = React.useState("asc");

    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)


    const skeletons = [...new Array(6)]
        .map((_, index) => <Skeleton
            key={index}/>);





    React.useEffect(() => {
        setIsLoading(true);

        const search = searchValue ? `&search=${searchValue}` : '';

        // fetch(`https://685a69ed9f6ef96111564553.mockapi.io/Items?page=${currentPage}&limit=4&${categoryID > 0 ? `category=${categoryID}` : ''}&sortBy=${sortType}&order=${orderType}${search}`
        // )
        //     .then(res => res.json())
        //     .then(arr => {
        //         setItems(arr);
        //         setIsLoading(false);
        //     });


        axios.get(`https://685a69ed9f6ef96111564553.mockapi.io/Items?page=${currentPage}&limit=4&${categoryID > 0 ? `category=${categoryID}` : ''}&sortBy=${sortType}&order=${orderType}${search}`)
            .then((res) =>
            {setItems(res.data);
            setIsLoading(false);
            })
            .catch((err) => {
            console.error('Error fetching data:', err);
            setItems([]); // Устанавливаем пустой массив, если ничего не найдено
            setIsLoading(false);
        });
        window.scrollTo(0, 0);
    }, [categoryID, sortType, searchValue, orderType, currentPage]);


    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryID}
                            onClickCategory={(i) => onClickCategory(i)}/>
                <Sort />
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
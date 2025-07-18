import React from 'react';
import './scss/app.scss';
import Header from './components/Header';
import Cart from './pages/Cart';
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import {Route, Routes} from "react-router";

function App() {

    const [searchValue, setSearchValue] = React.useState('');

    return (
        <div className="wrapper">
            <Header searchValue={searchValue} setSearchValue={setSearchValue}/>
            <div className="content">

                <Routes>
                    <Route path="/" element={<Home searchValue={searchValue}/>}/>
                    <Route path="/cart.html" element={<Cart/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>


            </div>
        </div>
    );
}

export default App;

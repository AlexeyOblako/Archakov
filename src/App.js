import React from 'react';
import './scss/app.scss';
import Header from './components/Header';
import Cart from './pages/Cart';
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import {Route, Routes} from "react-router";

export const SearchContext = React.createContext('');


function App() {

    const [searchValue, setSearchValue] = React.useState('');

    return (
        <div className="wrapper">
            <SearchContext.Provider value={{searchValue, setSearchValue}}>
                <Header />
                <div className="content">

                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/cart.html" element={<Cart/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>


                </div>
            </SearchContext.Provider>
        </div>
    );
}

export default App;

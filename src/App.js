import React from 'react';
import './scss/app.scss';
import Header from './components/Header';
import Cart from './pages/Cart';
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import {Route, Routes} from "react-router";
import FullPizza from "./pages/FullPizza";
import MainLayout from "./layouts/MainLayout";

function App() {


    return (
        <div className="wrapper">
            <Header />
            <div className="content">

                <Routes>
                    <Route path="/" component={<MainLayout/>} >
                        <Route path="/" element={<Home />}/>
                        <Route path="/cart.html" element={<Cart/>}/>
                        <Route path="/pizza/:id" element={<FullPizza />}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Route>
                </Routes>


            </div>
        </div>
    );
}

export default App;

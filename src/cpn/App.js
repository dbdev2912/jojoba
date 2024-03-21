import React from 'react';

import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";


// import './../css/index.scss';

import { Home, Products, Product, Contact, Cart } from './route'
import Navigator from './ui/navigator/navigator'


function App() {
    return (

        <Router>
            <Routes>
                <Route exac path="/" element={<Navigator activePage={0} ><Home /></Navigator>} />
                
                <Route exac path="/products" element={<Navigator activePage={1}><Products /></Navigator>} />
                <Route exac path="/p/:product_id" element={<Navigator><Product /></Navigator>} />

                <Route exac path="/contact" element={<Navigator activePage={4}><Contact /></Navigator>} />
                <Route exac path="/u/cart" element={<Navigator activePage={3}><Cart /></Navigator>} />
            </Routes>
        </Router>

    )
}

export default App;

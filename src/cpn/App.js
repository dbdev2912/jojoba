import React from 'react';

import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";


import './../css/index.scss';

import { Home, Products } from './route'
import Navigator from './ui/navigator/navigator'

function App() {
    return (

        <Router>
            <Routes>
                <Route exac path="/" element={<Navigator><Home /></Navigator>} />
                <Route exac path="/products" element={<Navigator><Products /></Navigator>} />
            </Routes>
        </Router>

    )
}

export default App;

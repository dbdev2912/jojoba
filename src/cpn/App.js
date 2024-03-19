import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


import './../css/index.scss';

import { Home } from './route'
import Navigator from './ui/navigator/navigator'

function App() {
    return (
        
            <Router>
                <Routes>
                    <Route exac path="/" element={ <Navigator><Home/></Navigator> }/>
                </Routes>
            </Router>
        
    )
}

export default App;

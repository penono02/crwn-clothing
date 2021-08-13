import React from 'react';
import { Route, Switch} from "react-router-dom";

import { HomePage } from "./pages/HomePage/homepage.component";
import ShopPage from "../src/pages/shop/shop.component";

import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />

      </Switch>
    
    </div>
  );
}

export default App;

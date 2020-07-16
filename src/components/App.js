import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Axios from "axios";

import {
  Products,
  SearchBar,
  Order
} from './index';

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products").then((res) => {
      const prodList = res.data.products;
      // console.log('product List: ', prodList);
      return setProducts(prodList);
    });
  }, []);

  return (
      <div>
        <nav>
          <h1>Cheese Wizards</h1>
        </nav>
        <Products
        products={products}
        setProducts={setProducts}
        />
      </div>
  );
};

export default App;
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Axios from "axios";

import { Products, SearchBar, Order, ProductDetails, HomepageLayout, Nav } from "./components";

const App = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  let filteredProducts = products;
  // if(category.length){
  //   filteredProducts = filteredProducts.filter((category)=>{

  //   })
  // }
  if(search.length) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.title.toLowerCase().startsWith(search.toLowerCase());
    });
  }

  useEffect(() => {
    axios.get("/api/products").then((res) => {
      const prodList = res.data.products;
      console.log("product List: ", prodList);
      return setProducts(prodList);
    });
  }, []);

  console.log('CATEGORY', category);

  return (
    <Router>
        <Nav />

        <Switch>
          <Route path="/" exact={true} component={HomepageLayout} />

          <Route path="/products" exact>
            <SearchBar
              search={search}
              setSearch={setSearch}
              category={category}
              setCategory={setCategory}
            />

            <Products
              products={filteredProducts}
              setProducts={setProducts}
            />
          </Route>

          <Route path="/products/:productId" exact>
            <ProductDetails
              productId={2}
            />
          </Route>

        </Switch>



    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

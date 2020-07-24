import React, { useState, useEffect } from "react";
import axios from "axios";
import { CardGroup } from "semantic-ui-react";
import { ProductCard } from "./index";

const Products = ({ products, setProducts, activeCart, setActiveCart }) => {
  return (
    <CardGroup itemsPerRow={5}>
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} products={products} setProducts={setProducts} activeCart={activeCart} setActiveCart={setActiveCart}/>;
      })}
    </CardGroup>
  );
};

export default Products;

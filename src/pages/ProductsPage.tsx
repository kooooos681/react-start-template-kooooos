import React from "react";
import "../styles/ProductsPage.css";
import { ItemListDemoButton } from "../components/ItemListContainer/ItemList_Demo_Button";

const ProductsPage: React.FC = () => {
  return (
    <div className="products-container">
      <h1>Товары</h1>
      <ItemListDemoButton />
    </div>
  );
};

export default ProductsPage;
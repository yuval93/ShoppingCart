import { Component } from "react";
import { NavLink } from "react-router-dom";
import "./ProductDetails.css";
import { productData } from "../data.js";


function ProductDetails() {
    const lastSlashIndex = window.location.pathname.lastIndexOf("/");
    const id = +window.location.pathname.substr(lastSlashIndex + 1);
    const product = productData[id]


    return (
        <div className="ProductDetails">

            <h2>שם המוצר: {product.name} </h2>
            <h3>פרטים נוספים על המוצר</h3>
            <p>{product.description}</p>
            <img src={product.image2} alt="product" width="100" height="100"></img>
            <img src={product.image1} alt="product" width="100" height="100"></img>
            <h3>ניתן לרכושה בחנות הבאה:

                <a href={product.storeToShop} target="_blank" rel="noreferrer">לחץ לרכישה</a>

            </h3>


            <NavLink to="/home">חזרה לרשימת הקניות</NavLink>

        </div>
    );
}

export default ProductDetails;

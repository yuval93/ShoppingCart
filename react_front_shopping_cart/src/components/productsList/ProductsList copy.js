import React, { useState, useEffect } from 'react';
import './ProductsList.css';
import { NavLink } from "react-router-dom";
import { productData } from "../data.js";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";






function ProductsList() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [show, setShow] = useState(true);

    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    // const products = []

    async function getData() {
        try {
            const response = await axios.get("http://localhost:3001/api/products");
            const products = response.data;
            setProducts(products);
        }
        catch (err) {
            alert(err.message);
        }
    }


    async function submit(form) {
        try {
            const orderData = {};
            orderData.cart = products;
            orderData.name = form.name;
            orderData.phone = form.phone;
            orderData.address = {
                city: form.city,
                street: form.street,
                flat_number: form.flat_number.toString(),
                floor: form.floor.toString(),
            }


            const response = await axios.post("http://localhost:3001/api/orders", orderData); // Must send FormData and not product
            const addedProduct = response.data;
            alert("Product has been added. id: " + addedProduct.id); // In real life - never show ids to the user.
            navigate("/products");
        }
        catch (err) {
            alert(err.message);
        }


    }

    useEffect(() => {
        // Update the document title using the browser API
        try {
            getData();
        }
        catch (err) {
            alert(err.message);
        }
    }, []);


    const addToCart = (el) => {
        setCart([...cart, el]);
        // console.log(cart)
    };

    useEffect(() => {
        console.log(cart);
        total();
    }, [cart]);

    useEffect(() => {
        console.log(show);
    }, [show]);


    const total = () => {
        let totalVal = 0;
        for (let i = 0; i < cart.length; i++) {
            totalVal += cart[i].price;
        }
        setCartTotal(totalVal);
    };
    const removeFromCart = (el) => {
        let hardCopy = [...cart];
        hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
        setCart(hardCopy);
    };

    return (
        <div className="container">











            <h2>לביצוע הזמנה של עגלת הקניות שלך</h2>

            <form onSubmit={handleSubmit(submit)}>

                <label>שם</label>
                <input type="text" {...register("name")} required minLength={3} maxLength={100} />

                <label>טלפון </label>
                <input type="text" {...register("phone")} required minLength={3} maxLength={100} />

                <label>עיר </label>
                <input type="text" {...register("city")} required minLength={3} maxLength={100} />

                <label>רחוב </label>
                <input type="text" {...register("street")} required minLength={3} maxLength={100} />

                <label>מספר דירה </label>
                <input type="number" {...register("flat_number")} required min={0} max={1000} />

                <label>מספר קומה </label>
                <input type="number" {...register("floor")} required min={0} max={1000} />

                <button>Add</button>

            </form>


            const orderData = { };
            {/* orderData.cart = products; */}
            {/* orderData.name = form.name; */}
            {/* orderData.phone = form.phone; */}
            orderData.address = {
                // city: form.city,
            // street: form.street,
            // flat_number: form.flat_number.toString(),
            // floor: form.floor.toString(),
            }
  













        </div>
    );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default ProductsList;
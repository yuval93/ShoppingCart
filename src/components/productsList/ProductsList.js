import React, { useState, useEffect } from 'react';
import './ProductsList.css';
import { NavLink } from "react-router-dom";
import { productData } from "../data.js";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';



function ProductsList() {
    const [products, setProducts] = useState([]);
    const [lastCart, setLastCart] = useState([]);
    const [userCart, setUserCart] = useState([]);
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [show, setShow] = useState(true);
    const [showLast, setShowLast] = useState(true);

    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    // const products = []

    async function getData() {
        try {
            const response = await axios.get("http://localhost:3001/api/products");
            const products = response.data;
            setProducts(products);
            const response2 = await axios.get("http://localhost:3001/api/orders");
            const orders = response2.data.pop();
            setLastCart(orders)
            const arr3 = orders.cart;
            const filterByReference = (arr1, arr2) => {
                let res = [];
                res = arr1.filter(el => {
                    return arr2.find(element => {
                        return element === el.id;
                    });
                });
                return res;
            }
            const filtered = filterByReference(products, arr3);
            setShowLast(filtered);
            console.log(filterByReference(products, arr3));

        }
        catch (err) {
            alert(err.message);
        }
    }


    async function submit(form) {
        try {
            const orderData = {};
            orderData.name = form.name;
            orderData.phone = form.phone;
            orderData.address = {
                city: form.city,
                street: form.street,
                flat_number: form.flat_number.toString(),
                floor: form.floor.toString(),
            }
            orderData.cart = userCart;
            console.log("please send:", orderData)
            // const orderDataJson = JSON.stringify(orderData)
            const response = await axios.post("http://localhost:3001/api/orders", orderData); // Must send FormData and not product
            const addedProduct = response.data;
            // navigate("/products");
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
        setUserCart([...userCart, el.name]);
    };

    useEffect(() => {
        console.log(cart);
        console.log(userCart)

        total();
    }, [cart]);

    useEffect(() => {
        console.log(show);
        console.log(products);
        console.log(lastCart);
        console.log(showLast);
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
            {/* show cart -  ------------------------------------  */}
            <Button as="input" type="button" variant="primary" value="רשימת הקניות" onClick={() => setShow(true)} ></Button>{' '}
            <Button as="input" type="button" variant="primary" value="רשימת מוצרים לרכישה" onClick={() => setShow(false)} ></Button>{' '}

            {/* <input type="submit" value=" רשימת הקניות" onClick={() => setShow(true)} /> */}
            {/* <input type="submit" value=" רשימת מוצרים" onClick={() => setShow(false)} /> */}

            {(show && cart) && <h3 className="p-3 text-center"> רשימת הקניות שלי </h3>}


            <table className="table table-striped table-bordered">

                <tbody>
                    {(show && cart) && cart.map((product, key) =>
                        <tr key={product.id}>
                            <td>
                                {/* <NavLink to={"/products/details/" + key}> */}
                                {product.name} {' '}
                                {/* </NavLink> */}
                                {/* <NavLink to={"/products/details/" + key}> */}
                                {product.price} ש"ח {' '}
                                {/* </NavLink> */}
                                <br></br>
                                <input type="submit" value="הסר מרשימת הקניות" onClick={() => removeFromCart(product)} />
                                {/* </td>
                            <td> */}
                                {/* <NavLink to={"/products/details/" + key}> */}
                                <img src={product.image1} alt={product.name} width="100" height="100"></img>
                                {/* </NavLink> */}
                            </td>

                        </tr>
                    )}
                    <tr>
                        {(show && cart) && <div>Total: סך הכל: {cartTotal} ש"ח</div>}

                    </tr>
                </tbody>
            </table>

            {/* {(show && cart) && cart.map((el, key) => (
                <div key={el.key + el.name}>
                    {`${el.name}: ${el.price} ש"ח`}
                    <input type="submit" value="הסר מרשימת הקניות" onClick={() => removeFromCart(el)} />
                </div>
            ))}
            {(show && cart) && <div>Total: סך הכל: {cartTotal} ש"ח</div>} */}

            {(show && cart) && <div>
                {/*  submit form  ------------------------------------*/}

                <h2>לביצוע הזמנה של עגלת הקניות שלך</h2>

                <form onSubmit={handleSubmit(submit)}>

                    <label>שם</label>
                    <input type="text" {...register("name")} required minLength={3} maxLength={100} />

                    <br></br>
                    <label>טלפון </label>
                    <input type="text" {...register("phone")} required minLength={3} maxLength={100} />

                    <br></br>
                    <label>עיר </label>
                    <input type="text" {...register("city")} required minLength={3} maxLength={100} />
                    <br></br>

                    <label>רחוב </label>
                    <input type="text" {...register("street")} required minLength={3} maxLength={100} />
                    <br></br>

                    <label>מספר דירה </label>
                    <input type="number" {...register("flat_number")} required min={0} max={1000} />
                    <br></br>

                    <label>מספר קומה </label>
                    <input type="number" {...register("floor")} required min={0} max={1000} />
                    <br></br>
                    {/* <Button>הזמן</Button> */}
                    <button>הזמן</button>

                </form>



            </div>}


            {/* {(show && cart) && <h3 className="p-3 text-center">העגלה האחרונה שלך</h3>} */}
            {/* {(show && cart && lastCart && products) && products.filter(el => {
                return (lastCart.cart).find(element => {
                    return element === el.id;
                })
            }).map((product, key) => <div>{product.name}</div>)} */}

            {/* show produt list */}



            {(!show && cart) && <h3 className="p-3 text-center">מוצרים לרכישה</h3>}
            {/* <h4 className="p-3 text-center">יש ללחוץ על המוצר לפרטים נוספים</h4> */}
            <table className="table table-striped table-bordered">

                <tbody>
                    {(!show && products) && products.map((product, key) =>
                        <tr key={product.id}>
                            <td>
                                {/* <NavLink to={"/products/details/" + key}> */}
                                שם:  {product.name}
                                {/* </NavLink> */}
                                <br></br>
                                {/* <NavLink to={"/products/details/" + key}> */}
                                מחיר: {product.price} ש"ח
                                {/* </NavLink> */}
                                <br></br>
                                <input type="submit" value="הוסף לרשימת הקניות" onClick={() => addToCart(product)} />
                            </td>
                            <td>
                                {/* <NavLink to={"/products/details/" + key}> */}
                                <img src={product.image1} alt={product.name} width="100" height="100"></img>
                                {/* </NavLink> */}
                            </td>

                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default ProductsList;
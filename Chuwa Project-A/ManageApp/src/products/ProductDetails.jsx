import React, {useState, useEffect, useRef} from 'react';
import './ProductDetails.css';
import {useParams} from 'react-router-dom';
import { useAuth } from "../firebase/AuthContext";
import AddProduct from "./AddProduct.jsx";


const ProductDetail = () => {
    let {productId} = useParams();
    const [open, setOpen] = useState(false);
    const {user} = useAuth();
    const [products, setProducts] = useState(null);

    //标识符 标志有没有fetch成功 成功才渲染add product组件的内容
    const [fetchedProducts, setFetchedProducts] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/products/${productId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
                console.log(data)
                setFetchedProducts(1);
            } catch (error) {
                console.log("Fetching product failed", error);
            }
        };
        if (productId) {
            fetchProduct();
        }
    }, [productId]);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (

        <div className="app">
            {products &&(
            <div className="details" key={products._id}>
                <div className="big-img">
                    <img src={products.image} alt={products.name}/>
                </div>
                <div className="box">
                    <div style={{minHeight: '40px'}} className="">
                        <h3>{products.category}</h3>
                        <h2>{products.name}</h2>
                    </div>
                    <div className="row">
                        <span style={{fontSize: '20px'}}>${products.price}</span>
                    </div>
                    {products.quantity === 0 && (
                        <div className="out-of-stock-label">Out of Stock</div>
                    )}
                    <p>{products.detail}</p>
                    <div className="button-container">
                        <button className="cart">Add To Cart</button>
                        {user && user.vendor && (
                            <button className="edit"  onClick={handleClickOpen}>Edit</button>
                        )}
                    </div>
                </div>
                <AddProduct
                    open={open}
                    onClose={handleClose}
                    name={products.name}
                    detail={products.detail}
                    price={products.price}
                    image={products.image}
                    quantity={products.quantity}
                    category={products.category}
                    productId={products._id}
                />
            </div>
            )}
        </div>
    );
};

export default ProductDetail;
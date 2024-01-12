import React, {useState, useEffect, useRef} from 'react';
import './ProductDetails.css';
import {useParams} from 'react-router-dom';
import {useAuth} from "../firebase/AuthContext";
import AddProduct from "./AddProduct.jsx";
import {decrementCartItem, fetchCart, incrementCartItem} from "../redux/cartAction.js";
import {useDispatch, useSelector} from "react-redux";


const ProductDetail = () => {
    let {productId} = useParams();
    const [open, setOpen] = useState(false);
    const {user} = useAuth();
    const [products, setProducts] = useState(null);

    const [fetchedProducts, setFetchedProducts] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const dispatch = useDispatch();
    const [isUpdate, setIsUpdate] = useState(false);
    const cart = useSelector(state => state.cart.items);


    useEffect(() => {
        if (user) {
            const userId = user.id;
            dispatch(fetchCart(userId));
        }
    }, [user, isUpdate]);

    useEffect(() => {
        if (products && cart && cart.items) {
            //Synchronize quantity in products page when edit in cart
            const item = cart.items.find((item) => {
                    return item.productId === products._id;
                }
            );
            item ? setQuantity(item.quantity) : setQuantity(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart, products])

    const handleQuantityChange = async (newQuantity) => {
        const productInfo = {
            productId: products._id,
            name: products.name,
            image: products.image,
            price: products.price,
        };
        const userId = user.id;
        if (newQuantity > quantity) {
            try {
                await dispatch(incrementCartItem(userId, productInfo));
                setIsUpdate(!isUpdate);
            } catch (err) {
                console.log(err);
            }
        } else {
            try{
                await dispatch(decrementCartItem(userId, productInfo));
                setIsUpdate(!isUpdate);
            }catch(err){
                console.log(err);
            }
        }
        setQuantity(newQuantity);
    };

    const addToCart = async () => {
        await handleQuantityChange(1);
        setQuantity(1);
    };
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/products/${productId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
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
            {products && (
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
                            {quantity > 0 ? (
                                    <div className="quantity-container">
                                        <button onClick={() => handleQuantityChange(quantity - 1)}>-</button>
                                        <span>{quantity}</span>
                                        <button onClick={() => handleQuantityChange(quantity + 1)}>+</button>
                                    </div>) :
                                (<button className="cart" onClick={addToCart}>Add To Cart</button>)
                            }
                            {user && user.vendor && (
                                <button className="edit" onClick={handleClickOpen}>Edit</button>
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
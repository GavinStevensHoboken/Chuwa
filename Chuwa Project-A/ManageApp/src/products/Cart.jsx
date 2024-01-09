import React, { useEffect, useState } from 'react';
import { useAuth } from '../firebase/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart, decrementCartItem, incrementCartItem, calculateTotalPrice } from '../auth/cartAction';
import "./Cart.css";
import { Button } from '@mui/base';


function Cart() {

    const cart = useSelector(state => state.cart.items);
    const subTotal = useSelector(state => state.cart.totalPrice);
    const {user, setUser} = useAuth();
    const dispatch = useDispatch();
    const [isUpdate, setUpdate] = useState(false);
    const tax = subTotal*0.01;
    const discount = 10;
    const total = subTotal+tax-discount;
    
    useEffect( () => {
        if (user) {
            const userId = user.id;
            dispatch(fetchCart(userId))
        }
    }, [user, isUpdate])

    const handleDecrement = async (itemInfo) => {
        const userId = user.id;
        await dispatch(decrementCartItem(userId, itemInfo));;
        setUpdate(!isUpdate);
    }

    const handleIncrement = async (itemInfo) => {
        const userId = user.id;
        await dispatch(incrementCartItem(userId, itemInfo));
        setUpdate(!isUpdate);
    }

    return (
        <>
            <div className="cart-container">
                <div className="cart-items">
                    { cart.items ? (cart.items.length === 0 ? (
                        <div>Your cart is empty.</div>
                        ) :
                        ( cart.items.map((item, index) => {
                            return (
                                <div className="cart-product" key={index}>
                                    <img src={item.image} style={{maxHeight: '300px', maxWidth: '300px'}}></img>
                                    <div className="product-info">
                                        <h4>{item.name}</h4>
                                        <p>quantity: {item.quantity}</p>
                                        <button onClick={() => handleDecrement(item)}>delete</button>
                                        <button onClick={() => handleIncrement(item)}>Add</button>
                                    </div>
                                    <h5>Price: {item.quantity*item.price}</h5>
                                </div>
                            )
                        })
                        )) : <div id="loading" className="loading">Loading...</div>
                        
                    }
                </div>
                <div className='total-price'>
                    
                        <p>Subtotal: ${subTotal}</p>
                        <p>Tax: ${tax}</p>
                        <p>Discount: ${discount}</p>
                        <p>Total: ${total}</p>
                        <button className="checkout-button">Check out</button>
                    
                </div>
            </div>
        </>
    )
}

export default Cart;
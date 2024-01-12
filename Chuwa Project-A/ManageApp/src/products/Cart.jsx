import React, { useEffect, useState } from 'react';
import { useAuth } from '../firebase/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart, decrementCartItem, incrementCartItem, setDiscountApplied } from '../redux/cartAction';
import "./Cart.css";


function Cart() {

    const cart = useSelector(state => state.cart.items);
    const subTotal = useSelector(state => state.cart.totalPrice);
    const {user, setUser} = useAuth();
    const dispatch = useDispatch();
    const [isUpdate, setUpdate] = useState(false);
    const [promoCode, setPromoCode] = useState('');
    const discountApplied = useSelector(state => state.cart.isDiscountApplied)
    const tax = subTotal*0.01;
    const discount = discountApplied ? 10 : 0;
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

    const handlePromoCode = (e) => {
        setPromoCode(e.target.value);
    }

    const handleCheckPromoCode = () => {
        if (promoCode === 'DISCOUNT') {
            dispatch(setDiscountApplied(true));
        } else {
            dispatch(setDiscountApplied(false));
            alert('Invalid Promotion Code!');
        }
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
                                        <button onClick={() => handleDecrement(item)}>Delete</button>
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
                        <input className="promo-code" type="text" value={promoCode} onChange={(e) => handlePromoCode(e)} placeholder='Please enter promotion code here'/>
                        <button onClick={handleCheckPromoCode}>Apply</button>
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
import React, { useEffect, useState } from 'react';
import { useAuth } from '../firebase/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart, decrementCartItem } from '../auth/cartAction';
import { useNavigate } from 'react-router-dom';


function Cart() {

    const cart = useSelector(state => state.cart.items)
    const {user, setUser} = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isUpdate, setUpdate] = useState(false);
    
    useEffect( () => {
        if (user) {
            const userId = user.id;
            dispatch(fetchCart(userId));
        }
    }, [user, isUpdate])

    const handleDecrement = async (itemInfo) => {
        const userId = user.id;
        await dispatch(decrementCartItem(userId, itemInfo));
        setUpdate(!isUpdate);
    }

    console.log(cart)
    return (
        <>
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
                                </div>
                            </div>
                        )
                    })
                    )) : ''
                    
                }
                
            </div>
        </>
    )
}

export default Cart;
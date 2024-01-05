import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';


function Cart() {

    // const cart = useSelector(state => state.cart)
    const [cart, setCart] = useState({ items: [] })

    useEffect( () => {
        const cookieArray = document.cookie.split('; ');
        const cookie = cookieArray.find(c => c.startsWith('token='));
        if (cookie) {
            const token = cookie.split('=')[1];
            const decoded = jwtDecode(token);
            const userId = decoded.user.id;
    
            fetch(`http://localhost:3000/api/getCart/${userId}`, {credentials: 'include'})
                .then(response => response.json())
                .then(cartData => {
                    setCart(cartData);
            });
        }
    }, [])

    return (
        <>
            <div className="cart-items">
                
                { cart.items.length === 0 ? (
                <div>Your cart is empty.</div>
                ) :
                ( cart.items.map((item, index) => {
                    return (
                        <div className="cart-product" key={index}>
                            <img src={item.image} style={{maxHeight: '300px', maxWidth: '300px'}}></img>
                            <div className="product-info">
                                <h4>{item.name}</h4>
                                <p>quantity: {item.quantity}</p>
                            </div>
                        </div>
                    )
                })
                )}
            </div>
        </>
    )
}

export default Cart;
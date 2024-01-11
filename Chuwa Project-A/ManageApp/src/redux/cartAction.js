export const fetchCart = (userId) =>  async (dispatch) => {
    try{
        const res = await fetch(`http://localhost:3000/api/Cart/${userId}`, {
            credentials: 'include',
        });
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const cartData = await res.json()
        await dispatch({ type: 'FETCH_CART_SUCCESS', payload: cartData });
        dispatch(calculateTotalPrice(cartData.items))
    }catch(err){
        console.error('Error fetching cart:', err);
    }
}

export const incrementCartItem = (userId, productInfo) => async (dispatch, getState) => {
    try {
        const response = await fetch(`http://localhost:3000/api/Cart`, {
            method: 'POST',
            body: JSON.stringify({ userId, productInfo }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const updatedCartData = await response.json();
        await dispatch({ type: 'ADD_CART_SUCCESS', payload: updatedCartData });

        const currentCartItems = getState().cart.items;
        dispatch(calculateTotalPrice(currentCartItems.cart.items));
    } catch (err) {
        console.error('Error adding to cart:', err);
    }
};

export const decrementCartItem = (userId, productInfo) => async (dispatch, getState) => {
    try {
        const response = await fetch(`http://localhost:3000/api/Cart`, {
            method: 'PUT',
            body: JSON.stringify({ userId, productInfo }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const updatedCartData = await response.json();
        await dispatch({ type: 'UPDATE_CART_SUCCESS', payload: updatedCartData });
        const currentCartItems = getState().cart.items;
        dispatch(calculateTotalPrice(currentCartItems.cart.items));
    } catch (err) {
        console.error('Error updating cart:', err);
    }
};

export const calculateTotalPrice = (cartItems) => {
    return (dispatch) => {
        let totalPrice = 0;
        cartItems.forEach(item => {
            totalPrice += item.price * item.quantity;
        });
        dispatch({ type: 'CALCULATE_TOTAL_PRICE', payload: totalPrice });
    }
};
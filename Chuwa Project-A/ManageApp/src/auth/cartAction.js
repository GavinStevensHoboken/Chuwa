export const fetchCart = (userId) =>  async (dispatch) => {
    try{
        const res = await fetch(`http://localhost:3000/api/Cart/${userId}`, {
            credentials: 'include',
        });
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const cartData = await res.json()
        dispatch({ type: 'FETCH_CART_SUCCESS', payload: cartData });
    }catch(err){
        console.error('Error fetching cart:', err);
    }
}

export const decrementCartItem = (userId, productInfo) => async (dispatch) => {
    try {
        const response = await fetch(`http://localhost:3000/api/Cart`, {
            method: 'PUT',
            body: JSON.stringify({ userId, productInfo }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const updatedCartData = await response.json();
        dispatch({ type: 'UPDATE_CART_SUCCESS', payload: updatedCartData });
    } catch (err) {
        console.error('Error updating cart:', err);
    }
};
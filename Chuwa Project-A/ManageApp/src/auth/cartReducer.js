const initialState = {
    items: [],
    totalPrice: 0
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_CART_SUCCESS':
            return { ...state, items: action.payload };
        case 'ADD_CART_SUCCESS' : 
            return { ...state, items: action.payload };
        case 'UPDATE_CART_SUCCESS':
            return { ...state, items: action.payload };
        case 'CALCULATE_TOTAL_PRICE':
            return {
                ...state,
                totalPrice: action.payload
            };
        default:
            return state;
    }
};
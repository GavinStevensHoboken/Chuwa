const initialState = {
    items: [],
    totalPrice: 0,
    isDiscountApplied: false,
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
        case 'SET_DISCOUNT_APPLIED':
            return{
                ...state,
                isDiscountApplied: action.payload
            }
        default:
            return state;
    }
};
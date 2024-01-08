const initialState = {
    items: []
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_CART_SUCCESS':
            return { ...state, items: action.payload };
        case 'UPDATE_CART_SUCCESS':
            return { ...state, items: action.payload };
        default:
            return state;
    }
};
const cartInitialState = {
    items: [],
    total: 0
};

export const cartReducer = (state = cartInitialState, action) => {
    switch (action.type) {
      case 'ADD_ITEM':
        return {
          ...state,
          items: [...state.items, action.payload]
        };
      case 'REMOVE_ITEM':
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload)
        };
      case 'CALCULATE_TOTAL':
        return {
          ...state,
          total: state.items.reduce((total, item) => total + item.price * item.quantity, 0)
        };
      default:
        return state;
      case 'SET_CART_ITEMS':
        return {
            ...state,
            items: action.payload
        };
    }

}

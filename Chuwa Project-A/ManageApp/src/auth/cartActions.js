export const addItem = (item) => {
    return {
        type: 'ADD_ITEM',
        payload: item
    }  
};
  
export const removeItem = itemId => ({
    type: 'REMOVE_ITEM',
    payload: itemId
});
  
export const calculateTotal = () => ({
    type: 'CALCULATE_TOTAL'
});

// Action 类型
const SET_CART_ITEMS = 'SET_CART_ITEMS';

// Action 创建函数
export const setCartItems = (items) => ({
    type: SET_CART_ITEMS,
    payload: items
});
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../firebase/AuthContext';
import { fetchCart, decrementCartItem, incrementCartItem } from '../redux/cartAction';
import { useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


function SideBarCart({ isCartOpen, toggleCart }) {
    const cart = useSelector(state => state.cart.items);
    const subTotal = useSelector(state => state.cart.totalPrice);
    const { user } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isUpdate, setIsUpdate] = useState(false);
    const tax = subTotal * 0.01;
    const discount = 10;
    const total = subTotal + tax - discount;

    useEffect(() => {
        if (user) {
            const userId = user.id;
            dispatch(fetchCart(userId));
        }
    }, [user, isUpdate]);

    const handleDecrement = async (itemInfo) => {
        const userId = user.id;
        await dispatch(decrementCartItem(userId, itemInfo));
        setIsUpdate(!isUpdate);
    };

    const handleIncrement = async (itemInfo) => {
        const userId = user.id;
        await dispatch(incrementCartItem(userId, itemInfo));
        setIsUpdate(!isUpdate);
    };

    const handleCartDetail = () => {
        navigate('/cart')
    }

    return (
        <Drawer anchor='right' open={isCartOpen} onClose={toggleCart}>
            <Box sx={{ width: 250 }} role="presentation">
                <List>
                    {cart.items && cart.items.map((item, index) => (
                        <ListItem key={index} secondaryAction={
                            <>
                                <IconButton edge="end" aria-label="decrement" onClick={() => handleDecrement(item)}>
                                    <RemoveCircleOutlineIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="increment" onClick={() => handleIncrement(item)}>
                                    <AddCircleOutlineIcon />
                                </IconButton>
                            </>
                        }>
                            <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity} Price: $${item.price}`} />
                        </ListItem>
                    ))}
                    <Button variant="contained" sx={{ mt: 2, width: '100%'}} onClick={handleCartDetail}>Show Cart Detail</Button>
                </List>
                
                <Box sx={{ p: 2 }}>
                    
                    <p>Subtotal: ${subTotal.toFixed(2)}</p>
                    <p>Tax: ${tax.toFixed(2)}</p>
                    <p>Discount: -${discount.toFixed(2)}</p>
                    <p>Total: ${total.toFixed(2)}</p>
                    
                </Box>
                <Button variant="contained" sx={{ mt: 2,  width: '100%'}}>Check out</Button>
            </Box>
        </Drawer>
    );
}

export default SideBarCart;


import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import { CardContent,CardMedia, Typography,CardActionArea,IconButton} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove'
import { Button,Stack } from '@mui/material';
import "./productCard.css"
import AddProduct from "./AddProduct";
import { useAuth } from "../firebase/AuthContext";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, calculateTotalPrice, decrementCartItem, incrementCartItem } from '../auth/cartAction';
import { useNavigate } from 'react-router-dom';

const ProductCard = (props) =>{
    const [count, setCount] = React.useState(props.selected);
    const [open, setOpen] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const {user} = useAuth();
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [entrypoint, setEntrypoint] = useState('');

    useEffect(() => {
        if (user) {
            const userId = user.id;
            dispatch(fetchCart(userId));
        }
    }, [user, isUpdate]);

    useEffect(() => {
        if(cart && cart.items){
            //Synchronize quantity in products page when edit in cart
            const item = cart.items.find((item) => {
                return item.productId === props.productId;
            }
                );
            item ? setCount(item.quantity) : setCount(0);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart])

    const AddComponent = ({count, quantity}) => {
        let context;
        if(count){
            context = (<Stack direction="row" spacing={10} justifyContent="space-between">
            <div style={{ display: 'flex',alignItems: 'center', margin:'0.7px'}}>
                <IconButton onClick={handleDecrement} style={{ backgroundColor: '#007BFF', color: 'white',margin: '2px' }}>
                    <RemoveIcon />
                </IconButton>
                <Typography variant="body1">{count}</Typography>
                <IconButton onClick={handleIncrement} style={{ backgroundColor: '#007BFF', color: 'white',margin:'2px' }}>
                    <AddIcon />
                </IconButton>
            </div>
            <div>
            {user && user.vendor && <Button variant="contained" onClick={handleClickOpen} style={{margin:'3px' }}>Edit </Button>}
            </div>
        </Stack>)
        }else if(quantity === 0){
            context = (
              <Stack
                direction="row"
                spacing={10}
                justifyContent="space-between"
                alignItems="center"
              > 
                  <p>out of stock</p>
                  {user && user.vendor && (
                    <Button
                      variant="contained"
                      onClick={handleClickOpen}
                      style={{ margin: "3px" }}
                    >
                      Edit
                    </Button>
                  )}
              </Stack>
            );
        }else{
            context = (
                <Stack direction="row" spacing={10} justifyContent="space-between">
                    <Button variant="contained" onClick={handleIncrement} style={{margin:'4px'}}>Add</Button>
                    {user && user.vendor && <Button variant="contained" onClick={handleClickOpen} style={{margin:'4px'}}>Edit </Button>}
                </Stack>
            )
        }
        return context;
    }

    const handleIncrement = async () => {
        setCount(count+1);
        
        const productInfo = {
          productId: props.productId,
          name: props.name,
          image: props.image,
          price: props.price,
        };
        const userId = user.id;
        try{
            await dispatch(incrementCartItem(userId, productInfo));
            setIsUpdate(!isUpdate);
        }catch(err) {
            console.log(err);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
        setEntrypoint('edit');
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDecrement = async () => {
        if(count>0) setCount(count-1);
        const productInfo = {
            productId: props.productId,
            name: props.name,
            image: props.image,
            price: props.price,
          };
        const userId = user.id;
        try{
            await dispatch(decrementCartItem(userId, productInfo));
            setIsUpdate(!isUpdate);
        }catch(err){
            console.log(err);
        }
        

    };


    const handleCardClick = () => {
        navigate(`/productDetails/${props.productId}`);
    };

    return (
        <Card sx={{ maxWidth: 345, height: '100%'}} className='image-item'>
            <CardActionArea sx={{ height: '100%'  }} onClick={handleCardClick}>
                <CardMedia
                    component="img"
                    image={props.image}
                    alt="green iguana"
                    className='image-item'
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.name + ' ' + props.detail}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" fontWeight="bold">
                        {'$'+props.price}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <AddComponent count={count} quantity={props.quantity}/>
            {/* {count ? (
                <Stack direction="row" spacing={10} justifyContent="space-between">
                    <div style={{ display: 'flex',alignItems: 'center', margin:'0.7px'}}>
                        <IconButton onClick={handleDecrement} style={{ backgroundColor: '#007BFF', color: 'white',margin: '2px' }}>
                            <RemoveIcon />
                        </IconButton>
                        <Typography variant="body1">{count}</Typography>
                        <IconButton onClick={handleIncrement} style={{ backgroundColor: '#007BFF', color: 'white',margin:'2px' }}>
                            <AddIcon />
                        </IconButton>
                    </div>
                    <div>
                    {user && user.vendor && <Button variant="contained" onClick={handleClickOpen} style={{margin:'3px' }}>Edit </Button>}
                    </div>
                </Stack>
            ):(
                <Stack direction="row" spacing={10} justifyContent="space-between">
                    <Button variant="contained" onClick={handleIncrement} style={{margin:'4px'}}>Add</Button>
                    {user && user.vendor && <Button variant="contained" onClick={handleClickOpen} style={{margin:'4px'}}>Edit </Button>}
                </Stack>

            ) } */}
            <AddProduct
                        open={open}
                        onClose={handleClose}
                        name={props.name}
                        detail={props.detail}
                        price={props.price}
                        image={props.image}
                        productId={props.productId}
                        entry={entrypoint}
                    />

        </Card>
    );
}

export default ProductCard;
import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import { CardContent,CardMedia, Typography,CardActionArea,IconButton} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove'
import { Button,Stack } from '@mui/material';
import "./productCard.css"
import AddProduct from "./AddProduct";
import { useAuth } from "../firebase/AuthContext";



import { useNavigate } from 'react-router-dom';

const ProductCard = (props) =>{
    const [count, setCount] = React.useState(props.selected);
    const [open, setOpen] = useState(false);
    const {user} = useAuth();


    const navigate = useNavigate();
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
            //这个API待定，等购物车功能实现
            // const resp = await fetch('http://localhost:3000/api/user',{
            //     method: 'POST',
            //     headers:{
            //         'Content-Type': 'application/json',
            //     },
            //     body:JSON.stringify({userId: userId, productId: props.productId})
            // });
            // if(!resp.ok) throw new Error(resp.statusText);
            await fetch('http://localhost:3000/api/Cart', {
              method: 'POST',
              body: JSON.stringify({userId, productInfo}),
              headers: {
                  'Content-Type': 'application/json',
              },
            });
        }catch(err) {
            console.log(err);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleDecrement = () => {
        if(count>0) setCount(count-1);

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
            {count ? (
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

            ) }
            <AddProduct
                        open={open}
                        onClose={handleClose}
                        name={props.name}
                        detail={props.detail}
                        price={props.price}
                        image={props.image}
                        productId={props.productId}
                    />

        </Card>
    );
}

export default ProductCard;
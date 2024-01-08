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




const ProductCard = (props) =>{
    const [count, setCount] = React.useState(props.selected);
    const [open, setOpen] = useState(false);
    const {user, setUser} = useAuth();


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
    
  return (
    <Card sx={{display:'flex',flexWrap:'wrap',width:'270px'}}>
      <CardActionArea >
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
        <Stack direction="row" spacing={2}>
            <div style={{ display: 'flex',alignItems: 'center' }}>
                <IconButton onClick={handleDecrement} style={{ backgroundColor: '#007BFF', color: 'white',margin: '2px' }}>
                    <RemoveIcon />
                </IconButton>
                <Typography variant="body1">{count}</Typography>
                <IconButton onClick={handleIncrement} style={{ backgroundColor: '#007BFF', color: 'white',margin:'2px' }}>
                    <AddIcon />
                </IconButton>
            </div>
            <Button variant="contained" style={{justifyContent: 'flex-end'}}> Edit </Button>
        </Stack>
      ):(
        <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={handleIncrement}>Add</Button>
            {user && user.vendor && <Button variant="contained" onClick={handleClickOpen} >Edit </Button>}
            <AddProduct
                    open={open}
                    onClose={handleClose}
                    name={props.name}
                    detail={props.detail}
                    price={props.price}
                    image={props.image}
                />
        </Stack>
        
    ) }
      
    </Card>
  );
}

export default ProductCard;
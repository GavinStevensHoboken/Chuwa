import * as React from 'react';
import Card from '@mui/material/Card';
import { CardContent,CardMedia, Typography,CardActionArea,IconButton} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove'
import { Button,Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addItem } from '../auth/cartActions';
import { useSelector } from 'react-redux';
import {jwtDecode} from 'jwt-decode';

const ProductCard = (props) =>{
    const [count, setCount] = React.useState(props.selected);
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch();

    const handleIncrement = () => {
        setCount(count+1);
    };

    const handleDecrement = () => {
        if(count>0) setCount(count-1);
        
    };

    const handleAdd = async () => {
      const productInfo = {
        name: props.name,
        image: props.image,
        price: props.price,
      };
      const cookieArray = document.cookie.split('; ');
      const cookie = cookieArray.find(c => c.startsWith('token='));
      const token = cookie.split('=')[1];
      const decoded = jwtDecode(token);
      const userId = decoded.user.id;
      await fetch('http://localhost:3000/api/addCart', {
            method: 'POST',
            body: JSON.stringify({userId, productInfo}),
            headers: {
                'Content-Type': 'application/json',
            },
      });
    }
  return (
    <Card sx={{ maxWidth: 345, height: '100%'}}>
      <CardActionArea sx={{ height: '100%'  }}>
        <CardMedia
          component="img"
          sx={{ height: '50%' }}
          image={props.image}
          alt="green iguana"
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
      {props.selected ? (
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
            <Button variant="contained" onClick={handleAdd}>Add</Button>
            <Button variant="contained">Edit</Button>
        </Stack>
        
    ) }
      
    </Card>
  );
}

export default ProductCard;
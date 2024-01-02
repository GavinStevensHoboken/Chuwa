import { useState, useEffect } from "react";
import DropDown from './DropDown';
import { Button,Box } from "@mui/material";
import ProductCard from "./ProductCard";
import AddProduct from "./AddProduct";
import Grid from '@mui/material/Unstable_Grid2';


const testData = [{name:'Apple Iphone 11', detail:'128G', price:499,selected:2,image:'https://images.unsplash.com/photo-1607936854279-55e8a4c64888?q=80&w=1664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
{name:'Apple Iphone 12', detail:'128G', price:499,selected:0,image:'https://images.unsplash.com/photo-1607936854279-55e8a4c64888?q=80&w=1664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
{name:'Watch', detail:'128G', price:499,selected:2,image:'https://images.unsplash.com/photo-1558126319-c9feecbf57ee?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
{name:'Vr 11', detail:'128G', price:499,selected:2,image:'https://images.unsplash.com/photo-1607936854279-55e8a4c64888?q=80&w=1664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
{name:'Apple Iphone 11', detail:'128G', price:499,selected:2,image:'https://images.unsplash.com/photo-1607936854279-55e8a4c64888?q=80&w=1664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
{name:'Macbook 11', detail:'128G', price:499,selected:2,image:'https://images.unsplash.com/photo-1607936854279-55e8a4c64888?q=80&w=1664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
{name:'Apple Iphone 11', detail:'128G', price:499,selected:2,image:'https://images.unsplash.com/photo-1607936854279-55e8a4c64888?q=80&w=1664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
{name:'Dell 11', detail:'128G', price:499,selected:2,image:'https://images.unsplash.com/photo-1607936854279-55e8a4c64888?q=80&w=1664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
{name:'Apple Iphone 11', detail:'128G', price:499,selected:2,image:'https://images.unsplash.com/photo-1607936854279-55e8a4c64888?q=80&w=1664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
{name:'Apple Iphone 11', detail:'128G', price:499,selected:2,image:'https://images.unsplash.com/photo-1607936854279-55e8a4c64888?q=80&w=1664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
]

const Products = () => {
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchData = async() => {
            try{
                const res = await fetch('http://localhost:3000/api/products');
                const result = await res.json();
                setData(result);
                setLoading(false);
            }catch(err){
                setError(err);
            }
        };

        fetchData();
    },[]);
    

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    if(loading) {
        return (
            <div>Page is loading</div>
        )
    }else if(error){
        return(
            <div>{error}</div>
        )
    } else{
        return (
            <>
                <h1>Products</h1>
                <div style={{display:"flex", justifyContent:"space-around", margin:"18px"}}>
                    <DropDown/>
                    <Button variant="outlined" onClick={handleClickOpen} >Add Product</Button>
                </div>
                <AddProduct
                    open={open}
                    onClose={handleClose}
                />
                
                <Box sx={{ flexGrow: 1,margin:"15px" }}>
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    {data.map((item,idx) => (<ProductCard key={idx} 
                    name={item.name} 
                    price={item.price}
                    detail={2}
                    selected={item.selected}
                    image={item.image}/>))}
                </Grid>
                </Box>
                
            </>
            
        )
    }
}

export default Products;
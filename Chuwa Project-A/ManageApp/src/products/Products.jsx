import {useState, useEffect} from "react";
import { useAuth } from "../firebase/AuthContext";
import DropDown from './DropDown';
import {Button, Box} from "@mui/material";
import ProductCard from "./ProductCard";
import AddProduct from "./AddProduct";
import Grid from '@mui/material/Unstable_Grid2';




const Products = () => {
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [open, setOpen] = useState(false);
    const {user} = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/products');
                const result = await res.json();
                setData(result);
                setLoading(false);
            } catch (err) {
                setError(err);
            }
        };

        fetchData();
    }, []);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    if (loading) {
        return (
            <div>Page is loading</div>
        )
    } else if (error) {
        return (
            <div>{error}</div>
        )
    } else {
        return (
            <>
                <h1>Products</h1>
                <div style={{display: "flex", justifyContent: "space-around", margin: "18px"}}>
                    <DropDown/>
                    {user && user.vendor && <Button variant="outlined" onClick={handleClickOpen} >Add Product</Button>}
                </div>
                <AddProduct
                    open={open}
                    onClose={handleClose}
                />

                <Box sx={{flexGrow: 1, margin: "15px"}}>
                    <Grid
                        container
                        spacing={{xs: 2, md: 3}}
                        columns={{xs: 4, sm: 8, md: 12}}
                    >
                        {data.map((item, idx) => (<ProductCard key={idx}
                                                               id={item._id}
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
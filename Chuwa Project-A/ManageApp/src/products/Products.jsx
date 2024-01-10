import {useState, useEffect} from "react";
import { useAuth } from "../firebase/AuthContext";
import { useHeader } from "../header/HeaderContext";
import DropDown from './DropDown';
import {Button, Box} from "@mui/material";
import ProductCard from "./ProductCard";
import AddProduct from "./AddProduct";
import Grid from '@mui/material/Unstable_Grid2';
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';



const Products = () => {
    const [data, setData] = useState([]);
    const [searchedData, setSearchedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [open, setOpen] = useState(false);
    const {user} = useAuth();
    const {search} = useHeader();
    const [pageNum, setPageNum] = useState(1);
    const [pages, setPages] = useState(0);
    const [effect, setEffect] = useState(undefined)
    const [entrypoint, setEntrypoint] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            if(user && user.id){
                try {
                    const res = await fetch('http://localhost:3000/api/productsByUser/'+user.id);
                    const result = await res.json();
                    setData(result);
                    setLoading(false);
                    
                } catch (err) {
                    setError(err);
                }
            }
            
        };

        fetchData();
    }, [effect,user]);

    useEffect(() => {
        let result;
        if(search && data.length != 0){
            result = data.filter((item) => item.name.includes(search));
        }else{
            result = data;
        }
        setSearchedData(result);
        setPages(Math.ceil(result.length / 8));
    }, [data, search]);

    const handleChange = (e ,value) => {
        setPageNum(value);
    }
    const handleClickOpen = () => {
        setOpen(true);
        setEntrypoint('add');
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "18px",
              }}
            >
              <DropDown data={data} setData={setData} setEffect={setEffect} />
              {user && user.vendor && (
                <Button variant="outlined" onClick={handleClickOpen}>
                  Add Product
                </Button>
              )}
            </div>
            <AddProduct open={open} onClose={handleClose} entry={entrypoint}/>

            <Box sx={{ flexGrow: 1, margin: "15px" }}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {searchedData.slice((pageNum-1)*8,pageNum*8).map((item, idx) => (
                  <ProductCard
                    key={idx}
                    productId={item._id}
                    name={item.name}
                    price={item.price}
                    detail={2}
                    selected={item.selected}
                    image={item.image}
                  />
                ))}
              </Grid>
            </Box>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
            <Stack spacing={2} >
              <Pagination count={pages} page={pageNum} onChange={handleChange} color="primary" />
            </Stack>
            </div>
          </>
        );
    }
}

export default Products;
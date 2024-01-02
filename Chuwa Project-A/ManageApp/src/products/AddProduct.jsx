import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Box, FormControl, Input, InputLabel, 
    Button, Dialog, DialogTitle, Grid, 
    TextField,InputAdornment, Alert, Snackbar} from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';


const AddProduct = (props) => {
    const fileInputRef = useRef(null);
    const [filePath, setFilePath] = useState('http://');
    const [imageUrl, setImageUrl] = useState(null);
    const [openToast, setOpenToast] = useState(true);
    const [productData, setProductData] = useState({
        name:'',
        category:'',
        detail:'',
        price:'',
        quantity:'',
        image:''
    })
    const [error, setError] = useState('');

    useEffect(() => {
        if (filePath) {
          setImageUrl(filePath);
        }
      }, [filePath]);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    }

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if(selectedFile) {
            const path = URL.createObjectURL(selectedFile);
            setFilePath(path);
            setProductData((prevData) => ({
                ...prevData,
                image:path
            }))
        }
    }
    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]:value
            }
        ));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const resp = await fetch('http://localhost:3000/api/products',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(productData)
            });
            if(!resp.ok) throw new Error(resp.statusText);
        }catch(err) {
            setError(err);
            setOpenToast(true);
        }
    }

    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Create Product</DialogTitle>
        <Snackbar 
            open={openToast}
            anchorOrigin={{ vertical:"top", horizontal:"center" }} 
            onClose={() => setOpenToast(false)}
            autoHideDuration={6000} >
        <Alert severity="error" sx={{ width: '100%' }}>
          {error.message}
        </Alert>
      </Snackbar>
        <Box
          component="form"
          sx={{
            "& > :not(style)": {
              m: 1,
              width: "100%", // Set to 100% initially
              "@media (min-width: 600px)": {
                width: "50%", // Adjust for larger screens, e.g., tablets
              },
              "@media (min-width: 960px)": {
                width: "70%", // Adjust for larger screens, e.g., PCs
              },
            },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl variant="standard">
                <label htmlFor="productName">Product Name</label>
                <TextField
                  id="productName"
                  variant="outlined"
                  name="name"
                  onChange={handleInputChange}
                  style={{ width: "150%", borderColor: "#C7D0DD" }}
                ></TextField>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="standard">
                <label htmlFor="productDescription">Product Description</label>

                <TextareaAutosize
                  id="productDescription"
                  minRows={5}
                  name="detail"
                  onChange={handleInputChange}
                  style={{
                    maxWidth: "50ch",
                    width: "150%",
                    borderColor: "#C7D0DD",
                  }}
                ></TextareaAutosize>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl variant="standard">
                <label htmlFor="category">Category</label>
                <TextField 
                    id="category"
                    name="category"
                    onChange={handleInputChange}
                ></TextField>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl variant="standard">
                <label htmlFor="price">Price</label>
                <TextField 
                    id="price"
                    name="price"
                    onChange={handleInputChange}
                ></TextField>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl variant="standard">
                <label htmlFor="stockQuantity">In Stock Quantity</label>
                <TextField 
                    id="stockQuantity"
                    name="quantity"
                    onChange={handleInputChange}
                ></TextField>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl variant="standard">
                <label htmlFor="imageLink">Add Image Link</label>
                <TextField
                  label="File Path"
                  value={filePath}
                  name="image"
                  onChange={(e) => {
                    setFilePath(e.target.value);
                    setProductData((prevData) => ({
                        ...prevData,
                        [e.target.name]:e.target.value
                        }
                    ));
                }}
                  variant="outlined"
                  style={{marginTop:"5px"}}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button variant="contained" 
                            onClick={handleButtonClick}
                            style={{width:"100%",fontSize:"10px"}}>
                          Upload Image
                        </Button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          style={{ display: "None"}}
                          onChange={handleFileChange}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
          
        <Box mt={2} textAlign="center">
          <img src={imageUrl? imageUrl:"https://raw.githubusercontent.com/mickylab/markdown-pic/main/no-image-available.png"} alt="Image preview" height="500px" />
        </Box>
      

          <Button type="submit" variant="contained" onClick={handleSubmit}>
            Add Product
          </Button>
        </Box>
      </Dialog>
    );
}
AddProduct.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };

export default AddProduct;
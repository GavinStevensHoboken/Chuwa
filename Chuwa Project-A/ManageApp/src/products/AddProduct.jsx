import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import {useAuth} from '../firebase/AuthContext';
import {useSelector, useDispatch} from 'react-redux';
import { ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {storage} from '../firebase/Firebase';
import PropTypes from 'prop-types';
import {Box, FormControl, Input, InputLabel, 
    Button, Dialog, DialogTitle, Grid, 
    TextField,InputAdornment, Alert, Snackbar} from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import {decrementCartItem,fetchCart} from '../redux/cartAction';


const AddProduct = (props) => {
    const fileInputRef = useRef(null);
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();
    const {user} = useAuth();
    const [filePath, setFilePath] = useState(props.image);
    const [filename, setFilename] = useState('');
    const [imageUrl, setImageUrl] = useState(props.image);
    const [upload, setUpload] = useState(undefined);
    const [openToast, setOpenToast] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [productData, setProductData] = useState({
        name:props.name,
        category:props.category,
        detail:props.detail,
        price:props.price,
        quantity:props.quantity,
        image:props.image
    })
    const [error, setError] = useState('');

    useEffect(() => {
        if (filePath) {
          setImageUrl(filePath);
        }
      }, [filePath]);

      useEffect(() => {
        setProductData({
          name:props.name,
          category:props.category,
          detail:props.detail,
          price:props.price,
          quantity:props.quantity,
          image:props.image
        });
        setFilePath(props.image);
      }, [props]);
      

      useEffect(() => {
        if (user) {
            const userId = user.id;
            dispatch(fetchCart(userId));
        }
    }, [user, isUpdate]);


    const handleButtonClick = () => {
        fileInputRef.current.click();
    }

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if(selectedFile) {
            const path = URL.createObjectURL(selectedFile);
            setUpload(selectedFile);
            setFilename(selectedFile.name);
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
          let uploadUrl;
          if(filePath.slice(0,4) === 'http'){
            uploadUrl = filePath;
          }else{
            const storageRef = ref(storage, filename);

            const img = await uploadBytes(storageRef, upload);
            uploadUrl = await getDownloadURL(img.ref);
          }
          let resp
          if(props.entry === 'add'){
                resp = await fetch('http://localhost:3000/api/products',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({...productData,image: uploadUrl})
            });
          }else{
                resp = await fetch('http://localhost:3000/api/products/'+props.productId,{
                method: 'put',
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({...productData,image: uploadUrl})
                })
                props.setData(prev => prev.map( item => {
                  return(
                  item._id === props.productId ? 
                  {...item,
                  name:productData.name,
                  detail:productData.detail,
                  price:productData.price,
                  image:productData.image,
                  category:productData.category}:item)
                }))
        }
          if(!resp.ok) throw new Error("Please fulfill all blanks");
          if(props.entry == 'add') {
            let result = await resp.json();
            props.setData((prev) => ([...prev,{...productData,image: uploadUrl, _id:result.id,selected:0}]))
          }
            //toast Success
          
          handleClose();

        }catch(err) {
            setError(err);
            setOpenToast(true);
        }
    }

    const handleDelete = async (e) => {
      e.preventDefault();
      let itemInfo = {...productData, quantity:0,productId:props.productId};
        try{
            await dispatch(decrementCartItem(user.id,itemInfo));
            setIsUpdate(!isUpdate);
            let resp = await fetch('http://localhost:3000/api/products/'+ props.productId,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
            }
            });
            if(!resp.ok) throw new Error("Fail to delete ");
            props.setData((prev) => (prev.filter(item => item._id != props.productId)))
            
            //toast Success
            handleClose();
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
                  value={productData.name}
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
                  value={productData.detail}
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
                    value={productData.category}
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
                    value={productData.price}
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
                    value={productData.quantity}
                    onChange={handleInputChange}
                ></TextField>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl variant="standard">
                <label htmlFor="imageLink">Add Image Link</label>
                <TextField
                  label={filePath? "" : "FilePath"}
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
          {props.delete && <Button type="submit" variant="contained" onClick={handleDelete}>
            Delete
          </Button>}
        </Box>
      </Dialog>
    );
}
AddProduct.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };

export default AddProduct;
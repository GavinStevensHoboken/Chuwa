import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Box, FormControl, Input, InputLabel, Button, Dialog, DialogTitle, Grid, TextField,InputAdornment} from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';


const AddProduct = (props) => {
    const fileInputRef = useRef(null);
    const [filePath, setFilePath] = useState("http://");
    const [imageUrl, setImageUrl] = useState(null);

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
        }
    }
    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Create Product</DialogTitle>
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
                <label for="productName">Product Name</label>
                <TextField
                  id="productName"
                  variant="outlined"
                  style={{ width: "150%", borderColor: "#C7D0DD" }}
                ></TextField>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="standard">
                <label for="productDescription">Product Description</label>

                <TextareaAutosize
                  id="productDescription"
                  minRows={5}
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
                <label for="category">Category</label>
                <TextField id="category"></TextField>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl variant="standard">
                <label for="price">Price</label>
                <TextField id="price"></TextField>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl variant="standard">
                <label for="stockQuantity">In Stock Quantity</label>
                <TextField id="stockQuantity"></TextField>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl variant="standard">
                <label for="imageLink">Add Image Link</label>
                <TextField
                  label="File Path"
                  defaultValue="http://"
                  value={filePath}
                  onChange={(e) => setFilePath(e.target.value)}
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
      

          <Button type="submit" variant="contained">
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
import * as React from 'react';
import PropTypes from 'prop-types';
import {Box, FormControl, Input, InputLabel, Button, Dialog, DialogTitle} from '@mui/material';

const AddProduct = (props) => {
    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };
    return (
        <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Set backup account</DialogTitle>
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1 ,width:'25ch'},
              }}
              noValidate
              autoComplete="off"
        >
            <FormControl variant="standard">
                <InputLabel htmlFor="productName">Product Name</InputLabel>
                <Input id="productName"></Input>
            </FormControl>
            <FormControl variant="standard">
                <InputLabel htmlFor="productDescription">Product Description</InputLabel>
                <Input id="productDescription"></Input>
            </FormControl>
            <FormControl variant="standard">
                <InputLabel htmlFor="category">Category</InputLabel>
                <Input id="category"></Input>
            </FormControl>
            <FormControl variant="standard">
                <InputLabel htmlFor="price">Price</InputLabel>
                <Input id="price"></Input>
            </FormControl>
            <FormControl variant="standard">
                <InputLabel htmlFor="stockQuantity">In Stock Quantity</InputLabel>
                <Input id="stockQuantity"></Input>
            </FormControl>
            <FormControl variant="standard">
                <InputLabel htmlFor="imageLink">Add Image Link</InputLabel>
                <Input id="imageLink"></Input>
            </FormControl>
            <Button type="submit" variant="contained">Add Product</Button>
        </Box>
        </Dialog>
    )
}
AddProduct.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };

export default AddProduct;
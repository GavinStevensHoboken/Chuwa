import React, {useState, useEffect, useRef} from 'react';
import './ProductDetails.css';
import {useParams} from 'react-router-dom';

const ProductDetail = () => {
    let {productId} = useParams();
    const [products, setProducts] = useState([
        {
            "_id": "1",
            "title": "Nike Dunk Low Men's Shoes",
            "src": [
                "https://m.media-amazon.com/images/I/51RFfemMaoL._AC_SY625_.jpg",
                "https://m.media-amazon.com/images/I/71+r8r1p-HL._AC_SY625_.jpg",
                // Add more images if available
            ],
            "description": "Classic look and new colors.",
            "content": "The Nike Dunk Low Men's Shoe is a fresh rendition of a classic silhouette, featuring a comfortable fit, premium materials, and a durable outsole for lasting wear.",
            "price": 167.00,
            "colors": ["black", "blue"], // Use color names that match the product
            "sizes": ["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"], // Assuming these are the available sizes
            "material": {
                "sole": "Rubber",
                "outer": "Leather and Synthetic",
            },
            "style": "Modern",
            "closureType": "Lace-Up",
            "count": 1
        }
    ]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/products/${productId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.log("Fetching product failed", error);
            }
        };
        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    return (
        <div className="app">
            <div className="details" key={products._id}>
                <div className="big-img">
                    <img src={products.image} alt={products.name}/>
                </div>
                <div className="box">
                    <div style={{minHeight: '40px'}} className="">
                        <h3>{products.category}</h3>
                        <h2>{products.name}</h2>
                    </div>
                    <div className="row">
                        <span style={{fontSize: '20px'}}>${products.price}</span>
                    </div>
                    {products.quantity === 0 && (
                        <div className="out-of-stock-label">Out of Stock</div>
                    )}
                    <p>{products.detail}</p>
                    <div className="button-container">
                        <button className="cart">Add To Cart</button>
                        <button className="edit">Edit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
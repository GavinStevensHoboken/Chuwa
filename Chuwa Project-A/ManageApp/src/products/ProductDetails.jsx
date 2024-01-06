import React, {useState, useEffect, useRef} from 'react';
import './ProductDetails.css';
import Colors from './components/Colors'
import DetailsThumb from './components/DetailsThumb';
import {fontSize} from "@mui/system";

const ProductDetail = () => {
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

    const [index, setIndex] = useState(0);

    const myRef = useRef(null);

    // HandleTab function
    const handleTab = index => {
        setIndex(index);
        const images = myRef.current.children;
        for (let i = 0; i < images.length; i++) {
            images[i].className = images[i].className.replace("active", "");
        }
        images[index].className = "active";
    };

    // ComponentDidMount equivalent using useEffect
    useEffect(() => {
        myRef.current.children[index].className = "active";
    }, [index]); // Empty dependency array to run only once

    return (
        <div className="app">
            {
                products.map(item => (
                    <div className="details" key={item._id}>
                        <div className="big-img">
                            <img src={item.src[index]} alt={item.title}/>
                        </div>
                        <div className="box">
                            <div style={{minHeight: '40px'}} className="">
                                <h2>{item.title}</h2>
                            </div>

                            <div className="row">
                                <span style={{fontSize: '20px'}}>${item.price}</span>
                            </div>
                            <Colors colors={item.colors}/>
                            <p>{item.description}</p>
                            <p>{item.content}</p>
                            <DetailsThumb images={item.src} tab={handleTab} myRef={myRef}/>
                            <div className="button-container">
                                <button className="cart">Add To Cart</button>
                                <button className="edit">Edit</button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default ProductDetail;
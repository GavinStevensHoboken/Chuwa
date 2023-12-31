const mongoose = require('mongoose');
const { Schema } = mongoose;

const product = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'others'
    },
    detail: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const Product = mongoose.model('Product', product);

module.exports = Product;
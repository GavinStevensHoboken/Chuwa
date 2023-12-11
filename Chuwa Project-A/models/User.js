const mongoose = require('mongoose');
const { Schema } = mongoose;

const user = new Schema({
    email: {
        type: String,
        validate: {
            validator: function (value) {
                return validator.isEmail(value);
            },
            message: 'Invalid email address!'
        },
        required: true
    },
    password: {
        type: String,
        validate: {
            validator: function (value){
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value);
            },
            message: 'Invalid password!'
        },
        required: true
    },
    vendor: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('User', user);

module.exports = User;
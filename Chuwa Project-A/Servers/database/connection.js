const mongoose = require('mongoose');
require('dotenv').config();

const connect = async () => {
    await mongoose.connect("mongodb://localhost:27017/Project-A")
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch(err => {
      console.error(err.message);
      console.log('Error connecting to MongoDB');
      process.exit(1);
    });
}
module.exports = connect;
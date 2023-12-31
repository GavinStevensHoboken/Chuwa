const express = require('express');
const app = express();
const UserRouter = require('./routers/UserRouter');
const ProductRouter = require('./routers/ProductRouter');
const cors = require('cors');
const connectDB = require('./database/connection');
const PORT = 3000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', UserRouter);
app.use('/api',ProductRouter);

app.listen(PORT, () => {
    console.log(`The Server is running on port: ${PORT}`)
})
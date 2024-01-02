const express = require('express');
const app = express();
const UserRouter = require('./routers/UserRouter');
const ProductRouter = require('./routers/ProductRouter');
const cors = require('cors');
const connectDB = require('./database/connection');
const PORT = 3000;
const cookieParser = require('cookie-parser');

connectDB();
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true // 允许跨域请求携带 cookies
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', UserRouter);
app.use('/api',ProductRouter);

app.listen(PORT, () => {
    console.log(`The Server is running on port: ${PORT}`)
})
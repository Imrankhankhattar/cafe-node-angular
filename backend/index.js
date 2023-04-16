
const express = require('express');
var cors = require('cors');
const app = express();
const userRoutes = require('./webApis/user');
const categoryRoutes = require('./webApis/category');
const productRoutes = require('./webApis/product')
app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use((req, res, next) => { console.log(req.url); next() });
app.use('/user', userRoutes);
app.use('/category', categoryRoutes);
app.use('/product', productRoutes);
app.use(function (req, res, next) {
    res.send({ status: 404, message: 'Route Does Not Found in Schedular module.' });
  });
  
module.exports = app
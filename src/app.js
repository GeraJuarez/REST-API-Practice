const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db');
const auth = require('./routes/auth.route');
const product = require('./routes/product.route');
const user = require('./routes/user.route');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api/auth', auth);
app.use('/api/products', product);
app.use('/api/users', user);


module.exports = app;
const express = require('express');
const movie = require('../controller/product/movie');
const AuthorizeChecker = require('../utils/AuthorizeChecker');


module.exports = (app)=>{

    const router = express.Router();


    // product movie
    require('./product/movie')(router)


    // product comic
    
    require('./product/comic')(router)


    app.use('/api/v1/product',router)

}

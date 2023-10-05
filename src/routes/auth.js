const express = require('express');
const { signin, signup } = require('../controller/auth/');

module.exports = (app)=>{

    const router = express.Router();


    router.post('/signin',signin)
    router.post('/signup',signup)
    
    app.use('/api/v1/auth',router)

}
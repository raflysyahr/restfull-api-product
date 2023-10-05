const express = require('express');
const { findOneUser, findAllUser } = require('../controller/users/user');
const AuthorizeChecker = require('../utils/AuthorizeChecker');

module.exports = (app)=>{

    const router = express.Router();

    router.get('/',findAllUser)
    router.get('/:id',findOneUser)

    app.use('/api/v1/users',router)
}

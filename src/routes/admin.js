const express = require('express');
const { users_admin, users_admin_by_id, users_admin_delete_by_id , update_user_by_id, add_user  } = require('../controller/users/admin');
const AuthorizeChecker = require('../utils/AuthorizeChecker');

module.exports = (app)=>{

    const router = express.Router();



    router.get('/users',AuthorizeChecker,users_admin)
    router.get('/users/:id',AuthorizeChecker,users_admin_by_id)
    router.delete('/users/:id',AuthorizeChecker,users_admin_delete_by_id)
    router.put('/users/:id',AuthorizeChecker,update_user_by_id)    
    router.post('/users',AuthorizeChecker,add_user)

    app.use('/api/v1/admin',router)

}
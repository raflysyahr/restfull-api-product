
const { readFileSync, readdirSync } = require('fs');
const { join } = require('path');
const jwt = require('jsonwebtoken');
const { privatKey_path, apiConfig } = require('../../../paths');
const db = require('../../model');
const bcrypt = require('bcrypt');


const signup = async (req,res)=>{

    const { username , password , email ,role } = req.body

    try{

        const f = await  db.users.Users.findOne({ email:email })
    
        

        if(f) return res.status(200).json({
            status:'OK',
            data:null,
            message:'Email is exists!'
        })
    
        const insert = await db.users.Users.create({
            username:username,
            password:bcrypt.hashSync(password,bcrypt.genSaltSync(10)),
            email,
            role:role || 'user'
        })

    
        res.status(201).json({
            status:"OK",
            data:insert,
            message:'Successfully create account'
        })
        
    }catch (error) {
        youchjson(error)
        res.status(500).json({ 
            status:'ERROR',
            data: null,
            message:error.message
        })
    }

   
}

module.exports = signup
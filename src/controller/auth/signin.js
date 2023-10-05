
const { readFileSync, readdirSync } = require('fs');
const { join } = require('path');
const jwt = require('jsonwebtoken');
const { privatKey_path, apiConfig } = require('../../../paths');
const db = require('../../model');
const bcrytp = require('bcrypt');
const ObjectIdReverse = require('../../utils/ObjectIdReverse');
const { omit } = require('lodash');


const signin = async (req,res)=>{

    const { username , password } = req.body

    try{

        const f = await  db.users.Users.findOne({ email:username })
        if(!f) return res.status(404).json({
            stays:'NOT FOUND',
            data:null,
            message:'username is not found'
        })
        
        // console.log(password,f.password)

        if(!bcrytp.compareSync(password,f.password)) return res.status(200).json({
            status:'FAILED',
            data:null,
            message:'Password is wrong'
        })
    
        const privateKey = readFileSync(privatKey_path)
        
        
        const token = jwt.sign(ObjectIdReverse(omit(f,['password'])), privateKey, { algorithm: apiConfig.auth.algorithm , expiresIn:apiConfig.auth.expired })
    
    
        res.status(200).json({
           apikey:token
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

module.exports = signin
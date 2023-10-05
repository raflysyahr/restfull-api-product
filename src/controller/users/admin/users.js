const db = require("../../../model")
const ObjectIdReverse = require("../../../utils/ObjectIdReverse")
const bcrypt = require('bcrypt');




// controller admin to users

exports.users_admin = async(req,res)=> {
    try {
        const getAll = await db.users.Users.find()
    
        res.status(200).json({ 
            status:'OK',
            data: ObjectIdReverse(getAll),
            message:'Success get users'
        })

    } catch (error) {
        youchjson(error)
        res.status(500).json({ 
            status:'ERROR',
            data: null,
            message:error.message
        })
    }
}


exports.users_admin_by_id = async(req,res)=> {
    try{
        const get = await db.users.Users.findOne({ _id:req.params.id })
        
        if(!get) return res.status(404).json({
            status:'NOT FOUND',
            data:null,
            message:`User with id ${req.params.id} not exists`
        })
    
        res.status(200).json({ 
            status:'OK',
            data: ObjectIdReverse(get),
            message:'Success get users'
        })

    } catch (error) {
        youchjson(error)
        res.status(500).json({ 
            status:'ERROR',
            data: null,
            message:error.message
        })
    }
}


exports.users_admin_delete_by_id = async(req,res)=> {
    
    try {
        const get = await db.users.Users.findOneAndDelete({ _id:req.params.id })
    
        if(!get) return res.status(404).json({
            status:'NOT FOUND',
            data:null,
            message:`User with id ${req.params.id} not exists`
        })
    
        res.status(200).json({ 
            status:'OK',
            data: ObjectIdReverse(get),
            message:'Success delete user '+req.params.id
        })
        
    } catch (error) {
        youchjson(error)
        res.status(500).json({ 
            status:'ERROR',
            data: null,
            message:error.message
        })
    }

}






exports.update_user_by_id = async(req,res)=> {
    console.log(req.body)
    try {
        const get = await db.users.Users.findOne({ _id:req.params.id })
    
        if(!get) return res.status(404).json({
            status:'NOT FOUND',
            data:null,
            message:`User with id ${req.params.id} not exists`
        })
    
        const update = await db.users.Users.findOneAndUpdate({ _id:req.params.id },{
            username: req.body.username || get.username,
            email: req.body.email || get.email,
            password: req.body.password ? bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10)) : get.password,
            role: req.body.role || get.role,
        })

        res.status(200).json({ 
            status:'OK',
            data: ObjectIdReverse(update),
            message:'Success updated user '+req.params.id
        })
        
    } catch (error) {
        youchjson(error)
        res.status(500).json({ 
            status:'ERROR',
            data: null,
            message:error.message
        })
    }

}


exports.add_user = async(req,res)=>{
    
    const { email , username , password ,role } = req.body

    const checkEmail = await db.users.Users.findOne({ email:email })

    try {
        if(checkEmail) return res.status(200).json({
            status:'FOUND',
            data:null,
            message:`User with email ${email} is exists`
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
        
    } catch (error) {
        youchjson(error)
        res.status(500).json({ 
            status:'ERROR',
            data: null,
            message:error.message
        })
    }
}
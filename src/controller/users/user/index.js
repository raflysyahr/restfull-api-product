const { omit } = require("lodash")
const db = require("../../../model")
const ObjectIdReverse = require("../../../utils/ObjectIdReverse")

exports.findOneUser = async(req,res)=> {

    try{
        const get = await db.users.Users.findOne({ _id:req.params.id })
        
        if(!get) return res.status(404).json({
            status:'NOT FOUND',
            data:null,
            message:`User with id ${req.params.id} not exists`
        })
    
        res.status(200).json({ 
            status:'OK',
            data: omit(ObjectIdReverse(get),['password']),
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

exports.findAllUser = async(req,res)=> {

    try{
        let get = await db.users.Users.find({ role:'user' })
   
        const noPassword = ObjectIdReverse(get).map((e)=>{ 
            return omit(e,['password']); 
        })

        res.status(200).json({ 
            status:'OK',
            data: noPassword,
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


const db = require("../model")
const ObjectIdReverse = require("./ObjectIdReverse")

const AuthorizeChecker = async(req,res,next)=> {
    try{
        let f = await db.users.Users.findOne({ email:req.loginfo.email })
    
        f=ObjectIdReverse(f)
    
        if(!f) return res.status(404).json({
            status:"NOT FOUND",
            data:null,
            message:'Email not found!'
        })
    
        if(f.id !== req.loginfo.id) return res.status(404).json({
            status:"NOT MATCH",
            data:null,
            message:'Email not match with id'
        })
    
        if(f.role !== 'dev') return res.status(401).json({
            status:"Unauthorization",
            data:null,
            message:'You not authorization for access this endpoint'
        })
    
        next()

    }catch (error) {
        youchjson(error)

        // console.log({...error})
        res.status(500).json({ 
            status:'ERROR',
            data: null,
            message:error.message
        })
    }
}


module.exports = AuthorizeChecker
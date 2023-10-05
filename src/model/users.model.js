// const { default: mongoose } = require("mongoose")

module.exports = (mongoose)=>{
    mongoose.set('toJSON',{
        transform(x,y){
            let obj = this.toObject();

            //Rename fields
            obj.id = obj._id;
            delete obj._id;
      
            return obj;
        }
    })

    try{

        const SchemaUsers = new mongoose.Schema({
            username:{
                required:true,
                type: String,
            },
            email:{
                required:true,
                type: String,
            },
            password:{
                required:true,
                type: String,
            },
            role:{
                required:true,
                type: String,
                default:'user'
            }
        },{
            timestamps:true,
            id:true,
            toJSON:{
                transform(doc,ret){
                    ret.id = ret._id
                    delete ret._id
                }
            }
        })
    
    
       
        const Users = mongoose.model('users',SchemaUsers);
        
        return {
            Users
        }
    }catch (error) {
        youchjson(error)
    }
}

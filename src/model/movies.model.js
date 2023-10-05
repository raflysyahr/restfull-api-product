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

        const SchemaMovie = new mongoose.Schema({
            name: {
                required:true,
                type: String,
            },
            genre:{
                required:true,
                type: String,
            },
            product:{
                required:true,
                type: String,
            },
            country:{
                required:true,
                type: String,
            },
            produtionHouse:{
                required:true,
                type: String,
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
    
    
       
        const movie = mongoose.model('movies',SchemaMovie);
        
        return {
            movie
        }

    }catch (error) {
        youchjson(error)
    }
}

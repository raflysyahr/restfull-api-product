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

        const SchemaComic = new mongoose.Schema({
            title: {
                required:true,
                type: String,
            },
            author:{
                required:true,
                type: String,
            },
            type:{
                required:true,
                type: String,
            },
            genre:{
                required:true,
                type: Array,
            },
            chapters:{
                required:true,
                type: Array,
            },
            thumbnail:{
                require:true,
                type:Object
            },
            status:{
                required:true,
                type:String
            },
            url:{
                required:true,
                type:String
            },
            chapter: {
                required:true,
                type:String
            },
            views:{
                required:true,
                type:String
            },
            rating:{
                required:true,
                type:String
            },
            updatedAt:{
                required:true,
                type:String
            },
            createdAt:{
                required:true,
                type:String
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



        const SchemaChapters = new mongoose.Schema({
            url:{
                required:true,
                type:String
            },
            label:{
                required:true,
                type:String,
            },
            images:{
                required:true,
                type:Array
            },
            comicId:{
                required:true,
                type:String
            },
            chapterId:{
                required:true,
                type:String
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
    
    
       
        const comic = mongoose.model('comics',SchemaComic);
        const chapters = mongoose.model('chapters',SchemaChapters)

        return {
            comic,
            chapters
        }

    }catch (error) {
        youchjson(error)
    }
}

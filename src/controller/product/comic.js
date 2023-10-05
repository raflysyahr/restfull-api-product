const db = require("../../model")
const ObjectIdReverse = require("../../utils/ObjectIdReverse")
const comic = {}

comic.findOneComic = async(req,res)=>{

    try{

        const comic = await db.comics.comic.findOne({
            url:req.params.url
        })
    
        if(!comic) return res.status(404).json({
            status:'NOT FOUND',
            data:null,
            message:`Failed to get ${req.params.url}`
        })
    
        res.status(200).json({ 
            status:'OK',
            data: ObjectIdReverse(comic),
            message:`Success get ${req.params.url}`
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


comic.findAllComic = async(req,res)=>{

    try{
        
        const comic = await db.comics.comic.find()
        console.log(comic)
    
        res.status(200).json({ 
            status:'OK',
            data: ObjectIdReverse(comic),
            message:`Success get ${req.params.url}`
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


comic.findOneComicAndDelete = async(req,res)=>{

    try{

        const comic = await db.comics.comic.findOne({
            url:req.params.url
        })

        if(!comic) return res.status(404).json({
            status:'NOT FOUND',
            data:null,
            message:`Comic ${req.params.url} is not found`
        })


        const deleteComic = await db.comics.comic.findOneAndDelete({
            url:req.params.url
        })

        
        res.status(200).json({ 
            status:'OK',
            data: ObjectIdReverse(deleteComic),
            message:`Success delete ${req.params.url}`
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


comic.findOneComicAndUpdate = async(req,res)=>{

    try{

        const comic = await db.comics.comic.findOne({
            url:req.params.url
        })

        if(!comic) return res.status(404).json({
            status:'NOT FOUND',
            data:null,
            message:`Comic ${req.params.url} is not found`
        })


        const updateComic = await db.comics.comic.findOneAndUpdate({
            url:req.params.url
        },{
            title:req.body.title || comic.title,
            author:req.body.author || comic.author,
            type:req.body.type || comic.type,
            genre:req.body.genre || comic.genre,
            chapters: comic.chapters,
            thumbnail:req.body.thumbnail || comic.thumbnail,
            status:req.body.status || comic.status,
            url: comic.url,
            chapter:req.body.chapter || comic.chapter,
            views:req.body.views || comic.views,
            rating:req.body.rating || comic.rating
        })

        
        res.status(200).json({ 
            status:'OK',
            data: ObjectIdReverse(updateComic),
            message:`Success update ${req.params.url}`
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

module.exports = comic
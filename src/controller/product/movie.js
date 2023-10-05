const db = require("../../model")
const { isCached, setCache } = require("../../utils/NodeCache")
const ObjectIdReverse = require("../../utils/ObjectIdReverse")

const movie = {}



movie.all = async(req,res)=>{
    
    try{


        if(isCached(req,res)) return;

        const get = await db.movies.movie.find()        
        
        if(!get) return res.status(404).json({
            status:'NOT FOUND',
            data:null,
            message:`Failed to get all movie`
        })
    
        const responseData = { 
            status:'OK',
            data: ObjectIdReverse(get),
            message:'Success get all movie'
        }

        // caching response
        console.log('Caching response');
        setCache(req.url,responseData)

        res.status(200).json(responseData)
          

    } catch (error) {
        youchjson(error)
        res.status(500).json({ 
            status:'ERROR',
            data: null,
            message:error.message
        })
    }
}


movie.delete = async(req,res)=>{
    try{
        const getOneMovieAndDelete = await db.movies.movie.findOneAndDelete({
            _id:req.params.id
        })
        
        
        if(!getOneMovieAndDelete) return res.status(404).json({
            status:'NOT FOUND',
            data:null,
            message:`Failed to delete movie`
        })
    

        const responseData = { 
            status:'OK',
            data: ObjectIdReverse(getOneMovieAndDelete),
            message:'Success delete movie'
        }


        res.status(200).json(responseData)

    } catch (error) {
        youchjson(error)
        res.status(500).json({ 
            status:'ERROR',
            data: null,
            message:error.message
        })
    }
}




movie.update = async(req,res)=>{
    try{



        const getOneMovie = await db.movies.movie.findOne({
            _id:req.params.id
        })

        
        if(!getOneMovie) return res.status(404).json({
            status:'NOT FOUND',
            data:null,
            message:`Failed to update movie`
        })

        const updateOneMovie = await db.movies.movie.findOneAndUpdate({
            _id:req.params.id
        },{
            name:req.body.name || getOneMovie.name,
            genre:req.body.genre || getOneMovie.genre,
            product:req.body.product || getOneMovie.product,
            country:req.body.country || getOneMovie.country,
            produtionHouse:req.body.produtionHouse || getOneMovie.produtionHouse
        })
    
        res.status(200).json({ 
            status:'OK',
            data: ObjectIdReverse(updateOneMovie),
            message:'Success update movie'
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


movie.one = async(req,res)=>{
    
    try{
        const getOneMovie = await db.movies.movie.findOne({
            _id:req.params.id
        })
        
        
        if(!getOneMovie) return res.status(404).json({
            status:'NOT FOUND',
            data:null,
            message:`Failed to get all movie`
        })


        const responseData = { 
            status:'OK',
            data: ObjectIdReverse(getOneMovie),
            message:'Success get all movie'
        }

        // caching response
        console.log('Caching response');
        setCache(req.url,responseData);
    
        res.status(200).json(responseData)

    } catch (error) {
        youchjson(error)
        res.status(500).json({ 
            status:'ERROR',
            data: null,
            message:error.message
        })
    }
}


movie.add = async(req,res)=>{
    
    try{
        
        const addMovie = await db.movies.movie.create({
            name:req.body.name,
            genre:req.body.genre,
            product:req.body.genre,
            country:req.body.country,
            produtionHouse:req.body.produtionHouse
        })

        res.status(200).json({ 
            status:'OK',
            data: ObjectIdReverse(addMovie),
            message:'Success add movie'
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


module.exports = movie
const NodeCaches = require('node-cache');
const NodeCache = new NodeCaches();



function isCached(req,res){
    const isCached = NodeCache.get(req.url)
    
    if(isCached) {
        console.log('Serving from cache ^',isCached.message+' [ from cache ]')

        res.status(200).json(isCached)

        return true
    }else{
        return false
    }

}

function setCache(url,data,ttl){
    NodeCache.set(url, data,ttl)
}
module.exports = { NodeCache , isCached , setCache }
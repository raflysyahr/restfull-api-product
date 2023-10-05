const comic = require('../../controller/product/comic');
const AuthorizeChecker = require('../../utils/AuthorizeChecker');

module.exports = (router)=>{

    router.get('/comic/:url',comic.findOneComic)
    router.get('/comic',comic.findAllComic);
    router.delete('/comic/:id',AuthorizeChecker,comic.findOneComicAndDelete)
    router.put('/comic/:id',AuthorizeChecker,comic.findOneComicAndUpdate)
    
}

const movie = require("../../controller/product/movie")
const AuthorizeChecker = require("../../utils/AuthorizeChecker")

    
module.exports = (router)=>{

    router.get('/movies',movie.all)
    router.delete('/movies/:id',AuthorizeChecker,movie.delete)
    router.put('/movies/:id',AuthorizeChecker,movie.update)
    router.get('/movies/:id',movie.one)
    router.post('/movies',AuthorizeChecker,movie.add)

}
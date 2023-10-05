const mongoose = require('mongoose')
mongoose.Promise = global.Promise


const db = {}
db.mongoose = mongoose

db.users = require('./users.model')(mongoose);
db.movies = require('./movies.model')(mongoose);
db.comics = require('./comic.model')(mongoose);
module.exports = db
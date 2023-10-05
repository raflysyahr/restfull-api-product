const mongoose = require('mongoose')

mongoose.connect(process.env.mongoDB).then(()=>{
//    console.log('[ OK ] conected on mongodb')
}).catch((error)=> console.log('[ FAILED ] '+error.message))

const { readFileSync } = require('fs')
const { join } = require('path')

module.exports = {
    tmp_dir_path:join(__dirname,'./tmp'),
    privatKey_path:join(__dirname,'./privatKey.key'),
    apiConfig:{
        ...require('./api.config.json'),
        secretKey:readFileSync(join(__dirname,'./privatKey.key'))
    }
}
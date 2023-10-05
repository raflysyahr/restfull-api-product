const { exec } = require('child_process');

// require('dotenv').config()
require('./globals')




try{
  

  const express = require('express');
  const app = express();
  const cors = require('cors');
  const jwt = require('jsonwebtoken');
  const { readFileSync } = require('fs');

  const {rateLimit} = require('express-rate-limit');
  const { auth_routes, product_routes, admin_routes, users_routes } = require('./src/routes');
  const { privatKey_path, apiConfig } = require('./paths');

  const strTime = (str)=>{
    let time;
    switch (str) {
        case str.includes('s'):
            time = Number(str.replace('s'))
            return 1000 * time
            break;
        case str.includes('m'):
            time = Number(str.replace('m'))
            return 1000 * 60 * time 
            break;
        case str.includes('h'):
            time = Number(str.replace('h'))
            return 1000 * 60 * 60 * time 
            break;
        default:
            time = Number(str.replace('d'))
            return 1000 * 60 * 60 * 24 * time
            break;
    }

  }

  const limiter = rateLimit({
      windowMs: strTime(apiConfig.limiter.windowMs), // 15 minutes
      max: apiConfig.limiter.max, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers
      // store: ... , // Use an external store for more precise rate limiting
  })



  // Apply the rate limiting middleware to all requests
  app.use(limiter)



  app.use(cors({
      origin:'*',
  }))

  // connect to mongodb
  require('./src/db/connectDB')




  app.use(express.json());
  app.use(express.urlencoded({ extended:false }))



  app.use((req,res,next)=>{

      // this endpoint can be access without apiKey
      const notSupportPrivatKey = ['/api/v1/auth/signup','/api/v1/auth/signin','/api/v1/auth/signout']
      
      if(notSupportPrivatKey.some(predicate=> predicate === req.path)) return  next()

      console.log("TOD")

      
      
  
      const privateKey = readFileSync(privatKey_path)
      const token  = req.headers.authorization && req.headers.authorization.split('Bearer ')[1]
      


      if(!token ) 
      {
        console.log('[logger]:[ '+req.method.slice(0,3)+' ]:'+req.path+':Missing headers request')
        return res.status(401).json({
            status:'Unauthorization',
            data:null,
            message:'Authorization headers is missing!'
        })
      }




      
      
      jwt.verify(token, privateKey,(err,result)=>{
          if(err) 
          {
            console.log('[logger]:['+req.method.slice(0,3)+']:'+req.path+':Unauthorization request')

            return res.status(401).json({
              status:'Unauthorization',
              data:null,
              message:'Api token is expired!'
          })
        }

        
        

          req.loginfo = result
          console.log('[logger]:['+req.method.slice(0,3)+']:'+req.path+': ')

          
            next()
          


      })

   
      

  })


  users_routes(app)
  product_routes(app)
  admin_routes(app)
  auth_routes(app)



  app.listen(process.env.port,()=> {

    forDev(()=>{

      exec('notify-send "Server has ben running, on port "'+process.env.port)
      console.log('>',process.env.port)

    })

  })

  

}catch(error){
  console.log(error)
  // youchjson(error)
  process.exit(1)
}


require('dotenv').config();

const Youch = require('youch')
const youchTerm = require('youch-terminal')


const args = process.argv.slice(2)


global.forDev = (devLog)=> process.env.mode === 'development' && devLog();


global.youchjson = async function(output_){
   let youch = new Youch(output_,{})
   const output = await youch.toJSON();

   console.log('[error]',JSON.stringify(output))
}

global.youchTerminal = async function(output){
    
   console.log(youchTerm(output, {
      displayShortPath: true,
      hideErrorTitle: false,
      hideMessage: false,
      displayMainFrameOnly: false,
  }))

}


global.getArgs = (key)=>{
    return args[(args.includes(key) + 1)]
}
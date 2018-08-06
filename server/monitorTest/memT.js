import log4js , {jsonLogger , appLogger as logger} from '../logger/loggerInit'

//운영체제확인
const osType = process.platform
console.log('stat테스트')
logger.debug(osType)


if(osType == 'linux'){

    const exec = require('child_process').exec


    let MemTotal = 0
    let MemAvailable = 0
       
    setInterval( ()=> {
    let result 
              
        // TCP6 정보 웹페이지 커넥션
        exec("cat /proc/meminfo | egrep 'MemTotal|MemAvailable' ", function (error, stdout, stderr) {
            if(error){
                logger.debug(stderr)
            }
            // result = (stdout.trim(.)replace(/[^0-9]/g ,"").split(/\s+/g))
            result = (stdout.trim().split(/\s+/g))
            // logger.info(result)
            let osMem = {
                "MemTotal" : result[1],
                "MemAvailable" : result[4],
                "size" : result[2]

            }
            let out = {
                "osMem" : osMem,
                "noeMem" : process.memoryUsage()
            }          
            jsonLogger.debug(out);
            
        })
        
   } , 5000 )
}



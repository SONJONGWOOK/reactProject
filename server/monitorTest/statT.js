import log4js , {jsonLogger , appLogger as logger} from '../logger/loggerInit'

//운영체제확인
const osType = process.platform
console.log('stat테스트')
logger.debug(osType)


if(osType == 'linux'){

    const exec = require('child_process').exec


    let preUser = 0
    let preSystem = 0
    let preNice = 0
    let preIdel = 0
    let preDiff = 0
    
    setInterval( ()=> {
    let result 
        
          
        // TCP6 정보 웹페이지 커넥션
        exec("cat /proc/stat | egrep 'cpu' ", function (error, stdout, stderr) {
            if(error){
                logger.debug(stderr)
            }
            result = (stdout.trim().split(/\s+/))
            
            let user =  0
            let system =  0
            let nice = 0
            let idel = 0
            let diff = 0
            
            result.forEach( (element , index) => {
                
                if (element === 'cpu') {

                    user = parseInt(result[index + 1])
                    system = parseInt(result[index + 2])
                    nice = parseInt(result[index + 3])
                    idel = parseInt(result[index + 4])

                    if (preDiff == 0) {
                        preUser = user;
                        preSystem = system;
                        preNice = nice;
                        preIdel = idel;
                        preDiff = user + system + nice + idel;
                        return;
                    }
                    diff = user + system + nice + idel;
                    logger.info(user + "    "+preUser)
                    logger.info(diff + "    "+preDiff)

                    var out = {
                        "cpuUseRate": (((user - preUser) / (diff - preDiff)) * 100).toFixed(6),
                    }


                    jsonLogger.debug(out);
                    logger.info(process.cpuUsage())

                    preUser = user;
                    preSystem = system;
                    preNice = nice;
                    preIdel = idel;
                    preDiff = user + system + nice + idel;
                    return;
                }
            })
         
        })
        
   } , 5000 )
}



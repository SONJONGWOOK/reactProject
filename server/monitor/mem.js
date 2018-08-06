import log4js , {jsonLogger , appLogger as logger} from '../logger/loggerInit'
logger.info('mem init')

let out
const output = () =>{
    //운영체제확인
    const osType = process.platform
        if(osType == 'linux'){

        const exec = require('child_process').exec
        // let MemTotal = 0
        // let MemAvailable = 0
        let result
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
            out = {
                "osMem" : osMem,
                "nodeMem" : process.memoryUsage()
            }     
        })
    }
    return out
   
}
export default output





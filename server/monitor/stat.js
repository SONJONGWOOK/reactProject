import log4js , {jsonLogger , appLogger as logger} from '../logger/loggerInit'
logger.info('stat init')
let out

const output = () => {
    const osType = process.platform

    let result
    if(osType == 'linux'){

        const exec = require('child_process').exec
        exec("cat /proc/stat | egrep 'cpu' ", function (error, stdout, stderr) {
            if(error){
                logger.debug(stderr)
            }
            result = (stdout.trim().split(/\s+/))
            
            let user =  0
            let system =  0
            let nice = 0
            let idel = 0
      
            result.forEach( (element , index) => {
                
                if (element === 'cpu') {

                    user = parseInt(result[index + 1])
                    system = parseInt(result[index + 2])
                    nice = parseInt(result[index + 3])
                    idel = parseInt(result[index + 4])
                    let cpuInfo = {
                        "user" : user , 
                        "system" : system ,
                        "nice" : nice,
                        "idel" : idel
                    }

                    out = {
                        "osCpu" : cpuInfo,
                        "nodeCpu" :  process.cpuUsage()   
                    }
                    return
                }
            })
            
        })   
    }
    return out
}

export default output
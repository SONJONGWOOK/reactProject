import log4js , {jsonLogger , appLogger as logger} from '../logger/loggerInit'

//운영체제확인
const osType = process.platform
console.log('tcp테스트')
logger.debug(osType)


if(osType == 'linux'){

    const stArr = [
        'TCP_ESTABLISHED' ,
        'TCP_SYN_SENT',
        'TCP_SYN_RECV',
        'TCP_FIN_WAIT1',
        'TCP_FIN_WAIT2',
        'TCP_TIME_WAIT',
        'TCP_CLOSE',
        'TCP_CLOSE_WAIT',
        'TCP_LAST_ACK',
        'TCP_LISTEN',
        'TCP_CLOSING'
    ]


    const exec = require('child_process').exec

    let pid = process.pid
    
    setInterval( ()=> {
    let result 
             
        // TCP6 정보 웹페이지 커넥션
        exec("cat /proc/"+pid+"/net/tcp6 | egrep '0BB8|0BB9' " ,    (error , stdout , stderr) =>{
            if(error){
                logger.debug(stderr)
            }
            result = (stdout.trim().split(" "));
            let ip
            let port
            let st 
            result.forEach( (element , index) => {
                
                if(element.includes(':0BB8')  || element.includes(':0BB9')  ){                   
                    if( parseInt(result[index+2].trim() , 16) == 0  || parseInt(result[index+1].trim() , 16) == 0 ) {
                        return
                    }
                    // logger.debug(result[index])
                    // logger.debug(result[index+1])
                    //  logger.debug(result[index+2])
                    let div = result[index+1].indexOf(':') 
                    ip = result[index+1].substr(0, div)
                    port = result[index+1].substr(div+1 ,result[index+1].length )
                    port = parseInt(port , 16) 
                    // ip = ip.split("").reverse().join("").substr(0,8);
                    ip = parseInt(ip.substr(ip.length-2 , 2) , 16)+'.'+parseInt(ip.substr(ip.length-4 , 2) , 16)+'.'+parseInt(ip.substr(ip.length-6 , 2) , 16)+'.'+parseInt(ip.substr(ip.length-8 , 2) , 16)
                    st = parseInt(result[index+2].trim() , 16)
                    st = stArr[st]
                    let out = {
                        "ip" : ip,
                        "port" : port,
                        "st" : st,
                    }
                    jsonLogger.debug(out)
                }
            })
         
        })
        
   } , 5000 )
}

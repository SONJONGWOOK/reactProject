import log4js , {jsonLogger , appLogger as logger} from '../logger/loggerInit'
logger.info('tcp init')
let out 
let arrOut
const output = () =>{
    const osType = process.platform
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
        let result 
        exec("cat /proc/"+pid+"/net/tcp6 | egrep '0BB8|0BB9' " ,    (error , stdout , stderr) =>{
                if(error){
                    logger.debug(stderr)
                }
                result = (stdout.trim().split(" "));
                let ip
                let port
                let st 
                let data = []
                let stCount = {
                    'TCP_ESTABLISHED'  : 0,
                    'TCP_SYN_SENT' : 0,
                    'TCP_SYN_RECV' : 0,
                    'TCP_FIN_WAIT1' : 0,
                    'TCP_FIN_WAIT2' : 0,
                    'TCP_TIME_WAIT' : 0,
                    'TCP_CLOSE' : 0,
                    'TCP_CLOSE_WAIT' : 0,
                    'TCP_LAST_ACK' : 0,
                    'TCP_LISTEN' : 0,
                    'TCP_CLOSING' : 0
                } 
                result.forEach( (element , index) => {
                    if(element.includes(':0BB8')  || element.includes(':0BB9')  ){                   
                        if( parseInt(result[index+2].trim() , 16) == 0  || parseInt(result[index+1].trim() , 16) == 0 ) {
                            return
                        }
                        let div = result[index+1].indexOf(':') 
                        ip = result[index+1].substr(0, div)
                        port = result[index+1].substr(div+1 ,result[index+1].length )
                        port = parseInt(port , 16) 
                        // ip = ip.split("").reverse().join("").substr(0,8);
                        ip = parseInt(ip.substr(ip.length-2 , 2) , 16)+'.'+parseInt(ip.substr(ip.length-4 , 2) , 16)+'.'+parseInt(ip.substr(ip.length-6 , 2) , 16)+'.'+parseInt(ip.substr(ip.length-8 , 2) , 16)
                        st = parseInt(result[index+2].trim() , 16)
                        st = stArr[st]
                        stCount[st]++
                                        
                        // stCount.stArr[st]++;
                        let localPort = element.includes(':0BB8') ? parseInt('0BB8' , 16)  :  parseInt('0BB9' , 16)
                        out = {
                            "ip" : ip,
                            "port" : port,
                            "st" : st,
                            "localPort" : localPort,
                        }
                        if(!data.includes(out)) {
                            data.push(out)
                        }
                        
                    }
               })
           
            arrOut = { 
                        'count' : stCount , 
                        'data' : data 
                    } 
                    
            })
    }
    
    return arrOut
}

export default output
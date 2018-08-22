import log4js , {jsonLogger , appLogger as logger} from '../logger/loggerInit'
import mem  from './mem'
import cpu  from './stat'
import tcp  from './tcp'
import mongoose from 'mongoose'
import {ModelCpu , ModelMem , ModelTcp} from '../models/test';
import {memFind , cpuFind , tcpFind} from './find'

mongoose.Promise = global.Promise
mongoose.connect('mongodb://jsplays.iptime.org:27017/resource')
.then( ()=> console.log('Successfully connected to mongodb'))
.catch(e => console.error(e))


const MemModel = mongoose.model('MemInput' , ModelMem , 'mem')
const CpuModel = mongoose.model('CpuInput' , ModelCpu , 'cpu')
const TcpModel = mongoose.model('TcpInput' , ModelTcp , 'tcp')

setInterval( ()=> { 
    let memData = mem()
    if(memData !== undefined ) {
            // logger.info(memData)
        const saveMem = new MemModel({
            memTotal : memData.osMem.MemTotal , 
            memAvailable : memData.osMem.MemAvailable,
            size : memData.osMem.size,
            rss :  memData.nodeMem.rss/1000,
            heapTotal : memData.nodeMem.heapTotal/1000,
            heapUsed :  memData.nodeMem.heapUsed/1000,
            external : memData.nodeMem.external/1000,
        })
        // saveMem.save().then( () => logger.info("mem save complete"))
        
    saveMem.save()
        
    }
} , 5000 )

setInterval( ()=> { 
    let memData = mem()
    if(memData !== undefined ) {
            // logger.info(memData)
        const saveMem = new MemModel({
            memTotal : memData.osMem.MemTotal , 
            memAvailable : memData.osMem.MemAvailable,
            size : memData.osMem.size,
            rss :  memData.nodeMem.rss/1000,
            heapTotal : memData.nodeMem.heapTotal/1000,
            heapUsed :  memData.nodeMem.heapUsed/1000,
            external : memData.nodeMem.external/1000,
        })
        // saveMem.save().then( () => logger.info("mem save complete"))
        
    saveMem.save()
        
    }
} , 1000 )

setInterval( ()=> { 
    let cpuData = cpu()
    if(cpuData !== undefined ) {
        // logger.info(cpuData)
        const saveCpu = new CpuModel({
            user : cpuData.osCpu.user,
            system : cpuData.osCpu.system,
            nice : cpuData.osCpu.nice,
            idel : cpuData.osCpu.idel,
            nodeUser :  cpuData.nodeCpu.user,
            nodeSystem : cpuData.nodeCpu.system,
        })
        
        // saveCpu.save().then( () => logger.info("cpu save complete"))
        saveCpu.save()
    }

    let tcpData = tcp()
    
    if(tcpData !== undefined ) {
         
        // logger.info(tcpData)
        const saveTcp = new TcpModel({
            established : tcpData.count.TCP_ESTABLISHED ,
            synSent : tcpData.count.TCP_SYN_SENT ,
            synRecv : tcpData.count.TCP_SYN_RECV ,
            finWait1 : tcpData.count.TCP_FIN_WAIT1 ,
            finWait2 : tcpData.count.TCP_FIN_WAIT2 ,
            timeWait : tcpData.count.TCP_TIME_WAIT ,
            close : tcpData.count.TCP_CLOSE ,
            closeWait : tcpData.count.TCP_CLOSE_WAIT ,
            lastAck : tcpData.count.TCP_LISTEN ,
            listen : tcpData.count.TCP_LISTEN ,
            closing : tcpData.count.tCP_CLOSING ,
            count : tcpData.count,
            data : tcpData.data,
        })
        // saveTcp.save().then( () => logger.info("tcp save complete"))
        saveTcp.save()
    }
} , 1000 )


export {mem}
export {cpu}
export {tcp}
export const memResult = (count) => { return memFind(MemModel,count) }
export const cpuResult = (count) => { return cpuFind(CpuModel,count) }
export const tcpResult = (count) => { return cpuFind(TcpModel,count) }
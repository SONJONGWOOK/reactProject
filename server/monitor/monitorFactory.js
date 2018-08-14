import log4js , {jsonLogger , appLogger as logger} from '../logger/loggerInit'
import mem  from './mem'
import cpu  from './stat'
import tcp  from './tcp'
import mongoose from 'mongoose'
import {ModelCpu , ModelMem , ModelTcp} from '../models/test';
import {memFind , cpuFind} from './find'

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
            ip : tcpData.ip,
            port : tcpData.port,
            st : tcpData.st,
        })
        // saveTcp.save().then( () => logger.info("tcp save complete"))
        saveTcp.save()
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
            ip : tcpData.ip,
            port : tcpData.port,
            st : tcpData.st,
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
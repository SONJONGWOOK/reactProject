import log4js , {jsonLogger , appLogger as logger} from '../logger/loggerInit'
import mem  from './mem'
import cpu  from './stat'
import tcp  from './tcp'

import mongoose from 'mongoose'
mongoose.Promise = global.Promise
mongoose.connect('mongodb://jsplays.iptime.org:27017/resource')
.then( ()=> console.log('Successfully connected to mongodb'))
.catch(e => console.error(e))

import {ModelCpu , ModelMem , ModelTcp} from '../models/test';

const MemInput = mongoose.model('MemInput' , ModelMem , 'mem')
const CpuInput = mongoose.model('CpuInput' , ModelCpu , 'cpu')
const TcpInput = mongoose.model('TcpInput' , ModelTcp , 'tcp')

setInterval( ()=> { 
    let memData = mem()
    if(memData !== undefined ) {
            // logger.info(memData)
            const saveMem = new MemInput({
            memTotal : memData.osMem.MemTotal,
            memAvailable : memData.osMem.MemAvailable,
            size : memData.osMem.size,
            nodeRss :  memData.nodeMem.rss,
            nodeHeapTotal : memData.nodeMem.heapTotal,
            nodeHeapUsed :  memData.nodeMem.heapUsed,
            nodeExternal : memData.nodeMem.external,
    })
    // saveMem.save().then( () => logger.info("mem save complete"))
    saveMem.save()
    }
} , 5000 )

setInterval( ()=> { 
    let cpuData = cpu()
    if(cpuData !== undefined ) {
        // logger.info(cpuData)
        const saveCpu = new CpuInput({
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
        const saveTcp = new TcpInput({
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
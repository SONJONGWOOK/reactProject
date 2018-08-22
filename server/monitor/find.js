import log4js , {jsonLogger , appLogger as logger} from '../logger/loggerInit'

// import mongoose from 'mongoose'
// mongoose.Promise = global.Promise
// mongoose.connect('mongodb://jsplays.iptime.org:27017/resource')
// .then( ()=> console.log('Successfully connected to mongodb'))
// .catch(e => console.error(e))

// import {ModelCpu , ModelMem , ModelTcp} from './models/test';
// const Memfind = mongoose.model('memModel' , ModelMem , 'mem')
// Memfind.find().sort({date : -1 }).limit(5).exec( (err , posts) =>{
//     logger.error(err)
//     logger.info(posts)
// })

// Memfind.find().sort( { date :-1 }).limit(10)

// Memfind.exec( (err , results ) => {
//     logger.error(err)
//     logger.error(results)
// })

const memFind = (MemModel , count) =>{
    // let output
    // MemModel.find().sort({date : -1 }).limit(5).then((posts) =>{
    //     console.log("시작")
    //     return  posts
    // }).then((findReuslt) => {
    //     logger.info("두번째")
    //     logger.info(findReuslt)
    //     output = findReuslt 
    //     return output
    // }).catch( (err) =>{
    //      logger.error(err)
    // })
    
    // return output
    return MemModel.find().sort({date : -1 }).limit(count)
}

const cpuFind = (CpuModel, count) =>{
    return CpuModel.find().sort({date : -1 }).limit(count)
}

const tcpFind = (TcpModel, count) =>{
    return TcpModel.find().sort({date : -1 }).limit(count)
}
export {memFind}
export {cpuFind}
export {tcpFind}
// 
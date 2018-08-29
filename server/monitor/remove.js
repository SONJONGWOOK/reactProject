import log4js , {jsonLogger , appLogger as logger} from '../logger/loggerInit'

let dt = new Date();
dt.setDate(dt.getDate()-1);  
let month = dt.getMonth()+1
let day = dt.getDate()
month = month > 9 ?  String(month) : "0"+String(month)
day = day > 9 ?  String(day) : "0"+String(day)
let targetDay = dt.getFullYear()+"-"+month+"-"+day


const cpuRemove = (CpuModel) =>{
    CpuModel.remove({ "date" :  {"$lt": new Date(targetDay)  } })
    .then((findReuslt) => {
        logger.info('cpu 이전 데이터 제거 작업 성공')
        logger.info(findReuslt)
    }).catch( (err) =>{
        logger.info('cpu 이전 데이터 제거 작업 실패')
        logger.error(err)  
    })
}
const tcpRemove = (TcpModel) =>{
    
    TcpModel.remove({ "date" :  {"$lt": new Date(targetDay)  } })
    .then((findReuslt) => {
        logger.info('tcp 이전 데이터 제거 작업 성공')
        logger.info(findReuslt)
    }).catch( (err) =>{
        logger.info('tcp 이전 데이터 제거 작업 실패')
        logger.error(err)  
    })
}
const memRemove = (MemModel) =>{
    
    MemModel.remove({ "date" :  {"$lt": new Date(targetDay)  } })
    .then((findReuslt) => {
        logger.info('mem 이전 데이터 제거 작업 성공')
        logger.info(findReuslt)
    }).catch( (err) =>{
        logger.info('mem 이전 데이터 제거 작업 실패')
        logger.error(err)  
    })
}


export {cpuRemove}
export {tcpRemove}
export {memRemove}




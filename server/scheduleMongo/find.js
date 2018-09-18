import log4js , {jsonLogger , appLogger as logger} from '../logger/loggerInit'


const memFind = (MemModel , count) =>{
 
    return MemModel.find().sort({date : -1 }).limit(count)
}

const cpuFind = (CpuModel, count) =>{
    return CpuModel.find().sort({date : -1 }).limit(count)
}

const tcpFind = (TcpModel, count) =>{
    return TcpModel.find().sort({date : -1 }).limit(count)
}

const getTodayIsoType = () =>{
    let dt = new Date()
    let month = dt.getMonth()+1
    let day = dt.getDate()
    month = month > 9 ?  String(month) : "0"+String(month)
    day = day > 9 ?  String(day) : "0"+String(day)
    let today = dt.getFullYear()+"-"+month+"-"+day

    dt = new Date(today)
    dt = dt.setHours(dt.getHours()-9)
    return new Date(dt).toISOString()
    
}
const memMax = (MemModel) =>{
    let isoToday = getTodayIsoType();
    return MemModel.find( { "date" :  {"$gte": new Date(isoToday)  } } ).sort( {memAvailable : 1}).limit(1)
}

const tcpAllCount = (TcpModel) =>{
    
    let isoToday = getTodayIsoType();

    return TcpModel.aggregate( 
        [
           {
            $match : {
                "date" : {"$gte": new Date(isoToday)  }
                } 
            }, 
            { $group: 
                {   '_id' : 'null',  
                    "synSent" : { '$sum' : '$synSent'},
                    "synRecv" : { '$sum' : '$synRecv'},
                    "finWait1" : { '$sum' : '$finWait1'},
                    "finWait2" : { '$sum' : '$finWait2'},
                    "timeWait" : { '$sum' : '$timeWait'},
                    "close" : { '$sum' : '$close'},
                    "closeWait" : { '$sum' : '$closeWait'},
                    "lastAck" : { '$sum' : '$lastAck'},
                    "listen" : { '$sum' : '$listen'},
                }
            }
                     
        ]                                              
        )
}

export {memFind}
export {cpuFind}
export {tcpFind}
export {tcpAllCount}
export {memMax}

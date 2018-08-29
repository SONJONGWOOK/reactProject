"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.memMax = exports.tcpAllCount = exports.tcpFind = exports.cpuFind = exports.memFind = undefined;

var _loggerInit = require("../logger/loggerInit");

var _loggerInit2 = _interopRequireDefault(_loggerInit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var memFind = function memFind(MemModel, count) {
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
    return MemModel.find().sort({ date: -1 }).limit(count);
};

var cpuFind = function cpuFind(CpuModel, count) {
    return CpuModel.find().sort({ date: -1 }).limit(count);
};

var tcpFind = function tcpFind(TcpModel, count) {
    return TcpModel.find().sort({ date: -1 }).limit(count);
};
var memMax = function memMax(MemModel) {
    var dt = new Date();
    var month = dt.getMonth() + 1;
    var day = dt.getDate();
    month = month > 9 ? String(month) : "0" + String(month);
    day = day > 9 ? String(day) : "0" + String(day);
    _loggerInit.appLogger.info(dt.getFullYear() + "  " + month + "  " + day);
    var today = dt.getFullYear() + "-" + month + "-" + day;
    return MemModel.find({ "date": { "$gte": new Date(today) } }).sort({ memAvailable: 1 }).limit(1);
};

var tcpAllCount = function tcpAllCount(TcpModel) {
    var dt = new Date();
    var month = dt.getMonth() + 1;
    var day = dt.getDate();
    month = month > 9 ? String(month) : "0" + String(month);
    day = day > 9 ? String(day) : "0" + String(day);
    var today = dt.getFullYear() + "-" + month + "-" + day;
    return TcpModel.aggregate([{
        $match: {
            "date": { "$gte": new Date(today) }
        }
    }, { $group: { '_id': 'null',
            "synSent": { '$sum': '$synSent' },
            "synRecv": { '$sum': '$synRecv' },
            "finWait1": { '$sum': '$finWait1' },
            "finWait2": { '$sum': '$finWait2' },
            "timeWait": { '$sum': '$timeWait' },
            "close": { '$sum': '$close' },
            "closeWait": { '$sum': '$closeWait' },
            "lastAck": { '$sum': '$lastAck' },
            "listen": { '$sum': '$listen' }
        }
    }]);
};

exports.memFind = memFind;
exports.cpuFind = cpuFind;
exports.tcpFind = tcpFind;
exports.tcpAllCount = tcpAllCount;
exports.memMax = memMax;
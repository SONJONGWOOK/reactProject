'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.cpuFind = exports.memFind = undefined;

var _loggerInit = require('../logger/loggerInit');

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
exports.memFind = memFind;
exports.cpuFind = cpuFind;
//
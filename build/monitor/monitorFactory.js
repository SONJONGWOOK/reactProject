'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.removeMem = exports.removeCpu = exports.removeTcp = exports.memMaxResult = exports.tcpCount = exports.tcpResult = exports.cpuResult = exports.memResult = exports.tcp = exports.cpu = exports.mem = exports.mongoose = undefined;

var _loggerInit = require('../logger/loggerInit');

var _loggerInit2 = _interopRequireDefault(_loggerInit);

var _mem = require('./mem');

var _mem2 = _interopRequireDefault(_mem);

var _stat = require('./stat');

var _stat2 = _interopRequireDefault(_stat);

var _tcp = require('./tcp');

var _tcp2 = _interopRequireDefault(_tcp);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _test = require('../models/test');

var _find = require('./find');

var _remove = require('./remove');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect('mongodb://jsplays.iptime.org:27017/resource').then(function () {
    console.log('Successfully connected to mongodb');
}).catch(function (e) {
    return console.error(e);
});

var MemModel = _mongoose2.default.model('MemInput', _test.ModelMem, 'mem');
var CpuModel = _mongoose2.default.model('CpuInput', _test.ModelCpu, 'cpu');
var TcpModel = _mongoose2.default.model('TcpInput', _test.ModelTcp, 'tcp');

setInterval(function () {
    var memData = (0, _mem2.default)();
    if (memData !== undefined && _mongoose2.default.connection.readyState === 1) {
        // logger.info(memData)
        var saveMem = new MemModel({
            memTotal: memData.osMem.MemTotal,
            memAvailable: memData.osMem.MemAvailable,
            size: memData.osMem.size,
            rss: memData.nodeMem.rss / 1000,
            heapTotal: memData.nodeMem.heapTotal / 1000,
            heapUsed: memData.nodeMem.heapUsed / 1000,
            external: memData.nodeMem.external / 1000
        });
        // saveMem.save().then( () => logger.info("mem save complete"))

        saveMem.save();
    }
}, 5000);

setInterval(function () {
    var memData = (0, _mem2.default)();
    if (memData !== undefined && _mongoose2.default.connection.readyState === 1) {
        // logger.info(memData)
        var saveMem = new MemModel({
            memTotal: memData.osMem.MemTotal,
            memAvailable: memData.osMem.MemAvailable,
            size: memData.osMem.size,
            rss: memData.nodeMem.rss / 1000,
            heapTotal: memData.nodeMem.heapTotal / 1000,
            heapUsed: memData.nodeMem.heapUsed / 1000,
            external: memData.nodeMem.external / 1000
        });
        // saveMem.save().then( () => logger.info("mem save complete"))

        saveMem.save();
    }
}, 1000);

setInterval(function () {
    var cpuData = (0, _stat2.default)();
    if (cpuData !== undefined && _mongoose2.default.connection.readyState === 1) {
        // logger.info(cpuData)
        var saveCpu = new CpuModel({
            user: cpuData.osCpu.user,
            system: cpuData.osCpu.system,
            nice: cpuData.osCpu.nice,
            idel: cpuData.osCpu.idel,
            nodeUser: cpuData.nodeCpu.user,
            nodeSystem: cpuData.nodeCpu.system
        });

        // saveCpu.save().then( () => logger.info("cpu save complete"))
        saveCpu.save();
    }

    var tcpData = (0, _tcp2.default)();

    if (tcpData !== undefined && _mongoose2.default.connection.readyState === 1) {

        // logger.info(tcpData)
        var saveTcp = new TcpModel({
            established: tcpData.count.TCP_ESTABLISHED,
            synSent: tcpData.count.TCP_SYN_SENT,
            synRecv: tcpData.count.TCP_SYN_RECV,
            finWait1: tcpData.count.TCP_FIN_WAIT1,
            finWait2: tcpData.count.TCP_FIN_WAIT2,
            timeWait: tcpData.count.TCP_TIME_WAIT,
            close: tcpData.count.TCP_CLOSE,
            closeWait: tcpData.count.TCP_CLOSE_WAIT,
            lastAck: tcpData.count.TCP_LISTEN,
            listen: tcpData.count.TCP_LISTEN,
            closing: tcpData.count.tCP_CLOSING,
            count: tcpData.count,
            data: tcpData.data
        });
        // saveTcp.save().then( () => logger.info("tcp save complete"))
        saveTcp.save();
    }
}, 1000);

// let dt = new Date();
// dt.setDate(dt.getDate()-1);  
// let month = dt.getMonth()+1
// let day = dt.getDate()
// month = month > 9 ?  String(month) : "0"+String(month)
// day = day > 9 ?  String(day) : "0"+String(day)
// let targetDay = dt.getFullYear()+"-"+month+"-"+day
// logger.debug(targetDay)
// const testModel = mongoose.model('Cpuremove' , ModelCpu , 'test')

// testModel.remove({ "date" :  {"$lt": new Date(targetDay)  } })
// .then((findReuslt) => {
//     logger.debug(findReuslt)
// }).catch( (err) =>{
//     logger.error(err)

// })
exports.mongoose = _mongoose2.default;
exports.mem = _mem2.default;
exports.cpu = _stat2.default;
exports.tcp = _tcp2.default;
var memResult = exports.memResult = function memResult(count) {
    return (0, _find.memFind)(MemModel, count);
};
var cpuResult = exports.cpuResult = function cpuResult(count) {
    return (0, _find.cpuFind)(CpuModel, count);
};
var tcpResult = exports.tcpResult = function tcpResult(count) {
    return (0, _find.tcpFind)(TcpModel, count);
};
var tcpCount = exports.tcpCount = function tcpCount() {
    return (0, _find.tcpAllCount)(TcpModel);
};
var memMaxResult = exports.memMaxResult = function memMaxResult() {
    return (0, _find.memMax)(MemModel);
};
var removeTcp = exports.removeTcp = function removeTcp() {
    return (0, _remove.tcpRemove)(TcpModel);
};
var removeCpu = exports.removeCpu = function removeCpu() {
    return (0, _remove.cpuRemove)(CpuModel);
};
var removeMem = exports.removeMem = function removeMem() {
    return (0, _remove.memRemove)(MemModel);
};
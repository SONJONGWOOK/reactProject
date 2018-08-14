'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.cpuResult = exports.memResult = exports.tcp = exports.cpu = exports.mem = undefined;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect('mongodb://jsplays.iptime.org:27017/resource').then(function () {
    return console.log('Successfully connected to mongodb');
}).catch(function (e) {
    return console.error(e);
});

var MemModel = _mongoose2.default.model('MemInput', _test.ModelMem, 'mem');
var CpuModel = _mongoose2.default.model('CpuInput', _test.ModelCpu, 'cpu');
var TcpModel = _mongoose2.default.model('TcpInput', _test.ModelTcp, 'tcp');

setInterval(function () {
    var memData = (0, _mem2.default)();
    if (memData !== undefined) {
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
    if (memData !== undefined) {
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
    if (cpuData !== undefined) {
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
    if (tcpData !== undefined) {
        // logger.info(tcpData)
        var saveTcp = new TcpModel({
            ip: tcpData.ip,
            port: tcpData.port,
            st: tcpData.st
        });
        // saveTcp.save().then( () => logger.info("tcp save complete"))
        saveTcp.save();
    }
}, 1000);

setInterval(function () {
    var cpuData = (0, _stat2.default)();
    if (cpuData !== undefined) {
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
    if (tcpData !== undefined) {
        // logger.info(tcpData)
        var saveTcp = new TcpModel({
            ip: tcpData.ip,
            port: tcpData.port,
            st: tcpData.st
        });
        // saveTcp.save().then( () => logger.info("tcp save complete"))
        saveTcp.save();
    }
}, 1000);

exports.mem = _mem2.default;
exports.cpu = _stat2.default;
exports.tcp = _tcp2.default;
var memResult = exports.memResult = function memResult(count) {
    return (0, _find.memFind)(MemModel, count);
};
var cpuResult = exports.cpuResult = function cpuResult(count) {
    return (0, _find.cpuFind)(CpuModel, count);
};
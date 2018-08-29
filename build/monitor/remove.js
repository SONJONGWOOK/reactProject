"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.memRemove = exports.tcpRemove = exports.cpuRemove = undefined;

var _loggerInit = require("../logger/loggerInit");

var _loggerInit2 = _interopRequireDefault(_loggerInit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dt = new Date();
dt.setDate(dt.getDate() - 1);
var month = dt.getMonth() + 1;
var day = dt.getDate();
month = month > 9 ? String(month) : "0" + String(month);
day = day > 9 ? String(day) : "0" + String(day);
var targetDay = dt.getFullYear() + "-" + month + "-" + day;

var cpuRemove = function cpuRemove(CpuModel) {
    CpuModel.remove({ "date": { "$lt": new Date(targetDay) } }).then(function (findReuslt) {
        _loggerInit.appLogger.info('cpu 이전 데이터 제거 작업 성공');
        _loggerInit.appLogger.info(findReuslt);
    }).catch(function (err) {
        _loggerInit.appLogger.info('cpu 이전 데이터 제거 작업 실패');
        _loggerInit.appLogger.error(err);
    });
};
var tcpRemove = function tcpRemove(TcpModel) {

    TcpModel.remove({ "date": { "$lt": new Date(targetDay) } }).then(function (findReuslt) {
        _loggerInit.appLogger.info('tcp 이전 데이터 제거 작업 성공');
        _loggerInit.appLogger.info(findReuslt);
    }).catch(function (err) {
        _loggerInit.appLogger.info('tcp 이전 데이터 제거 작업 실패');
        _loggerInit.appLogger.error(err);
    });
};
var memRemove = function memRemove(MemModel) {

    MemModel.remove({ "date": { "$lt": new Date(targetDay) } }).then(function (findReuslt) {
        _loggerInit.appLogger.info('mem 이전 데이터 제거 작업 성공');
        _loggerInit.appLogger.info(findReuslt);
    }).catch(function (err) {
        _loggerInit.appLogger.info('mem 이전 데이터 제거 작업 실패');
        _loggerInit.appLogger.error(err);
    });
};

exports.cpuRemove = cpuRemove;
exports.tcpRemove = tcpRemove;
exports.memRemove = memRemove;
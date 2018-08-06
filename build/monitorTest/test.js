'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _loggerInit = require('../logger/loggerInit');

var _loggerInit2 = _interopRequireDefault(_loggerInit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var out = function out() {
    var test = '테스트';
    _loggerInit.appLogger.info(test);
    return test;
};
exports.default = out;
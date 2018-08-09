"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _loggerInit = require("../logger/loggerInit");

var _loggerInit2 = _interopRequireDefault(_loggerInit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var out = function out() {
    var a = { "test": 1, "inner": process.memoryUsage() };
    return a;
};
exports.default = out;
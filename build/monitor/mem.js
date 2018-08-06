'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _loggerInit = require('../logger/loggerInit');

var _loggerInit2 = _interopRequireDefault(_loggerInit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//운영체제확인


exports.default = function () {
    var osType = process.platform;

    if (osType == 'linux') {

        var exec = require('child_process').exec;
        var MemTotal = 0;
        var MemAvailable = 0;
        exec("cat /proc/meminfo | egrep 'MemTotal|MemAvailable' ", function (error, stdout, stderr) {
            if (error) {
                _loggerInit.appLogger.debug(stderr);
            }
            // result = (stdout.trim(.)replace(/[^0-9]/g ,"").split(/\s+/g))
            result = stdout.trim().split(/\s+/g);
            // logger.info(result)
            var osMem = {
                "MemTotal": result[1],
                "MemAvailable": result[4],
                "size": result[2]

            };
            var out = {
                "osMem": osMem,
                "noeMem": process.memoryUsage()
            };
            _loggerInit.jsonLogger.debug(out);

            return out;
        });
    }
};
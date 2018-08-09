'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _loggerInit = require('../logger/loggerInit');

var _loggerInit2 = _interopRequireDefault(_loggerInit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_loggerInit.appLogger.info('stat init');
var out = void 0;

var output = function output() {
    var osType = process.platform;

    var result = void 0;
    if (osType == 'linux') {

        var exec = require('child_process').exec;
        exec("cat /proc/stat | egrep 'cpu' ", function (error, stdout, stderr) {
            if (error) {
                _loggerInit.appLogger.debug(stderr);
            }
            result = stdout.trim().split(/\s+/);

            var user = 0;
            var system = 0;
            var nice = 0;
            var idel = 0;

            result.forEach(function (element, index) {

                if (element === 'cpu') {

                    user = parseInt(result[index + 1]);
                    system = parseInt(result[index + 2]);
                    nice = parseInt(result[index + 3]);
                    idel = parseInt(result[index + 4]);
                    var cpuInfo = {
                        "user": user,
                        "system": system,
                        "nice": nice,
                        "idel": idel
                    };

                    out = {
                        "osCpu": cpuInfo,
                        "nodeCpu": process.cpuUsage()
                    };
                    return;
                }
            });
        });
    }
    return out;
};

exports.default = output;
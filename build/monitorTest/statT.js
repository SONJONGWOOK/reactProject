'use strict';

var _loggerInit = require('../logger/loggerInit');

var _loggerInit2 = _interopRequireDefault(_loggerInit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//운영체제확인
var osType = process.platform;
console.log('stat테스트');
_loggerInit.appLogger.debug(osType);

if (osType == 'linux') {

    var exec = require('child_process').exec;

    var preUser = 0;
    var preSystem = 0;
    var preNice = 0;
    var preIdel = 0;
    var preDiff = 0;

    setInterval(function () {
        var result = void 0;

        // TCP6 정보 웹페이지 커넥션
        exec("cat /proc/stat | egrep 'cpu' ", function (error, stdout, stderr) {
            if (error) {
                _loggerInit.appLogger.debug(stderr);
            }
            result = stdout.trim().split(/\s+/);

            var user = 0;
            var system = 0;
            var nice = 0;
            var idel = 0;
            var diff = 0;

            result.forEach(function (element, index) {

                if (element === 'cpu') {

                    user = parseInt(result[index + 1]);
                    system = parseInt(result[index + 2]);
                    nice = parseInt(result[index + 3]);
                    idel = parseInt(result[index + 4]);

                    if (preDiff == 0) {
                        preUser = user;
                        preSystem = system;
                        preNice = nice;
                        preIdel = idel;
                        preDiff = user + system + nice + idel;
                        return;
                    }
                    diff = user + system + nice + idel;
                    _loggerInit.appLogger.info(user + "    " + preUser);
                    _loggerInit.appLogger.info(diff + "    " + preDiff);

                    var out = {
                        "cpuUseRate": ((user - preUser) / (diff - preDiff) * 100).toFixed(6)
                    };

                    _loggerInit.jsonLogger.debug(out);
                    _loggerInit.appLogger.info(process.cpuUsage());

                    preUser = user;
                    preSystem = system;
                    preNice = nice;
                    preIdel = idel;
                    preDiff = user + system + nice + idel;
                    return;
                }
            });
        });
    }, 5000);
}
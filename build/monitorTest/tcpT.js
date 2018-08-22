'use strict';

var _loggerInit = require('../logger/loggerInit');

var _loggerInit2 = _interopRequireDefault(_loggerInit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//운영체제확인
var osType = process.platform;
console.log('tcp테스트');
_loggerInit.appLogger.debug(osType);

if (osType == 'linux') {

    var stArr = ['TCP_ESTABLISHED', 'TCP_SYN_SENT', 'TCP_SYN_RECV', 'TCP_FIN_WAIT1', 'TCP_FIN_WAIT2', 'TCP_TIME_WAIT', 'TCP_CLOSE', 'TCP_CLOSE_WAIT', 'TCP_LAST_ACK', 'TCP_LISTEN', 'TCP_CLOSING'];

    var exec = require('child_process').exec;

    var pid = process.pid;

    setInterval(function () {
        var result = void 0;

        // TCP6 정보 웹페이지 커넥션
        exec("cat /proc/" + pid + "/net/tcp6 | egrep '0BB8|0BB9' ", function (error, stdout, stderr) {
            if (error) {
                _loggerInit.appLogger.debug(stderr);
            }
            result = stdout.trim().split(" ");
            var ip = void 0;
            var port = void 0;
            var st = void 0;
            result.forEach(function (element, index) {

                if (element.includes(':0BB8') || element.includes(':0BB9')) {
                    if (parseInt(result[index + 2].trim(), 16) == 0 || parseInt(result[index + 1].trim(), 16) == 0) {
                        return;
                    }
                    // logger.debug(result[index])
                    // logger.debug(result[index+1])
                    //  logger.debug(result[index+2])
                    var div = result[index + 1].indexOf(':');
                    ip = result[index + 1].substr(0, div);
                    port = result[index + 1].substr(div + 1, result[index + 1].length);
                    port = parseInt(port, 16);
                    // ip = ip.split("").reverse().join("").substr(0,8);
                    ip = parseInt(ip.substr(ip.length - 2, 2), 16) + '.' + parseInt(ip.substr(ip.length - 4, 2), 16) + '.' + parseInt(ip.substr(ip.length - 6, 2), 16) + '.' + parseInt(ip.substr(ip.length - 8, 2), 16);
                    st = parseInt(result[index + 2].trim(), 16);
                    st = stArr[st];
                    var out = {
                        "ip": ip,
                        "port": port,
                        "st": st
                    };
                    _loggerInit.jsonLogger.debug(out);
                }
            });
        });
    }, 5000);
}
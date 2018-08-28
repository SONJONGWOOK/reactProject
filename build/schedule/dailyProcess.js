'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _monitorFactory = require('../monitor/monitorFactory');

var _monitorFactory2 = _interopRequireDefault(_monitorFactory);

var _nodeSchedule = require('node-schedule');

var _nodeSchedule2 = _interopRequireDefault(_nodeSchedule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('init schedule');
var job = _nodeSchedule2.default.scheduleJob('* 48 * * * *', function () {
    console.log("실행");
    (0, _monitorFactory.removeCpu)();
    (0, _monitorFactory.removeTcp)();
    (0, _monitorFactory.removeMem)();
});

exports.default = job;
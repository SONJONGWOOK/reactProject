'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _monitorFactory = require('../monitor/monitorFactory');

var _monitorFactory2 = _interopRequireDefault(_monitorFactory);

var _nodeSchedule = require('node-schedule');

var _nodeSchedule2 = _interopRequireDefault(_nodeSchedule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var job = _nodeSchedule2.default.scheduleJob('0 0 3 * * *', function () {
    (0, _monitorFactory.removeCpu)();
    (0, _monitorFactory.removeTcp)();
    (0, _monitorFactory.removeMem)();
});

exports.default = job;
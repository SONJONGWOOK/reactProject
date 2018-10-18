'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getScheduleGanttList = exports.getScheduleList = undefined;

var _loggerInit = require('../logger/loggerInit');

var _loggerInit2 = _interopRequireDefault(_loggerInit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getScheduleList = function getScheduleList(scheduleModel) {
    return scheduleModel.find();
};
var getScheduleGanttList = function getScheduleGanttList(ganttModel) {
    return ganttModel.find();
};

exports.getScheduleList = getScheduleList;
exports.getScheduleGanttList = getScheduleGanttList;
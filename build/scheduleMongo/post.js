'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.postGantt = exports.post = undefined;

var _loggerInit = require('../logger/loggerInit');

var _loggerInit2 = _interopRequireDefault(_loggerInit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var post = function post(scheduleModel, data) {

    _loggerInit.appLogger.debug(data);

    var save = new scheduleModel({

        type: data.type,
        text: data.text,
        date: data.date,
        property: data.property

    });
    return save.save();
};

var postGantt = function postGantt(ganttModel, data) {

    _loggerInit.appLogger.debug(data);

    var save = new ganttModel({
        type: data.type,
        text: data.text,
        start: data.start,
        end: data.end,
        property: data.property

    });
    return save.save();
};

exports.post = post;
exports.postGantt = postGantt;
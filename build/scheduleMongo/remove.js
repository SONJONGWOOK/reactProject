'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteOneGantt = exports.deleteOne = undefined;

var _loggerInit = require('../logger/loggerInit');

var _loggerInit2 = _interopRequireDefault(_loggerInit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var deleteOne = function deleteOne(scheduleModel, data) {

    var remove = new scheduleModel({
        _id: data._id,
        type: data.type,
        text: data.text,
        date: data.date,
        property: data.property
    });
    return remove.remove();
};

var deleteOneGantt = function deleteOneGantt(ganttModel, data) {

    var remove = new ganttModel({
        _id: data._id,
        type: data.type,
        text: data.text,
        start: data.start,
        end: data.end,
        property: data.property
    });
    return remove.remove();
};

exports.deleteOne = deleteOne;
exports.deleteOneGantt = deleteOneGantt;
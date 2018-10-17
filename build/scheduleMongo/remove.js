'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteOne = undefined;

var _loggerInit = require('../logger/loggerInit');

var _loggerInit2 = _interopRequireDefault(_loggerInit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var deleteOne = function deleteOne(scheduleModel, data) {

    var remove = new scheduleModel({
        _id: data._id,
        type: data.type,
        text: data.text,
        date: data.date
    });
    return remove.remove();
};

exports.deleteOne = deleteOne;
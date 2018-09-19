"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.post = undefined;

var _loggerInit = require("../logger/loggerInit");

var _loggerInit2 = _interopRequireDefault(_loggerInit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var post = function post(scheduleModel, data) {
    _loggerInit.appLogger.info("테스트");
    _loggerInit.appLogger.info(data);
    _loggerInit.appLogger.info(data.type);
    _loggerInit.appLogger.info(data.text);
    var save = new scheduleModel({
        type: data.type,
        text: data.text,
        date: data.setDate
    });

    save.save().then(function () {
        return _loggerInit.appLogger.info("shedule save complete");
    }).catch(function (e) {
        return _loggerInit.appLogger.error(e);
    });
};

exports.post = post;
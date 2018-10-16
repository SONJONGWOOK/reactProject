'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.post = undefined;

var _loggerInit = require('../logger/loggerInit');

var _loggerInit2 = _interopRequireDefault(_loggerInit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var post = function post(scheduleModel, data) {

    var save = new scheduleModel({
        type: data.type,
        text: data.text,
        date: data.date
    });

    //    save.save().then( (e) => {
    //        logger.info("shedule save complete") 
    //     }).catch(e => {
    //         logger.error(e)
    //     })
    return save.save();
};

exports.post = post;
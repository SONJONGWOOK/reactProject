'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.schdeuleGanttDelete = exports.scheduleGanttPost = exports.scheduleGanttGet = exports.schdeuleDelete = exports.schedulePost = exports.scheduleGet = undefined;

var _loggerInit = require('../logger/loggerInit');

var _loggerInit2 = _interopRequireDefault(_loggerInit);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _post = require('./post');

var _remove = require('./remove');

var _find = require('./find');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
// import {ModelBasic} from '../models/scheduleModel';


var basic = new Schema({
    property: { type: String },
    type: { type: String },
    text: { type: String },
    date: { type: Date }
}, {
    timestamps: true
});

var gantt = new Schema({
    property: { type: String },
    type: { type: String },
    text: { type: String },
    start: { type: Date },
    end: { type: Date }
}, {
    timestamps: true
});

var scheduleConn = _mongoose2.default.createConnection('mongodb://jsplays.iptime.org:27017/schedule');
// .then( (conn)=> {
//         console.log('Successfully connected to mongodb to schedule')
//         (conn.connection.readyState)
//     return conn
// })
// .catch(e => console.error(e))
// console.log("mongoose  " ,mongoose.connection.readyState)
// console.log("scheduleConn  " ,scheduleConn.connection.readyState)

var scheduleModel = scheduleConn.model('schedule', basic, 'schedule');
var ganttModel = scheduleConn.model('gantt', gantt, 'gantt');

var scheduleGet = exports.scheduleGet = function scheduleGet() {
    return (0, _find.getScheduleList)(scheduleModel);
};
var schedulePost = exports.schedulePost = function schedulePost(data) {
    return (0, _post.post)(scheduleModel, data);
};
var schdeuleDelete = exports.schdeuleDelete = function schdeuleDelete(data) {
    return (0, _remove.deleteOne)(scheduleModel, data);
};

var scheduleGanttGet = exports.scheduleGanttGet = function scheduleGanttGet() {
    return (0, _find.getScheduleGanttList)(ganttModel);
};
var scheduleGanttPost = exports.scheduleGanttPost = function scheduleGanttPost(data) {
    return (0, _post.postGantt)(ganttModel, data);
};
var schdeuleGanttDelete = exports.schdeuleGanttDelete = function schdeuleGanttDelete(data) {
    return (0, _remove.deleteOneGantt)(ganttModel, data);
};
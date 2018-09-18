'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.schedulePost = undefined;

var _loggerInit = require('../logger/loggerInit');

var _loggerInit2 = _interopRequireDefault(_loggerInit);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _scheduleModel = require('../models/scheduleModel');

var _post = require('./post');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import {memFind , cpuFind , tcpFind ,tcpAllCount , memMax} from './find'


// mongoose.Promise = global.Promise
// .then( (conn)=> {
//     console.log('Successfully connected to mongodb to schedule')
//     (conn.connection.readyState)
//     return conn;
// })
// .catch(e => console.error(e))

var Schema = _mongoose2.default.Schema;

var basic = new Schema({
    type: { type: String },
    text: { type: String },
    date: { type: Date, default: Date.now }
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

var schedulePost = exports.schedulePost = function schedulePost(data) {
    console.log("테스트");
    console.log(data);
    return (0, _post.post)(scheduleModel, data);
};
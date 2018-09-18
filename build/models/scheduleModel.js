'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ModelBasic = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

var Schema = _mongoose2.default.Schema;

var basic = new Schema({
    type: { type: String },
    text: { type: String },
    date: { type: Date, default: Date.now }
}, {
    timestamps: true
});

var ModelBasic = exports.ModelBasic = basic;
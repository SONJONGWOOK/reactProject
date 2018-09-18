'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _loggerInit = require('../logger/loggerInit');

var _loggerInit2 = _interopRequireDefault(_loggerInit);

var _factory = require('../scheduleMongo/factory');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');
var router = _express2.default.Router();

router.post('/post', function (req, res) {
    console.log("시작");
    _loggerInit.appLogger.info(req.body);
    (0, _factory.schedulePost)(req.body);
    console.log("끝");
});

exports.default = router;
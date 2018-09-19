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
    (0, _factory.schedulePost)(req.body);
    _loggerInit.appLogger.info("저장완료");
    _loggerInit.appLogger.info(req.body);
});

router.get('/get', function (req, res) {

    (0, _factory.scheduleGet)().then(function (result) {
        return result;
    }).then(function (findReuslt) {
        res.send(findReuslt);
    }).catch(function (err) {
        _loggerInit.appLogger.error(err);
        res.send(err);
    });
});

exports.default = router;
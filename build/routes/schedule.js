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
    _loggerInit.appLogger.info(req.body);
    (0, _factory.schedulePost)(req.body).then(function (result) {
        _loggerInit.appLogger.info("저장완료");
        _loggerInit.appLogger.info(result);
        res.send(result);
    }).catch(function (err) {
        _loggerInit.appLogger.error(err);
        res.send(err);
    });
});

router.post('/postGantt', function (req, res) {
    _loggerInit.appLogger.info(req.body);
    (0, _factory.scheduleGanttPost)(req.body).then(function (result) {
        _loggerInit.appLogger.info("저장완료");
        _loggerInit.appLogger.info(result);
        res.send(result);
    }).catch(function (err) {
        _loggerInit.appLogger.error(err);
        res.send(err);
    });
});

router.post('/remove', function (req, res) {
    _loggerInit.appLogger.info("remove");
    (0, _factory.schdeuleDelete)(req.body).then(function (result) {
        _loggerInit.appLogger.info("삭제완료");
        _loggerInit.appLogger.info(result);
        res.send(result);
    }).catch(function (err) {
        _loggerInit.appLogger.error(err);
        res.send(err);
    });
});

router.post('/removeGantt', function (req, res) {
    _loggerInit.appLogger.info("removeGantt");
    (0, _factory.schdeuleGanttDelete)(req.body).then(function (result) {
        _loggerInit.appLogger.info("삭제완료");
        _loggerInit.appLogger.info(result);
        res.send(result);
    }).catch(function (err) {
        _loggerInit.appLogger.error(err);
        res.send(err);
    });
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

router.get('/getGantt', function (req, res) {

    (0, _factory.scheduleGanttGet)().then(function (result) {
        return result;
    }).then(function (findReuslt) {
        res.send(findReuslt);
    }).catch(function (err) {
        _loggerInit.appLogger.error(err);
        res.send(err);
    });
});

exports.default = router;
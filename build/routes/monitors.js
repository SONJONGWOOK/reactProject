'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _loggerInit = require('../logger/loggerInit');

var _loggerInit2 = _interopRequireDefault(_loggerInit);

var _monitorFactory = require('../monitor/monitorFactory');

var _monitorFactory2 = _interopRequireDefault(_monitorFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');
var router = _express2.default.Router();

router.get('/conn', function (req, res) {
    var asdf = _monitorFactory.mongoose.connection.readyState;
    console.log(asdf);
    console.log(typeof asdf === 'undefined' ? 'undefined' : _typeof(asdf));
});

router.get('/', function (req, res) {
    var output = {
        "mem": (0, _monitorFactory.mem)(),
        "tcp": (0, _monitorFactory.tcp)(),
        "cpu": (0, _monitorFactory.cpu)()
    };
    res.send(output);
});

router.get('/findMem', function (req, res) {

    (0, _monitorFactory.memResult)(10).then(function (posts) {
        return posts;
    }).then(function (findReuslt) {

        res.send(findReuslt);
    }).catch(function (err) {
        _loggerInit.appLogger.error(err);
        res.send(err);
    });
});

router.get('/findMem/:count', function (req, res) {

    var count = req.params.count;
    (0, _monitorFactory.memResult)(count).then(function (posts) {
        return posts;
    }).then(function (findReuslt) {

        res.send(findReuslt);
    }).catch(function (err) {
        _loggerInit.appLogger.error(err);
        res.send(err);
    });
});

router.get('/findMemMax', function (req, res) {

    (0, _monitorFactory.memMaxResult)().then(function (posts) {
        return posts;
    }).then(function (findReuslt) {

        res.send(findReuslt);
    }).catch(function (err) {
        _loggerInit.appLogger.error(err);
        res.send(err);
    });
});

router.get('/findCpu', function (req, res) {

    (0, _monitorFactory.cpuResult)(10).then(function (posts) {
        return posts;
    }).then(function (findReuslt) {

        res.send(findReuslt);
    }).catch(function (err) {
        _loggerInit.appLogger.error(err);
        res.send(err);
    });
});

router.get('/findCpu/:count', function (req, res) {

    var count = req.params.count;
    (0, _monitorFactory.cpuResult)(count).then(function (posts) {
        return posts;
    }).then(function (findReuslt) {

        res.send(findReuslt);
    }).catch(function (err) {
        _loggerInit.appLogger.error(err);
        res.send(err);
    });
});

router.get('/findTcp', function (req, res) {

    (0, _monitorFactory.tcpResult)(10).then(function (posts) {
        return posts;
    }).then(function (findReuslt) {

        res.send(findReuslt);
    }).catch(function (err) {
        _loggerInit.appLogger.error(err);
        res.send(err);
    });
});

router.get('/findTcp/:count', function (req, res) {

    var count = req.params.count;
    (0, _monitorFactory.tcpResult)(count).then(function (posts) {
        return posts;
    }).then(function (findReuslt) {

        res.send(findReuslt);
    }).catch(function (err) {
        _loggerInit.appLogger.error(err);
        res.send(err);
    });
});

router.get('/findTcpCount', function (req, res) {

    (0, _monitorFactory.tcpCount)().then(function (posts) {
        return posts;
    }).then(function (findReuslt) {
        res.send(findReuslt);
    }).catch(function (err) {
        _loggerInit.appLogger.error(err);
        res.send(err);
    });
});

router.get('/mem', function (req, res) {
    res.send((0, _monitorFactory.mem)());
});

router.get('/tcp', function (req, res) {
    res.send((0, _monitorFactory.tcp)());
});

router.get('/cpu', function (req, res) {
    res.send((0, _monitorFactory.cpu)());
});

exports.default = router;
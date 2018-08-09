'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _monitorFactory = require('../monitor/monitorFactory');

var _monitorFactory2 = _interopRequireDefault(_monitorFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');
var router = _express2.default.Router();

router.get('/', function (req, res) {
    var output = {
        "mem": (0, _monitorFactory.mem)(),
        "tcp": (0, _monitorFactory.tcp)(),
        "cpu": (0, _monitorFactory.cpu)()
    };
    res.send(output);
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
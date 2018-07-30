'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');
var router = _express2.default.Router();

router.get('/', function (req, res) {
    res.send('post1231');
});

router.get('/test', function (req, res) {
    res.sendfile(path.join(__dirname, '../../public//test.html'));
});

router.get('/read/:id', function (req, res) {
    res.send('You are reading post ' + req.params.id);
});

exports.default = router;
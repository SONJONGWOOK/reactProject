'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _posts = require('./routes/posts');

var _posts2 = _interopRequireDefault(_posts);

var _reactHotLoader = require('react-hot-loader');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = 3000;
var devPort = 3001;
var path = require('path');

if (process.env.NODE_ENV == 'development') {
    console.log('devServer');
    // const conifg = require('/../webpack.config.dev') error
    var config = require('../webpack.config');
    var compiler = (0, _webpack2.default)(config);
    var devServer = new _webpackDevServer2.default(compiler, config.devServer);

    devServer.listen(devPort, function () {
        console.log('devStart' + devPort);
    });
}

// app.use ('/' , express.static(__dirname+ '/../public'))

app.get('/', function (req, res) {
    console.log("접속");
});

app.get('/movie*', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});

app.use('/abc/*', function (req, res) {
    res.sendfile(path.join(__dirname, '../public/index.html'));
});

//이미지 처리용 url
app.use('/asset/*', function (req, res) {
    var callUrl = req.originalUrl;
    res.sendfile(path.join(__dirname, '../public/' + callUrl));
});

app.get('/hello', function (req, res) {

    return res.send('test');
});

// 라우트 설정

app.use("/posts", _posts2.default);

var server = app.listen(port, function () {
    console.log("server start " + port);
});
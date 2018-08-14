'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _loggerInit = require('./logger/loggerInit');

var _loggerInit2 = _interopRequireDefault(_loggerInit);

var _posts = require('./routes/posts');

var _posts2 = _interopRequireDefault(_posts);

var _monitors = require('./routes/monitors');

var _monitors2 = _interopRequireDefault(_monitors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = 3000;
var devPort = 3001;
var path = require('path');

//log

app.use(_loggerInit2.default.connectLogger(_loggerInit2.default.getLogger('http')));

//서버구동
var server = app.listen(port, function () {
    _loggerInit.appLogger.debug("server start " + port);
});
//dev서버 기동 hot load 설정해놓은거있음.
if (process.env.NODE_ENV == 'development') {
    _loggerInit.appLogger.debug('devServer');
    // const conifg = require('/../webpack.config.dev') error
    var config = require('../webpack.config.dev');
    var compiler = (0, _webpack2.default)(config);
    var devServer = new _webpackDevServer2.default(compiler, config.devServer);

    devServer.listen(devPort, function () {
        _loggerInit.appLogger.debug('devStart' + devPort);
    });
}

app.use('/', _express2.default.static(__dirname + '/../public'));

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

//나중에 router.js으로 뺄내용들
app.get('/movie*', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../public/movie/index.html'));
});

app.get('/resource*', function (req, res) {

    res.sendFile(path.resolve(__dirname + '/../public/resource/index.html'));
});

//이미지 처리용 url
app.use('/asset/*', function (req, res) {
    var callUrl = req.originalUrl;
    res.sendfile(path.join(__dirname, '../public/' + callUrl));
});

// 라우트 설정


app.use("/posts", _posts2.default);

//모니터링 라우트

app.use("/monitor", _monitors2.default);
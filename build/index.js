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

//dev서버 기동 hot load 설정해놓은거있음.
if (process.env.NODE_ENV == 'development') {
    console.log('devServer');
    // const conifg = require('/../webpack.config.dev') error
    var config = require('../webpack.config.dev');
    var compiler = (0, _webpack2.default)(config);
    var devServer = new _webpackDevServer2.default(compiler, config.devServer);

    devServer.listen(devPort, function () {
        console.log('devStart' + devPort);
    });
}
//log4js
var log4js = require('log4js');
log4js.addLayout('json', function (config) {
    return function (logEvent) {
        return JSON.stringify(logEvent) + config.separator;
    };
});
log4js.configure(__dirname + "/../log4js.config.json", { reloadSec: 30 });

var logger = log4js.getLogger('app');
var accesslogger = log4js.getLogger('access');

//엑세스 로거 morgan
var morgan = require('morgan');
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'), (req,res,next) =>{
//     next()
// })

app.use(log4js.connectLogger(log4js.getLogger('http')));

// logger.level = 'debug'
setInterval(function () {
    logger.debug("test debug");
    logger.info("test info");
    logger.warn("test warn");
    logger.error("test error");
}, 3000);

app.use('/', _express2.default.static(__dirname + '/../public'));

//나중에 router.js으로 뺄내용들
app.get('/movie*', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../public/movie/index.html'));
});

app.get('/resource*', function (req, res) {

    res.sendFile(path.resolve(__dirname + '/../public/resource/index.html'));
});

// app.use ('/abc/*' , (req ,res) => {
//     res.sendfile(path.join(__dirname , '../public/index.html'))
// })

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
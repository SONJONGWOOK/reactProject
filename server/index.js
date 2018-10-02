import express from 'express'
import WebpackDevServer from 'webpack-dev-server'
import webpack from 'webpack'
import "babel-polyfill"
import "isomorphic-fetch"
import bodyParser from 'body-parser'
import cors  from 'cors'

const app = express()
const port = 3000;
const devPort = 3001;
const path = require('path')

//log
import log4js , {appLogger as logger} from './logger/loggerInit';
app.use(log4js.connectLogger(log4js.getLogger('http')  ) )

//서버구동
const server = app.listen(port , () => {
    logger.debug("server start "+port)
})

//dev서버 기동 hot load 설정해놓은거있음.
if(process.env.NODE_ENV == 'development'){
    logger.debug('devServer')
    // const conifg = require('/../webpack.config.dev') error
    const config = require('../webpack.config.dev') 
    let compiler = webpack(config)
    let devServer = new WebpackDevServer(compiler , config.devServer)

    devServer.listen(devPort ,() => {
        logger.debug('devStart' + devPort)
    })
}

//body-parser
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())





app.use ('/' , express.static(__dirname+ '/../public'))

//cors허용
// cors모듈 사용
//  app.use(cors())
//express에 헤더 추가
app.all('/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    next();
})

//나중에 router.js으로 뺄내용들
app.get('/movie*', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../public/movie/index.html'));
});

app.get('/resource*', function(req, res) {
     
    res.sendFile(path.resolve(__dirname + '/../public/resource/index.html'));
});

app.get('/schedule*', function(req, res) {
     
    res.sendFile(path.resolve(__dirname + '/../public/schedule/index.html'));
});


//이미지 처리용 url
app.use ('/asset/*' , (req ,res) => {
    let callUrl  = req.originalUrl
    res.sendfile(path.join(__dirname , '../public/'+callUrl))
})

// 라우트 설정
import posts from './routes/posts'

app.use("/posts", posts)

//모니터링 라우트
import monitors from './routes/monitors'
app.use("/monitor", monitors)

import schedule from './routes/schedule'
app.use("/calendar", schedule)

//스케쥴러
import dailyProcess from './schedule/dailyProcess'
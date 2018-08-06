import express from 'express'
import WebpackDevServer from 'webpack-dev-server'
import webpack from 'webpack'

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

app.use ('/' , express.static(__dirname+ '/../public'))

//나중에 router.js으로 뺄내용들
app.get('/movie*', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../public/movie/index.html'));
});

app.get('/resource*', function(req, res) {
     
    res.sendFile(path.resolve(__dirname + '/../public/resource/index.html'));
});


//이미지 처리용 url
app.use ('/asset/*' , (req ,res) => {
    let callUrl  = req.originalUrl
    res.sendfile(path.join(__dirname , '../public/'+callUrl))
})


// 라우트 설정
import posts from './routes/posts'
import { setConfig } from 'react-hot-loader';

app.use("/posts", posts)

//모니터링 부분
// import tcp from './monitorTest/tcp'
// import cpu from './monitorTest/stat'
// import mem from './monitorTest/mem'

// import log4js , {jsonLogger , appLogger as logger} from '../logger/loggerInit'
// import mem  from './monitor/mem'
// import cpu  from './monitor/stat'
// import tcp  from './monitor/tcp'

import monitorFactory , {mem , cpu , tcp} from './monitor/monitorFactory'
// import monitorFactory , {mem} from './monitor/monitorFactory'
setInterval( ()=> {

    logger.debug(mem())
    logger.debug(cpu())
    logger.debug(tcp())

} , 1000 )







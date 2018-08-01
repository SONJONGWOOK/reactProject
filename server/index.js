import express from 'express'
import WebpackDevServer from 'webpack-dev-server'
import webpack from 'webpack'


const app = express()
const port = 3000;
const devPort = 3001;
const path = require('path')


//dev서버 기동 hot load 설정해놓은거있음.
if(process.env.NODE_ENV == 'development'){
    console.log('devServer')
    // const conifg = require('/../webpack.config.dev') error
    const config = require('../webpack.config.dev') 
    let compiler = webpack(config)
    let devServer = new WebpackDevServer(compiler , config.devServer)

    devServer.listen(devPort ,() => {
        console.log('devStart' + devPort)
    })
}
//log4js
const log4js = require('log4js')
log4js.addLayout('json', (config) => {
    return (logEvent)=>{ return JSON.stringify(logEvent) + config.separator; }
})
log4js.configure(__dirname+ "/../log4js.config.json" , {reloadSec : 30} )

const logger = log4js.getLogger('app')
const accesslogger = log4js.getLogger('access')
  

//엑세스 로거 morgan
const morgan = require('morgan')
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'), (req,res,next) =>{
//     next()
// })

app.use(log4js.connectLogger(log4js.getLogger('http')  ) )

// logger.level = 'debug'
// setInterval( ()=> {
//     logger.debug("test debug")
//     logger.info("test info")
//     logger.warn("test warn")
//     logger.error("test error")
// } , 3000 )


app.use ('/' , express.static(__dirname+ '/../public'))


//나중에 router.js으로 뺄내용들
app.get('/movie*', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../public/movie/index.html'));
});

app.get('/resource*', function(req, res) {
     
    res.sendFile(path.resolve(__dirname + '/../public/resource/index.html'));
});

// app.use ('/abc/*' , (req ,res) => {
//     res.sendfile(path.join(__dirname , '../public/index.html'))
// })

//이미지 처리용 url
app.use ('/asset/*' , (req ,res) => {
    let callUrl  = req.originalUrl
    res.sendfile(path.join(__dirname , '../public/'+callUrl))
})


app.get('/hello' , (req ,res) =>{
    
    return res.send('test')
})

// 라우트 설정

import posts from './routes/posts'
import { setConfig } from 'react-hot-loader';

app.use("/posts", posts)

const server = app.listen(port , () => {
    console.log("server start "+port)
})
import express from 'express'
import WebpackDevServer from 'webpack-dev-server'
import webpack from 'webpack'


const app = express()
const port = 3000
const devPort = 3001
const path = require('path')

if(process.env.NODE_ENV == 'development'){
    console.log('devServer')
    // const conifg = require('/../webpack.config.dev') error
    const config = require('../webpack.config') 
    let compiler = webpack(config)
    let devServer = new WebpackDevServer(compiler , config.devServer)

    devServer.listen(devPort ,() => {
        console.log('devStart' + devPort)
    })
}


// app.use ('/' , express.static(__dirname+ '/../public'))

app.get('/' , function (req,res) {
    console.log("접속")
})


app.get('/movie*', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../public/index.html'));
  });

app.use ('/abc/*' , (req ,res) => {
    res.sendfile(path.join(__dirname , '../public/index.html'))
})

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
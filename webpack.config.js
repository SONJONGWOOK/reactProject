const path = require('path')
const webpack = require('webpack');

module.exports = {
    entry:{
        // movie : './src/movie.js',
        app : './src/resource.js',
        babelPolyfill : 'babel-polyfill'
    
        
    },
    output:{
        // path:path.resolve(__dirname , 'build') , 
        // publicPath : '/build/',
        path:path.resolve(__dirname , 'public/bundle') , 
        publicPath : '/',
        // publicPath : '/movie',
        filename:'app.bundle.js'
        // filename:'[name].bundle.js'
        
    },
    module :{
        rules : [
            {
               test: /\.js|.jsx$/, //js로 끝나는 확장자만 로더를 적용할 것
               exclude: /node_modules/, //node_modules 폴더는 제외
               use: {
                loader: "babel-loader",
                options: {
                    presets: ['env' ,'react' , "react-latest"]
                  }
                }
               
            },
            {
                test: /\.css$/,
	        	use: [
	         		'style-loader',
	          		'css-loader'
	        	]   
            },
            {
                test: /\.(png|svg|jpe?g|gif|ttf|eof|woff)$/,
	        	use:[ 
                      {
                          //이미지 처리를 위한 url -loader
                          //dom이 참조하는 publicPath는 public안에 있는 /asset로 하여 express서버에서 라우팅해서 파일 보내줌
                          //실제로 존재하는 이미지는 프로젝트 최상단에 asset폴더에 이미지 존재하지만 
                          //webpack에서 번들로 묶을시 경로가 변경됨.
                          loader : 'url-loader',
                          options : {
                            publicPath : '/asset',
                            // name :path.resolve(__dirname , 'public/asset/[hash].[ext]'),
                            name : '../[path][hash].[ext]',
                            limit : 10000,
                          }
                          
                       }
                ],
	        } 
         
        ]
    },
    devServer: {
        host : '0.0.0.0',
        contentBase: path.join(__dirname, "/public"),
        compress: true,
        watchContentBase: true,
        hot : true,
        inline: true,
        open : true,
        historyApiFallback: true,
        
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin()
      ]
      
}
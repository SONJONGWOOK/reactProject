const path = require('path')
const webpack = require('webpack');

module.exports = {
    mode: 'development' ,
    entry:{
        app : './src/index.js',        
        dev : 'webpack-dev-server/client?http://0.0.0.0:3001' , 
        devOnly : 'webpack/hot/only-dev-server',
        babelPolyfill :  'babel-polyfill'

               
    },
    output:{
        path:path.resolve(__dirname , 'public') , 
        publicPath : '/movie',
        filename:'app.bundle.js'
    },
    module :{
        rules : [
            {
               test: /\.js$/, //js로 끝나는 확장자만 로더를 적용할 것
               exclude: /node_modules/, //node_modules 폴더는 제외
               loader: "babel-loader"
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
                          loader : 'url-loader',
                          options : {
                            publicPath : '/asset',
                            name : '/[hash].[ext]',
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
        publicPath : '/movie',
        filename:'app.bundle.js' ,
        watchContentBase: true,
        hot : true,
        inline: true,
        open : true,
        // port : 3000,
        historyApiFallback: true,
        proxy: {
            "**": "http://localhost:3000"
        }
        
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin()
      ]
      
}
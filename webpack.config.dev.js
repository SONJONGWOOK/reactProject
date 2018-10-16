const path = require('path')
const webpack = require('webpack');

module.exports = {
    mode: 'development' ,
    entry:{
        // app : ['./src/movie.js' , './src/resource.js', './src/schedule.js'] ,
        // movie : './src/movie.js' ,
        // resource : './src/resource.js',
        // app : './src/resource.js',
        app : './src/schedule.js',
        dev : 'webpack-dev-server/client?http://0.0.0.0:3001' , 
        devOnly : 'webpack/hot/only-dev-server',
        babelPolyfill :  'babel-polyfill'

               
    },
    output:{
        // path:path.resolve(__dirname , 'public') , 
        path:path.resolve(__dirname , 'public/bundle') , 
        publicPath : '/',
        // publicPath : '/movie',
        filename:'app.bundle.js',
        // filename : '[name].bundle.js',
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
                            name : '../[path][hash].[ext]',
                            // name : '/[path][hash].[ext]',
                            // name : '/[hash].[ext]',
                            limit : 10000,
                          }
                          
                       }
                ],
	        } 
         
        ]
    },
    devServer: {
        host : '0.0.0.0',
        contentBase: path.join(__dirname, "/public/bundle"),
        compress: true,
        publicPath : '/hot',
        filename:'app.bundle.js' ,
        watchContentBase: true,
        hot : true,
        inline: true,
        open : true,
        // port : 3000,
        historyApiFallback: true,
        proxy: {
            "**": "http://localhost:3000"
        },
        disableHostCheck: true
        
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin()
      ]
      
}
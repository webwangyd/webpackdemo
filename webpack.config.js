const  path  =  require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin= require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
var website ={
    publicPath:"http://172.16.5.249:8080/"
}
module.exports={
    //入口文件的配置项
    entry:{
        entry: './src/index.js'
    },
    //出口文件的配置项
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js',
        publicPath:website.publicPath
    },
    //模块：例如解读CSS,图片如何转换，压缩
    module:{
         rules: [
            {
              test: /\.css$/,
              use: extractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
              })
            },{
               test:/\.(png|jpg|gif)/ ,
               use:[{
                   loader:'url-loader',
                   options:{
                       limit:500000,
                       outputPath:'images/'
                   }
               }]
            },{
                test: /\.(htm|html)$/i,
                use:[ 'html-withimg-loader'] 
            },{
                test: /\.less$/,
                use: extractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "less-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            }
          ]
    },
    //插件，用于生产模版和各项功能
    plugins:[
        new uglify(),
        new htmlPlugin({
            minify:{
                removeAttributeQuotes:true
            },
            //避免缓存js
            hash:true,
            template:'./src/index.html'
        }),
        new extractTextPlugin("/css/index.css")
    ],
    //配置webpack开发服务功能
    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        //服务器的IP地址，可以使用IP也可以使用localhost
        host:'localhost',
        //服务端压缩是否开启
        compress:true,
        //配置服务端口号
        port:8080
    }
}
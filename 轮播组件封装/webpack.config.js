const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  mode:'development',
  entry: {
    index:'./src/js/index.js'},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'babel-loader'
      },{
        test:/\.css$/,
        // use:['style-loader','css-loader']
        use:[MiniCssExtractPlugin.loader,'css-loader'],
        use:[{
          loader:MiniCssExtractPlugin.loader,
          options:{
            publicPath:'../'
          }
        },'css-loader'],
        
        
      },
      {
        test:/\.(jpg|png|gif)$/,
        use:{
          loader:'file-loader',
          options:{
            name:'img/[name].[ext]',
            esModule:false,
            // limit:3000
          }
        }
      },
      {
        test:/\.(htm|html)$/,
        loader:'html-withimg-loader'
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      filename:'index.html'
    }


      
    ),
    new MiniCssExtractPlugin({
      filename:'./css/[name].css',
    })
  ]
};
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack')

module.exports = {
  entry: {
    app: './src/index.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        title: 'Web Api'
     }),
],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'wwwroot')
  },
     module: {
        rules: [
            { test: /\.handlebars$/,
                loader: "handlebars-loader"
             },
           {
            test: /\.css$/,
            use: [
              'style-loader',
               'css-loader'
             ],
           },
           {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                      'file-loader'
                   ]
            },
            {
                      test: /\.(woff|woff2|eot|ttf|otf)$/,
                      use: [
                       'file-loader'
                       ]
            },
           {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
          }         
         ]
       }
};
const webpack = require('webpack');
const path = require('path');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');


module.exports = () => {

  const config = {
    devtool: 'inline-source-map',
    entry: {
      main: [path.resolve(__dirname, './src/js/new-version/index.js'), './src/sass/styles.scss']
    },
    output: {
      filename: 'script.js',
      path: path.resolve(__dirname, './dist'),
      assetModuleFilename: './assets/[name][ext]',
    },
    module: {
      rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        //
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        //
        {
          test: /\.s[ac]ss$/i,
          use: [{
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '',
              }
            },
            {
              loader: "css-loader"
            },
            {
              loader: "sass-loader"
            }
          ]
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf)$/,
          type: 'asset/inline',
        }
      ]
    },
    devServer: {
      contentBase: path.resolve(__dirname, './src/html/'),
      port: 8000,
      historyApiFallback: true,
      hot: true,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'style.css',
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/html/index.html'),
        filename: 'index.html',
        favicon: './src/assets/icons/favicon.ico',
      }),
      new CopyPlugin({
        patterns: [
          { from: 'src/assets/images', to: 'assets/images' },
          { from: 'src/assets/icons', to: 'assets/icons' },
          { from: 'src/assets/json', to: 'assets/json' },
          { from: 'src/assets/sounds', to: 'assets/sounds' },
        ],
      }),
      new RemovePlugin({
        before: {
          include: [
            './dist',
          ],
        },
      }),
    ],
  };
  return config;
};

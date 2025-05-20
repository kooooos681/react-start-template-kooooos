const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const port = 2233;
const dist = path.join(__dirname, 'dist');
const src = path.join(__dirname, 'src');
const public = path.join(__dirname, 'public');
const host = 'localhost';

module.exports = (_, args) => {
  return {
    devtool: 'source-map',
    context: src,
    devServer: {
      open: true,
      port,
      hot: true,
      historyApiFallback: true,
      host,
      static: {
        directory: public,
      },
    },
    resolve: {
      modules: [src, 'node_modules'],
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        src,
      },
    },

    entry: './index.tsx',
    output: {
      path: dist,
      publicPath:
        args.mode === 'development' ? `https://${host}:${port}/` : undefined /* <- прописать данные своего github */,
      filename: `js/[name].js`,
      chunkFilename: `js/[name].js`,
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          loader: require.resolve('babel-loader'),
          exclude: /node_modules/,
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
            'less-loader',
          ],
        },
        {
          test: /\.module\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[name]_[local]-[hash:base64:5]',
                },
              },
            },
          ],
        },
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
          ],
        },
        {
          test: /\.svg/,
          type: 'asset/inline',
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[name]_[local]-[hash:base64:5]',
                },
              },
            },
            'sass-loader',
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(public, 'index.html'),
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
        chunkFilename: 'css/[name].css',
      }),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: path.join(__dirname, 'tsconfig.json'),
          memoryLimit: 4096,
        },
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env),
      }),
    ],
  };
};

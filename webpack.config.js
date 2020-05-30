var path = require('path')
var webpack = require('webpack')
const merge = require("webpack-merge");
var nodeExternals = require('webpack-node-externals')
var ManifestPlugin = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const parts = require("./webpack.parts");

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
}

console.log('PORT: ', process.env.PORT);

var commonConfig = merge([{
  entry: './src/browser/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle-[hash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        resolve: {
          extensions: [".js", ".jsx"]
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "true"
    }),
    new ManifestPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name]-[hash].css",
    }),
  ]
}
])

const browserDevConfig = merge([
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT || 3001,
  }),
  parts.extractCSS({
    exclude: /\.module\.css$/,
    use: [
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1
        }
      },
      'postcss-loader'
    ]
  }),
  parts.extractCSS({
    use: [
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: true
        }
      },
      'postcss-loader'
    ],
    include: /\.module\.css$/
  }),
  parts.loadSCSS()
])

const productionConfig = merge([
  parts.loadSCSS()
]);

const serverCommonConfig = merge([
  {
    entry: './src/server/index.js',
    target: 'node',
    externals: [nodeExternals()],
    output: {
      path: __dirname,
      filename: 'server.js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: 'babel-loader',
          resolve: {
            extensions: [".js", ".jsx"]
          }
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        __isBrowser__: "false"
      }),
      new MiniCssExtractPlugin({
        filename: "[name]-[hash].css",
      }),
    ]
  },
  parts.extractCSS({
    exclude: /\.module\.css$/,
    use: [
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1
        }
      },
      'postcss-loader'
    ]
  }),
  parts.extractCSS({
    use: [
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: true
        }
      },
      'postcss-loader'
    ],
    include: /\.module\.css$/
  }),
  parts.loadSCSS(),
])


module.exports = mode => {
  if (mode === 'production') {
    const browserConfig = merge(commonConfig, productionConfig, { mode });
    const serverConfig = merge(serverCommonConfig);
    return [browserConfig, serverConfig]
  } else {

    const browserConfig = merge(commonConfig, browserDevConfig, { mode });
    console.log('browserConfig: ', browserConfig);
    const serverConfig = merge(serverCommonConfig);
    console.log('serverConfig: ', serverConfig);
    return [browserConfig, serverConfig]
  }
}

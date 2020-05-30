var path = require('path')
var webpack = require('webpack')
const merge = require("webpack-merge");
var nodeExternals = require('webpack-node-externals')
var ManifestPlugin = require('webpack-manifest-plugin')
const parts = require("./webpack.parts");

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
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "true"
    }),
    new ManifestPlugin()
  ]
}
])

const browserDevConfig = merge([
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT || 3001,
  }),
  parts.loadCSS(),
  // parts.extractCSS({
  //   use: ['css-loader', 'sass-loader'],
  // }),
  parts.extractSCSS({
    use: ['css-loader', 'sass-loader']
  }),
])

const productionConfig = merge([
  // parts.extractCSS({
  //   use: ['css-loader', 'sass-loader'],
  // }),
  parts.extractSCSS({
    use: ['css-loader', 'sass-loader']
  }),
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
      })
    ]
  },
  // parts.extractCSS({
  //   use: ['css-loader', 'sass-loader'],
  // }),
  parts.extractSCSS({
    use: ['css-loader', 'sass-loader']
  }),
])
  // parts.loadSCSS(),


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

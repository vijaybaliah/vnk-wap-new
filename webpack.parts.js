const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    stats: "errors-only",
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    open: true,
    overlay: true,
  },
});

exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => ([
                require("autoprefixer"),
                require("precss"),
              ]),
            },
          },
        ],
      },
    ],
  },
});

exports.extractSCSS = ({ include, exclude, use = [] }) => {
  const plugin = new ExtractTextPlugin({
    filename: "[name].css",
  });
  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          include,
          exclude,
          use: ExtractTextPlugin.extract({
            use,
          }),
        }
      ],
    },
    plugins: [
      plugin,
    ]
  }
};

exports.extractCSS = ({ include, exclude, use = [] }) => {
  // Output extracted CSS to a file
  const plugin = new MiniCssExtractPlugin({
    filename: "[name].css",
  });

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,

          use: [
            MiniCssExtractPlugin.loader,
          ].concat(use),
        },
      ],
    },
    plugins: [plugin],
  };
};
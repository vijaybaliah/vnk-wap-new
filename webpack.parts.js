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
    filename: "[name]-[hash].css",
  });
  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          include,
          exclude,
          loader: ExtractTextPlugin.extract({
            use,
            fallback: ['style-loader'],
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
  };
};

exports.autoprefix = () => ({
  loader: "postcss-loader",
  options: {
    plugins: () => [require("autoprefixer")()],
  },
});

exports.loadSCSS = () => ({
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
});

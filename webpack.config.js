const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env = {}) => {
  const { mode = "development" } = env;

  const isProd = mode === "production";
  const isDev = mode === "development";

  const getStyleLoaders = () => {
    return [
      isProd ? MiniCssExtractPlugin.loader : "style-loader",
      "css-loader",
    ];
  };

  const getPlugins = () => {
    const plugins = [
      new HtmlWebpackPlugin({
        template: "public/index.html",
      }),
    ];

    if (isProd) {
      plugins.push(
        new MiniCssExtractPlugin({
          filename: "main-[hash:8].css",
        })
      );
    }

    return plugins;
  };

  return {
    mode: isProd ? "production" : isDev && "development",

    output: {
      filename: isProd ? "main-[hash:8].js" : undefined,
      publicPath: "/",
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },

        {
          test: /\.(css)$/,
          use: getStyleLoaders(),
        },

        {
          test: /\.(s[ca]ss)$/,
          use: [...getStyleLoaders(), "sass-loader"],
        },

        {
          test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
          type: isProd ? "asset" : "asset/resource",
        },

        {
          test: /\.(woff2?|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
      ],
    },

    plugins: getPlugins(),

    devServer: {
      historyApiFallback: true,
    },
  };
};

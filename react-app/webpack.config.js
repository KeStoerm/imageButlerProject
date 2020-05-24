const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require("path");

module.exports = (env, {mode, backend = "--backend not set"}) => {
  const isProd = mode === "production";
  return {
    entry: {
      main: "./src/entry.tsx"
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"]
    },
    output: {
      filename: isProd ? "[name].[contenthash].bundle.js" : "[name].[hash].bundle.js",
      path: path.join(__dirname, "/target/bundle")
    },
    devtool: isProd ? "none" : "source-map",
    devServer: {
      open: true,
      hot: true,
      historyApiFallback: true,
      contentBase: "/target/dev",
      port: 80,
      host: "localhost"
    },
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            chunks: "all",
            name: "vendor",
            enforce: true,
            priority: 20
          },
          common: {
            name: "common",
            minChunks: 2,
            chunks: "all",
            priority: 10,
            reuseExistingChunk: true
          },
        }
      },
      minimize: isProd,
      minimizer: [
        new TerserPlugin({
          cache: false,
          parallel: true,
          terserOptions: {
            output: {
              comments: false,
            },
          }
        }),
        new OptimizeCssAssetsPlugin({
          cssProcessorPluginOptions: {
            preset: ["default", {discardComments: {removeAll: true}}],
          }
        })
      ],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-react",
                "@babel/preset-typescript",
                [
                  "@babel/preset-env",
                  {
                    "useBuiltIns": "usage",
                    "corejs": 3,
                    "debug": false,
                    "targets": {
                      "ie": "11",
                      "edge": "14",
                      "firefox": "68",
                      "chrome": "76",
                      "safari": "12"
                    }
                  }
                ]
              ],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                ["@babel/plugin-proposal-decorators", {legacy: true}],
                "@babel/plugin-proposal-class-properties",
                "react-hot-loader/babel"
              ].filter(plugin => !isProd || plugin !== "react-hot-loader/babel"),
            }
          }
        },
        {
          test: /\.html$/,
          use: "html-loader"
        },
        {
          test: /\.s?css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: !isProd
              }
            },
            "css-loader",
            "sass-loader"
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: isProd ? "./images/[name].[contenthash].[ext]" : "./images/[name].[ext]",
              },
            },
          ],
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        favicon: "src/template/favicon.ico",
        template: "src/template/index.html",
        inject: true,
        hash: true,
        minify: {
          collapseWhitespace: isProd,
          removeComments: isProd,
          removeRedundantAttributes: isProd,
          useShortDoctype: isProd
        }
      }),
      new MiniCssExtractPlugin({
        filename: isProd ? "[name].[contenthash].css" : "[name].css",
        chunkFilename: isProd ? "[id].[contenthash].css" : "[id].css"
      }),
      new webpack.DefinePlugin({
        "encoway.backend.url": JSON.stringify(backend)
      }),
    ]
  }
};

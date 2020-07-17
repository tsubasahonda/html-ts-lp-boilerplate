/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const MODE = "development";

const enabledSourceMap = MODE === "development";

module.exports = {
  mode: MODE,
  entry: path.resolve(__dirname, "src", "scripts", "index.ts"),
  output: {
    path: `${__dirname}/dist`,
  },
  devServer: {
    contentBase: "dist",
    open: true,
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "**/*.html",
          to: "./",
          context: path.resolve(__dirname, "src", "public", "html"),
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "tsconfig.json"),
            },
          },
        ],
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
      {
        test: /\.scss/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: true,
              sourceMap: enabledSourceMap,
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [require("autoprefixer")],
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: enabledSourceMap,
            },
          },
        ],
      },
      {
        // 対象となるファイルの拡張子
        test: /\.(gif|png|jpg|eot|wof|woff|ttf|svg)$/,
        // 画像を埋め込まず任意のフォルダに保存する
        loader: "file-loader",
        options: {
          name: "/images/[name].[ext]",
        },
      },
    ],
  },
};

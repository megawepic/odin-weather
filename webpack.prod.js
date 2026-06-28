import { merge } from "webpack-merge";
import common from "./webpack.common.js";
import path from "node:path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default merge(common, {
  mode: "production",

  output: {
    filename: "[contenthash].js",
    path: path.resolve(import.meta.dirname, "dist"),
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
});

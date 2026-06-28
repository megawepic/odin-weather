import { merge } from "webpack-merge";
import common from "./webpack.common.js";
import path from "node:path";

export default merge(common, {
  mode: "development",
  devtool: "inline-source-map",

  devServer: {
    static: "./dist",
    hot: true,
    open: true,
  },

  output: {
    filename: "main.js",
    path: path.resolve(import.meta.dirname, "dist"),
  },
});

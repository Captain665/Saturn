const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/index.js"
  },
  output: {
    filename: "main.js",
    path: path.resolve("dist/client")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  devServer: {
    proxy: {
      "/api/v2": {
        target: "http://localhost:9090",
        pathRewrite: { "^/.netlify/functions": "" }
      }
    }
  }
};
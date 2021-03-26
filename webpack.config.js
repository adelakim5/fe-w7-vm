const path = require("path");
// commonjs

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development", // production ? develop ? 선택
  // prod: 기본적으로 설정해주는 default 들이 있음
  // dev: 그게 없음 -> 찾아볼 것
  entry: ["babel-polyfill", "./src/js/main.js"], // 번들링 시작점을 알려주는 곳
  // js 파일을 읽어들이는 것이므로  js 파일로 해야함
  devtool: "inline-source-map",
  output: {
    // 번들링 후 파일이 어디로 저장되는지
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js",
    publicPath: "http://localhost:9000",
    clean: {
      keep: /\.git/,
    },
  },
  module: {
    // 번들하고 싶은 파일인데 웹팩이 못알아듣는 애들을 위해 ex. sass
    rules: [
      // test: 정규식
      // use: right -> left
      { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] },
      { test: /\.js$/, exclude: /node_modules/, use: "babel-loader" },
    ],
  },
  plugins: [
    // index 파일 생성
    // dist 안에 있는 index.html 가면 알아서 해시값이 바뀐 채로 script가 적혀 있는거 확인 가능
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    contentBase: path.resolve(__dirname + "/dist"),
    index: "index.html",
    port: 9000,
    writeToDisk: true,
    hot: true, // 저장하면 바로 설정되는? 아마두.. -> 코드 짜고 저장하면 새로고침 안해도 반영됨
  },
};

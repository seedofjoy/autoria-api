module.exports = {
  context: __dirname + "/app",
  entry: "./main.jsx",
  output: {
    path: __dirname + "/build",
    filename: "[name].bundle.js"
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "eslint-loader", enforce: "pre" }
    ]
  }
};

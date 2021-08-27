module.exports = {
    //...
    node: {
      global: false,
      __filename: false,
      __dirname: false,
    },
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
        ],
      },
  };
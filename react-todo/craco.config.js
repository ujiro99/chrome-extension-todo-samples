module.exports = {
  devServer: (devServerConfig) => {
    devServerConfig.writeToDisk = true;
    return devServerConfig;
  },
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.devtool = "inline-source-map";
      return webpackConfig;
    },
  },
};

const { override } = require("customize-cra");

module.exports = override(
  config => {
    config.devtool = 'inline-source-map';
    return config;
  },
);

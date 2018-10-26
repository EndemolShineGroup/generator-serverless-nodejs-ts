const webpack = require('webpack');

const baseConfig = Object.assign({}, require('./webpack.config.common'));

baseConfig.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());

module.exports = baseConfig;

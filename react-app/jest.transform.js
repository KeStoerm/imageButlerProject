const common = require("./webpack.config.js");

module.exports = require("babel-jest").createTransformer(common(null).module.rules[0].use.options);
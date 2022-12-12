const htmlLoader = require('html-loader');

module.exports = {
  async process(src) {
    return await htmlLoader(src);
  },
};

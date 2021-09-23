const images = require('@rollup/plugin-image');

module.exports = {
  // eslint-disable-next-line no-unused-vars
  rollup(config, options) {
    config.plugins = [
      images({ incude: ['**/*.png', '**/*.jpg'] }),
      ...config.plugins,
    ];

    return config;
  },
};

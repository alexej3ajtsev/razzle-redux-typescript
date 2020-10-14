module.exports = {
  plugins: ['typescript'],
  modifyWebpackConfig({
    env: { target, dev:isDevelopment },
    webpackConfig,
  }) {
    return new Promise(async resolve => {
      if (target === 'node') {
        // server only
        webpackConfig.module.rules
          .forEach(rule => {
            const isCssRule = rule.test &&
              !Array.isArray(rule.test) && 
              rule.test.test('.css');

            if (isCssRule) {
              // Change localIdentName on server to make css modules work
              rule.use[0].options.modules = {
                auto: true,
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            }
          });
      }
      resolve(webpackConfig);
    });
  },
};
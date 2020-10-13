import express from 'express';

let app = require('./server').default;

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...');
    try {
      app = require('./server').default;
    } catch (error) {
      console.error(error);
    }
  });
  console.info('✅  Server-side HMR Enabled!');
}

const port = process.env.PORT || 3000;

export default express()
  .use((req, res) => app.handle(req, res))
  // @ts-ignore
  .listen(port, function(err) {
    // @ts-ignore
    if (err) {
      console.error(err);
      return;
    }
    console.log(`> Started on port ${port}`);
  });

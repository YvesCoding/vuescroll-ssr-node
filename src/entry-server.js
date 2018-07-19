import createApp from './app';

const isDev = process.env.NODE_ENV !== 'production';

export default context => {
  return new Promise((resolve, reject) => {
    const startTime = isDev && Date.now();

    const { app, store } = createApp();
    app.$options.components['App'].asyncData;
    asyncData({ store })
      .then(() => {
        isDev && console.log(`data pre-fetch: ${Date.now() - startTime}ms`);
        context.state = store.state;
        resolve(app);
      })
      .catch(reject);
    resolve(app);
  });
};

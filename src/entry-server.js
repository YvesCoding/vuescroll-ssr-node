import createApp from './app';

const isDev = process.env.NODE_ENV !== 'production';

export default () => {
  return new Promise((resolve, reject) => {
    const startTime = isDev && Date.now();

    const app = createApp();
    console.log(app.$refs);
    const asyncData = app.$refs['app'].$options.asyncData;
    asyncData()
      .then(() => {
        isDev && console.log(`data pre-fetch: ${Date.now() - startTime}ms`);
        resolve(app);
      })
      .catch(reject);
  });
};

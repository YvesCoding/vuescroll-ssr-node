import createApp from './app';

const isDev = process.env.NODE_ENV !== 'production';

export default context => {
  return new Promise((resolve, reject) => {
    const startTime = isDev && Date.now();
    const { app, store, router } = createApp();

    router.push(context.url);

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }

      // 对所有匹配的路由组件调用 `asyncData()`
      Promise.all(
        matchedComponents.map(Component => {
          if (Component.asyncData) {
            return Component.asyncData(store, router.currentRoute);
          }
        })
      )
        .then(() => {
          context.state = store.state;
          isDev && console.log(`data pre-fetch: ${Date.now() - startTime}ms`);
          resolve(app);
        })
        .catch(reject);
    }, reject);
  });
};

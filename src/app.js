import Vue from 'vue';
import App from './App.vue';
import vuescroll from 'vuescroll';
import axios from 'axios';

Vue.use(vuescroll);
Vue.config.productionTip = false;

Vue.prototype.$axios = axios;
Vue.prototype.$vuescrollConfig = {
  bar: {
    background: 'rgb(202, 210, 206)'
  }
};

export default function createApp() {
  const app = new Vue({
    render: h => h(App, { ref: 'app' })
  });

  return app;
}

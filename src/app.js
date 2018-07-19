import Vue from 'vue';
import App from './App.vue';
import vuescroll from 'vuescroll';
import axios from 'axios';
import { createStore } from './store';

Vue.use(vuescroll);
Vue.config.productionTip = false;

Vue.prototype.$vuescrollConfig = {
  bar: {
    background: 'rgb(202, 210, 206)'
  }
};

export default function createApp() {
  const store = createStore();

  const app = new Vue({
    store,
    components: { App },
    render: h => h('App')
  });

  return { app, store };
}

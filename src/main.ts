import Vue from 'vue';
import vuescroll from 'vuescroll';
import 'vuescroll/dist/vuescroll.css';
import axios from 'axios';
import App from './App.vue';
import './vue';

Vue.use(vuescroll);

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;

Vue.prototype.$vuescrollConfig = {
  bar: {
    vBar: {
      background: 'rgb(202, 210, 206)'
    },
    hBar: {
      background: 'rgb(202, 210, 206)'
    }
  }
};

new Vue({
  render: h => h(App)
}).$mount('#app');

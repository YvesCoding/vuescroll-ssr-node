import Vue from 'vue';
import createApp from './app';

const app = createApp();

const asyncData = app.$refs['app'].$options.asyncData;

app.$mount('#app');

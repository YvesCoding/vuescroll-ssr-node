import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    state: {
      issuesList: [],
      issueInfo: {
        repo: 'vuescroll',
        owner: 'yvescoding'
      },
      params: {
        state: 'all',
        page: 1,
        per_page: 10
      }
    },
    actions,
    mutations,
    getters
  });
}

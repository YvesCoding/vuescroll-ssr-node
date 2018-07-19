import { resolve } from 'path';
import axios from 'axios';

export default {
  asyncData({ commit, state, getters }) {
    const { params } = state;
    const { address } = getters;

    return new Promise((resolve, reject) => {
      axios
        .get(address, {
          params
        })
        .then(res => {
          commit('setIssuesList', res.data);
          resolve();
        })
        .catch(e => {
          reject(e);
        });
    });
  }
};

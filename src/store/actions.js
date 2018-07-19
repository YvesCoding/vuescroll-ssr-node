import { resolve } from 'path';
import axios from 'axios';

export default {
  asyncData({ commit, state, getters }) {
    const { params } = state;
    const { issueAddress } = getters;

    return new Promise((resolve, reject) => {
      axios
        .get(issueAddress, {
          params
        })
        .then(res => {
          commit('SET_ISSUELIST', res.data);
          resolve();
        })
        .catch(e => {
          reject(e);
        });
    });
  }
};

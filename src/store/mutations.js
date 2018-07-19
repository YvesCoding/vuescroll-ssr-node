export default {
  SET_ISSUELIST(state, payload) {
    state.issuesList = payload;
  },
  ADD_PAGE(state) {
    state.params.page++;
  },
  RESET_PAGE(state) {
    state.params.page = 1;
  },
  SET_ISSUE_INFO(state, payload) {
    state.issueInfo = payload;
  }
};

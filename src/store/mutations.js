export default {
  setIssuesList(state) {
    state.issuesList = state._issuesList;
  },
  addPage() {
    state.params.page++;
  }
};

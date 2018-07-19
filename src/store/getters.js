export default {
  issueAddress(state) => {
    const address = `https://api.github.com/repos/${state.issueState.owner}/${
      state.issueState.repo
    }/issues`;

    return address;
  }
};

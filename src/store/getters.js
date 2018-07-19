export default {
  issueAddress: state => {
    const address = `https://api.github.com/repos/${state.issueInfo.owner}/${
      state.issueInfo.repo
    }/issues`;

    return address;
  }
};

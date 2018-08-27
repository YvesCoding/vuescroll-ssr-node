<template>
  <article id="app">
    <vue-scroll>
      <header id="issule-list-header">
        <h2>
          Vuescroll Issue List Demo Use Vue-SSR technology -
          <a href="https://github.com/YvesCoding/vuescroll-issue-list-demo" style="color:red">
            Demo GitHub
          </a>
        </h2>
        <p>
          <small>
            Vuescroll version
            <strong style="color:blue">
              <a href="https://www.npmjs.com/package/vuescroll">4.7.6</a>
            </strong>
          </small>
        </p>

        <div class="search-container">
          <div class="search-row">
            <div class="search-label">owner:</div>
            <div class="search-input"><input type="text" v-model="issueInfo.owner" /></div>
          </div>
          <div class="search-row">
            <div class="search-label">repo:</div>
            <div class="search-input"><input type="text" v-model="issueInfo.repo" /></div>
          </div>
          <div class="search-row">
            <button @click="serachIssues">
              Search
            </button>
          </div>
        </div>
      </header>
      <main id="issue-list-main">
        <issue-list :issueInfo="issueInfo" ref="issue-list" />
      </main>
    </vue-scroll>
  </article>
</template>
<script>
import Vue from 'vue';
import vuescroll, { Config } from 'vuescroll';
import IssueList from './components/IssueList.vue';

export default Vue.extend({
  data() {
    return {
      issueInfo: {
        owner: 'YvesCoding',
        repo: 'vuescroll'
      }
    };
  },
  components: {
    IssueList
  },
  computed: {
    issueList() {
      return this.$refs['issue-list'];
    }
  },
  methods: {
    serachIssues() {
      this.$store.commit('SET_ISSUE_INFO', this.issueInfo);
      this.$store.commit('RESET_PAGE');

      this.issueList.init();
    }
  }
});
</script>

<style>
@import url('./assets/app.css');
@import url('~vuescroll/dist/vuescroll.css');
#issue-list-main {
  height: 500px;
  border: 1px solid #e1e4e8;
}

#issule-list-header {
  padding: 5px 0;
}

#issule-list-header a {
  font-weight: 700;
  color: #24292e;
  text-decoration: none;
}

#issule-list-header a:hover {
  text-decoration: underline;
}

.search-row {
  height: 30px;
  line-height: 30px;
}

.search-row input {
  height: 30px;
  font-size: 16px;
}

.search-row button {
  height: 20px;
  line-height: 20px;
  font-size: 16px;
}

.search-row::after {
  content: '';
  display: table;
  clear: both;
}

.search-row > button {
  width: 50%;
}

.search-row:first-child {
  margin-top: 20px;
}

.search-row:not(:first-child) {
  margin-top: 10px;
}

.search-label,
.search-input {
  float: left;
}

.search-label {
  text-align: right;
  width: 30%;
}

.search-input {
  width: 50%;
  margin-left: 10px;
}

.search-input input {
  display: block;
  width: 100%;
}
</style>

<template>
  <article id="app">
    <header id="issule-list-header">
      <h2>
        Vuescroll Issue List Demo -
        <a href="https://github.com/YvesCoding/vuescroll-issue-list-demo">
          GitHub
        </a>
      </h2>
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
            Go Search !
          </button>
        </div>
      </div>
    </header>
    <main id="issue-list-main">
      <issue-list :issueInfo="issueInfo" ref="issue-list" />
    </main>
  </article>
</template>
<script>
import Vue from 'vue';
import vuescroll, { Config } from 'vuescroll';
import IssueList from './components/IssueList.vue';

export default Vue.extend({
  asyncData() {
    return new Promise((resolve, reject) => {
      this.issueList.init(message => {
        if (message == 'success') {
          resolve();
        } else {
          reject();
        }
      });
    });
  },
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
      this.issueList.init();
    }
  }
});
</script>

<style>
@import url('./assets/app.css');

#issue-list-main {
  height: 500px;
  border: 1px solid #e1e4e8;
}

#issule-list-header {
  padding: 15px 0;
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

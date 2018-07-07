<template>
  <section id="app">
  <header id="issule-list-header"><h2><a href="https://github.com/YvesCoding/vuescroll">Vuescroll Issue List Demo</a></h2></header>
  <main id="issue-list-main">
     <issue-list />
  </main>
</section>
</template>
<script lang="ts">
import Vue from 'vue';
import vuescroll, { Config } from 'vuescroll';
import IssueList from './components/IssueList.vue';

export default Vue.extend({
  components: {
    IssueList
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
</style>

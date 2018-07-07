<template>
  <section id="app">
  <header><h1>Issue List</h1></header>
  <main id="issue-list-main">
     <issue-list />
  </main>
</section>
</template>
<script lang="ts">
import Vue from 'vue';
import vuescroll, { Config } from 'vuescroll';
import IssueList from './components/IssueList.vue';
import { constants } from 'http2';

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
</style>

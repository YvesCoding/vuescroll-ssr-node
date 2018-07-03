<template>
  <section id="app">
  <header><h1>Issue List</h1></header>
  <main id="issue-list-main">
    <vue-scroll 
    :ops="ops"  
    @load-start="loadStart"
    @load-before-deactivate="loadBeforeDeactive"
    @refresh-start="refreshStart"
    >
    <IssueList :issues="issues"/>
    </vue-scroll>
  </main>
</section>
</template>
<script lang="ts">
import Vue from 'vue';
import vuescroll, { Config } from 'vuescroll';
import IssueList from './components/IssueList.vue';
import { constants } from 'http2';

export default Vue.extend({
  data() {
    return {
      ops: {
        vuescroll: {
          mode: 'slide',
          pullRefresh: {
            enable: true
          },
          pushLoad: {
            enable: true,
            tips: {
              beforeDeactive: 'Load Successfully!'
            }
          }
        }
      },
      issues: [],
      receivedData: [],
      params: {
        state: 'all',
        page: 1,
        per_page: 10
      }
    };
  },
  components: {
    IssueList
  },
  methods: {
    loadStart(_: any, __: any, done: any) {
      this.params.page++;
      this.getData().then(res => {
        this.receivedData = res.data;
        done();
      });
    },
    loadBeforeDeactive(_: any, __: any, done: any) {
      if (!this.receivedData.length) {
        this.ops.vuescroll.pushLoad.tips.beforeDeactive = 'No More Data';
      } else {
        this.ops.vuescroll.pushLoad.tips.beforeDeactive = `Load ${
          this.receivedData.length
        } datas Successfully!`;
      }
      setTimeout(() => {
        this.issues = this.issues.concat(this.receivedData);
        console.log(this.issues);
        done();
      }, 1000);
    },
    refreshStart(_: any, __: any, done: any) {
      this.params.page = 1;
      this.getData().then(res => {
        this.issues = res.data;
        done();
      });
    },
    getData() {
      return this.$axios.get(
        'https://api.github.com/repos/yvescoding/vuescroll/issues',
        {
          params: this.params
        }
      );
    }
  },
  created() {
    this.getData().then(res => {
      this.issues = res.data;
    });
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

<template>
  <vue-scroll :ops="ops" @load-start="loadStart" @load-before-deactivate="loadBeforeDeactivate" @refresh-start="refreshStart">
    <ul class="issue-container" slot="scroll-panel" v-if="issues.length > 0">
      <issue-item v-for="issue in issues" :key="issue.id" :id="issue.id" :issue="issue" :class="{'active': activeIndex == issue.id}" @enter="setActive">
      </issue-item>
    </ul>
    <ul class="issue-container" slot="scroll-panel" v-else>
      <no-data :tip="tip">
      </no-data>
    </ul>
  </vue-scroll>
</template>
<script>
import issueItem from './IssueItem.vue';
import NoData from './NoData.vue';
import Vue from 'vue';

export default Vue.extend({
  asyncData(store) {
    return store.dispatch('asyncData');
  },
  props: ['issueInfo'],
  components: {
    issueItem,
    NoData
  },
  data() {
    return {
      activeIndex: -1,
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
          },
          scroller: {
            preventDefault: false
          }
        }
      },
      tip: '',
      internalDispatch: false,
      issues: []
    };
  },
  computed: {
    issuesList() {
      return this.$store.state.issuesList;
    },
    ayncData() {
      return this.$options.asyncData;
    }
  },
  methods: {
    /** Set which issue is currently active */
    setActive(index) {
      this.activeIndex = index;
    },
    /** Handle for load-start stage */
    loadStart(_, __, done) {
      this.$store.commit('ADD_PAGE');
      this.internalDispatch = true;

      this.ayncData(this.$store).then(() => {
        const len = this.issuesList.length;
        if (!len) {
          this.ops.vuescroll.pushLoad.tips.beforeDeactive = 'No More Data!';
        } else {
          this.ops.vuescroll.pushLoad.tips.beforeDeactive = `Successfully load ${len} datas!`;
        }
        done();
      });
    },
    /** Handle for load-before-deactivate stage, always show user result in this stage, */
    loadBeforeDeactivate(_, __, done) {
      this.internalDispatch = false;
      setTimeout(() => {
        this.issues = this.issues.concat(this.issuesList);
        done();
      }, 1000);
    },
    /** Handle for refresh-start stage */
    refreshStart(_, __, done) {
      this.params.page = 1;
      this.ayncData()
        .then(() => {
          this.issues = this.issuesList;
          done();
        })
        .catch(e => {
          this.issues = [];
          this.tip = `Error: ${e.message}`;
        });
    },
    init(cb = () => {}) {
      this.issues = [];
      this.tip = 'Loading......';

      this.ayncData(this.$store)
        .then(() => {
          this.issues = this.issuesList;
          cb('success');
        })
        .catch(e => {
          this.issues = [];
          this.tip = `Error: ${e.message}`;
          cb('error');
        });
    }
  },
  watch: {
    issues: {
      handler() {
        if (!this.issues.length) {
          this.tip = 'No Data To Show :(';
        }
      },
      sync: true
    }
  },
  created() {
    this.issues = this.issuesList;
  }
});
</script>

<style>
.issue-container {
  margin: 0;
  min-height: 400px;
}
</style>

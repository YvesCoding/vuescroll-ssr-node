<template>
<vue-scroll 
    :ops="ops"  
    @load-start="loadStart"
    @load-before-deactivate="loadBeforeDeactivate"
    @refresh-start="refreshStart"
    >
    <ul class="issue-container" slot="scroll-panel" v-if="issues.length > 0">
        <issue-item
        v-for="issue in issues"
        :key="issue.id"
        :id="issue.id"
        :issue="issue"
        :class="{'active': activeIndex == issue.id}"
        @enter="setActive"
        >
        </issue-item>
    </ul>
    <ul class="issue-container" slot="scroll-panel" v-else>
      <no-data>
      </no-data>
    </ul>
</vue-scroll>
</template>
<script lang="ts">
import issueItem from './IssueItem.vue';
import NoData from './NoData.vue';
import Vue from 'vue';

export default Vue.extend({
  components: {
    issueItem,
    NoData
  },
  created() {
    this.getData().then(res => {
      this.issues = res.data;
    });
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
      issues: [],
      receivedData: [],
      params: {
        state: 'all',
        page: 1,
        per_page: 10
      }
    };
  },
  methods: {
    /** Set which issue is currently active */
    setActive(index: number) {
      this.activeIndex = index;
    },
    /** Handle for load-start stage */
    loadStart(_: any, __: any, done: any) {
      this.params.page++;
      this.getData().then(res => {
        this.receivedData = res.data;
        done();
      });
    },
    /** Handle for load-before-deactivate stage, always show user result in this stage, */
    loadBeforeDeactivate(_: any, __: any, done: any) {
      if (!this.receivedData.length) {
        this.ops.vuescroll.pushLoad.tips.beforeDeactive = 'No More Data';
      } else {
        this.ops.vuescroll.pushLoad.tips.beforeDeactive = `Load ${
          this.receivedData.length
        } datas Successfully!`;
      }
      setTimeout(() => {
        this.issues = this.issues.concat(this.receivedData);
        done();
      }, 1000);
    },
    /** Handle for refresh-start stage */
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
  }
});
</script>

<style>
.issue-container {
  margin: 0;
  min-height: 400px;
}
</style>

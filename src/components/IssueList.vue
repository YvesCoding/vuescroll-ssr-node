<template>
    <ul class="issue-container">
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
</template>
<script>
import issueItem from './issueItem.vue';
export default {
  props: ['issues'],
  components: {
    issueItem
  },
  data() {
    return {
      activeIndex: null
    };
  },
  methods: {
    setActive(index) {
      this.activeIndex = index;
    }
  }
};
</script>

<style>
.issue-container {
  margin: 0;
  min-height: 400px;
}
</style>

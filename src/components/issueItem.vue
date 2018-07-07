<template>
    <li class="issue-item" @mouseenter="enter">
        <div class="avatar">
            <img :src="issue.user.avatar_url" alt="" srcset="">
        </div>
        <div class="issue-content">
        <div class="issue-content-row">
           <span class="issue-title" :href="issue.html_url" target="_blank">{{issue.title}}</span>
            <div class="issue-comment-num">
                <svg class="octicon octicon-comment v-align-middle" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
                     <path fill-rule="evenodd" d="M14 1H2c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h2v3.5L7.5 11H14c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zm0 9H7l-2 2v-2H2V2h12v8z"></path>
                 </svg>
                 <span class="comments-number">{{issue.comments}}</span>
            </div>   
        </div>
        <div class="issue-content-row">
            <span class="issue-remark">
                #{{issue.number}} by {{issue.user.login}} was {{issue.state}} at {{issue.state == 'closed' ? issue.closed_at : issue.created_at}}
            </span>
        </div>
        </div>
    </li>
</template>

<script>
export default {
  props: ['issue', 'id'],
  created() {
    // console.log(this.issue);
  },
  methods: {
    enter() {
      this.$emit('enter', this.id);
    }
  }
};
</script>

<style>
.issue-item {
  padding: 5px;
  padding-right: 20px;
  border-top-color: transparent;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  margin-top: -1px;
  list-style-type: none;
  border-top: 1px solid #e1e4e8;
}
.issue-item.active {
  background-color: #f6f8fa;
}
.avatar img {
  width: 50px;
  min-height: 50px;
}

.issue-content-row {
  min-height: 25px;
  line-height: 25px;
  text-align: left;
}
.avatar {
  float: left;
  width: 10%;
}

.issue-title {
  color: #24292e;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
}

.issue-title:hover {
  color: #0366d6;
}

.issue-remark {
  font-size: 12px;
  color: #586069;
}
.issue-content {
  float: left;
  padding-left: 10px;
  width: 90%;
}

.issue-comment-num {
  float: right;
}
.issue-comment-num svg {
  vertical-align: middle;
}
.issue-item::after {
  content: '';
  display: table;
  clear: both;
}
.comments-number {
  font-weight: 600;
  font-size: 12px;
  margin-left: 3px;
}
</style>

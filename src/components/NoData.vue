<template>
    <li class="issue-item">
        <span class="no-data-tip">
            {{tip}}
        </span>
    </li>
</template>

<script>
export default {
    props: ['tip']
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
  text-align: center;
}
.no-data-tip {
  font-size: 14px;
  color: #586069;
}
</style>

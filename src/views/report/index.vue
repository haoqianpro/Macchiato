<template>
  <div class="report">
    <el-tabs type="border-card">
      <el-tab-pane label="User">报表页一</el-tab-pane>
      <el-tab-pane label="Config">报表页二</el-tab-pane>
      <el-tab-pane label="Role">报表页三</el-tab-pane>
      <el-tab-pane label="Task">报表页四</el-tab-pane>
    </el-tabs>
    <el-button type="primary" text class="add-btn" @click="createReport"
      >新建报表</el-button
    >
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const createReport = () => {
  router.push('/createReport')
}
</script>

<style scoped>
.report,
.el-tabs {
  height: 100%;
  position: relative;
}

.add-btn {
  position: absolute;
  top: 4px;
  right: 4px;
}
</style>

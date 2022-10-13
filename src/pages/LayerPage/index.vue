<template>
  <div class="layer">
    <el-tabs type="border-card">
      <el-tab-pane label="User">报表页一</el-tab-pane>
      <el-tab-pane label="Config">报表页二</el-tab-pane>
      <el-tab-pane label="Role">报表页三</el-tab-pane>
      <el-tab-pane label="Task">报表页四</el-tab-pane>
    </el-tabs>
    <el-button type="primary" link class="add-btn">新建报表</el-button>
  </div>
</template>

<style scoped>
.layer,
.el-tabs {
  height: 100%;
  position: relative;
}

.add-btn {
  position: absolute;
  top: 12px;
  right: 4px;
}
</style>

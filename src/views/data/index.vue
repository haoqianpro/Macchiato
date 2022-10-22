<template>
  <div class="data">
    <el-tabs type="border-card">
      <el-tab-pane label="表格">
        <data-form></data-form>
      </el-tab-pane>
      <el-tab-pane label="Config">YY数据</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DataForm from './components/DataForm.vue'

export default {
  name: 'DataComponent',
  components: {
    DataForm
  }
}
</script>

<style scoped>
.data,
.el-tabs {
  height: 100%;
}
</style>

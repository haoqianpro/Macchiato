<template>
  <div class="data">
    <el-tabs type="border-card">
      <el-tab-pane label="表格">
        <data-form @submit="save"></data-form>
      </el-tab-pane>
      <el-tab-pane label="图表">
        <show-chart :check-data="checkData"></show-chart>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DataForm from './components/DataForm.vue'
import ShowChart from './components/ShowChart.vue'

export default {
  name: 'DataComponent',
  components: {
    DataForm,
    ShowChart
  },
  data() {
    return {
      checkData: null
    }
  },
  methods: {
    save(val) {
      this.checkData = val
    }
  }
}
</script>

<style scoped>
.data,
.el-tabs {
  height: 100%;
}
</style>

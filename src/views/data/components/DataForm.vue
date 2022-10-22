<template>
  <!-- 上方搜索查询区域 -->
  <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="查询省份">
      <el-input v-model="search" placeholder="如： 北京" />
    </el-form-item>
  </el-form>
  <!-- 表格区域 -->
  <el-table
    :data="
      filterTableData.slice(
        (this.form.currentPage - 1) * this.form.pageSize,
        this.form.currentPage * this.form.pageSize
      )
    "
    style="width: 100%"
    :border="true"
  >
    <!-- 展开行 城市级别表格 -->
    <el-table-column type="expand">
      <template #default="props">
        <div>
          <el-table :data="props.row.children">
            <el-table-column prop="name" label="地区" sortable />
            <el-table-column
              prop="today.local_confirm_add"
              label="本土新增"
              sortable
            />
            <el-table-column prop="today.wzz_add" label="本土无症状" sortable />
            <el-table-column prop="today.confirm" label="确诊人数" sortable />
          </el-table>
        </div>
      </template>
    </el-table-column>
    <!-- 省份级别表格 -->
    <el-table-column prop="name" label="地区" sortable />
    <el-table-column prop="today.local_confirm_add" label="本土新增" sortable />
    <el-table-column prop="today.wzz_add" label="本土无症状" sortable />
    <el-table-column
      prop="today.abroad_confirm_add"
      label="境外输入"
      sortable
      v-if="true"
    />
    <el-table-column prop="today.confirm" label="确诊人数" sortable />
    <el-table-column prop="today.dead_add" label="死亡人数" sortable />
  </el-table>
  <!-- 分页功能 -->
  <div class="demo-pagination-block">
    <el-pagination
      :currentPage="this.form.currentPage"
      :page-size="10"
      :small="true"
      :background="true"
      layout="prev, pager, next, jumper"
      :total="filterTableData.length"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { getOnsInfo } from '../../../api/covid'
export default {
  name: 'DataForm',
  data() {
    return {
      // 疫情存储数据
      tableData: [],
      // 搜索框
      search: '',
      // 分页功能
      form: {
        // 当前页面
        currentPage: 1,
        // 每一页的条数
        pageSize: 10
      }
    }
  },
  methods: {
    // 加载疫情数据
    async loadCovidData() {
      const { data } = await getOnsInfo()
      console.log(data)
      this.tableData = data.diseaseh5Shelf.areaTree[0].children
      console.log(this.tableData)
    },
    // 更换页数
    handleCurrentChange(val) {
      this.form.currentPage = val
    },
    filterHandler() {
      console.log(1)
    }
  },
  created() {
    // 在created时加载数据
    this.loadCovidData()
  },
  computed: {
    // 筛选疫情数据
    filterTableData() {
      return this.tableData.filter(
        data => !this.search || data.name.includes(this.search)
      )
    }
  }
}
</script>

<style>
.el-table {
  margin-bottom: 20px;
}
</style>

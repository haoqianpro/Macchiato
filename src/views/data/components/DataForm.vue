<template>
  <!-- 上方搜索查询区域 -->
  <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="查询省份">
      <el-input v-model="search" placeholder="如： 北京" clearable />
    </el-form-item>
  </el-form>
  <!-- 传递数据开关 -->
  <el-button type="primary" @click="submit">传递</el-button>
  <!-- 自定义表头区域 -->
  <div style="margin-bottom: 10px">
    <span style="margin-right: 10px">选择查看的数据</span>
    <el-select
      v-model="value1"
      multiple
      placeholder="Select"
      style="width: 500px"
    >
      <el-option
        v-for="item in this.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
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
    row-key="name"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" :reserve-selection="true" />
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
    <el-table-column
      v-if="this.value1.includes('1')"
      prop="today.local_confirm_add"
      label="本土新增"
      sortable
    />
    <el-table-column
      v-if="this.value1.includes('2')"
      prop="today.wzz_add"
      label="本土无症状"
      sortable
    />
    <el-table-column
      v-if="this.value1.includes('3')"
      prop="today.abroad_confirm_add"
      label="境外输入"
      sortable
    />
    <el-table-column
      v-if="this.value1.includes('4')"
      prop="today.confirm"
      label="确诊人数"
      sortable
    />
    <el-table-column
      v-if="this.value1.includes('5')"
      prop="today.dead_add"
      label="死亡人数"
      sortable
    />
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
  emits: ['submit'],
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
      },
      // 选择的数据
      multipleSelection: [],
      // 自定义表头数据
      options: [
        {
          value: '1',
          label: '本土新增'
        },
        {
          value: '2',
          label: '本土无症状'
        },
        {
          value: '3',
          label: '境外输入'
        },
        {
          value: '4',
          label: '确诊人数'
        },
        {
          value: '5',
          label: '死亡人数'
        }
      ],
      // 显示的表头
      value1: ['1', '2', '3', '4', '5']
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
    },
    // 保存勾选的数据
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 将勾选的数据传输到父组件
    submit() {
      this.$emit('submit', this.multipleSelection)
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
.el-button--primary {
  margin-bottom: 10px;
}
.el-table {
  margin-bottom: 20px;
}
</style>

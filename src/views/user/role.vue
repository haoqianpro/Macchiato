<template>
  <div class="role-wrapper">
    <!-- 搜索表单 -->
    <div class="header-form">
      <el-form :inline="true" :model="queryForm" class="demo-form-inline">
        <el-form-item label="角色名：">
          <el-input v-model="queryForm.name" placeholder="角色名" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onQuery">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="add">新增</el-button>
    </div>

    <!-- 角色表格 -->
    <div class="main-table">
      <el-table
        :data="roleList"
        style="width: 100%"
        :header-cell-style="{
          backgroundColor: '#f0f0f4',
          textAlign: 'center',
          color: '#222'
        }"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column type="index" width="150" />
        <el-table-column prop="name" label="角色名" width="300" />
        <el-table-column prop="report" label="可查看报表" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="edit(scope.row)">修改</el-button>
            <el-button size="small" type="danger" @click="remove(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 修改和添加的对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogFlag ? '新增' : '修改'"
      :show-close="false"
    >
      <el-form label-width="100px" :model="roleForm">
        <el-form-item label="角色名">
          <el-input v-model="roleForm.name" />
        </el-form-item>
        <el-form-item label="可查看报表">
          <el-select
            v-model="roleForm.report"
            multiple
            placeholder="选择可查看报表"
          >
            <el-option
              v-for="(option, index) in reportList"
              :key="index"
              :label="option"
              :value="option"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="onSubmit"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { addRole, deleteRole, getRoleList, updateRole } from '@/api/role'
import { ElMessage } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'

/**
 * 响应式数据
 */
// 角色列表
const roleList = reactive([])

// 搜索表单
const queryForm = reactive({
  name: ''
})

// 角色数据表单
const roleForm = reactive({
  id: '',
  name: '',
  report: []
})

// 报表列表
const reportList = reactive(['全国疫情数据概览'])

// 对话框显示隐藏变量
const dialogVisible = ref(false)

// 修改还是新增,true是新增
const dialogFlag = ref(true)

/**
 * 异步操作
 */
// 角色列表请求
async function getRoles(name) {
  try {
    const queryStr = name ? `?name=${name}` : ''
    const result = await getRoleList(queryStr)
    if (result.success) {
      roleList.splice(0, roleList.length, ...result.data)
    } else {
      ElMessage.error(result.message)
    }
  } catch (err) {
    ElMessage.error(err.message)
  }
}

// 修改角色
async function alterRole() {
  try {
    const data = { ...roleForm, report: roleForm.report.join(',') }
    const result = await updateRole(data)
    if (result.success) {
      getRoles()
      ElMessage.success(result.message)
      dialogVisible.value = false
    } else {
      ElMessage.error(result.message)
    }
  } catch (err) {
    ElMessage.error(err.message)
  }
}

// 添加角色
async function createRole() {
  try {
    const data = { ...roleForm, report: roleForm.report.join(',') }
    const result = await addRole(data)
    if (result.success) {
      getRoles()
      ElMessage.success(result.message)
      dialogVisible.value = false
    } else {
      ElMessage.error(result.message)
    }
  } catch (err) {
    ElMessage.error(err.message)
  }
}

// 删除角色
async function removeRole(id) {
  try {
    const result = await deleteRole(id)
    if (result.success) {
      getRoles()
      ElMessage.success(result.message)
      dialogVisible.value = false
    } else {
      ElMessage.error(result.message)
    }
  } catch (err) {
    ElMessage.error(err.message)
  }
}
/**
 * 响应操作函数
 */
const add = () => {
  roleForm.id = ''
  roleForm.name = ''
  roleForm.report = []
  dialogFlag.value = true
  dialogVisible.value = true
}

const onQuery = () => {
  getRoles(queryForm.name)
}

const onReset = () => {
  queryForm.name = ''
  onQuery()
}

const edit = row => {
  roleForm.id = row.id
  roleForm.name = row.name
  roleForm.report = row.report.split(',')
  dialogFlag.value = false
  dialogVisible.value = true
}

const remove = id => {
  removeRole(id)
}

const onSubmit = () => {
  if (dialogFlag.value) {
    createRole()
  } else {
    alterRole()
  }
}
/**
 * 生命周期
 */
onMounted(() => {
  getRoles()
})
</script>

<style scoped>
.role-wrapper {
  padding: 20px;
}
.header-form {
  height: 60px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f4;
}
.main-table {
  margin-top: 35px;
}
.header-form .el-button {
  background-color: #598bff;
}
</style>

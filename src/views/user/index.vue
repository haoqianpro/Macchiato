<template>
  <div>
    <header class="header">
      <el-form :inline="true" :model="queryConfig" class="demo-form-inline">
        <el-form-item label="姓名: ">
          <el-input
            v-model="queryConfig.username"
            clearable
            @clear="clearName"
          />
        </el-form-item>
        <!-- <el-form-item label="手机号: ">
          <el-input v-model="queryConfig.phone"></el-input>
        </el-form-item>
        <el-form-item label="角色: ">
          <el-input v-model="queryConfig.role"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="onSubmitQuery">查询</el-button>
          <el-button plain @click="onClear">重置</el-button>
        </el-form-item>
      </el-form>
    </header>
    <div class="btn">
      <el-button @click="AddDialogShow" type="success">添加新用户</el-button>
    </div>
    <div class="mainTable">
      <el-table :data="tableData.data" style="width: 100%">
        <!-- <el-table-column label="用户Id" prop="id" /> -->
        <el-table-column label="用户名" prop="username" />
        <el-table-column label="密码" prop="password" />
        <el-table-column label="手机号" prop="phone" />
        <el-table-column label="角色" prop="role" />
        <el-table-column label="允许查看的报表" prop="report" />
        <el-table-column align="right">
          <template #default="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- <div class="pagination">
        <el-pagination
          medium
          layout="total, prev, pager, next"
          :total="50"
          :pager-count="5"
          class="mt-4"
        />
      </div> -->
    </div>
    <el-dialog v-model="deleteMessageDialog" title="提示" width="30%">
      <span>请确认是否要删除此条用户数据？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="deleteMessageDialog = false">取消</el-button>
          <el-button type="primary" @click="confirmDelete">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 添加用户/角色弹框 -->
    <el-dialog
      v-model="addOrEditshow"
      :title="isEdit ? '编辑用户' : '添加用户'"
    >
      <el-form :model="userData">
        <el-form-item label="用户名:">
          <el-input v-model="userData.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="userData.password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="头像地址:">
          <el-input v-model="userData.avatar_url" autocomplete="off" />
        </el-form-item>
        <el-form-item label="手机号:">
          <el-input v-model="userData.phone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="分配角色: ">
          <el-select v-model="userData.role" placeholder="请选择">
            <el-option
              v-for="(item, index) in newRoleList.list"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addOrEditshow = false">取消</el-button>
          <el-button type="primary" @click="handleAddSubmit">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue'
import {
  getUserInfo,
  getRole,
  addUser,
  deleteUserInfo,
  editUser
} from '../../api/user.js'
// import { ElMessage } from 'element-plus'

// Mounted钩子函数
onMounted(() => {
  getUserInfoList()
  getRoleList()
})
// 响应式数据
let queryConfig = reactive({
  username: '',
  phone: '',
  role: ''
})
let tableData = reactive({
  data: []
})
let addOrEditshow = ref(false) // 控制弹框显示与否
const userData = ref({
  username: '',
  password: '',
  avatar_url: '',
  phone: '',
  role: ''
})
const newRoleList = reactive({
  list: []
})
let deleteMessageDialog = ref(false)
let rowId = ref('')
let isEdit = ref(false)

// 点击查询事件
const onSubmitQuery = async () => {
  const res = await getUserInfo(queryConfig)
  console.log(res)
  if (res.code == 200) {
    tableData.data = res.data
  }
}
// 重置按钮事件
const onClear = () => {
  Object.keys(queryConfig).map(key => {
    delete queryConfig[key]
  })
  getUserInfoList()
}

// 编辑按钮事件
const handleEdit = async (index, row) => {
  addOrEditshow.value = true
  isEdit.value = true
  // console.log('输出改行数据', index, row)
  userData.value = row
}
// 删除按钮事件
const handleDelete = (index, row) => {
  console.log(index, row)
  rowId.value = row.id
  // console.log(rowId.value)
  deleteMessageDialog.value = true
}
// 删除按钮弹框的确认事件
const confirmDelete = async () => {
  // console.log(rowId.value)
  const res = await deleteUserInfo(rowId.value)
  console.log(res)
  if (res.code == 200) {
    getUserInfoList()
  }
  deleteMessageDialog.value = false
}
// 获取用户列表数据
const getUserInfoList = async () => {
  const res = await getUserInfo()
  // console.log(res)
  if (res.code == 200) {
    tableData.data = res.data
  }
  // console.log(tableData.data)
}
// 获取角色列表
const getRoleList = async () => {
  const res = await getRole()
  console.log('获取角色列表', res)
  let newArr = []
  if (res.code == 200) {
    res.data.forEach(el => {
      newArr.push(el.name)
    })
    newRoleList.list = newArr
    // console.log('输出最新数组', newRoleList.list)
  }
}

// 点击添加用户按钮弹出组件事件
const AddDialogShow = () => {
  addOrEditshow.value = true
  isEdit.value = false
}
// 添加/编辑用户中点提交按钮事件
const handleAddSubmit = async () => {
  // 新增用户：
  if (isEdit.value == false) {
    let res = await addUser(userData.value)
    if (res.code == 200) {
      // ElMessage.success('新增用户成功!')
      console.log('新增用户成功')
    }
  }
  // 编辑用户：
  if (isEdit.value == true) {
    const res = await editUser(userData.value)
    console.log(res)
    if (res.code == 200) {
      // ElMessage.success('编辑用户成功!')
      console.log('编辑用户成功')
    }
  }
  addOrEditshow.value = false
  userData.value = {
    username: '',
    password: '',
    avatar_url: '',
    phone: '',
    role: ''
  }
  // 更新用户列表
  getUserInfoList()
}
const clearName = () => {
  onClear()
}
</script>
<style scoped>
.header {
  margin-top: 10px;
}
.btn {
  padding-top: 10px;
  padding-bottom: 10px;
  border-top: 1px solid rgb(219, 218, 218);
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

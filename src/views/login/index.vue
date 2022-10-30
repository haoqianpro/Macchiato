<template>
  <div class="body">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h1>用户登录</h1>
        </div>
      </template>
      <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef">
        <el-form-item label="账号" prop="username">
          <el-input
            v-model="ruleForm.username"
            placeholder="请输入您的手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit(ruleFormRef)"
            >登录</el-button
          >
          <el-button @click="resetForm(rulesFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { login } from '@/api/user'
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const ruleFormRef = ref('')
const store = useStore()
// const state = store.state
const ruleForm = reactive({
  username: '',
  password: ''
})

const router = useRouter()

// 校验规则
const rules = {
  // 不得为空，必须为手机号格式
  username: [
    { required: true, message: '请输入您的手机号码', trigger: 'blur' },
    {
      pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
      message: '请输入正确的手机号码',
      trigger: 'blur'
    }
  ],
  // 不得为空
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

// 重置表单
const resetForm = () => {
  ruleFormRef.value.resetFields()
}

// 登陆成功跳转 错误提示
const submit = () => {
  ruleFormRef.value.validate(async (valid, fields) => {
    if (valid) {
      let res = await login(ruleForm.username, ruleForm.password)
      console.log(res)
      if (res.message == '密码错误') {
        ElMessage('密码错误')
        console.log(res)
        console.log(ruleForm.username, ruleForm.password)
      } else if (res.message == '用户不存在') {
        ElMessage('用户不存在')
      } else {
        // 将token和用户存储到vuex中并跳转至首页
        store.commit('SET_TOKEN', res.data.token)
        store.commit('SET_USER', res.data.user)
        router.push('/index')
      }
    } else {
      console.log('error', fields)
    }
  })
}
</script>

<style>
.body {
  width: 100%;
  background: url(./loginBg.jpg) no-repeat;
}

.box-card {
  height: 400px;
  width: 450px;
  margin: 100px auto 0;
  background-color: rgba(123, 163, 224, 0.5);
  border-radius: 20px;
  color: #000000;
}

.el-form-item__label {
  color: #000000;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
</style>

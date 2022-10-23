<template>
  <div class="body">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h1>登录</h1>
          <el-button class="button" text>注册</el-button>
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
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

// const username = ref('')
// const password = ref('')
const ruleFormRef = ref('')
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

// const submit = () => {
//   login(ruleForm.username.value, ruleForm.password.value).then(res => {
//     if (res.status === 'ok') {
//       router.push('/index')
//     } else {
//       alert(res.msg)
//     }
//   })
// }

// 登陆成功跳转
const submit = ruleForm => {
  ruleForm.validate(async (valid, fields) => {
    if (valid) {
      console.log('success')
      let res = await login(ruleForm)
      console.log(res, 'ceshi')
      router.push('/index')
    } else {
      console.log('error', fields)
    }
  })
}
</script>

<style scoped>
.body {
  width: 100%;
  background-color: #ffffff;
}

.box-card {
  height: 400px;
  width: 450px;
  margin: 100px auto 0;
  background-color: #ffffff;
  box-shadow: 10px 10px 10px #d9ecff, -10px -10px 10px #ecf5ff;
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

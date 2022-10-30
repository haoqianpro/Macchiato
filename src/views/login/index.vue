<template>
  <div class="body">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h2>欢迎</h2>
        </div>
      </template>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleFormRef"
        :hide-required-asterisk="true"
      >
        <el-form-item label="账号" prop="username">
          <el-input
            v-model="ruleForm.username"
            placeholder="请输入您的手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item class="confirm-item">
          <el-button
            type="primary"
            @click="submit(ruleFormRef)"
            class="confirm-btn"
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="reset-item">
          <el-button text @click="resetForm(rulesFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { login } from '@/api/user'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
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
    { required: true, message: '请输入您的手机号码', trigger: 'change' },
    {
      pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
      message: '请输入正确的手机号码',
      trigger: 'blur'
    }
  ],
  // 不得为空
  password: [{ required: true, message: '请输入密码', trigger: 'change' }]
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

<style scoped>
.body {
  width: 100%;
  height: 100%;
  display: flex;
  padding-bottom: 20vh;
  padding-right: 15vw;
  justify-content: flex-end;
  align-items: flex-end;
  background: url('@/assets/bg.png') center top no-repeat;
  background-size: cover;
  /* background: url(./loginBg.jpg) no-repeat; */
}

.box-card {
  /* height: 400px; */
  width: 450px;
  /* margin: 100px auto 0; */
  padding: 25px 0 15px;
  /* background-color: rgba(123, 163, 224, 0.5); */
  background-color: #fff;
  border-radius: 2px;
  color: #000000;
}
.el-card {
  box-shadow: 4px 3px 0 0 rgba(0, 0, 0, 0.9);
}
.el-form-item__label {
  color: #000000;
}

.card-header {
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box-card >>> .el-card__header {
  padding: 0;
  border-bottom: none;
}
.card-header h2 {
  font-weight: normal;
}
.el-form-item {
  height: 65px;
  align-items: center;
}
.el-input {
  height: 45px;
}
.confirm-btn {
  width: 100%;
  height: 40px;
  background-color: #303030;
  border: none;
  border-radius: 0;
  color: #fff;
}
.reset-item >>> .el-form-item__content {
  justify-content: center;
}
.reset-item {
  margin-bottom: 0;
}
.confirm-item,
.reset-item {
  height: 45px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
</style>

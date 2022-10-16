<template>
  <div class="login">
    <el-form>
      <el-form-item label="昵称">
        <el-input v-model="username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="password"></el-input>
      </el-form-item>
      <el-button type="primary" @click="signIn">登录</el-button>
    </el-form>
  </div>
</template>

<script setup>
import { login } from '@/api/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')

const router = useRouter()

const signIn = () => {
  login(username.value, password.value).then(res => {
    if (res.status === 'ok') {
      router.push('/index')
    } else {
      alert(res.msg)
    }
  })
}
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<template>
  <div class="login">
    <el-form>
      <el-form-item label="昵称">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password"></el-input>
      </el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
    </el-form>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const login = () => {
  router.push('/index')
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

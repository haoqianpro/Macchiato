<template>
  <div class="nav-header">
    <div class="logo">Macchiato</div>
    <div class="avatar">
      <el-dropdown @command="handleCommand">
        <img
          :src="store.state.user?.avatar_url || defaultAvatar"
          alt="avatar"
        />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>{{
              store.state.user?.username
            }}</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import defaultAvatar from '../assets/default-avatar.gif'

const store = useStore()
const router = useRouter()

const handleCommand = command => {
  if (command === 'logout') {
    ElMessage.success('退出登录成功,请重新登录')
    router.push('/login')
    store.dispatch('LOGOUT')
  }
}
</script>

<style scoped>
.nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  /* padding: 0 10px; */
  background-color: #fff;
  /* box-shadow: 0 0 4px rgba(0, 0, 0, 0.2); */
  /* border-bottom: 1px solid #ccc; */
}
.avatar {
  width: 40px;
  height: 40px;
}
.avatar img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.logo {
  width: 199px;
  height: 100%;
  background-color: #1e1e2d;
  font-size: 20px;
  line-height: 60px;
  color: #fff;
  text-align: center;
  font-family: 'Courier New', Courier, monospace;
}
</style>

<template>
  <div class="nav-header">
    <div class="mode">
      <el-icon><DArrowLeft /></el-icon>
      <el-button text @click="changeMode">{{ modeName }}</el-button>
    </div>
    <div class="avatar">
      <img :src="defaultAvatar" alt="avatar" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import defaultAvatar from '../assets/default-avatar.gif'
const mode = ref(0)
const modeName = computed(() => (mode.value === 0 ? '去后台' : '去前台'))
const router = useRouter()
const changeMode = () => {
  if (mode.value === 0) {
    mode.value = 1
    router.push('/admin')
  } else {
    mode.value = 0
    router.push('/')
  }
}
</script>

<style scoped>
.nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 10px;
  background-color: #fff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid #ccc;
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

.mode {
  display: flex;
  align-items: center;
}
</style>

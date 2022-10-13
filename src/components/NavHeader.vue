<template>
  <div class="nav-header">
    <div class="avatar">
      <el-dropdown>
        <img :src="defaultAvatar" alt="avatar" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import defaultAvatar from '../assets/default-avatar.gif'
</script>

<style scoped>
.nav-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 59px;
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
</style>

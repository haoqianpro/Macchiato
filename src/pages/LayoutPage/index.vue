<template>
  <el-container>
    <el-header>
      <nav-header />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          router
          class="el-menu-vertical"
          :default-active="defaultActiveIndex"
        >
          <el-menu-item
            v-for="item in menuItemList"
            :key="item.path"
            :index="item.path"
            >{{ item.name }}</el-menu-item
          >
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import NavHeader from '../../components/NavHeader.vue'

const menuItemList = reactive([
  {
    path: '/data',
    name: '数据管理'
  },
  {
    path: '/user',
    name: '用户管理'
  },
  {
    path: '/layer',
    name: '报表页管理'
  }
])
const route = useRoute()

const defaultActiveIndex = ref(route.path)
</script>

<style scoped>
.el-header {
  border-bottom: 1px solid #dcdcdc;
}

.el-menu-vertical {
  width: 200px;
  height: 100%;
}
</style>

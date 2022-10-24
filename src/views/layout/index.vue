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
          <el-sub-menu
            v-for="item in menuItemList"
            :key="item.path"
            :index="item.path"
          >
            <template #title>
              <el-icon><component :is="item.icon" /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item
              v-for="menu in item.children"
              :key="menu.path"
              :index="menu.path"
              >{{ menu.name }}</el-menu-item
            >
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-main>
        <div class="wrapper">
          <router-view></router-view>
        </div>
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
    icon: 'Grid',
    path: '/sub-menu1',
    name: '数据',
    children: [
      {
        path: '/data',
        name: '全国疫情数据'
      }
    ]
  },
  {
    icon: 'Setting',
    path: '/sub-menu2',
    name: '管理',
    children: [
      {
        path: '/user',
        name: '用户管理'
      },
      {
        path: '/role',
        name: '角色管理'
      }
    ]
  },
  {
    icon: 'Memo',
    path: '/sub-menu3',
    name: '报表',
    children: [
      {
        path: '/countrywide-overview',
        name: '全国疫情数据概览'
      }
    ]
  }
])
const route = useRoute()

const defaultActiveIndex = ref(route.path)
</script>

<style scoped>
.el-header {
  /* border-bottom: 1px solid #dcdcdc; */
  padding-left: 0;
}

.el-menu-vertical {
  width: 200px;
  height: 100%;
}

.el-menu {
  padding-top: 16px;
  background-color: #1e1e2d;
}
.el-menu >>> .el-menu-item,
.el-menu >>> .el-sub-menu__title {
  height: 40px;
  font-size: 12px;
  color: #9899ac;
  background-color: #1e1e2d;
}
.el-menu >>> .el-sub-menu__title:hover {
  background-color: #1b1b28;
  color: #fff;
}
.el-menu-item {
  background-color: #1e1e2d;
}
.el-menu-item:hover {
  background-color: #1b1b28;
  color: #fff;
}
.el-menu-item.is-active {
  color: #fff;
}
.el-main {
  background-color: rgba(245, 248, 250, 0.8);
  /* background-color: #fff;
  background-clip: content-box; */
}
.wrapper {
  height: calc(100vh - 100px);
  padding: 5px 10px 5px 5px;
  background-color: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  overflow-y: overlay;
}
.wrapper::-webkit-scrollbar {
  width: 10px;
}
.wrapper::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #cfcfcf;
}
.el-sub-menu .el-menu-item {
  min-width: 199px;
}
</style>

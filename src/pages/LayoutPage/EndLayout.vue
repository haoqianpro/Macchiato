<template>
  <div class="layout">
    <div class="nav">
      <el-menu router class="el-menu-vertical">
        <el-sub-menu index="/admin/fundCode">
          <template #title>
            <span>数据管理</span>
          </template>
          <el-menu-item index="/admin/fundCode">
            <span>基金代码</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/admin/user">
          <span>用户管理</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  width: 100vw;
  height: 100%;
}

.main {
  flex: 1;
}
.el-menu-vertical {
  width: 200px;
  height: 100%;
}
</style>

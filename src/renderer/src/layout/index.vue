<script setup lang="ts">
import Main from './main/index.vue'
import Sidebar from './sidebar/index.vue'
</script>

<template>
  <div class="layout-container">
    <div class="sidebar">
      <Sidebar />
    </div>
    <div class="main">
      <Main />
    </div>
  </div>
</template>

<style lang="less" scoped>
.layout-container {
  display: flex;
  width: 100vw;
  height: 100vh;

  .sidebar {
    width: 80px;
    height: 100vh;
    background-color: gray;
  }

  .main {
    height: 100vh;
    flex: 1;
  }
}
</style>

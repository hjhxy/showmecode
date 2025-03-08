<script setup lang="ts">
import Main from './Main/index.vue'
import Sidebar from './SideBar/index.vue'
import HeaderBar from './Headerbar/index.vue'
</script>

<template>
  <div class="layout-container">
    <div class="sidebar">
      <Sidebar />
    </div>
    <div class="container">
      <div class="headerbar">
        <HeaderBar />
      </div>
      <div class="main">
        <Main />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@media (max-width: 710px) {
  .sidebar {
    display: none;
  }
}

.layout-container {
  display: flex;
  width: 100vw;
  height: 100vh;

  .sidebar,
  .container {
    background-color: #1a1a1a;
    color: white;
    min-height: 600px;
  }

  .sidebar {
    width: 60px;
    min-width: 60px;
    height: 100vh;
    box-shadow: 3px 0px 2px rgba(0, 0, 0, 0.5);
    z-index: 1;
  }

  .container {
    flex: 1;
    min-width: 650px;
    display: flex;
    flex-direction: column;

    .headerbar {
      box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.5);
      height: 60px;
    }

    .main {
      height: 100vh;
      flex: 1;
    }
  }
}
</style>

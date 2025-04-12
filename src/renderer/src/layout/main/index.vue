<script setup lang="ts"></script>

<template>
  <div class="main-container">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<style lang="less" scoped>
.main-container {
  height: 100%;
}
</style>

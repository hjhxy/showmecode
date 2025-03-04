<script setup lang="ts">
import router from '@renderer/routes'
import { ref, watch } from 'vue'

const useRouteModule = () => {
  const chooseRoute = ref('/')
  watch(router.currentRoute, (newval, oldval) => {
    console.log(newval, oldval)
    chooseRoute.value = newval.path
  })
  const routeItems = [
    {
      path: '/',
      name: '首页'
    },
    {
      path: '/questions',
      name: '答题区'
    },
    {
      path: '/file',
      name: '文件'
    }
  ]

  return {
    routeItems
  }
}
const useUtlsModule = () => {
  const utilItems = [
    {
      name: '聊天'
    },
    {
      name: '设置'
    },
    {
      name: '反馈'
    }
  ]

  return {
    utilItems
  }
}

const { routeItems } = useRouteModule()
const { utilItems } = useUtlsModule()
</script>

<template>
  <div class="sidebar-container">
    <div class="routes">
      <router-link v-for="item in routeItems" :key="item.path" class="items" :to="item.path">{{
        item.name
      }}</router-link>
    </div>

    <div class="utils">
      <div v-for="item in utilItems" :key="item.name" class="items chat">{{ item.name }}</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.sidebar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 10px;

  .routes,
  .utils {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .items {
      width: 100%;
      padding: 10px 0px;
      display: flex;
      flex-direction: column;
      align-self: center;
      justify-content: center;
      text-align: center;
      transition: all 0.2s;
      border-radius: 5px;

      &:hover {
        cursor: pointer;
        background-color: red;
      }
    }
  }

  .routes {
    .items {
      margin-bottom: 5px;
    }
  }

  .utils {
    .items {
      margin-top: 5px;
    }
  }
}
</style>

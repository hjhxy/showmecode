<script setup lang="ts">
import router from '@renderer/routes'
import { ref, watch } from 'vue'

const useRouteModule = () => {
  const chooseRoute = ref('/')
  watch(
    router.currentRoute,
    (newval) => {
      chooseRoute.value = newval.path
    },
    {
      immediate: true,
      deep: true
    }
  )
  const routeItems = [
    {
      path: '/',
      name: '首页'
    },
    {
      path: '/questions',
      name: '题目'
    },
    {
      path: '/file',
      name: '文件'
    },
    {
      path: '/answer',
      name: '答题区'
    }
  ]

  return {
    routeItems,
    chooseRoute
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
  const chooseUtil = ref('')

  const changeUtil = (name: string) => {
    if (chooseUtil.value == name) {
      return (chooseUtil.value = '')
    }
    chooseUtil.value = name
  }

  return {
    utilItems,
    chooseUtil,
    changeUtil
  }
}

const { routeItems, chooseRoute } = useRouteModule()
const { utilItems, chooseUtil, changeUtil } = useUtlsModule()
</script>

<template>
  <div class="sidebar-container no-select">
    <div class="routes">
      <router-link
        v-for="item in routeItems"
        :key="item.path"
        :class="['items', item.path == chooseRoute ? 'chooseItem' : '']"
        :to="item.path"
        >{{ item.name }}</router-link
      >
    </div>

    <div class="utils">
      <div
        v-for="item in utilItems"
        :key="item.name"
        :class="['items', item.name == chooseUtil ? 'chooseItem' : '']"
        @click="changeUtil(item.name)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.chooseItem {
  background-color: red;
}

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
      font-size: 13px;

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

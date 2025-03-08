<script setup lang="ts">
import router from '@renderer/routes'
import { ref, watch } from 'vue'
// import { getFilePath } from '@renderer/utils/filepath'
import shouyeImg from '@resources/icons/sidebar/jia.png'
import shouyeActiveImg from '@resources/icons/sidebar/jia-active.png'
import timuImg from '@resources/icons/sidebar/timu.png'
import timuActiveImg from '@resources/icons/sidebar/timu-active.png'
import wenjianImg from '@resources/icons/sidebar/wenjian.png'
import wenjianActiveImg from '@resources/icons/sidebar/wenjian-active.png'
import datiImg from '@resources/icons/sidebar/dati.png'
import datiActiveImg from '@resources/icons/sidebar/dati-active.png'
import liaotianImg from '@resources/icons/sidebar/liaotian.png'
import liaotianActiveImg from '@resources/icons/sidebar/liaotian-active.png'
import shezhiImg from '@resources/icons/sidebar/shezhi.png'
import shezhiActiveImg from '@resources/icons/sidebar/shezhi-active.png'
import fankuiImg from '@resources/icons/sidebar/fankui.png'
import fankuiActiveImg from '@resources/icons/sidebar/fankui-active.png'

// const filepath = getFilePath()

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
      name: '', //首页
      imgpath: shouyeImg,
      imgpathActive: shouyeActiveImg
    },
    {
      path: '/questions',
      name: '题目',
      imgpath: timuImg,
      imgpathActive: timuActiveImg
    },
    {
      path: '/file',
      name: '文件',
      imgpath: wenjianImg,
      imgpathActive: wenjianActiveImg
    },
    {
      path: '/answer',
      name: '答题区',
      imgpath: datiImg,
      imgpathActive: datiActiveImg
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
      name: '聊天',
      imgpath: liaotianImg,
      imgpathActive: liaotianActiveImg
    },
    {
      name: '设置',
      imgpath: shezhiImg,
      imgpathActive: shezhiActiveImg
    },
    {
      name: '反馈',
      imgpath: fankuiImg,
      imgpathActive: fankuiActiveImg
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
      >
        <img
          class="icon"
          :src="item.path == chooseRoute ? item.imgpathActive : item.imgpath"
          alt="icons"
        />
        <div v-if="item.name" class="name">
          {{ item.name }}
        </div>
      </router-link>
    </div>

    <div class="utils">
      <div
        v-for="item in utilItems"
        :key="item.name"
        :class="['items', item.name == chooseUtil ? 'chooseItem' : '']"
        @click="changeUtil(item.name)"
      >
        <img
          class="icon"
          :src="item.name == chooseUtil ? item.imgpathActive : item.imgpath"
          alt="icons"
        />
        <div class="name">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.chooseItem {
  background-color: #090b0d;
}

.sidebar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 10px 5px;

  .routes,
  .utils {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .items {
      width: 100%;
      // padding: 10px 0px;
      height: 55px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      text-align: center;
      transition: all 0.2s;
      border-radius: 5px;
      font-size: 13px;

      &:hover {
        cursor: pointer;
        background-color: #090b0d;
      }

      .icon {
        width: 22px;
        height: 22px;
      }

      .name {
        font-size: 11px;
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

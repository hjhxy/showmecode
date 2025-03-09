<script setup lang="ts">
import { CaretRight, CaretBottom, Connection, AlarmClock, Avatar } from '@element-plus/icons-vue'
import { ref } from 'vue'

const useRun = () => {
  const isRuning = ref(false)

  const startRun = () => {
    isRuning.value = true
    setTimeout(() => {
      isRuning.value = false
    }, 2000)
  }

  return {
    isRuning,
    startRun
  }
}

const usePeopleList = () => {
  const peopleList = ref([
    {
      id: 1,
      name: '曾小雨'
    },
    {
      id: 2,
      name: '张三'
    },
    {
      id: 3,
      name: '李四'
    },
    {
      id: 4,
      name: '王五'
    }
  ])
  return {
    peopleList
  }
}

const { isRuning, startRun } = useRun()
const { peopleList } = usePeopleList()
</script>

<template>
  <div class="headerbar-container">
    <div class="lefttitle">曾小雨的面试</div>
    <div class="center">
      <el-button color="#d41511" :loading="isRuning" @click="startRun">
        <el-icon v-show="!isRuning" style="font-size: 18px"><CaretRight /></el-icon>
        <span>运行</span>
      </el-button>
      <el-button-group style="margin: 0px 20px">
        <el-button color="#3b3b3b">
          <span style="margin-right: 5px">React</span>
          <el-icon><CaretBottom /></el-icon>
        </el-button>
        <el-button color="#3b3b3b">
          <el-icon><Connection /></el-icon>
        </el-button>
      </el-button-group>
      <el-button color="#3b3b3b">选择题目</el-button>
    </div>
    <div class="right">
      <div class="clock">
        <el-button color="#3b3b3b">
          <el-icon><AlarmClock /></el-icon>
        </el-button>
      </div>
      <div class="peoplelist no-select">
        <div v-for="item in peopleList.slice(0, 2)" :key="item.id" class="people">
          <span v-if="item.name">{{ item.name.slice(0, 1) }}</span>
          <el-icon v-else><Avatar /></el-icon>
        </div>
        <div v-if="peopleList.length > 2" class="people">+{{ peopleList.length - 2 }}</div>
      </div>
      <div class="invate">
        <el-button color="#3b3b3b">
          <el-icon><Avatar /></el-icon>
          <span>邀请面试</span>
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.headerbar-container {
  height: 100%;
  padding: 10px;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .lefttitle {
    min-width: 100px;
  }

  .center {
    min-width: 350px;
    .el-button {
    }
  }

  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 350px;

    .peoplelist,
    .invate {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .peoplelist {
      .people {
        border-radius: 20px;
        background-color: #5f60f9;
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;

        &:hover {
          cursor: pointer;
        }

        &:nth-child(n + 2) {
          margin-left: 10px;
        }
      }
    }

    & > *:nth-child(n + 2):before {
      content: '';
      border-left: 1px solid #9d9d9d;
      margin: 0px 12px;
      height: 19px;
      width: 0px;
    }
  }
}
</style>

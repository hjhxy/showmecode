<script setup lang="ts">
import { CaretRight, CaretBottom, Connection } from '@element-plus/icons-vue'
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

const { isRuning, startRun } = useRun()
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
    <div class="right"></div>
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
  }

  .center {
    .el-button {
    }
  }

  .right {}
}
</style>

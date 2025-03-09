<script setup lang="ts">
import { CaretTop, VideoCamera, Avatar, Postcard, Document } from '@element-plus/icons-vue'
</script>

<template>
  <div class="footerbar-container">
    <div class="lefttitle">
      <div class="clock">
        <el-button-group style="margin: 0px 20px">
          <el-button color="#3b3b3b">
            <el-icon><VideoCamera /></el-icon>
            <span style="margin-right: 5px">发起通话</span>
          </el-button>
          <el-button color="#3b3b3b">
            <el-icon><CaretTop /></el-icon>
          </el-button>
        </el-button-group>
      </div>
    </div>
    <div class="center">
      <el-button color="#3b3b3b">
        <el-icon><Postcard /></el-icon>
        <span>简历信息</span>
      </el-button>
      <el-button color="#3b3b3b">
        <el-icon><Document /></el-icon>
        <span>面试记录</span>
      </el-button>
    </div>
    <div class="right">
      <div class="invate">
        <el-button color="rgb(255, 95, 95)" plain style="border: none; background-color: #3b3b3b">
          <span>结束面试</span>
        </el-button>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.footerbar-container {
  padding: 10px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgb(255, 95, 95);
}
</style>

<script setup lang="ts">
import { IFile } from '@renderer/types/filetree'

const props = defineProps<{
  filetreeData: IFile[]
}>()
const { filetreeData } = props
</script>
<template>
  <div class="container">
    <div v-for="item in filetreeData" :key="item.id" class="file-item">
      <span class="file-item-name"> <el-icon />{{ item.name }} </span>
      <div v-if="item.children" class="file-item-child">
        <div class="child-placeholder"></div>
        <FileTree :filetree-data="item.children" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  font-size: 14px;
  color: #c2c2c2;
  display: flex;
  flex-direction: column;
  width: 100%;
  user-select: none;
  overflow-y: auto;

  .file-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;

    .file-item-name {
      padding: 3px 0;
      cursor: pointer;
      transition: all 0.3s ease;
      overflow: hidden;
      text-overflow: ellipsis;

      &:hover {
        color: white;
        background-color: #626262;

        .child-placeholder {
          background-color: red;
        }
      }
    }

    .file-item-child {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      .child-placeholder {
        width: 10px;
        height: 100%;
        background-color: #626262;
      }
    }
  }
}
</style>

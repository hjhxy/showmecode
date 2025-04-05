<script setup lang="ts">
import { ref } from 'vue'
import { IFileTree } from '@renderer/types/filetree'
import { ArrowRightBold, ArrowDownBold } from '@element-plus/icons-vue'
import { useFileStore } from '@renderer/store/file'

const props = defineProps<{
  filetreeData: IFileTree[]
  paddingLeft: number
  paddingStep: number
}>()

const isOpen = ref<Record<string | number, boolean>>({})
const fileStore = useFileStore()

const handleOpen = (item: IFileTree) => {
  if (item.type === 'folder') {
    isOpen.value[item.id] = !isOpen.value[item.id]
  } else {
    fileStore.setCurrentEditFile(item.id)
  }
}
</script>

<template>
  <div class="container">
    <div v-for="item in props.filetreeData" :key="item.id" class="file-item">
      <div
        class="file-item-name"
        :style="{ paddingLeft: `${props.paddingLeft}px` }"
        @click="handleOpen(item)"
      >
        <el-icon v-if="item.type === 'folder'" :style="{ color: '#c2c2c2' }">
          <ArrowDownBold v-if="isOpen[item.id]" />
          <ArrowRightBold v-else />
        </el-icon>
        <span class="file-item-name-text">{{ item.name }}</span>
      </div>
      <div v-if="item.children" class="file-item-child">
        <FileTree
          v-show="isOpen[item.id]"
          :filetree-data="item.children"
          :padding-left="props.paddingLeft + props.paddingStep"
          :padding-step="props.paddingStep"
        />
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
  transition: all 0.3s ease;

  .file-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;

    .file-item-name {
      display: flex;
      align-items: center;
      padding: 3px 0;
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;

      .file-item-name-text {
        flex: 1;
        padding-left: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      &:hover {
        color: white;
        background-color: #626262;
      }
    }

    .file-item-child {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
  }
}
</style>

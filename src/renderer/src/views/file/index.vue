<script setup lang="ts">
import { ref } from 'vue'
import Drag from '@renderer/components/Drag.vue'
import FileTree from './components/FileTree.vue'
import CodeEdit from './components/CodeEdit.vue'
import Terminal from './components/Terminal.vue'
import { useFileStore } from '@renderer/store/file'
import type { IFileTree } from '@renderer/types/filetree'

const useDrag = () => {
  const $filetree = ref<HTMLElement | null>(null)
  const $codeedit = ref<HTMLElement | null>(null)
  const $terminal = ref<HTMLElement | null>(null)
  const $filecontainer = ref<HTMLElement | null>(null)
  const $leftcontainer = ref<HTMLElement | null>(null)

  return {
    $filetree,
    $codeedit,
    $terminal,
    $filecontainer,
    $leftcontainer
  }
}

const useFileTree = () => {
  const fileStore = useFileStore()
  const filetreeData = ref<IFileTree[]>([])
  fileStore.getFileData().then(() => {
    filetreeData.value = fileStore.filetreeData
  })

  return {
    filetreeData
  }
}

const { $filetree, $codeedit, $terminal, $filecontainer, $leftcontainer } = useDrag()
const { filetreeData } = useFileTree()
</script>

<template>
  <div ref="$filecontainer" class="file-container">
    <div ref="$leftcontainer" class="left-container">
      <div ref="$filetree" class="file-tree">
        <FileTree :filetree-data="filetreeData" :padding-left="5" :padding-step="8" />
      </div>
      <Drag :left-dom="$filetree" :right-dom="$codeedit" :container="$leftcontainer" />
      <div ref="$codeedit" class="code-edit">
        <CodeEdit />
      </div>
    </div>
    <Drag :left-dom="$leftcontainer" :right-dom="$terminal" :container="$filecontainer" />
    <div ref="$terminal" class="terminal">
      <Terminal />
    </div>
  </div>
</template>

<style lang="less" scoped>
.file-container {
  display: flex;
  flex-direction: row;
  height: 100%;
  // 定义变量

  .left-container {
    flex: 1;
    display: flex;
    flex-direction: row;
    min-width: 200px;

    .file-tree {
      width: 150px;
      min-width: 100px;
    }

    .code-edit {
      flex: 1;
      min-width: 100px;
    }
  }

  .terminal {
    width: 200px;
    min-width: 100px;
  }
}
</style>

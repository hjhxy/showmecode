<script setup lang="ts">
import { ref } from 'vue'
import Drag from '@renderer/components/Drag.vue'

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

const { $filetree, $codeedit, $terminal, $filecontainer, $leftcontainer } = useDrag()
</script>

<template>
  <div ref="$filecontainer" class="file-container">
    <div ref="$leftcontainer" class="left-container">
      <div ref="$filetree" class="file-tree">文件树</div>
      <Drag :left-dom="$filetree" :right-dom="$codeedit" :container="$leftcontainer" />
      <div ref="$codeedit" class="code-edit">文件编辑区</div>
    </div>
    <Drag :left-dom="$leftcontainer" :right-dom="$terminal" :container="$filecontainer" />
    <div ref="$terminal" class="terminal">执行终端</div>
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
      padding: 8px;
      width: 150px;
      min-width: 100px;
    }

    .code-edit {
      padding: 8px;
      flex: 1;
      min-width: 100px;
    }
  }

  .terminal {
    padding: 8px;
    width: 200px;
    min-width: 100px;
  }
}
</style>

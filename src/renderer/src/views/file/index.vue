<script setup lang="ts">
import { ref } from 'vue'
import Drag from '@renderer/components/Drag.vue'

const useDrag = () => {
  const $filetree = ref<HTMLElement | null>(null)
  const $codeedit = ref<HTMLElement | null>(null)
  const $terminal = ref<HTMLElement | null>(null)

  return {
    $filetree,
    $codeedit,
    $terminal
  }
}

const { $filetree, $codeedit, $terminal } = useDrag()
</script>

<template>
  <div class="file-container">
    <div ref="$filetree" class="file-tree">文件树</div>
    <Drag :left-dom="$filetree" :right-dom="$codeedit" />
    <div ref="$codeedit" class="code-edit">文件编辑区</div>
    <Drag :left-dom="$codeedit" :right-dom="$terminal" />
    <div ref="$terminal" class="terminal">执行终端</div>
  </div>
</template>

<style lang="less" scoped>
.file-container {
  display: flex;
  height: 100%;

  .file-tree,
  .code-edit,
  .terminal {
    padding: 8px;
  }

  .left {
    min-width: 500px;
    display: flex;
    .file-tree {
      width: 200px;
    }

    .code-edit {
      flex: 2;
      min-width: 200px;
    }
  }

  .terminal {
    flex: 1;
    min-width: 200px;
  }
}
</style>

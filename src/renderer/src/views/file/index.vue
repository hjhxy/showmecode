<script setup lang="ts">
import { onMounted, ref } from 'vue'

const useDrag = () => {
  const $drag1 = ref<HTMLElement | null>(null)
  const $drag2 = ref<HTMLElement | null>(null)
  const $filetree = ref<HTMLElement | null>(null)
  const $codeedit = ref<HTMLElement | null>(null)
  const $terminal = ref<HTMLElement | null>(null)

  const startx = ref(0)
  onMounted(() => {
    $drag1.value?.addEventListener('mousedown', onMouseDown)
    startx.value = $drag1.value?.getBoundingClientRect().left || 0
  })

  const onMouseDown = () => {
    console.log('start')
    $drag1.value?.addEventListener('mousemove', onMouseMove)
  }

  const onMouseMove = (e: MouseEvent) => {
    console.log('move', startx.value, e.clientX)
    // $filetree.value!.style.width = `${e.clientX - startx.value}px`
    $drag1.value?.addEventListener('mouseup', onMouseUp)
  }

  const onMouseUp = () => {
    console.log('end')
    $drag1.value?.removeEventListener('mousemove', onMouseMove)
    $drag1.value?.removeEventListener('mouseup', onMouseUp)
  }

  return {
    $drag1,
    $drag2,
    $filetree,
    $codeedit,
    $terminal
  }
}

const { $drag1, $drag2 } = useDrag()
</script>

<template>
  <div class="file-container">
    <div ref="$filetree" class="file-tree">文件树</div>
    <div ref="$drag1" class="drag"></div>
    <div ref="$codeedit" class="code-edit">文件编辑区</div>
    <div ref="$drag2" class="drag"></div>
    <div ref="$terminal" class="terminal">执行终端</div>
  </div>
</template>

<style lang="less" scoped>
.drag {
  height: 100%;
  width: 10px;
  background-color: #0f0f0f;

  &:hover {
    cursor: pointer;
  }
}
.file-container {
  display: flex;
  height: 100%;
  .file-tree,
  .code-edit,
  .terminal {
    padding: 8px;
  }

  .file-tree {
  }

  .code-edit {
  }

  .terminal {
  }
}
</style>

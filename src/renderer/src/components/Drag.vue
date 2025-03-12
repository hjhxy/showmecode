<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { Operation } from '@element-plus/icons-vue'
import { watch } from 'fs'
const $drag = ref<HTMLElement | null>(null)
const props = defineProps<{
  leftDom: HTMLElement | null
  rightDom: HTMLElement | null
  width?: number
}>()
const { leftDom, rightDom } = props
const width = ref(props.width || 8)
const startx = ref(0)
const left_startwidth = ref(0)
const right_startwidth = ref(0)
const isDragging = ref(false) // 防止多次注册事件

onMounted(() => {
  watch(
    () => {
      return [props.leftDom, props.rightDom]
    },
    () => {}
  )
  setTimeout(() => {
    console.log(leftDom)
  }, 1000)
  $drag.value?.addEventListener('mousedown', onMouseDown)
})

const onMouseDown = (e: MouseEvent) => {
  if (isDragging.value) return // 防止重复注册事件
  isDragging.value = true

  startx.value = e.clientX
  left_startwidth.value = leftDom?.offsetWidth || 0
  right_startwidth.value = rightDom?.offsetWidth || 0

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
  console.log('onMouseDown', leftDom?.offsetWidth, rightDom?.offsetWidth)
}

const onMouseMove = (e: MouseEvent) => {
  if (!leftDom || !rightDom) return
  console.log('onMouseMove')

  const deltaX = e.clientX - startx.value // 鼠标移动的距离

  let newLeftWidth = left_startwidth.value + deltaX
  let newRightWidth = rightDom.offsetWidth - deltaX // 右侧宽度相应减少

  console.log('move', newLeftWidth, newRightWidth, newLeftWidth + newRightWidth)
  // 限制左侧最小宽度与右侧最大宽度
  if (newLeftWidth <= 100 || newRightWidth <= 100) return
  leftDom.style.width = `${newLeftWidth}px`
  rightDom.style.width = `${newRightWidth}px`
}

const onMouseUp = () => {
  isDragging.value = false // 释放拖拽状态
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
}

onUnmounted(() => {
  $drag.value?.removeEventListener('mousedown', onMouseDown)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
})
</script>

<template>
  <div ref="$drag" class="drag" :style="{ width: width + 'px' }">
    <el-icon class="icon" color="#3f3f40"><Operation /></el-icon>
  </div>
</template>

<style scoped lang="less">
.drag {
  height: 100%;
  background-color: #0f0f0f;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
}
</style>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { Operation } from '@element-plus/icons-vue'
const $drag1 = ref<HTMLElement | null>(null)
const props = defineProps<{
  leftDom: HTMLElement | null
  rightDom: HTMLElement | null
  width?: number
}>()
const { leftDom, rightDom } = props
const width = ref(props.width || 8)
const startx = ref(0)
const startwidth = ref(0)
const isDragging = ref(false) // 防止多次注册事件

onMounted(() => {
  $drag1.value?.addEventListener('mousedown', onMouseDown)
})

const onMouseDown = (e: MouseEvent) => {
  if (isDragging.value) return // 防止重复注册事件
  isDragging.value = true

  startx.value = e.clientX
  startwidth.value = leftDom?.offsetWidth || 0

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
  //   console.log('onMouseDown')
}

const onMouseMove = (e: MouseEvent) => {
  if (!leftDom || !rightDom) return

  const deltaX = e.clientX - startx.value // 鼠标移动的距离

  let newLeftWidth = startwidth.value + deltaX
  let newRightWidth = rightDom.offsetWidth - deltaX // 右侧宽度相应减少

  // 限制左侧最小宽度
  newLeftWidth = Math.max(200, newLeftWidth)

  // 限制右侧最大宽度
  newRightWidth = Math.min(800, newRightWidth)

  // 更新宽度
  leftDom.style.width = `${newLeftWidth}px`
  rightDom.style.width = `${newRightWidth}px`
  console.log(1)
}

const onMouseUp = () => {
  isDragging.value = false // 释放拖拽状态
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
}

onUnmounted(() => {
  $drag1.value?.removeEventListener('mousedown', onMouseDown)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
})
</script>

<template>
  <div ref="$drag1" class="drag" :style="{ width: width + 'px' }">
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

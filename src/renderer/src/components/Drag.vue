<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { Operation } from '@element-plus/icons-vue'

const $drag = ref<HTMLElement | null>(null)
const props = defineProps<{
  leftDom: HTMLElement | null
  rightDom: HTMLElement | null
  container: HTMLElement | null
  width?: number
}>()
const { leftDom, rightDom, container, width = 6 } = props
const startx = ref(0)
const left_startwidth = ref(0)
const right_startwidth = ref(0)
const isDragging = ref(false)

onMounted(() => {
  if (!$drag.value) return
  $drag.value.addEventListener('mousedown', onMouseDown)
})

const onMouseDown = (e: MouseEvent) => {
  if (isDragging.value || !container || !leftDom || !rightDom) return
  isDragging.value = true

  startx.value = e.clientX
  left_startwidth.value = leftDom.offsetWidth
  right_startwidth.value = rightDom.offsetWidth

  container.addEventListener('mousemove', onMouseMove)
  container.addEventListener('mouseup', onMouseUp)
}

const onMouseMove = (e: MouseEvent) => {
  if (!leftDom || !rightDom) return

  const deltaX = e.clientX - startx.value
  const newLeftWidth = left_startwidth.value + deltaX
  const newRightWidth = right_startwidth.value - deltaX
  console.log('onMouseMove', deltaX, newLeftWidth, newRightWidth)

  // 限制最小宽度
  if (newLeftWidth <= 100 || newRightWidth <= 100) return

  // 应用新的宽度
  leftDom.style.width = `${newLeftWidth}px`
  rightDom.style.width = `${newRightWidth}px`
}

const onMouseUp = () => {
  if (!container) return
  isDragging.value = false
  container.removeEventListener('mousemove', onMouseMove)
  container.removeEventListener('mouseup', onMouseUp)
}

onUnmounted(() => {
  if (!$drag.value) return
  $drag.value.removeEventListener('mousedown', onMouseDown)

  if (container) {
    container.removeEventListener('mousemove', onMouseMove)
    container.removeEventListener('mouseup', onMouseUp)
  }
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

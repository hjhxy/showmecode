<script setup lang="ts">
import { onUnmounted, ref, watch, toRefs } from 'vue'
import { Operation } from '@element-plus/icons-vue'

const $drag = ref<HTMLElement | null>(null)
const props = defineProps<{
  leftDom: HTMLElement | null
  rightDom: HTMLElement | null
  container: HTMLElement | null
  width?: number
}>()
const { leftDom, rightDom, container, width } = toRefs(props)

const startx = ref(0)
const left_startwidth = ref(0)
const right_startwidth = ref(0)
const isDragging = ref(false)

// 确保事件监听器只被添加一次
const hasAddedListeners = ref(false)

// 监听 DOM 元素变化
watch([leftDom, rightDom, container], ([newLeftDom, newRightDom, newContainer]) => {
  if (newLeftDom && newRightDom && newContainer && !hasAddedListeners.value) {
    $drag.value!.addEventListener('mousedown', onMouseDown)
    hasAddedListeners.value = true
  }
})

const onMouseDown = (e: MouseEvent) => {
  if (isDragging.value || !container.value || !leftDom.value || !rightDom.value) return
  isDragging.value = true

  startx.value = e.clientX
  left_startwidth.value = leftDom.value!.offsetWidth
  right_startwidth.value = rightDom.value!.offsetWidth

  container.value!.addEventListener('mousemove', onMouseMove)
  container.value!.addEventListener('mouseup', onMouseUp)
}

const onMouseMove = (e: MouseEvent) => {
  if (!leftDom.value || !rightDom.value) return

  const deltaX = e.clientX - startx.value
  const newLeftWidth = left_startwidth.value + deltaX
  const newRightWidth = right_startwidth.value - deltaX

  // 限制最小宽度
  if (newLeftWidth <= 100 || newRightWidth <= 100) return

  // 应用新的宽度
  leftDom.value!.style.width = `${newLeftWidth}px`
  rightDom.value!.style.width = `${newRightWidth}px`
}

const onMouseUp = () => {
  if (!container.value) return
  isDragging.value = false
  container.value!.removeEventListener('mousemove', onMouseMove)
  container.value!.removeEventListener('mouseup', onMouseUp)
}

onUnmounted(() => {
  if (!$drag.value) return
  $drag.value.removeEventListener('mousedown', onMouseDown)

  if (container.value) {
    container.value!.removeEventListener('mousemove', onMouseMove)
    container.value!.removeEventListener('mouseup', onMouseUp)
  }
})
</script>

<template>
  <div ref="$drag" class="drag" :style="{ width: width ? width + 'px' : '7px' }">
    <div class="icons">
      <el-icon class="icon" color="#3f3f40"><Operation /></el-icon>
      <el-icon class="icon" color="#3f3f40"><Operation /></el-icon>
    </div>
  </div>
</template>

<style scoped lang="less">
.drag {
  height: 100%;
  width: 7px;
  background-color: rgb(156, 170, 173);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    cursor: pointer;
  }
}
</style>

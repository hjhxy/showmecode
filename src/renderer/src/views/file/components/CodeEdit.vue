<script setup lang="ts">
import { onMounted, computed, onBeforeUnmount, watch } from 'vue'
import * as monaco from 'monaco-editor'
import { useFileStore } from '@renderer/store/file'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

const fileStore = useFileStore()
const currentEditFile = computed(() => fileStore.currentEditFile)
let editor: monaco.editor.IStandaloneCodeEditor | null = null

window.MonacoEnvironment = {
  getWorker(workerId, label) {
    if (label === 'json') {
      return new jsonWorker()
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker()
    }
    if (label === 'html') {
      return new htmlWorker()
    }
    if (['typescript', 'javascript'].includes(label)) {
      return new tsWorker()
    }
    return new editorWorker()
  }
}

onMounted(() => {
  editor = monaco.editor.create(document.getElementById('code-edit-content') as HTMLElement, {
    value: currentEditFile.value?.content || '',
    language: 'typescript',
    theme: 'vs-dark',
    automaticLayout: true,
    minimap: {
      enabled: false
    }
  })
})

// 监听 currentEditFile 的变化
watch(currentEditFile, (newFile) => {
  if (editor && newFile) {
    editor.setValue(newFile.content || '')
    // 根据文件类型设置语言
    const language = newFile.name?.endsWith('.ts') ? 'typescript' : 'javascript'
    monaco.editor.setModelLanguage(editor.getModel()!, language)
  }
})

onBeforeUnmount(() => {
  if (editor) {
    editor.dispose()
  }
})
</script>

<template>
  <div class="container">
    <div class="code-edit-container">
      <div id="code-edit-content" class="monaco-editor"></div>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;

  .code-edit-container {
    width: 100%;
    height: 100%;

    .monaco-editor {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

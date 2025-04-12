import { defineStore } from 'pinia'
import type { IFileArray, IFileTree } from '@renderer/types/filetree'
import { arrayToTree } from '@renderer/utils/filepath'

export const useFileStore = defineStore('file', {
  state: () => ({
    fileData: [] as IFileArray[],
    filetreeData: [] as IFileTree[],
    currentEditFile: null as IFileArray | null,
    currentClickFile: null as IFileArray | null
  }),
  actions: {
    async getFileData() {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.fileData = filedata
          this.filetreeData = arrayToTree(this.fileData) as unknown as IFileTree[]
          resolve(true)
        }, 50)
      })
    },
    setFiletreeData(data: IFileTree[]) {
      this.filetreeData = data
    },
    setCurrentEditFile(id: string) {
      this.currentEditFile = this.fileData.find((item) => item.id === id) || null
    },
    setCurrentClickFile(id: string) {
      this.currentClickFile = this.fileData.find((item) => item.id === id) || null
    }
  },
  getters: {}
})

const filedata: IFileArray[] = [
  {
    id: '1',
    name: '文件夹1',
    type: 'folder',
    content: null,
    parentId: null
  },
  {
    id: '2',
    name: '文件夹2',
    type: 'folder',
    content: null,
    parentId: null
  },
  {
    id: '3',
    name: '文件3.ts',
    type: 'file',
    content: 'console.log("Hello, World!");\nconsole.log("Hello, showmebug!");\n',
    parentId: null
  },
  {
    id: '4',
    name: '文件夹4',
    type: 'folder',
    content: null,
    parentId: '1'
  },
  {
    id: '5',
    name: '文件5我是文件夹55555',
    type: 'file',
    content: 'console.log("Hello, World!");',
    parentId: '4'
  }
]

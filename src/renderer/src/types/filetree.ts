interface IFileArray {
  id: string
  name: string
  type: 'file' | 'folder'
  content: string | null
  parentId: string | null
}

interface IFileTree {
  id: string
  name: string
  type: 'file' | 'folder'
  children: IFileTree[] | null
  content: string | null
}

export type { IFileArray, IFileTree }

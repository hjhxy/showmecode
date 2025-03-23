interface IFile {
  id: number | string
  name: string
  type: 'file' | 'filelist'
  children: IFile[] | null
}

export type { IFile }

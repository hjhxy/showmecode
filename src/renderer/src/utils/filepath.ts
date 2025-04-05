export const getFilePath = () => {
  let basePath = ''
  if (import.meta.env.MODE === 'development') {
    basePath = '/resources'
  } else {
    basePath = ''
  }
  return basePath
}

interface IArrayInput {
  id: string
  parentId: string | null
  [key: string]: unknown
}

interface ITreeOutput extends IArrayInput {
  children: ITreeOutput[] | null
}

export const arrayToTree = <T extends IArrayInput>(array: Array<T>) => {
  // 创建一个 Map 来存储所有节点，方便快速查找
  const nodeMap = new Map<string | number, ITreeOutput>()

  // 第一次遍历：创建所有节点的副本并存入 Map
  array.forEach((item) => {
    nodeMap.set(item.id, {
      ...item,
      children: []
    })
  })

  const result: Array<ITreeOutput> = []

  // 第二次遍历：建立父子关系
  array.forEach((item) => {
    const node = nodeMap.get(item.id)
    if (!node) return

    if (item.parentId === null) {
      // 根节点直接加入结果数组
      result.push(node)
    } else {
      // 找到父节点并建立关系
      const parent = nodeMap.get(item.parentId)
      if (parent) {
        parent.children = parent.children || []
        parent.children.push(node)
      } else {
        // 如果找不到父节点，作为根节点处理
        result.push(node)
      }
    }
  })

  return result
}

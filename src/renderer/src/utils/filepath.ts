export const getFilePath = () => {
  let basePath = ''
  if (import.meta.env.MODE === 'development') {
    basePath = '/resources'
  } else {
    basePath = ''
  }
  return basePath
}

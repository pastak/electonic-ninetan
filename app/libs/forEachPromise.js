export default (arr, func) => {
  return new Promise((resolve) => {
    const recursive = (n) => {
      const item = arr[n]
      if (n === arr.length) {
        return resolve()
      }
      func(() => {
        recursive(++n)
      }, item)
    }
    recursive(0)
  })
}

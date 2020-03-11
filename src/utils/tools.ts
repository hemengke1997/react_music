export const getCount = (count: number, type: string = 'playcount') => {
  interface paramType {
    count: number
    unit: string
  }
  let param: paramType = {
    count: 0,
    unit: ""
  }
  let k = 10000
  let size = ["", "万", "亿"]
  let tempK = k
  if(type === 'likecount') {
    tempK = k * 10000
  }
  if (count < tempK) {
    param.count = count
    param.unit = ""
  } else {
    let i = Math.floor(Math.log(count) / Math.log(k))
    param.count = parseFloat((count / Math.pow(k, i)).toFixed(1))
    param.unit = size[i]
  }
  return `${param.count}${param.unit}`
}
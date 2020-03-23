import { axiosInstance as axios } from "./axiosConfig"

// 获取热门歌曲
function getHotsongs() {
  return axios.get("/top/list?idx=1")
}

export {
  getHotsongs
}

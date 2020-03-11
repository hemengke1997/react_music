import { axiosInstance as axios } from "./axiosConfig"

// 获取推荐歌单
function getSheetList() {
  return axios.get("/personalized")
}

// 获取最新音乐
function getNewSong() {
  return axios.get("/personalized/newsong")
}

export { getSheetList, getNewSong }

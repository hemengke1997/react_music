import { axiosInstance as axios } from "./axiosConfig"

//
function getSearchList(keyword: string | number) {
  const url = `/search/suggest?keywords=${keyword}&type=mobile`
  return axios.get(url)
}


export {
  getSearchList
}
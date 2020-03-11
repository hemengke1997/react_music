// 声明state的结构
export type sheetListType = {
  name: string
  picUrl: string
  id: number
  playCount: number
}

export interface sheetSongInterface {
  name: string
  picUrl: string
  id: number
  song: object
}

export interface RecommendStateInterface {
  sheetList: Array<sheetListStateInterface>
  loading: LoadingStateInterface
  sheetSongs: Array<sheetSongInterface>
}

export interface LoadingStateInterface {
  sheetLoading?: boolean
  songLoading?: boolean
}
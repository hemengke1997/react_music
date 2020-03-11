import { getSheetList, getNewSong } from "apis/recommend-api"
import * as actionTypes from "./constants"
import { sheetListType, LoadingStateInterface, sheetSongInterface } from "./data.d"

// action接口
interface setSheetListActionInterface {
  type: typeof actionTypes.SET_SHEETLIST
  data: sheetListType[]
}

interface setLoadingActionInterface {
  type: typeof actionTypes.SET_LOADING
  data: LoadingStateInterface
}

interface setSheetSongsActionInterface {
  type: typeof actionTypes.SET_SHEETSONGS
  data: sheetSongInterface
}

// action
const setSheetList = (
  data: Array<sheetListType> = []
): setSheetListActionInterface => ({
  type: actionTypes.SET_SHEETLIST,
  data: data
})

const setLoading = (
  data: LoadingStateInterface
): setLoadingActionInterface => ({
  type: actionTypes.SET_LOADING,
  data: data
})

const setSheetSongs = (data: sheetSongInterface): setSheetSongsActionInterface => ({
  type: actionTypes.SET_SHEETSONGS,
  data: data
})

// action creator
// 在action creator中可以处理逻辑
export const getSheetListCreator = () => {
  return (dispatch: any) => {
    getSheetList()
      .then(res => {
        dispatch(
          setLoading({
            sheetLoading: false
          })
        )
        let result: sheetListType[] = res.data.result
          .slice(0, 6)
          .map((item: sheetListType) => {
            return {
              id: item.id,
              name: item.name,
              picUrl: item.picUrl,
              playCount: item.playCount
            }
          })
        dispatch(setSheetList(result))
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const getSheetSongsCreator = () => {
  return (dispatch: any) => {
    getNewSong().then(res => {
      dispatch(
        setLoading({
          songLoading: false
        })
      )
      let result = res.data.result
      result = result.map((item: sheetSongInterface) => {
        return {
          id: item.id,
          name: item.name,
          picUrl: item.picUrl,
          song: item.song
        }
      })
      dispatch(setSheetSongs(result))
    })
  }
}

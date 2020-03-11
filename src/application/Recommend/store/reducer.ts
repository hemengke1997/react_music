import * as actionTypes from "./constants"
import { RecommendStateInterface } from "./data.d"
import { produce } from "immer"

const initialState: RecommendStateInterface = {
  sheetList: [],
  loading: {
    sheetLoading: true,
    songLoading: true
  },
  sheetSongs: []
}

export default (state = initialState, action: any) => {
  return produce(state, draft => {
    switch (action.type) {
      case actionTypes.SET_SHEETLIST:
        draft.sheetList = action.data
        break
      case actionTypes.SET_LOADING:
        // draft.loading = Object.assign(draft.loading, action.data)
        draft.loading = {...draft.loading, ...action.data}
        break
      case actionTypes.SET_SHEETSONGS:
        draft.sheetSongs = action.data
        break
      default:
        return state
    }
  })
}

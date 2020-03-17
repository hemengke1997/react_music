import React, { useEffect, Fragment } from "react"
import { connect } from "react-redux"
import { RouteConfig } from "react-router-config"
import RecommendSheetList from "./sheetList/index"
import SongList from "./songList/index"
import Footer from './footer'
import Loading from "components/loading/index"
import {
  sheetListType,
  LoadingStateInterface,
  sheetSongInterface
} from "./store/data.d"
import * as actionCreators from "./store/actionCreator"

interface RecommendProps extends RouteConfig {
  loading: LoadingStateInterface
  sheetList: Array<sheetListType>
  sheetSongs: sheetSongInterface[]
  getSheetListDataDispatch: () => void
  getSongDataDispatch: () => void
}

const Recommend: React.FC<RecommendProps> = props => {
  const { getSheetListDataDispatch, getSongDataDispatch } = props
  const { sheetList, loading, sheetSongs } = props
  useEffect(() => {
    if (!sheetList.length) {
      getSheetListDataDispatch()
    }
    if (!sheetSongs.length) {
      getSongDataDispatch()
    }
    // eslint-disable-next-line
  }, [])
  return (
    <Fragment>
      <RecommendSheetList sheetList={sheetList}></RecommendSheetList>
      <SongList sheetSongs={sheetSongs}></SongList>
      <Footer></Footer>
      {loading.sheetLoading || loading.songLoading ? <Loading></Loading> : null}
    </Fragment>
  )
}

// 映射store中的state到当前组件的props上
const mapStateToProps = (state: any) => ({
  sheetList: state.recommend.sheetList,
  loading: state.recommend.loading,
  sheetSongs: state.recommend.sheetSongs
})

// 映射dispatch到props中
const mapDispatchToProps = (dispatch: any) => {
  return {
    getSheetListDataDispatch() {
      dispatch(actionCreators.getSheetListCreator())
    },
    getSongDataDispatch() {
      dispatch(actionCreators.getSheetSongsCreator())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Recommend))

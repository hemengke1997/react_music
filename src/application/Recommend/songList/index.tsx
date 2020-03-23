import React, { useEffect } from "react"
import { SongListWrapper } from "./style"
import { withRouter } from "react-router-dom"
import Song from "components/song"
import { sheetSongInterface } from "../store/data.d"

const SongList: React.FC<any> = props => {
  const { sheetSongs } = props
  const songNeed = (index: number) => {
    return {
      rank: false,
      red: false,
      index: index
    }
  }
  useEffect(() => {
    console.log(props, "songlist组件")
    // eslint-disable-next-line
  }, [])
  return (
    <SongListWrapper>
      <h2 className="title">推荐歌曲</h2>
      {sheetSongs.map((item: sheetSongInterface, index: number) => {
        return <Song song={item} songNeed={songNeed(index)} key={item.id}></Song>
      })}
    </SongListWrapper>
  )
}

export default withRouter(React.memo(SongList))

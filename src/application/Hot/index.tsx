import React, { useEffect, useState } from "react"
import { HotWrapper } from "./style"
import Song from "components/song"
import Loading from "components/loading"
import { songType } from "components/song"
import { withRouter } from "react-router-dom"
import { getHotsongs } from "apis/hot-api"
import dayjs from "dayjs"

const Hot: React.FC = props => {
  const [hotsongs, setHotsongs] = useState([])
  const [date, setDate] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const songNeed = (index: number) => {
    return {
      rank: true,
      red: true,
      index: index
    }
  }
  const _getHotsongs = () => {
    getHotsongs().then(res => {
      const { data } = res
      resolveTime(data.playlist.updateTime)
      resolveSong(data.playlist.tracks.slice(0, 20))
      setIsLoading(false)
    })
  }
  // 处理时间格式
  const resolveTime = (time: number) => {
    const myTime = dayjs(time)
    const month = myTime.month() + 1
    const day = myTime.date()
    setDate(`${month}月${day}日`)
  }
  // 处理歌曲格式，传给Song组件
  const resolveSong = (song: any) => {
    let songs = song.map((item: any) => {
      return {
        name: item.name,
        id: item.id,
        song: {
          alias: item.alia,
          artists: item.ar,
          album: item.al
        }
      }
    })
    setHotsongs(songs)
  }
  useEffect(() => {
    _getHotsongs()
    // eslint-disable-next-line
  }, [])
  return (
    <HotWrapper>
      <div className="hot_top">
        <div className="banner">
          <div className="hot_icon"></div>
          <div className="hot_time">更新日期：{date}</div>
        </div>
      </div>
      {hotsongs.map((item: songType, index) => {
        return <Song song={item} key={item.id} songNeed={songNeed(index + 1)}></Song>
      })}
      {isLoading && <Loading></Loading>}
    </HotWrapper>
  )
}

export default withRouter(React.memo(Hot))

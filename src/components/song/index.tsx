import React from "react"
import {
  SongWrapper,
  Rank,
  ContentWrapper,
  Alias,
  SongTitle,
  SongDetail,
  LeftPart,
  RightPart
} from "./style"
import { withRouter } from "react-router-dom"

const Song: React.FC<any> = props => {
  const { rank, songNeed, song:item, keyword, highlight } = props
  // 处理歌手名拼接
  interface artist {
    name: string
  }
  let getSingers = (ar: artist[]) => {
    if (!ar) {
      return ""
    }
    if (ar.length === 1) {
      return ar[0].name
    } else {
      let temp: any[] = []
      ar.forEach(item => {
        temp.push(item.name)
      })
      return temp.join(" / ")
    }
  }

  // 高亮
  let setHighlight = (name: string) => {
    if (!name) {
      return ""
    } else if (!highlight || keyword === "") {
      return name
    }
    const index = name.indexOf(keyword)
    if (index !== -1) {
      let reg = new RegExp(keyword, "g")
      
      return name.replace(reg, `<span class="highlight">${keyword}</span>`)
    } else {
      return name
    }
  }

  return (
    <SongWrapper>
      {rank && <Rank red={songNeed.red} index={songNeed.index}></Rank>}
      <ContentWrapper>
        <LeftPart>
          <SongTitle>
            <span>{setHighlight(item.name)}</span>
            {item.song.alias.length > 0 && (
              <Alias>
                <span>({setHighlight(item.song.alias[0])})</span>
              </Alias>
            )}
          </SongTitle>
          <SongDetail>
            <i className="iconfont icon-sq"></i>
            <span>{setHighlight(getSingers(item.song.artists))}</span>
            <span> - </span>
            <span>{setHighlight(item.song.album.name)}</span>
          </SongDetail>
        </LeftPart>
        <RightPart>
          <i className="iconfont icon-bofang"></i>
        </RightPart>
      </ContentWrapper>
    </SongWrapper>
  )
}

export default withRouter(React.memo(Song))

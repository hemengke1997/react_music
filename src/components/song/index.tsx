import React from "react"
import { SongWrapper, Rank, ContentWrapper } from "./style"
import { withRouter } from "react-router-dom"

const Song: React.FC<any> = props => {
  const { rank, songNeed } = props

  
  return (
  <SongWrapper>
    {
      rank && (
        <Rank red={songNeed.red} index={songNeed.index}></Rank>
      )
    }
    <ContentWrapper>

    </ContentWrapper>
  </SongWrapper>
  )
}

export default withRouter(React.memo(Song))

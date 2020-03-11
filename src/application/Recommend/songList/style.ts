import styled from "styled-components"
import { title_after } from "assets/css/globalStyle"

export const SongListWrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  .title {
    margin-top: 20px;
    margin-bottom: 14px;
    height: 20px;
    line-height: 20px;
    font-size: 17px;
    padding-left: 9px;
    position: relative;
    &::after {
      ${title_after};
    }
  }
`

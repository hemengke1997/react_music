import styled from "styled-components"
import { text_overflow } from "assets/css/globalStyle"

export const SongWrapper = styled.div`
  display: flex;
`

interface rankStyle {
  red: boolean
  index: number
}
export const Rank = styled.div<rankStyle>`
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: -10px;
  color: ${props => (props.red && props.index < 3 ? "#df3436" : "#999")};
`

export const ContentWrapper = styled.div`
  flex: 1 1 auto;
  display: flex;
  position: relative;
  padding-left: 10px;
  &::after {
    position: absolute;
    content: "";
    bottom: 0;
    left: 0;
    pointer-events: none;
    box-sizing: border-box;
    width: 100%;
    border: 0 solid rgba(0, 0, 0, 0.1);
    border-bottom-width: 1px;
    transform: scaleY(0.2);
  }
`

export const LeftPart = styled.div`
  padding: 6px 0;
  flex: 1 1 auto;
  width: 0;
  line-height: 21px;
`

export const Alias = styled.span`
  color: #888;
  font-size: 0;
  span {
    font-size: 17px;
  }
`

export const SongTitle = styled.div`
  font-size: 17px;
  ${text_overflow}
`

export const SongDetail = styled.div`
  font-size: 12px;
  color: #888;
  ${text_overflow};
  .icon-sq {
    font-size: 12px;
    color: #ffa54a;
    margin-right: 4px;
  }
`

export const RightPart = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  .icon-bofang {
    font-size: 26px;
    color: #9f9f9f;
  }
`

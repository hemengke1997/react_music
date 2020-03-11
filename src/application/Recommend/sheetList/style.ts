import styled from "styled-components"
import { title_after, listen_count, text_2 } from "assets/css/globalStyle"

export const SheetWrapper = styled.div`
  .title {
    margin-top: 20px;
    margin-bottom: 14px;
    height: 20px;
    line-height: 20px;
    font-size: 17px;
    padding-left: 9px;
    position: relative;
    &::after {
      ${title_after}
    }
  }
`

export const SheetUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
`

export const SheetLi = styled.li`
  display: block;
  margin-bottom: 16px;
  width: 33.3%;
  padding-left: 1px;
  padding-right: 1px;
  .cover {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 20px;
      z-index: 1;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.3), transparent);
    }
    .cover_img {
      width: 100%;
    }
    .play_count {
      ${listen_count}
      .icon-erji {
        font-size: 12px;
      }
    }
  }
  .desc {
    ${text_2}
    padding: 6px 2px 0 6px;
    min-height: 30px;
    line-height: 1.2;
    font-size: 13px;
  }
`

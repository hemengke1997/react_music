import styled from "styled-components"
import hot_music_bg_2x from "assets/img/hot_music_bg_2x.jpg"
import index_icon_2x from "assets/img/index_icon_2x.png"

export const HotWrapper = styled.div`
  overflow: hidden;
  .hot_top {
    background: url(${hot_music_bg_2x}) no-repeat;
    background-size: contain;
    position: relative;
    overflow: hidden;
    padding-top: 38.8%;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.2);
      z-index: 1;
    }
    .banner {
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 3;
      box-sizing: border-box;
      padding-left: 20px;
      .hot_icon {
        width: 142px;
        height: 67px;
        background: url(${index_icon_2x}) no-repeat;
        background-size: 166px 96px;
        background-position: -24px -30px;
      }
      .hot_time {
        margin-top: 10px;
        font-size: 12px;
        transform: scale(0.91);
        color: hsla(0, 0%, 100%, 0.8);
        transform-origin: left top;
      }
    }
  }
`

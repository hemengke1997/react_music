import styled from "styled-components"
import base_style, { small_border } from "assets/css/globalStyle"

export const TabStyle = styled.div`
  padding-top: 40px;
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    position: fixed;
    top: 84px;
    background-color: #fff;
    z-index: 200;
    &::after {
      ${small_border};
      border-color: #ccc;
      z-index: 0;
    }
    .tab_item {
      flex: 1;
      text-align: center;
      font-size: 15px;
      height: 100%;
      line-height: 40px;
      &.selected {
        .title {
          color: ${base_style.red};
          &::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 4px;
            background-color: ${base_style["color-theme"]};
            width: 100%;
            height: 4px;
            transform: scaleY(0.5);
          }
        }
      }
      .title {
        display: inline-block;
        position: relative;
        height: 45px;
        color: #000;
        padding: 0 5px;
      }
    }
  }
  .tab_bottom {
    &::after {
      border-bottom-width: 1px;
    }
  }
`

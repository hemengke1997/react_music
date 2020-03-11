import styled from "styled-components"
import base_style from "assets/css/globalStyle"

const Top = styled.div`
  .wrapper {
    display: block;
    padding-bottom: 84px;
    position: relative;
    width: 100%;
    height: 0;
    transition: padding-bottom 0.3s;
    .top {
      width: 100%;
      height: 84px;
      position: fixed;
      left: 0;
      top: 0;
      background-color: ${base_style["color-theme"]};
      z-index: 9;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      align-items: center;
      .logo {
        font-size: 20px;
        color: #fff;
        .icon-wangyiyunyinle {
          text-align: center;
          color: ${base_style["color-theme"]};
          display: inline-block;
          font-size: 18px;
          height: 25px;
          width: 25px;
          line-height: 25px;
          background-color: #fff;
          box-sizing: border-box;
          border-radius: 50%;
          transform: translateY(-1px);
        }
      }
      .app_link {
        width: 100px;
        height: 36px;
        line-height: 36px;
        font-size: 16px;
        text-align: center;
        background-color: #fff;
        border: 1px solid ${base_style["color-theme"]};
        border-radius: 48px;
        color: ${base_style["color-theme"]};
      }
    }
  }
`

export default Top

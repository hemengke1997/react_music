import React from "react"
import styled from "styled-components"
import style from "assets/css/globalStyle"
import recommendBg2x from 'assets/img/recommand_bg_2x.png'
import recommendBg3x from 'assets/img/recommand_bg_3x.png'


const Footer = styled.footer`
  background: url(${recommendBg2x}) no-repeat;
  position: relative;
  background-size: contain;
  width: 100%;
  padding-top: 53.3%;
  @media screen and (-webkit-device-pixel-ratio: 3) {
    background-image: url(${recommendBg3x});
  }
  .recommend_footer {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    .item_list {
      display: flex;
      flex-direction: column;
      align-items: center;
      transform: translateY(60px);
      .logo {
        display: flex;
        align-items: center;
        font-size: 34px;
        .iconfont {
          color: ${style["color-theme"]};
          font-size: 46px;
          margin-right: 6px;
        }
      }
      .link_app {
        border: 1px solid #d33a31;
        width: 301px;
        height: 40px;
        box-sizing: border-box;
        line-height: 40px;
        text-align: center;
        margin-top: 15px;
        margin-bottom: 5px;
        border-radius: 30px;
        color: #d33a31;
      }
      .copyright {
        color: #888;
        font-size: 12px;
        line-height: 16px;
        transform: scale(0.75);
      }
    }
  }
`

const RecommendFooter: React.FC = () => {
  return (
    <Footer>
      <div className="recommend_footer">
        <div className="item_list">
          <div className="logo">
            <i className="iconfont icon-wangyiyunyinle1"></i>
            <span className="title">minko音乐</span>
          </div>
          <div className="link_app">打开APP，发现更多好音乐 ></div>
          <p className="copyright">minko制作</p>
        </div>
      </div>
    </Footer>
  )
}

export default RecommendFooter

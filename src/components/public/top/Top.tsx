import React from "react"
import { Link } from "react-router-dom"
import TopStyle from "./top.style"

const Top: React.FC = () => {
  return (
    <TopStyle>
      <Link to="/" className="wrapper">
        <div className="top">
          <div className="logo">
            <i className="iconfont icon-wangyiyunyinle"></i>
            <span className="name">minko-music</span>
          </div>
          <div className="app_link">下载APP</div>
        </div>
      </Link>
    </TopStyle>
  )
}

export default Top

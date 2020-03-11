import React from "react"
import { SheetWrapper, SheetUl, SheetLi } from "./style"
import LazyLoad from "react-lazyload"
import { withRouter } from "react-router-dom"
import { sheetListType } from "../store/data.d"
import { getCount } from "utils/tools"

const SheetList: React.FC<any> = props => {
  const { sheetList } = props
  const enterSheet = (id: string | number) => {
    props.history.push(`/recommend/${id}`)
  }
  return (
    <SheetWrapper>
      <h2 className="title">推荐歌单</h2>
      <SheetUl>
        {sheetList.map((item: sheetListType) => {
          return (
            <SheetLi key={item.id} onClick={() => enterSheet(item.id)}>
              <div className="cover">
                <LazyLoad
                  placeholder={
                    <img
                      width="100%"
                      height="100%"
                      src={require("./default.png")}
                      alt="music"
                    />
                  }
                >
                  <img src={item.picUrl} alt="music" className="cover_img" />
                </LazyLoad>
                <div className="play_count">
                  <i className="iconfont icon-erji"></i>
                  <span>{getCount(item.playCount)}</span>
                </div>
                <p className="desc">{item.name}</p>
              </div>
            </SheetLi>
          )
        })}
      </SheetUl>
    </SheetWrapper>
  )
}

// withRouter的作用：
// 把路由相关的props传给参数中的组件，组件可以通过props获取到history/route等props
export default withRouter(React.memo(SheetList))

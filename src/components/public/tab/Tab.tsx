import React from "react"
import { TabStyle } from "./tab.style"
import { NavLink } from "react-router-dom"

const routes = [
  { title: "推荐音乐", router: "/recommend" },
  { title: "热歌榜", router: "/hot" },
  { title: "搜索", router: "/search" }
]

const Tab: React.FC = () => {
  return (
    <TabStyle>
        <nav className="tab tab_bottom">
          {routes.map(item => {
            return (
              <NavLink
                className="tab_item"
                to={item.router}
                activeClassName="selected"
                key={item.title}
              >
                <span className="title">{item.title}</span>
              </NavLink>
            )
          })}
        </nav>
    </TabStyle>
  )
}

export default Tab

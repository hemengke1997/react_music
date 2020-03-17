import React from "react"
import { renderRoutes, RouteConfig } from "react-router-config"
import Top from "components/public/top/Top"
import Tab from "components/public/tab/Tab"


const Index: React.FC = (props: RouteConfig) => {
  const { route } = props
  return (
    <div>
      <Top />
      <Tab />
      {renderRoutes(route.routes)}
    </div>
  )
}

export default Index

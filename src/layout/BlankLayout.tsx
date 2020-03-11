import React from 'react'
import { renderRoutes, RouteConfig } from 'react-router-config'
const blankLayout: React.FC = ({ route }: RouteConfig) => {
  console.log(route,'blank')
  return (
    <>{renderRoutes(route.routes)}</>
  )
}
export default blankLayout
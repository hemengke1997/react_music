import React, { lazy, Suspense } from "react"
import { RouteConfig } from "react-router-config"
import { Redirect } from "react-router-dom"
import Index from "layout/index"

const Recommend: React.FC = lazy(
  (): Promise<any> => import("application/Recommend")
)
const Hot: React.FC = lazy((): Promise<any> => import("application/Hot"))
const Search: React.FC = lazy((): Promise<any> => import("application/Search"))

/**
 * React.lazy
 * https://zh-hans.reactjs.org/docs/code-splitting.html#reactlazy
 */

const SuspenseComponent = (Component: React.FC) => (props: any) => {
  // fallback 属性接受任何在组件加载过程中你想展示的 React 元素。
  return (
    <Suspense fallback={null}>
      <Component {...props}></Component>
    </Suspense>
  )
}

const routes: RouteConfig[] = [
  {
    path: "/",
    component: Index,
    routes: [
      {
        path: "/",
        exact: true,
        render: () => <Redirect to={"/recommend"} />
      },
      {
        path: "/recommend",
        component: SuspenseComponent(Recommend)
      },
      {
        path: "/hot",
        exact: true,
        component: SuspenseComponent(Hot)
      },
      {
        path: "/search",
        exact: true,
        component: SuspenseComponent(Search)
      }
    ]
  }
]

export default routes

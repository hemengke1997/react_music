import { createStore, compose, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import rootReducer from './reducer'

/**
 * 配置调试器： redux-devtools 
 * https://github.com/zalmoxisus/redux-devtools-extension#installation
 */

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(ReduxThunk))
)

/**
 * 类型别名
 * 类型别名会给一个类型起个新名字。 类型别名有时和接口很像，
 * 但是可以作用于原始值，联合类型，元组以及其它任何你需要手写的类型
 */

 
export type AppState = ReturnType<typeof rootReducer>
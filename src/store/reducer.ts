import { combineReducers } from 'redux'
import recommendReducer from 'application/Recommend/store/reducer'


const rootReducer = combineReducers({
  recommend: recommendReducer
})

export default rootReducer
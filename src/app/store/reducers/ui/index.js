import { combineReducers } from 'redux'
import global_ui from './global_ui'
import users_ui from './users_ui'

const reducer = combineReducers({
    global_ui,
    users_ui,
})

export default reducer

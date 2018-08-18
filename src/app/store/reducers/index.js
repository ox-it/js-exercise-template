import { combineReducers } from 'redux'
import example_entities from './example_entities'
import users from './users'
import ui from './ui'
import { routerReducer } from 'react-router-redux'

const reducer = combineReducers({
  example_entities,
  users,
  ui,
  routing: routerReducer,
})


export const selectExampleEntities = (store) => {
    // example selector to get a part of the store need by a component
    let examples = store.example_entities.entities;
    return examples;
    
}

export default reducer;

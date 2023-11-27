import { createStore, combineReducers } from 'redux'

import undoable, { ActionCreators } from 'redux-undo'

import { wapReducer } from './reducers/wap.reducer.js'
import { userReducer } from './reducers/user.reducer.js'
import { systemReducer } from './reducers/system.reducer.js'
import { cmpEditorReducer } from './reducers/cmp-editor.reducer.js'

const rootReducer = combineReducers({
  wapModule: undoable(wapReducer),
  userModule: userReducer,
  systemModule: systemReducer,
  cmpEditorModule: cmpEditorReducer,
})

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
  : undefined
export const store = createStore(rootReducer, middleware)

store.subscribe(() => {
  // console.log('storeState changed')
})

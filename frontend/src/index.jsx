import React from 'react'
import './assets/styles/main.scss'
import { RootCmp } from './RootCmp'
import { store } from './store/store'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <Router>
      <RootCmp />
    </Router>
  </Provider>
)

import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { createHistory } from 'history'
import { syncHistory, routeReducer } from 'redux-simple-router'

import { App, BookSelect, SidePanel } from './components'

const history = createHistory()
const routerMiddleware = syncHistory(history)
const reducer = combineReducers({
  routing: routeReducer,
  data: (state) => state || {}
})

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h"
               changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" />
  </DockMonitor>
)

const books = [
    { book_id: 1, name: "The ABC's of React" },
    { book_id: 2, name: "Redux for the Complete Klutz" },
    { book_id: 3, name: "Routing Right" },
    { book_id: 4, name: "Functional Functional" }
]

const finalCreateStore = compose(
  applyMiddleware(routerMiddleware),
  DevTools.instrument()
)(createStore)
const store = finalCreateStore(reducer, {data: {book: books}})
routerMiddleware.listenForReplays(store)

const routeConfig = [
    {
        path: '/',
        component: App,
        childRoutes: [
            { path: 'book/:bookId', component: SidePanel }
        ]
    }
]

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router routes={routeConfig} history={history} />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('mount')
)

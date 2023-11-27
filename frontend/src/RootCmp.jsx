import React from 'react'
import { Routes, Route } from 'react-router'

import routes from './routes'

import { Toaster } from 'react-hot-toast'

export function RootCmp() {
  return (
    <div className='root-cmp'>
      <Routes>
        {routes.map(route => (
          <Route key={route.path} exact={true} element={route.component} path={route.path} />
        ))}
      </Routes>
      <Toaster position='bottom-right' reverseOrder={false} />
    </div>
  )
}

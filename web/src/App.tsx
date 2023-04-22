import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import './App.less'

import router from '@/router'
import Loading from '@/components/Loading'
import { Provider } from 'react-redux'
import store from '@/store'
import { NotificationProvider } from './components/notification/notify'

function App() {
  return (
    <NotificationProvider>
      <Provider store={store}>
        <div className="App">
          <Suspense
            fallback={
              <div className="load">
                <Loading size={80} />
              </div>
            }
          >
            <RouterProvider router={router}></RouterProvider>
          </Suspense>
        </div>
      </Provider>
    </NotificationProvider>
  )
}

export default App

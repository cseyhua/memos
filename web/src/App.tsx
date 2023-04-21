import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import './App.less'

import router from '@/router'
import Loading from '@/components/Loading'

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div className='load'><Loading size={80} /></div>}>
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </div>
  )
}

export default App

import { Outlet } from 'react-router-dom'

import './Root.less'
import Header from '@/pages/Header'
import { Suspense } from 'react'
import Loading from '@/components/Loading'

function Root() {
  return (
    <div className="Root">
      <div className="nav">
        <Header />
      </div>
      <div className="content">
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  )
}

export default Root

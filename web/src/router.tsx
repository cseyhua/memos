import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'

const customLazy = (component: any) =>
  lazy(() =>
    new Promise((r) => {
      setTimeout(r, 2000)
    }).then(() => component)
  )

const Root = customLazy(import('@/pages/Root'))
const Home = customLazy(import('@/pages/Home'))
const Review = customLazy(import('@/pages/Review'))
const Explore = customLazy(import('@/pages/Explore'))
const Resources = customLazy(import('@/pages/Resources'))
const Archive = customLazy(import('@/pages/Archive'))
const Setting = customLazy(import('@/pages/Setting'))
const Auth = customLazy(import('@/pages/Auth'))

export default createBrowserRouter([
  {
    path: '',
    element: <Root />,
    children:[
      {
        path:'/',
        element:<Home />
      },
      {
        path:'/review',
        element:<Review />
      },
      {
        path:'/explore',
        element:<Explore />
      },
      {
        path:'/resources',
        element:<Resources />
      },
      {
        path:'/archive',
        element:<Archive />
      },
      {
        path:'/setting',
        element:<Setting />
      }
    ]
  },
  {
    path:'/auth',
    element: <Auth />
  }
])

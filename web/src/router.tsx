import { createBrowserRouter, redirect } from 'react-router-dom'
import { lazy } from 'react'
import { doSignIn, initialGlobalState } from './store/hooks'

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

const initialSystem = (() => {
  let done = false
  return async () => {
    if (done) return
    console.log('初始化系统')
    done = true
    await initialGlobalState()
  }
})()

const userLoader = async () => {
  // 初始化系统
  await initialSystem()
  let user = await doSignIn()
  if (!user) {
    return redirect('/explore')
  }
  return null
}

export default createBrowserRouter([
  {
    path: '',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
        loader: userLoader
      },
      {
        path: '/review',
        element: <Review />,
        loader: userLoader
      },
      {
        path: '/explore',
        element: <Explore />
      },
      {
        path: '/resources',
        element: <Resources />,
        loader:userLoader
      },
      {
        path: '/archive',
        element: <Archive />,
        loader:userLoader
      },
      {
        path: '/setting',
        element: <Setting />
      }
    ]
  },
  {
    path: '/auth',
    element: <Auth />,
    loader: async () => {
      // 初始化系统
      await initialSystem()

      return null
    }
  }
])

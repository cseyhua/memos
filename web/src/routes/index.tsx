import { createBrowserRouter, redirect, useNavigate } from 'react-router-dom'

import { customImportWithAsync } from '@/utils/other'
import * as api from '@/api'
import { doSignIn, store } from '@/store'
import { setHostExsited } from '@/store/reducer/user'

const Auth = customImportWithAsync(import('@/pages/Auth'))
const Home = customImportWithAsync(import('@/pages/Home'))
const Explore = customImportWithAsync(import('@/pages/Explore'))
const Root = customImportWithAsync(import('@/pages/Root'))

const initSystemStatus = (() => {
  let done = false
  return async () => {
    if (done) {
      return
    }
    try {
      done = true
      let { data: systemStatus } = await api.getSystemStatus()
      if (systemStatus && systemStatus.host) {
        store.dispatch(setHostExsited(true))
      }
    } catch (err) {}
  }
})()

const _doSignIn = (()=>{
  let done = false
  return ()=>{
    if(done){return Promise.resolve(undefined)}
    console.log('请求用户信息')
    done = true
    return doSignIn()
  }
})()

export default createBrowserRouter([
  {
    path: '/auth',
    element: <Auth />,
    loader: async () => {
      // 需要完成的事情：验证用户是否已经登录，如果已经登录则跳到主页，否则请求系统状态信息
      try {
        let user = await doSignIn()
        if (user) {
          return redirect('/')
        } else {
          await initSystemStatus()
        }
      } catch (err) {}
      return null
    }
  },
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Home />,
        loader: async () => {
          try {
            await initSystemStatus()
            await _doSignIn()
          } catch (err) {}
          return null
        }
      },
      {
        path: 'explore',
        element: <Explore />
      }
    ]
  }
])

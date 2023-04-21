import { NavLink } from 'react-router-dom'
import {
  Home,
  CalendarCheck,
  Hash,
  Paperclip,
  Package,
  Settings,
  LogIn,
  MessageCircle
} from 'lucide-react'

import './Header.less'
import { useUser } from '@/store/hooks'

function Header() {
  const userStore = useUser()

  const isVisitedMode = userStore.isVisitedMode()

  return (
    <div className="header">
      {!isVisitedMode && (
        <>
          <NavLink
            to={'/'}
            className={({ isActive }) => `${isActive && 'active'}`}
          >
            <div className="nav-item">
              <Home />
              <span>首页</span>
            </div>
          </NavLink>
          <NavLink
            to={'/review'}
            className={({ isActive }) => `${isActive && 'active'}`}
          >
            <div className="nav-item">
              <CalendarCheck />
              <span>每日回顾</span>
            </div>
          </NavLink>
        </>
      )}
      <NavLink
        to={'/explore'}
        className={({ isActive }) => `${isActive && 'active'}`}
      >
        <div className="nav-item">
          <Hash />
          <span>探索</span>
        </div>
      </NavLink>
      {isVisitedMode && (
        <>
        <NavLink
          to={'/auth'}
          className={({ isActive }) => `${isActive && 'active'}`}
        >
          <div className="nav-item">
            <LogIn />
            <span>登录</span>
          </div>
        </NavLink>
        <NavLink
          to={'/about'}
          className={({ isActive }) => `${isActive && 'active'}`}
        >
          <div className="nav-item">
            <MessageCircle />
            <span>登录</span>
          </div>
        </NavLink>
        </>
      )}
      {!isVisitedMode && (
        <>
          <NavLink
            to={'/resources'}
            className={({ isActive }) => `${isActive && 'active'}`}
          >
            <div className="nav-item">
              <Paperclip />
              <span>资源库</span>
            </div>
          </NavLink>
          <NavLink
            to={'/archive'}
            className={({ isActive }) => `${isActive && 'active'}`}
          >
            <div className="nav-item">
              <Package />
              <span>归档</span>
            </div>
          </NavLink>
          <NavLink
            to={'/setting'}
            className={({ isActive }) => `${isActive && 'active'}`}
          >
            <div className="nav-item">
              <Settings />
              <span>设置</span>
            </div>
          </NavLink>
        </>
      )}
    </div>
  )
}

export default Header

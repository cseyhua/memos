import { NavLink } from 'react-router-dom'
import { Home, CalendarCheck, Hash, Paperclip, Package, Settings } from 'lucide-react'

import './Header.less'

function Header() {
  return (
    <div className="header">
      <NavLink to={'/'} className={({isActive}) => `${isActive && 'active'}`}>
        <div className="nav-item">
          <Home />
          <span>首页</span>
        </div>
      </NavLink>
      <NavLink
        to={'/review'}
        className={({isActive}) => `${isActive && 'active'}`}
      >
        <div className="nav-item">
          <CalendarCheck />
          <span>每日回顾</span>
        </div>
      </NavLink>
      <NavLink
        to={'/explore'}
        className={({isActive}) => `${isActive && 'active'}`}
      >
        <div className="nav-item">
          <Hash />
          <span>探索</span>
        </div>
      </NavLink>
      <NavLink
        to={'/resources'}
        className={({isActive}) => `${isActive && 'active'}`}
      >
        <div className="nav-item">
          <Paperclip />
          <span>资源库</span>
        </div>
      </NavLink>
      <NavLink
        to={'/archive'}
        className={({isActive}) => `${isActive && 'active'}`}
      >
        <div className="nav-item">
          <Package />
          <span>归档</span>
        </div>
      </NavLink>
      <NavLink
        to={'/setting'}
        className={({isActive}) => `${isActive && 'active'}`}
      >
        <div className="nav-item">
          <Settings />
          <span>设置</span>
        </div>
      </NavLink>
    </div>
  )
}

export default Header

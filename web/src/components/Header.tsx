import { useUserStore } from '@/store'
import styled from 'styled-components'
import {
  Home,
  Bomb,
  LogIn,
  Flame,
  Link,
  Settings,
  Archive,
  CalendarCheck2
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

const Header = styled.div`
  margin: 1em 0;
`

const BNavLink = styled(NavLink)`
  margin-top: 0.25em;
  padding: 0.25em 1em;
  font-size: 20px;
  color: #606060;
  cursor: pointer;
  user-select: none;
  border-radius: 0.25em;
  display: flex;
  align-items: center;
  gap: 0.5em;
  background-color: transparent;
  &:hover {
    background-color: #efefef;
  }
`

const Nav = styled.div`
  & > .active {
    background-color: #efefef;
  }
`

type Props = {
  className: string
}

export default function (props: Props) {
  const { isVisited } = useUserStore()

  return (
    <Header className={props.className}>
      {isVisited ? (
        <Nav>
          <BNavLink
            to={'/explore'}
            className={({ isActive }) => `${isActive && 'active'}`}
          >
            <Bomb size={20} strokeWidth={2} stroke="#909090" />
            探索
          </BNavLink>
          <BNavLink to={'/auth'} className={({ isActive }) => `${isActive && 'active'}`}>
            <LogIn size={20} strokeWidth={2} stroke="#909090" />
            登录
          </BNavLink>
          <BNavLink to={'/about'} className={({ isActive }) => `${isActive && 'active'}`}>
            <Flame size={20} strokeWidth={2} stroke="#909090" />
            关于
          </BNavLink>
        </Nav>
      ) : (
        <Nav>
          <BNavLink to={'/'} className={({ isActive }) => `${isActive && 'active'}`}>
            <Home size={20} strokeWidth={2} stroke="#909090" />
            主页
          </BNavLink>
          <BNavLink to={'/review'} className={({ isActive }) => `${isActive && 'active'}`}>
            <CalendarCheck2 size={20} strokeWidth={2} stroke="#909090" />
            每日回顾
          </BNavLink>
          <BNavLink to={'/explore'} className={({ isActive }) => `${isActive && 'active'}`}>
            <Bomb size={20} strokeWidth={2} stroke="#909090" />
            探索
          </BNavLink>
          <BNavLink to={'/resource'} className={({ isActive }) => `${isActive && 'active'}`}>
            <Link size={20} strokeWidth={2} stroke="#909090" />
            资源库
          </BNavLink>
          <BNavLink to={'/archive'} className={({ isActive }) => `${isActive && 'active'}`}>
            <Archive size={20} strokeWidth={2} stroke="#909090" />
            归档
          </BNavLink>
          <BNavLink to={'/set'} className={({ isActive }) => `${isActive && 'active'}`}>
            <Settings size={20} strokeWidth={2} stroke="#909090" />
            设置
          </BNavLink>
        </Nav>
      )}
    </Header>
  )
}

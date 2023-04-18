import Header from '@/components/Header'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

const Root = styled.div`
  display: flex;
  & > .header-box {
    flex-shrik: 0;
    min-width:150px;
    & > .header {
      position: sticky;
      top: 0;
    }
  }
  & > .main-box {
    flex-grow: 1;
  }
`

export default function () {
  return (
    <Root>
      <div className="header-box">
        <Header className="header" />
      </div>
      <div className="main-box">
        <Outlet />
      </div>
    </Root>
  )
}

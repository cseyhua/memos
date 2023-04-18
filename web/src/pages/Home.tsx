import HomeSidebar from '@/components/HomeSidebar'
import { MemoEditor } from '@/components/editor'
import { MemoList } from '@/components/memo'
import { useUserStore } from '@/store'
import styled from 'styled-components'

const Home = styled.div`
  display: flex;
  height: 100%;
  gap: 0.5em;
  padding: 1em 0.5em;
  & > .home {
    flex-grow: 1;
    flex-shrik: 1;
  }
  & > .sidebar {
    flex-shrik: 0;
  }
`

export default function () {

  const { isVisited } = useUserStore()

  return (
    <Home>
      <div className="home">
        { !isVisited && <MemoEditor /> }
        <MemoList />
      </div>
      <div className="sidebar">
        <HomeSidebar />
      </div>
    </Home>
  )
}

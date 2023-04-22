import { MemoEditor } from '@/components/memo-editor'
import './Home.less'
import SearchInput from '@/components/SearchInput'
import UsageHeatMap from '@/components/UsageHeatMap'
import Filter from '@/components/Filter'
import TagBox from '@/components/TagBox'
import MemoList from '@/components/memo'
import MemoFilter from '@/components/memo/MemoFilter'

function Home() {
  return (
    <div className="home">
      <div className="main">
        <MemoEditor />
        <MemoFilter />
        <MemoList />
      </div>
      <div className="side">
        <div className="sideb">
          <SearchInput />
          <UsageHeatMap />
          <Filter />
          <TagBox />
        </div>
      </div>
    </div>
  )
}

export default Home

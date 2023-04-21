import { MemoEditor } from '@/components/memo-editor'
import './Home.less'
import SearchInput from '@/components/SearchInput'
import UsageHeatMap from '@/components/UsageHeatMap'
import Filter from '@/components/Filter'
import TagBox from '@/components/TagBox'

function Home(){
  return (
    <div className='home'>
      <div className='main'>
        <MemoEditor />
      </div>
      <div className='side'>
        <SearchInput />
        <UsageHeatMap />
        <Filter />
        <TagBox />
      </div>
    </div>
  )
}

export default Home
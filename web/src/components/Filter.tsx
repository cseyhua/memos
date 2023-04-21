import { Filter as LuFilter, ListPlus } from 'lucide-react'

import './Filter.less'

function Filter() {
  return (
    <div className="filter">
      <div className='top'>
        <LuFilter size={16} />
        <span>复合过滤器</span>
        <ListPlus className='plus' size={20} />
      </div>
      <div className='items'>
        <div className='item'>文章与CSS</div>
        <div className='item'>TS类型体操</div>
      </div>
    </div>
  )
}

export default Filter

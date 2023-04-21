import { Tags } from 'lucide-react'

import './TagBox.less'

function TagBox(){
  return (
    <div className='tag-box'>
      <div className='top'>
        <Tags size={16} />
        <div>标签集</div>
      </div>
      <div className='tags'>
        <div className='tag'>css</div>
        <div className='tag'>golang</div>
        <div className='tag'>js</div>
        <div className='tag'>ts</div>
      </div>
    </div>
  )
}

export default TagBox
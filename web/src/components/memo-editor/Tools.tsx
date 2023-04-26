import { Hash, CheckSquare, ChevronsLeftRight, FileText, Maximize, Minimize, Plus, Database } from 'lucide-react'

import './Tools.less'

type Props = {
  onFullScreen: (bool: boolean) => void,
  fullscreen: boolean
}

function Tools({ onFullScreen, fullscreen }: Props) {
  return (
    <div className='tools'>
      <div className='item'><Hash /></div>
      <div className='item'><CheckSquare /></div>
      <div className='item'><ChevronsLeftRight /></div>
      <div className='item file'>
        <FileText className='file-icon' />
        <div className='file-opt'>
          <div className='file-opt-item'>
            <Plus className='luicon' />
            <span>添加</span>
          </div>
          <div className='file-opt-item'>
            <Database className='luicon'  />
            <span>资源库</span>
          </div>
        </div>
      </div>
      {!fullscreen && <div className='item' onClick={() => onFullScreen(true)}><Maximize /></div>}
      {fullscreen && <div className='item' onClick={() => onFullScreen(false)}><Minimize /></div>}
    </div>
  )
}

export default Tools
import { Hash,CheckSquare, ChevronsLeftRight,FileText, Maximize, Minimize } from 'lucide-react'

import './Tools.less'

type Props={
  onFullScreen:(bool:boolean)=>void,
  fullscreen:boolean
}

function Tools({onFullScreen, fullscreen}:Props){
  return (
    <div className='tools'>
      <div className='item'><Hash /></div>
      <div className='item'><CheckSquare /></div>
      <div className='item'><ChevronsLeftRight /></div>
      <div className='item'><FileText /></div>
      { !fullscreen && <div className='item' onClick={()=>onFullScreen(true)}><Maximize /></div> }
      { fullscreen && <div className='item' onClick={()=>onFullScreen(false)}><Minimize /></div> }
    </div>
  )
}

export default Tools
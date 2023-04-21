import { useState } from 'react'
import Editor from './Editor'
import Tools from './Tools'

import './memo-editor.less'

function MemoEditor() {

  const [fullscreen, setFullscreen] = useState(false)

  return (
    <div className={`memo-editor ` + (fullscreen && ' fullscreen ')}>
      <Editor className='memo-edit' />
      <div className="foot">
        <Tools fullscreen = {fullscreen} onFullScreen = {(bool)=>setFullscreen(bool)} />
        <div className='save'>记下</div>
      </div>
    </div>
  )
}

export default MemoEditor
